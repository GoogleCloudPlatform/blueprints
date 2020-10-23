#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail
SOURCE_DIR=$(dirname "${BASH_SOURCE}")

PROJECT_ID="blueprints-integ-yakima"

gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
gcloud components install pkg

./${SOURCE_DIR}/ci-test-hierarchy-bu.sh
./${SOURCE_DIR}/ci-test-hierarchy-env_bu.sh
./${SOURCE_DIR}/ci-test-hierarchy-simple.sh
./${SOURCE_DIR}/ci-test-hierarchy-team.sh

echo "SUCCESS: All tests passed"
