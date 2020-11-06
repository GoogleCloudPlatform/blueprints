#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

if [ -n "${GOOGLE_TEST_CREDENTIALS}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_TEST_CREDENTIALS}"
elif [ -n "${GOOGLE_APPLICATION_CREDENTIALS}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
fi

$(dirname "${BASH_SOURCE}")/run_blueprints_test.sh $@
