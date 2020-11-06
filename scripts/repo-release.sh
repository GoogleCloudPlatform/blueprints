#!/bin/bash
# Don't run this manually. It generates a commit as a bot identity and pushes it up to the prod CSR.
set -o errexit
set -o nounset
set -o pipefail

PROD_PROJECT="yakima-eap"
PROD_REPO="blueprints"
PROD_BRANCH="main"
BW_COMPAT_BRANCH="master"

# This script assumes it is running in the root of gob/blueprints.
[ -d "./blueprints" ] || { echo "Missing blueprints dir, is this the right env?"; exit 1; }
[ -d "./cloned_csr" ] && { echo "cloned_csr already exists, the logic requires this to be a clean directory"; exit 1; }

if [ -n "${GOOGLE_RELEASE_CREDENTIALS:-}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_RELEASE_CREDENTIALS}"
fi

# Clone CSR to "cloned_csr" directory, which better not already exist!
gcloud source repos clone ${PROD_REPO} cloned_csr --project=${PROD_PROJECT}
cd cloned_csr
git config user.name "Blueprints Bot"
git config user.email "yakima-eap-support@google.com"
git checkout ${PROD_BRANCH}
# Delete and replace files, in this way removals and additions alike will propagate.
rm -rf *
cp -r ../blueprints/* ./
mkdir -p bootstrap/csr-git-ops-pipeline
cp ../bootstrap/bootstrap.sh ./bootstrap/bootstrap.sh
cp -r ../bootstrap/csr-git-ops-pipeline/* ./bootstrap/csr-git-ops-pipeline/
# Replace GOB/sso references in readmes to GCP CSR.
find ./ -type f | grep README | xargs sed -i 's/sso:\/\/cnrm\/blueprints.git/https:\/\/source.developers.google.com\/p\/yakima-eap\/r\/blueprints.git/g'
# Create new commit with all changes.
git add -A .
git commit -m "$(date -u +%Y-%m-%dT%H) Updates"

git push origin ${PROD_BRANCH}

# Keep both backwards compatibility and prod branches in-sync.
git checkout ${BW_COMPAT_BRANCH}
git merge ${PROD_BRANCH}
git push origin ${BW_COMPAT_BRANCH}
