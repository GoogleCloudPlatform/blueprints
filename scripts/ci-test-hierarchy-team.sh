#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

ROOT_DIR="$(dirname "${BASH_SOURCE}")"
source ${ROOT_DIR}/hierarchy-helpers.sh
source ${ROOT_DIR}/helpers.sh

teardown
setup
create_hierarchy "team" && sleep 5
verify_cloudbuild_success ${SOURCE_REPO_PATH} ${PROJECT_ID}
verify_kubernetes_resources ${SOURCE_REPO_PATH} ${PROJECT_ID} 300 hierarchy folders \
  retail finance \
  retail.dev retail.prod retail.qa finance.dev finance.prod finance.qa
teardown

echo "SUCCESS"
