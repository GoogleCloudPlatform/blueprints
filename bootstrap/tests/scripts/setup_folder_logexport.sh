#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
LOG_EXPORT_TYPE=$2
ORG_ID=$3
FOLDER_NAME=$4

ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

cat > landing-zone/folder.yaml <<EOF
  apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
  kind: Folder
  metadata:
    annotations:
      cnrm.cloud.google.com/organization-id: "${ORG_ID}"
    name: ${FOLDER_NAME}
  spec:
    displayName: Log Export Test Folder
EOF

cp -rf ${ROOT_DIR}/blueprints/log-export/folder/${LOG_EXPORT_TYPE} ./landing-zone/logging/${LOG_EXPORT_TYPE}

if [ "${LOG_EXPORT_TYPE}" == "bigquery-export" ]; then
  kpt cfg set landing-zone/logging/${LOG_EXPORT_TYPE} project-id ${PROJECT_ID} # Only needed for BigQuery
  kpt cfg set landing-zone/logging/${LOG_EXPORT_TYPE} delete-contents-on-destroy true # Only needed for BigQuery
fi

kpt cfg set landing-zone/logging/${LOG_EXPORT_TYPE} folder-k8s-name ${FOLDER_NAME}
kpt cfg set landing-zone/logging/${LOG_EXPORT_TYPE} management-project-id ${PROJECT_ID}
kpt cfg list-setters landing-zone/logging/${LOG_EXPORT_TYPE}

git add -A && git commit -m "Create landing zones folder ${LOG_EXPORT_TYPE} log export" && git push origin main --force
