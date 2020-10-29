#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

# To run all tests:
# ./ci-test_periodic.sh

# To run a single test:
# ./ci-test_periodic.sh TestNetworking # Name of go test function

# Only run this if in prow w/ GOOGLE_APPLICATION_CREDENTIALS
if [ -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
fi

gcloud components update --quiet
gcloud components install pkg --quiet
gcloud components install alpha --quiet

cd $(dirname "${BASH_SOURCE}")/..

if [ -z "${1:-}" ]; then
  go test ./... -timeout 0
else
  go test -run ${1} -timeout 0
fi
