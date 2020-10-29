#!/bin/bash
# Don't run this manually. It generates a commit as a bot identity and pushes it up to the prod CSR.
set -o errexit
set -o nounset
set -o pipefail

PROD_PROJECT="yakima-eap"
PROD_REPO="blueprints"
PROD_BRANCH="main"

# This script assumes it is running in the root of gob/blueprints.
[ -d "./blueprints" ] || { echo "Missing blueprints dir, is this the right env?"; exit 1; }
[ -d "./cloned_csr" ] && { echo "cloned_csr already exists, the logic requires this to be a clean directory"; exit 1; }

gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"

# Clone CSR to "cloned_csr" directory, which better not already exist!
gcloud source repos clone ${PROD_REPO} cloned_csr --project=${PROD_PROJECT}
cd cloned_csr
git config user.name "Blueprints Bot"
git config user.email "yakima-eap-support@google.com"
git checkout ${PROD_BRANCH}
# Delete and replace files, in this way removals and additions alike will propagate.
rm -rf *
cp -r ../blueprints/* ./
git add -A **
git commit -m "$(date -u +%Y-%m-%dT%H) Updates"

git push origin ${PROD_BRANCH}
