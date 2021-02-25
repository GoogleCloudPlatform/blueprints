#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID="yakima-eap-testing"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
CLUSTER_NAME="presub-${TIMESTAMP}"
ACP_CLUSTER_NAME="krmapihost-${CLUSTER_NAME}"

while [[ $# -gt 0 ]]
do
  arg="$1"
  case "${arg}" in
    -p|--project)
      PROJECT_ID="$2"
      shift # Remove argument name from processing
      shift # Remove argument value from processing
      ;;
    *)
      echo >&2 "Invalid command line parameter: ${arg}"
      exit 1
  esac
done

if [ -n "${GOOGLE_TEST_CREDENTIALS:-}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_TEST_CREDENTIALS}"
fi

gcloud components update --quiet
gcloud components install pkg --quiet
gcloud components install alpha --quiet

export ENABLE_KRMAPIHOSTING=false

OLD_CLUSTERS=$(gcloud container clusters list --project ${PROJECT_ID} --format="get(name)")
OLD_FW_RULES=$(gcloud compute firewall-rules list --project="${PROJECT_ID}" --filter="acp-cnrm-fw" --format="get(name)")

if [ -n "${OLD_CLUSTERS}" ]; then
  echo "Deleting stale cluster(s): ${OLD_CLUSTERS}"
  gcloud container clusters delete ${OLD_CLUSTERS} --quiet --project ${PROJECT_ID} --region us-central1
fi

if [ -n "${OLD_FW_RULES}" ]; then
  echo "Deleting stale firewall rule(s): ${OLD_FW_RULES}"
  gcloud compute firewall-rules delete ${OLD_FW_RULES} --project="${PROJECT_ID}" --quiet
fi

$(dirname "$BASH_SOURCE")/../../bootstrap.sh create -c ${CLUSTER_NAME} -p ${PROJECT_ID} --skip-git-ops --benchmark
gcloud container clusters describe ${ACP_CLUSTER_NAME} --project ${PROJECT_ID} --region us-central1
$(dirname "$BASH_SOURCE")/../../bootstrap.sh delete -c ${CLUSTER_NAME} -p ${PROJECT_ID} --skip-git-ops --benchmark

echo "SUCCESS"
