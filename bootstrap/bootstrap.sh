#!/bin/bash

set -o errexit
set -o pipefail

START_TIME="$(date -u +%s)"

check_dependencies() {
  echo "Checking dependencies."

  gcloud version
  kubectl version --client
  kpt version
}

enable_krmapi() {
    if [ ${ENABLE_KRMAPIHOSTING} = true ]; then
      gcloud services enable "${API_ENDPOINT}" \
          --project "${PROJECT_ID}"
    fi
}

create_cluster() {
    gcloud alpha admin-service-cluster instances create "${CLUSTER_NAME}" \
        --location "${CLUSTER_REGION}" \
        --bundles "Yakima" \
        --project "${PROJECT_ID}" \
        --git-sync-repo "https://source.developers.google.com/p/${PROJECT_ID}/r/${DEPLOYMENT_REPO}" \
        --git-branch "main" \
        --git-secret-type "gcenode" \
        --git-policy-dir "config"
}

delete_cluster() {
    gcloud alpha admin-service-cluster instances delete "${CLUSTER_NAME}" \
        --location "${CLUSTER_REGION}" \
        --project "${PROJECT_ID}" \
        --quiet
}

connect_to_cluster() {
    gcloud container clusters get-credentials "krmapihost-${CLUSTER_NAME}" \
        --region "${CLUSTER_REGION}" \
        --project "${PROJECT_ID}"
}

wait_for_components() {
    echo "Waiting for Gatekeeper service to become available. This might take several minutes."
    until kubectl wait --for=condition=available --timeout="${KUBECTL_WAIT_TIMEOUT}" deployment/gatekeeper-controller-manager -n gatekeeper-system 2> /dev/null
    do
        echo "Waiting for Gatekeeper..."
        sleep 5
    done

    echo "Waiting for Config Connector Pods."
    until kubectl wait --for=condition=Ready --timeout="${KUBECTL_WAIT_TIMEOUT}" pod --all -n cnrm-system 2> /dev/null
    do
        echo "Waiting for Config Connector Pods..."
        sleep 5
    done

    echo "Waiting for Config Connector CRDs."
    until kubectl wait --for=condition=established --timeout="${KUBECTL_WAIT_TIMEOUT}" crd/configconnectors.core.cnrm.cloud.google.com 2> /dev/null
    do
        echo "Waiting for Config Connector CRDs..."
        sleep 5
    done

    echo "Waiting for Config Sync installation."
    until kubectl describe serviceaccount/importer -n config-management-system 2> /dev/null
    do
        echo "Waiting for Config Sync..."
        sleep 5
    done

    echo "Checking Config Connector health."
    until [ "$(kubectl get configconnector configconnector.core.cnrm.cloud.google.com -o jsonpath='{.status.healthy}')" = "true" ]
    do
        kubectl annotate configconnector configconnector.core.cnrm.cloud.google.com reconcile=true 1> /dev/null
        kubectl annotate configconnector configconnector.core.cnrm.cloud.google.com reconcile- 1> /dev/null
        echo "Waiting for Config Connector health check..."
        sleep 15
    done
}

set_sa_permissions() {
    # Grab the Config Connector service account from the ConfigConnectorContext
    # resource.
    until SA_EMAIL="$(kubectl get ConfigConnectorContext -n yakima-system -o jsonpath='{.items[0].spec.googleServiceAccount}' 2> /dev/null)"
    do
        echo "Waiting for ConfigConnectorContext..."
        sleep 5
    done

    # Grant project owner to the Config Connector service account.
    gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
        --member "serviceAccount:${SA_EMAIL}" \
        --role "roles/owner" \
        --project "${PROJECT_ID}"

    # Set up a workload identity binding between the Config Sync importer
    # Kubernetes service account and the GCP service account that will be
    # created by the csr-git-ops-pipeline blueprint.
    kubectl annotate serviceaccount/importer -n config-management-system \
        iam.gke.io/gcp-service-account="config-sync-sa@${PROJECT_ID}.iam.gserviceaccount.com"
}

