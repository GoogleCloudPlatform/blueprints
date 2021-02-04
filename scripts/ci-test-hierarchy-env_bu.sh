#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

ROOT_DIR="$(dirname "${BASH_SOURCE}")"
source ${ROOT_DIR}/hierarchy-helpers.sh
source ${ROOT_DIR}/helpers.sh

teardown
setup
create_hierarchy "env-bu" && sleep 5
verify_cloudbuild_success ${SOURCE_REPO_PATH} ${PROJECT_ID}
# Note, this doesn't cover the whole hierarchy. Just a sample set
verify_kubernetes_resources ${SOURCE_REPO_PATH} ${PROJECT_ID} 300 hierarchy folders \
  dev prod \
  dev.retail dev.finance prod.retail prod.finance \
  dev.retail.apps dev.retail.data-and-analysis prod.finance.commercial prod.finance.retail
teardown

echo "SUCCESS"
