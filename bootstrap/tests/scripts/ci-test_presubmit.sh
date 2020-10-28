#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID="yakima-eap-testing"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
CLUSTER_NAME="presub-${TIMESTAMP}"
ACP_CLUSTER_NAME="krmapihost-${CLUSTER_NAME}"

if [ -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
fi

gcloud components update
gcloud components install alpha

export ENABLE_KRMAPIHOSTING=false

OLD_CLUSTERS=$(gcloud container clusters list --project ${PROJECT_ID} --format="get(name)")

if [ -n "${OLD_CLUSTERS}" ]; then
  echo "Deleting stale cluster(s): ${OLD_CLUSTERS}"
  gcloud container clusters delete ${OLD_CLUSTERS} --quiet --project ${PROJECT_ID} --region us-central1
fi

$(dirname "$BASH_SOURCE")/../../bootstrap.sh create -c ${CLUSTER_NAME} -p ${PROJECT_ID}
gcloud container clusters describe ${ACP_CLUSTER_NAME} --project ${PROJECT_ID} --region us-central1
$(dirname "$BASH_SOURCE")/../../bootstrap.sh delete -c ${CLUSTER_NAME} -p ${PROJECT_ID}

echo "SUCCESS"