# create explicit FW rule to allow communication btw hosted control plane and private nodes for webhook
create_cnrm_fw() {
    # find target tags that existing GKE FW rules use
    gke_target_tag=$(gcloud compute firewall-rules list --filter "name~^gke-krmapihost-${CLUSTER_NAME}" --format "value(targetTags)" --project="${PROJECT_ID}" --limit=1)
    # create fw rule targeting nodes and allow ingress from MASTER_IPV4_CIDR
    gcloud compute firewall-rules create "acp-cnrm-fw-${CLUSTER_NAME}" --action ALLOW --direction INGRESS --source-ranges "${MASTER_IPV4_CIDR}" --rules tcp:9443 --target-tags "${gke_target_tag}" --project="${PROJECT_ID}"
}

delete_cnrm_fw() {
    gcloud compute firewall-rules delete "acp-cnrm-fw-${CLUSTER_NAME}" --project="${PROJECT_ID}" --quiet
}

enable_services() {
    gcloud services enable \
        iam.googleapis.com \
        cloudresourcemanager.googleapis.com \
        --project "${PROJECT_ID}"
}

setup_git_ops() {
    if [ ${SKIP_GIT_OPS} = 1 ]
    then
        return
    fi
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline namespace "yakima-system"
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline project-id "${PROJECT_ID}"
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline project-number "${PROJECT_NUMBER}"
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline source-repo "${SOURCE_REPO}"
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline deployment-repo "${DEPLOYMENT_REPO}"
    kubectl apply --wait -f ${SOURCE_DIR}/csr-git-ops-pipeline/
    echo "Waiting for creation of GitOps resources. This might take a few minutes."
    kubectl wait --for=condition=READY --timeout="${KUBECTL_WAIT_TIMEOUT}" -f ${SOURCE_DIR}/csr-git-ops-pipeline/source-repositories.yaml
    kubectl wait --for=condition=READY --timeout="${KUBECTL_WAIT_TIMEOUT}" -f ${SOURCE_DIR}/csr-git-ops-pipeline/hydration-trigger.yaml
    kubectl wait --for=condition=READY --timeout="${KUBECTL_WAIT_TIMEOUT}" -f ${SOURCE_DIR}/csr-git-ops-pipeline/iam.yaml
}

remove_git_ops() {
    if [ ${SKIP_GIT_OPS} = 1 ]
    then
        return
    fi
    kubectl delete --wait -f ${SOURCE_DIR}/csr-git-ops-pipeline/ || true
}

print_usage_exit() {
    cat << EOF
Usage: bootstrap.sh <command> [<flags>]

Commands:
    create - Create admin cluster.
    delete - Delete admin cluster.

Flags:
    -c, --cluster <cluster_name>      - Override admin cluster name. Default - "${DEFAULT_CLUSTER_NAME}".
    -p, --project <project_id>        - Override project for admin cluster. Default - current gcloud project.
    -d, --deployment-repo <repo_name> - Override deployment repository name. Default - "deployment-repo".
    -s, --source-repo <repo_name>     - Override source repository name. Default - "source-repo".
    --skip-git-ops                    - Skip creation/deletion of GitOps pipeline.

EOF
    exit 1
}

SOURCE_DIR="$(dirname "${BASH_SOURCE[0]}" )"

COMPONENTS_LIST=$(gcloud components list --format=json)

if [[ -z $(echo "${COMPONENTS_LIST}" | grep "\"kpt\"") ]]
then
    gcloud components install kpt
fi

if [[ -z $(echo "${COMPONENTS_LIST}" | grep "\"kubectl\"") ]]
then
    gcloud components install kubectl
fi

API_ENDPOINT="krmapihosting.googleapis.com"

PROJECT_ID="$(gcloud config get-value project -q)"
DEFAULT_CLUSTER_NAME="landing-zone-cluster"
CLUSTER_NAME=${DEFAULT_CLUSTER_NAME}
DEPLOYMENT_REPO="deployment-repo"
SOURCE_REPO="source-repo"
CLUSTER_REGION="us-central1"
MASTER_IPV4_CIDR=172.16.0.128/28

