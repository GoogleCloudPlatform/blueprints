#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
ORG_ID=$2
BILLING_ACCOUNT_ID=$3


(git show-branch main &>/dev/null) && (git checkout main) || (git checkout -b main)

rm -rf * # Remove everything for a clean start for Landing Zone blueprint
kpt pkg get sso://cnrm/blueprints.git/blueprints/landing-zone@master ./landing-zone/

kpt cfg set landing-zone billing-account-id ${BILLING_ACCOUNT_ID}
kpt cfg set landing-zone management-project-id ${PROJECT_ID}
kpt cfg set landing-zone org-id ${ORG_ID}

kpt cfg list-setters landing-zone

git add -A && git commit -m "Teardown resources" --allow-empty && git push origin main --force
