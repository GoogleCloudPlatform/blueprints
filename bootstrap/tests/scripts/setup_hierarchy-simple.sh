#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

ORG_ID=$1

# before setting up hierarchy make sure previous folders are cleaned up
$(dirname "${BASH_SOURCE}")/tlf_cleanup.sh ${ORG_ID}

ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

mkdir -p ./landing-zone/hierarchy
cp ${ROOT_DIR}/blueprints/hierarchy/simple/hierarchy.yaml ./landing-zone/hierarchy/hierarchy.yaml
cp ${ROOT_DIR}/blueprints/hierarchy/simple/Kptfile ./landing-zone/hierarchy/Kptfile

kpt cfg set landing-zone/hierarchy/ org-id ${ORG_ID}

git add -A && git commit -m "Create landing zones simple hierarchy" && git push origin main --force
