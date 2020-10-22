#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

ROOT_DIR="$(dirname "${BASH_SOURCE}")"
source ${ROOT_DIR}/hierarchy-helpers.sh
source ${ROOT_DIR}/helpers.sh

teardown
setup
create_hierarchy "bu" && sleep 5
verify_cloudbuild_success ${SOURCE_REPO_PATH} ${PROJECT_ID}
# Note, this doesn't cover the whole hierarchy. Just a sample set
verify_kubernetes_resources ${SOURCE_REPO_PATH} ${PROJECT_ID} 600 hierarchy folders \
  retail risk-management financial commercial \
  retail.shared risk-management.web financial.data-and-analysis commercial.ctrl-service \
  retail.apps.dev risk-management.core-service.prod
teardown

echo "SUCCESS"
