#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

# check if project id passed or in env
PROJECT_ID=${1:-${PROJECT_ID}}
if [[ -z "${PROJECT_ID}" ]]; then
    echo "PROJECT_ID flag nor env var not set"
    exit 1
fi
pushd bootstrap/tests
go run main.go -setup -project "${PROJECT_ID}"
popd
