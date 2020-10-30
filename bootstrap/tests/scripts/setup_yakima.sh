#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
CLUSTER_NAME=$2
CLUSTER_REGION=$3
SOURCE_REPO=$4
DEPLOYMENT_REPO="yakima-deployment-repo"
CLOUDBUILD_TRIGGER_NAME="yakima-source-repo-cicd-trigger"

ACP_CLUSTER_NAME="krmapihost-${CLUSTER_NAME}"
CLUSTER_REGION="us-central1"

teardown_existing_yakimas() {
  local old_clusters=$(gcloud container clusters list --project ${PROJECT_ID} --format="get(name)")

  if [ -n "${old_clusters}" ]; then
    gcloud container clusters delete ${old_clusters} --quiet --project ${PROJECT_ID} --region ${CLUSTER_REGION}
  fi

  echo "Attempting to delete old repos and triggers (to avoid conflicting resources)"
  echo "You may see some 404 errors; these are fine..."
  gcloud source repos delete ${SOURCE_REPO} --project ${PROJECT_ID} --quiet || true
  gcloud source repos delete ${DEPLOYMENT_REPO} --project ${PROJECT_ID} --quiet || true
  gcloud alpha builds triggers delete ${CLOUDBUILD_TRIGGER_NAME} --project ${PROJECT_ID} --quiet || true
}

install_gitops_blueprint() {
  local build_dir=$1
  local csr_gitops_blueprint_path=${build_dir}/csr-git-ops-pipeline

  rm -rf ${csr_gitops_blueprint_path}
  mkdir -p ${build_dir}
  cp -rf $(dirname "${BASH_SOURCE}")/../../../blueprints/git-ops/csr-git-ops-pipeline ${csr_gitops_blueprint_path}

  kpt cfg set ${csr_gitops_blueprint_path} namespace "yakima-system"
  kpt cfg set ${csr_gitops_blueprint_path} project-id "${PROJECT_ID}"
  kpt cfg set ${csr_gitops_blueprint_path} project-number "$(gcloud projects describe ${PROJECT_ID} --format='get(projectNumber)')"
  kpt cfg set ${csr_gitops_blueprint_path} cluster-name "${ACP_CLUSTER_NAME}"

  kpt cfg set ${csr_gitops_blueprint_path} source-repo "${SOURCE_REPO}"
  kpt cfg set ${csr_gitops_blueprint_path} deployment-repo "${DEPLOYMENT_REPO}"

  kpt cfg list-setters ${csr_gitops_blueprint_path}

  kubectl apply --wait -f ${csr_gitops_blueprint_path}

  kubectl wait --for=condition=READY --timeout="30m" -f ${csr_gitops_blueprint_path}/source-repositories.yaml
  kubectl wait --for=condition=READY --timeout="30m" -f ${csr_gitops_blueprint_path}/hydration-trigger.yaml
  kubectl wait --for=condition=READY --timeout="30m" -f ${csr_gitops_blueprint_path}/iam.yaml
}

main() {
  echo "Setting up Yakima..."
  cd $(dirname "${BASH_SOURCE}")/..
  local test_dir=$(pwd)
  local build_dir=${test_dir}/build
  rm -rf ${build_dir}/*
  mkdir -p ${build_dir}


  teardown_existing_yakimas
  ${test_dir}/../bootstrap.sh create -c ${CLUSTER_NAME} -p ${PROJECT_ID}

  install_gitops_blueprint ${build_dir}
}

main $@
