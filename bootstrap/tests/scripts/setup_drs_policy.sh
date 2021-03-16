#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

ORG_ID=$1
DIRECTORY_CUSTOMER_ID=$(gcloud organizations list --filter "name=organizations/${ORG_ID}" --format "value(owner.directoryCustomerId)")

ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

mkdir -p ./landing-zone/policies/drs
cp -rf ${ROOT_DIR}/blueprints/policies/drs/ ./landing-zone/policies/drs

kpt cfg set landing-zone/policies/drs org-id ${ORG_ID}
kpt cfg set landing-zone/policies/drs customer-ids-to-allow ${DIRECTORY_CUSTOMER_ID}

git add -A && git commit -m "Create drs org policy" && git push origin main --force
