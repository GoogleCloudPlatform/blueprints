#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail
SHORT_SHA="$(git rev-parse --short=7 HEAD)"
PROJECT_ID=yakima-eap
REPO_ROOT=$(dirname "${BASH_SOURCE}")/..
cd ${REPO_ROOT}

# GOOGLE_APPLICATION_CREDENTIALS is provided by prow
gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
gcloud auth configure-docker
gcloud config set core/project ${PROJECT_ID}
gcloud components update
gcloud components install kpt

make test
make docker-release
