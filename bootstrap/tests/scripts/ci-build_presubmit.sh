#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

cd $(dirname "${BASH_SOURCE}")/..
go test -c

echo "Build success"
