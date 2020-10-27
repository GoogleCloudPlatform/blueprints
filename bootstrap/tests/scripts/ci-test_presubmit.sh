#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID="blueprints-eap-testing"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
CLUSTER_NAME="yakima-presubmit-${TIMESTAMP}"
ACP_CLUSTER_NAME="krmapihost-${CLUSTER_NAME}"

if [ -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
fi

gcloud components update
gcloud components install alpha

$(dirname "$BASH_SOURCE")/../../bootstrap.sh create -c ${CLUSTER_NAME} -p ${PROJECT_ID}
gcloud container clusters describe ${ACP_CLUSTER_NAME} --project ${PROJECT_ID} --region us-central1
$(dirname "$BASH_SOURCE")/../../bootstrap.sh delete -c ${CLUSTER_NAME} -p ${PROJECT_ID}

echo "SUCCESS"
