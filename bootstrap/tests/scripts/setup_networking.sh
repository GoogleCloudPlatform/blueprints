#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
SOURCE_REPO=$2
NAMESPACE=$3
NETWORK_NAME=$4
NETWORK_NAMESPACE=$5
ORG_ID=$6
BILLING_ACCOUNT_ID=$7

ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

(git show-branch main &>/dev/null) && (git checkout main) || (git checkout -b main)

rm -rf * # Remove everything for a clean start for Landing Zone blueprint

# Pre-emptively create namespace so that secret needed by blueprint can be created in advance
kubectl create namespace ${NETWORK_NAMESPACE} || true
kubectl create secret generic vpn-shared-secret --from-literal=vpn-shared-secret="1234567890" -n ${NETWORK_NAMESPACE} || true

cp -rf ${ROOT_DIR}/blueprints/landing-zone .
cp -rf ${ROOT_DIR}/blueprints/networking/shared-vpc@master  landing-zone/network/shared-vpc
cp -rf ${ROOT_DIR}/blueprints/networking/network@master  landing-zone/network/dev

kpt cfg set landing-zone billing-account-id ${BILLING_ACCOUNT_ID}
kpt cfg set landing-zone management-project-id ${PROJECT_ID}
kpt cfg set landing-zone org-id ${ORG_ID}

kpt cfg set landing-zone/network/shared-vpc project-id ${PROJECT_ID}

kpt cfg list-setters landing-zone/network/shared-vpc

kpt cfg set landing-zone/network/dev network-name ${NETWORK_NAME}
kpt cfg set landing-zone/network/dev project-id ${PROJECT_ID}

kpt cfg list-setters landing-zone/network

git add -A && git commit -m "Create landing zones hierarchy" && git push origin main --force
touch Kptfile && git add -A && git commit -m "Second commit triggers trigger" && git push origin main # TODO(b/165011580)
