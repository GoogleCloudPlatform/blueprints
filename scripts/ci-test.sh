#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail
REPO_ROOT=$(dirname "${BASH_SOURCE}")/..
cd "${REPO_ROOT}"

# kpt is a dependency for testing
gcloud components update
gcloud components install kpt

make test
