#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
CLUSTER_NAME=$2

cd $(dirname "${BASH_SOURCE}")/..
test_dir=$(pwd)

kubectl delete --wait -f ${test_dir}/../csr-git-ops-pipeline/
${test_dir}/../bootstrap.sh delete -c ${CLUSTER_NAME} -p ${PROJECT_ID} --benchmark
