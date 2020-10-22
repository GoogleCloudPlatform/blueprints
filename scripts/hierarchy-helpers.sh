#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

ROOT_DIR="$(dirname "${BASH_SOURCE}")"
source ${ROOT_DIR}/helpers.sh

export SOURCE_REPO="yakima-source-repo"
export PROJECT_ID="blueprints-integ-yakima"
export SOURCE_REPO_PATH="$(pwd)/${SOURCE_REPO}"

teardown() {
  local prev_dir="$(pwd)"
  rm -rf ${SOURCE_REPO_PATH}
  gcloud source repos clone ${SOURCE_REPO} --project ${PROJECT_ID}
  cd ${SOURCE_REPO_PATH}

  (git show-branch main &>/dev/null) && (git checkout main) || (git checkout -b main)
  rm -rf *
  cp -r ../blueprints/landing-zone .
  kpt cfg set landing-zone billing-account-id 019970-D6BDB5-6AF850
  kpt cfg set landing-zone management-project-id blueprints-integ-yakima
  kpt cfg set landing-zone org-id 98363893875

  git add -A && git commit -m "Remove hierarchy" && git push origin main --force && sleep 5
  verify_cloudbuild_success ${SOURCE_REPO_PATH} ${PROJECT_ID}

  cd ${prev_dir}
  rm -rf ${SOURCE_REPO_PATH}
}

setup() {
  gcloud components update --quiet
  gcloud components install pkg --quiet
}

create_hierarchy() {
  local hierarchy_type=$1
  local prev_dir="$(pwd)"

  gcloud source repos clone ${SOURCE_REPO} --project ${PROJECT_ID}
  cd ${SOURCE_REPO_PATH}
  rm -rf *
  pwd
  ls
  cp -r ../blueprints/landing-zone .
  mkdir -p landing-zone/hierarchy
  cp -r ../blueprints/hierarchy/${hierarchy_type}/* landing-zone/hierarchy
  kpt cfg list-setters landing-zone

  kpt cfg set landing-zone billing-account-id 019970-D6BDB5-6AF850
  kpt cfg set landing-zone management-project-id blueprints-integ-yakima
  kpt cfg set landing-zone org-id 98363893875

  # TODO(jcwc): Remove this line once kpt is updated to update composite package setters
  kpt cfg set landing-zone/hierarchy org-id 98363893875

  (git show-branch main &>/dev/null) && (git checkout main) || (git checkout -b main)
  git add -A && git commit -m "Create landing zones hierarchy" && git push origin main --force
  cd ${prev_dir}
}
