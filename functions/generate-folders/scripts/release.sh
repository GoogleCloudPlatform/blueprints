#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail
SHORT_SHA="$(git rev-parse --short=7 HEAD)"
PROJECT_ID=yakima-eap
IMG=gcr.io/${PROJECT_ID}/generate-folders:latest
REPO_ROOT=$(dirname "${BASH_SOURCE}")/..
cd ${REPO_ROOT}

gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
gcloud auth configure-docker
gcloud config set core/project ${PROJECT_ID}

docker build . -t ${IMG} -f build/generate_folders.Dockerfile
docker push ${IMG}
