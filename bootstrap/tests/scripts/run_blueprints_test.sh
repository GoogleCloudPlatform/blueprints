#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

# To run all tests:
# ./run_blueprints_test.sh

# To run a single test:
# ./run_blueprints_test.sh TestNetworking # Name of go test function

# Only run this if in prow w/ GOOGLE_APPLICATION_CREDENTIALS
if [ -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
fi

gcloud components update --quiet
gcloud components install pkg --quiet
gcloud components install alpha --quiet

cd $(dirname "${BASH_SOURCE}")/.. # Goes to bootstrap/tests directory

if [ -z "${1:-}" ]; then
  go test ./... -timeout 0 -test.v
else
  go test -run ${1} -timeout 0 -test.v
fi
