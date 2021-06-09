#!/bin/bash

set -o errexit
set -o pipefail

START_TIME="$(date -u +%s)"

check_dependencies() {
  echo "Checking dependencies..."

  gcloud version
  kubectl version --client
  kpt version
}

enable_krmapi() {
    if [ ${ENABLE_KRMAPIHOSTING} = true ]; then
      echo "Enabling ${API_ENDPOINT} service..."
      gcloud services enable "${API_ENDPOINT}" \
          --project "${PROJECT_ID}"
    fi
}

create_cluster() {
    echo "Creating admin cluster..."
    gcloud alpha anthos config controller create "${CLUSTER_NAME}" \
        --location "${CLUSTER_REGION}" \
        --project "${PROJECT_ID}"
}

delete_cluster() {
    echo "Deleting admin cluster..."
    gcloud alpha anthos config controller delete "${CLUSTER_NAME}" \
        --location "${CLUSTER_REGION}" \
        --project "${PROJECT_ID}" \
        --quiet
}

connect_to_cluster() {
    echo "Getting admin cluster credentials..."
    gcloud container clusters get-credentials "${ADMIN_CLUSTER_NAME_PREFIX}${CLUSTER_NAME}" \
        --region "${CLUSTER_REGION}" \
        --project "${PROJECT_ID}"
}

# kubectl wait in a loop with retries on failure.
kubectl_wait() {
    local stdout=""
    local errcode=0
    for i in $(seq 1 ${KUBECTL_WAIT_RETRIES})
    do
        # or condition prevents errexit from early exit due to non-zero error code
        # and condition captures errcode if zero
        stdout=$(kubectl wait "$@" --timeout="${KUBECTL_WAIT_TIMEOUT}" 2>&1) && errcode=$? || errcode=$?
        if [[ -z "${stdout}" ]]
        then
            break
        fi
        sleep 1
        echo "Retrying..."
    done
    if [[ -n "${stdout}" ]]
    then
        echo "${stdout}"
    fi
    return ${errcode}
}

wait_for_components() {
    echo "Waiting for Gatekeeper..."
    kubectl_wait --for=condition=available deployment/gatekeeper-controller-manager -n gatekeeper-system

    echo "Waiting for Config Connector Pods..."
    kubectl_wait --for=condition=Ready pod --all -n cnrm-system

    echo "Waiting for Config Connector CRDs..."
    kubectl_wait --for=condition=established crd/configconnectors.core.cnrm.cloud.google.com

    echo "Waiting for Config Connector..."
    until [[ "$(kubectl get configconnector configconnector.core.cnrm.cloud.google.com -o jsonpath='{.status.healthy}')" == "true" ]]
    do
        kubectl annotate configconnector configconnector.core.cnrm.cloud.google.com reconcile=true 1> /dev/null
        kubectl annotate configconnector configconnector.core.cnrm.cloud.google.com reconcile- 1> /dev/null
        echo "Waiting for Config Connector..."
        sleep 15
    done
}

wait_for_configsync() {
    if [ ${SKIP_GIT_OPS} = 1 ]
    then
        return
    fi

    echo "Waiting for Config Sync..."
    until kubectl describe serviceaccount/importer -n config-management-system 2> /dev/null
    do
        echo "Retrying..."
        sleep 5
    done
}

set_kcc_sa_permissions() {
    echo "Looking up Config Connector service account..."
    until SA_EMAIL="$(kubectl get ConfigConnectorContext -n config-control -o jsonpath='{.items[0].spec.googleServiceAccount}' 2> /dev/null)"
    do
        echo "Retrying..."
        sleep 5
    done

    echo "Granting Config Connector project owner..."
    gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
        --member "serviceAccount:${SA_EMAIL}" \
        --role "roles/owner" \
        --project "${PROJECT_ID}"
}

