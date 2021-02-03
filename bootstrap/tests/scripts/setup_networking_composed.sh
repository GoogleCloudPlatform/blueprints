#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
NETWORK_NAME=$2
NETWORK_NAMESPACE=$3
REGIONAL_PREFIX=$4

ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

# create SVPC host
cp -rf ${ROOT_DIR}/blueprints/networking/shared-vpc landing-zone/network/shared-vpc
kpt cfg set landing-zone/network/shared-vpc project-id ${PROJECT_ID}
kpt cfg list-setters landing-zone/network/shared-vpc

# create vpc and subnet
mkdir -p landing-zone/network/customnet
cp -rf ${ROOT_DIR}/blueprints/networking/network/vpc landing-zone/network/customnet/vpc
cp -rf ${ROOT_DIR}/blueprints/networking/network/subnet landing-zone/network/customnet/subnet
kpt cfg set landing-zone/network/customnet network-name ${NETWORK_NAME} -R
kpt cfg set landing-zone/network/customnet project-id ${PROJECT_ID} -R
# set a custom prefix, cidr range, nat config for subnet
kpt cfg set landing-zone/network/customnet/subnet prefix ${REGIONAL_PREFIX}
kpt cfg set landing-zone/network/customnet/subnet ip-cidr-range 10.3.0.0/16
kpt cfg set landing-zone/network/customnet/subnet source-subnetwork-ip-ranges-to-nat ALL_SUBNETWORKS_ALL_PRIMARY_IP_RANGES

git add -A && git commit -m "Create custom networking" && git push origin main --force
