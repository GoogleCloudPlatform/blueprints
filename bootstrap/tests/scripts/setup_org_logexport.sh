#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
LOG_EXPORT_TYPE=$2
ORG_ID=$3

ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

cp -rf ${ROOT_DIR}/blueprints/log-export/org/${LOG_EXPORT_TYPE} ./landing-zone/logging/${LOG_EXPORT_TYPE}

if [ "${LOG_EXPORT_TYPE}" == "bigquery-export" ]; then
  kpt cfg set landing-zone/logging/${LOG_EXPORT_TYPE} project-id ${PROJECT_ID} # Only needed for BigQuery
  kpt cfg set landing-zone/logging/${LOG_EXPORT_TYPE} delete-contents-on-destroy true # Only needed for BigQuery
fi

kpt cfg set landing-zone/logging/${LOG_EXPORT_TYPE} org-id ${ORG_ID}
kpt cfg set landing-zone/logging/${LOG_EXPORT_TYPE} management-project-id ${PROJECT_ID}
kpt cfg list-setters landing-zone/logging/${LOG_EXPORT_TYPE}

git add -A && git commit -m "Create landing zones organization ${LOG_EXPORT_TYPE} log export" && git push origin main --force
