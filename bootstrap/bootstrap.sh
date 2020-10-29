#!/bin/bash

set -o errexit
set -o pipefail


enable_krmapi() {
    if [ ${ENABLE_KRMAPIHOSTING} = true ]; then
      gcloud services enable "${API_ENDPOINT}" \
          --project "${PROJECT_ID}"
    fi

    gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
        --member "serviceAccount:${SERVICE_ACCOUNT}" \
        --role "roles/container.admin" \
        --project "${PROJECT_ID}"
    gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
        --member "serviceAccount:${SERVICE_ACCOUNT}" \
        --role "roles/iam.serviceAccountUser" \
        --project "${PROJECT_ID}"
    gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
        --member "serviceAccount:${SERVICE_ACCOUNT}" \
        --role "roles/compute.instanceAdmin" \
        --project "${PROJECT_ID}"

}

create_cluster() {
    gcloud alpha admin-service-cluster instances create "${CLUSTER_NAME}" \
        --location "${CLUSTER_REGION}" \
        --bundles "Yakima" \
        --project "${PROJECT_ID}"
}

delete_cluster() {
    gcloud alpha admin-service-cluster instances delete "${CLUSTER_NAME}" \
        --location "${CLUSTER_REGION}" \
        --project "${PROJECT_ID}" \
        --quiet
}

connect_to_cluster() {
    gcloud container clusters get-credentials "${CLUSTER_NAME}" \
        --region "${CLUSTER_REGION}" \
        --project "${PROJECT_ID}"
}

wait_for_components() {
    local max_retries=120
    local poll_interval=5
    local i=0

    echo "Waiting for Gatekeeper service to become available. This might take several minutes."
    until kubectl wait --for=condition=available --timeout="${KUBECTL_WAIT_TIMEOUT}" deployment/gatekeeper-controller-manager -n gatekeeper-system 2> /dev/null
    do
        if [ ${i} -eq  ${max_retries} ]; then
          echo "Timed out waiting for Gatekeeper" >&2
          exit 1
        fi

        ((i++))
        echo "Waiting for Gatekeeper..."
        sleep ${poll_interval}
    done

    i=0

    echo "Waiting for Config Connector CRDs."
    until kubectl wait --for=condition=established --timeout="${KUBECTL_WAIT_TIMEOUT}" crd/configconnectors.core.cnrm.cloud.google.com 2> /dev/null
    do
        if [ ${i} -eq  ${max_retries} ]; then
          echo "Timed out waiting for Config Connector" >&2
          exit 1
        fi

        ((i++))
        echo "Waiting for Config Connector..."
        sleep ${poll_interval}
    done
}

set_sa_permissions() {
    SA_EMAIL="$(kubectl get ConfigConnectorContext -n yakima-system -o jsonpath='{.items[0].spec.googleServiceAccount}')"
    gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
        --member "serviceAccount:${SA_EMAIL}" \
        --role "roles/owner" \
        --project "${PROJECT_ID}"
}

enable_services() {
    gcloud services enable \
        iam.googleapis.com \
        cloudresourcemanager.googleapis.com \
        --project "${PROJECT_ID}"
}

print_usage_exit() {
    cat << EOF
Usage: bootstrap.sh <command> [<flags>]

Commands:
    create - Create admin cluster.
    delete - Delete admin cluster.

Flags:
    -c, --cluster <cluster_name> - Override default admin cluster name.
    -p, --project <project_id>   - Specify project for admin cluster. Default - use gcloud default project.

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
SERVICE_ACCOUNT="service-953545698565@gcp-sa-saasmanagement.iam.gserviceaccount.com"

PROJECT_ID="$(gcloud config get-value project -q)"
CLUSTER_NAME="krmapihost-landing-zone-cluster"
CLUSTER_REGION="us-central1"
MASTER_IPV4_CIDR=172.16.0.128/28

KUBECTL_WAIT_TIMEOUT="10m"
if [ -z "${ENABLE_KRMAPIHOSTING:-}" ]; then
  ENABLE_KRMAPIHOSTING=true
fi

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
        CLUSTER_NAME="krmapihost-$2"
        shift # Remove argument name from processing
        shift # Remove argument value from processing
        ;;
        -p|--project)
        PROJECT_ID="$2"
        shift # Remove argument name from processing
        shift # Remove argument value from processing
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
    delete_cluster
    exit 0
fi

if [ ${COMMAND} = "create" ]
then
    echo "Creating admin cluster..."
    enable_krmapi
    create_cluster
    connect_to_cluster
    wait_for_components
    set_sa_permissions
    enable_services
    exit 0
fi

print_usage_exit
