#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

# You can choose which blueprint to test by finding the go test name of the
# particular blueprint implemented. For example "TestNetworking" for networking_test.go
# To run all tests, you can pass an empty string: ''
GO_TEST_NAME=$1

# Only run this if in prow w/ GOOGLE_APPLICATION_CREDENTIALS
if [ -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
fi

gcloud components update --quiet
gcloud components install pkg --quiet
gcloud components install alpha --quiet

cd $(dirname "${BASH_SOURCE}")/..

go test -run ${GO_TEST_NAME} -timeout 0