enable_services() {
    echo "Enabling iam.googleapis.com service..."
    gcloud services enable iam.googleapis.com --project "${PROJECT_ID}"

    echo "Enabling cloudresourcemanager.googleapis.com service..."
    gcloud services enable cloudresourcemanager.googleapis.com --project "${PROJECT_ID}"
}

setup_git_ops() {
    if [ ${SKIP_GIT_OPS} = 1 ]
    then
        return
    fi

    echo "Configuring GitOps pipeline..."
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline namespace "config-control" -R
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline project-id "${PROJECT_ID}" -R
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline project-number "${PROJECT_NUMBER}" -R
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline source-repo "${SOURCE_REPO}" -R
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline deployment-repo "${DEPLOYMENT_REPO}" -R
    kpt cfg set ${SOURCE_DIR}/csr-git-ops-pipeline cluster-name "${CLUSTER_NAME}" -R

    echo "Creating GitOps pipeline..."
    kubectl apply --wait -f ${SOURCE_DIR}/csr-git-ops-pipeline/ --recursive

    echo "Waiting for source repos..."
    kubectl_wait --for=condition=READY -f ${SOURCE_DIR}/csr-git-ops-pipeline/source-repositories.yaml

    echo "Waiting for hydration trigger..."
    kubectl_wait --for=condition=READY -f ${SOURCE_DIR}/csr-git-ops-pipeline/hydration-trigger.yaml

    echo "Waiting for IAM..."
    kubectl_wait --for=condition=READY -f ${SOURCE_DIR}/csr-git-ops-pipeline/cloudbuild-iam.yaml
    kubectl_wait --for=condition=READY -f ${SOURCE_DIR}/csr-git-ops-pipeline/configsync/configsync-iam.yaml
}

remove_git_ops() {
    if [ ${SKIP_GIT_OPS} = 1 ]
    then
        return
    fi
    echo "Deleting GitOps resources..."
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
ADMIN_CLUSTER_NAME_PREFIX="krmapihost-"
DEPLOYMENT_REPO="deployment-repo"
SOURCE_REPO="source-repo"
CLUSTER_REGION="us-central1"
MASTER_IPV4_CIDR=172.16.0.128/28

KUBECTL_WAIT_RETRIES="3"
KUBECTL_WAIT_TIMEOUT="10m"
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
    check_dependencies
    enable_krmapi
    ENABLEMENT_END_TIME="$(date -u +%s)"

    create_cluster
    CREATE_CLUSTER_END_TIME="$(date -u +%s)"

    connect_to_cluster
    wait_for_components
    WAIT_FOR_COMPONENTS_END_TIME="$(date -u +%s)"

    set_kcc_sa_permissions
    enable_services
    ENABLE_SERVICES_END_TIME="$(date -u +%s)"

    setup_git_ops
    SETUP_GIT_OPS_END_TIME="$(date -u +%s)"

    wait_for_configsync

    if [ ${BENCHMARK} = 1 ]
    then
      END_TIME="$(date -u +%s)"
      echo "API enablement elapsed time: $(($ENABLEMENT_END_TIME-$START_TIME))s"
      echo "Cluster creation elapsed time: $(($CREATE_CLUSTER_END_TIME-$ENABLEMENT_END_TIME))s"
      echo "Wait for components elapsed time: $(($WAIT_FOR_COMPONENTS_END_TIME-$CREATE_CLUSTER_END_TIME))s"
      echo "Enable services elapsed time: $(($ENABLE_SERVICES_END_TIME-$WAIT_FOR_COMPONENTS_END_TIME))s"
      echo "Set up git ops elapsed time: $(($SETUP_GIT_OPS_END_TIME-$ENABLE_SERVICES_END_TIME))s"
      echo "Wait for configsync elapsed time: $(($END_TIME-$SETUP_GIT_OPS_END_TIME))s"
      echo "Total elapsed time: $(($END_TIME-$START_TIME))s"
    fi
    exit 0
fi

print_usage_exit