KUBECTL_WAIT_TIMEOUT="30m"
if [ -z "${ENABLE_KRMAPIHOSTING:-}" ]; then
  ENABLE_KRMAPIHOSTING=true
fi
SKIP_GIT_OPS=0
BENCHMARK=0

COMMAND="$1"
if [ -z "${COMMAND}" ]
then
    echo >&2 "No command specified."
    print_usage_exit
fi
shift # Remove command from args.
# Parse flags.
while [[ $# -gt 0 ]]
do
    arg="$1"
    case "${arg}" in
        -c|--cluster)
        CLUSTER_NAME="$2"
        shift # Remove argument name from processing
        shift # Remove argument value from processing
        ;;
        -p|--project)
        PROJECT_ID="$2"
        shift # Remove argument name from processing
        shift # Remove argument value from processing
        ;;
        -d|--deployment-repo)
        DEPLOYMENT_REPO="$2"
        shift # Remove argument name from processing
        shift # Remove argument value from processing
        ;;
        -s|--source-repo)
        SOURCE_REPO="$2"
        shift # Remove argument name from processing
        shift # Remove argument value from processing
        ;;
        --skip-git-ops)
        SKIP_GIT_OPS=1
        shift # Remove flag from processing
        ;;
        --benchmark)
        BENCHMARK=1
        shift # Remove flag from processing
        ;;
        *)
        echo >&2 "Invalid command line parameter: ${arg}"
        print_usage_exit
    esac
done

if [ -z "${PROJECT_ID}" ]; then
  echo >&2 "No project selected, use '--project' to specify project or configure a default with gcloud."
  exit 1
fi

PROJECT_NUMBER="$(gcloud projects describe ${PROJECT_ID} --format='get(projectNumber)')"

if [ -z "${PROJECT_NUMBER}" ]; then
  # gcloud error message is good enough, just exit.
  exit 1
fi

if [ ${COMMAND} = "delete" ]
then
    echo "Deleting admin cluster..."
    remove_git_ops
    REMOVE_GIT_OPS_END_TIME="$(date -u +%s)"

    delete_cnrm_fw
    delete_cluster
    if [ ${BENCHMARK} = 1 ]
    then
      END_TIME="$(date -u +%s)"
      echo "Remove git ops elapsed time: $(($REMOVE_GIT_OPS_END_TIME-$START_TIME))s"
      echo "Cluster deletion elapsed time: $(($END_TIME-$REMOVE_GIT_OPS_END_TIME))s"
      echo "Total elapsed time: $(($END_TIME-$START_TIME))s"
    fi
    exit 0
fi

if [ ${COMMAND} = "create" ]
then
    echo "Creating admin cluster..."
    check_dependencies
    enable_krmapi
    ENABLEMENT_END_TIME="$(date -u +%s)"

    create_cluster
    CREATE_CLUSTER_END_TIME="$(date -u +%s)"

    create_cnrm_fw
    connect_to_cluster
    wait_for_components
    WAIT_FOR_COMPONENTS_END_TIME="$(date -u +%s)"

    set_sa_permissions
    enable_services
    ENABLE_SERVICES_END_TIME="$(date -u +%s)"

    setup_git_ops

    if [ ${BENCHMARK} = 1 ]
    then
      END_TIME="$(date -u +%s)"
      echo "API enablement elapsed time: $(($ENABLEMENT_END_TIME-$START_TIME))s"
      echo "Cluster creation elapsed time: $(($CREATE_CLUSTER_END_TIME-$ENABLEMENT_END_TIME))s"
      echo "Wait for components elapsed time: $(($WAIT_FOR_COMPONENTS_END_TIME-$CREATE_CLUSTER_END_TIME))s"
      echo "Enable services elapsed time: $(($ENABLE_SERVICES_END_TIME-$WAIT_FOR_COMPONENTS_END_TIME))s"
      echo "Set up git ops elapsed time: $(($END_TIME-$ENABLE_SERVICES_END_TIME))s"
      echo "Total elapsed time: $(($END_TIME-$START_TIME))s"
    fi
    exit 0
fi

print_usage_exit
