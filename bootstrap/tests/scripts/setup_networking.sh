#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
NETWORK_NAME=$2
NETWORK_NAMESPACE=$3

ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

# Pre-emptively create namespace so that secret needed by blueprint can be created in advance
kubectl create namespace ${NETWORK_NAMESPACE} || true
kubectl create secret generic vpn-shared-secret --from-literal=vpn-shared-secret="1234567890" -n ${NETWORK_NAMESPACE} || true

cp -rf ${ROOT_DIR}/blueprints/networking/shared-vpc  landing-zone/network/shared-vpc
kpt cfg set landing-zone/network/shared-vpc project-id ${PROJECT_ID}
kpt cfg list-setters landing-zone/network/shared-vpc

cp -rf ${ROOT_DIR}/blueprints/networking/network landing-zone/network/dev
kpt cfg set landing-zone/network/dev network-name ${NETWORK_NAME}
kpt cfg set landing-zone/network/dev project-id ${PROJECT_ID}
kpt cfg list-setters landing-zone/network

git add -A && git commit -m "Create landing zones networking" && git push origin main --force
