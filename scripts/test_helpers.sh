#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

bptest_list(){
    pushd /workspace/bootstrap/tests || exit
    go test -list . -local
    popd || exit
}

bptest_run() {
  TEST_NAME=$1
  pushd /workspace/bootstrap/tests || exit
  go test -run "${TEST_NAME}" -project="${PROJECT_ID}" -org="${ORG_ID}" -billing-account="${BILLING_ACCOUNT}" -timeout 0 -test.v -local
  popd || exit
}

bptest_run_all(){
    pushd /workspace/bootstrap/tests || exit
    go test -run '' -project="${PROJECT_ID}" -org="${ORG_ID}" -billing-account="${BILLING_ACCOUNT}" -timeout 0 -test.v -local -failfast
    popd || exit
}

bptest_init(){
    # prereqs
    PROJECT_ID=${1:-${PROJECT_ID}}
    if [[ -z "${PROJECT_ID}" ]]; then
        echo "PROJECT_ID flag nor env var not set"
        exit 1
    elif [[ -z "${BILLING_ACCOUNT}" ]]; then
        echo "BILLING_ACCOUNT env var is not set"
        exit 1
    elif [[ -z "${FOLDER_ID}" ]]; then
        echo "FOLDER_ID env var is not set"
        exit 1
    fi
    if [[ -z "${CLUSTER_NAME}" ]]; then
        echo "CLUSTER_NAME flag nor env var not set. Finding available clusters in ${PROJECT_ID}"
        CLUSTER_NAME=$(gcloud container clusters list --project="${PROJECT_ID}" --format="value(name)" --limit 1 --quiet)
        if [ -z "${CLUSTER_NAME}" ]; then
            echo "Unable to find cluster in ${PROJECT_ID}"
            exit 1
        else
            echo "Found ${CLUSTER_NAME}, generating credentials"
            gcloud container clusters get-credentials "${CLUSTER_NAME}" --project="${PROJECT_ID}"
        fi
    fi
    pushd /workspace/bootstrap/tests || exit
    go get
    popd || exit
}
