#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
CLUSTER_NAME=$2

cd $(dirname "${BASH_SOURCE}")/..
kubectl delete --wait -f build/csr-git-ops-pipeline/
../bootstrap.sh delete -c ${CLUSTER_NAME} -p ${PROJECT_ID}
