#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
$(dirname "${BASH_SOURCE}")/run_blueprints_test.sh $@
