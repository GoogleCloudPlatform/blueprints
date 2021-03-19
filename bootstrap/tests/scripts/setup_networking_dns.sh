#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
NETWORK_NAME=$2
NETWORK_NAMESPACE=$3
ORG_ID=$4

ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

# create base vpc
mkdir -p landing-zone/network/dnsnet
cp -rf ${ROOT_DIR}/blueprints/networking/network/vpc landing-zone/network/dnsnet

# create vpc for dns peering
mkdir -p landing-zone/network/dnsnetpeer
cp -rf ${ROOT_DIR}/blueprints/networking/network/vpc landing-zone/network/dnsnetpeer
rm -rf landing-zone/network/dnsnetpeer/vpc/services.yaml

# create private managedzones
cp -rf ${ROOT_DIR}/blueprints/networking/dns/managedzone-private landing-zone/network/dnsnet/mz-priv
kpt cfg set landing-zone/network/dnsnet/mz-priv managed-zone-name "${NETWORK_NAME}-mz-private"

# create DNS Policy
cp -rf ${ROOT_DIR}/blueprints/networking/dns/policy landing-zone/network/dnsnet/policy
kpt cfg set landing-zone/network/dnsnet/policy dns-policy-name "${NETWORK_NAME}-policy"

# create recordset in the private managed zone
cp -rf ${ROOT_DIR}/blueprints/networking/dns/recordset landing-zone/network/dnsnet/mz-priv/rs
kpt cfg set landing-zone/network/dnsnet/mz-priv/rs managed-zone-name "${NETWORK_NAME}-mz-private"
kpt cfg set landing-zone/network/dnsnet/mz-priv/rs record-set-name "${NETWORK_NAME}-mz-rs"
kpt cfg set landing-zone/network/dnsnet/mz-priv/rs records 199.36.153.4 199.36.153.5 199.36.153.6 199.36.153.7
kpt cfg set landing-zone/network/dnsnet/mz-priv/rs name "foo."
kpt cfg set landing-zone/network/dnsnet/mz-priv domain "example.com." -R

# create forwarding managedzones
cp -rf ${ROOT_DIR}/blueprints/networking/dns/managedzone-forwarding landing-zone/network/dnsnet/mz-fwd
kpt cfg set landing-zone/network/dnsnet/mz-fwd managed-zone-name "${NETWORK_NAME}-mz-fwd"
kpt cfg set landing-zone/network/dnsnet/mz-fwd domain "foo.com."
rm -rf landing-zone/network/dnsnet/mz-fwd/services.yaml

# create peered managedzones
cp -rf ${ROOT_DIR}/blueprints/networking/dns/managedzone-peering landing-zone/network/dnsnet/mz-peer
kpt cfg set landing-zone/network/dnsnet/mz-peer domain "bar.com."
kpt cfg set landing-zone/network/dnsnet/mz-peer managed-zone-name "${NETWORK_NAME}-mz-peer"
kpt cfg set landing-zone/network/dnsnet/mz-peer peered-network-name "${NETWORK_NAME}-peer"
rm -rf landing-zone/network/dnsnet/mz-peer/services.yaml

# set all network names
kpt cfg set landing-zone/network/dnsnet network-name ${NETWORK_NAME} -R
kpt cfg set landing-zone/network/dnsnet project-id ${PROJECT_ID} -R
kpt cfg set landing-zone/network/dnsnetpeer network-name "${NETWORK_NAME}-peer" -R
kpt cfg set landing-zone/network/dnsnetpeer project-id ${PROJECT_ID} -R

git add -A && git commit -m "Create custom dns" && git push origin main --force
