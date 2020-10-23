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

# TODO(jcwc): Move this logic into a go function and parallelize Yakima teardown w/ multithreading
teardown_existing_yakimas() {
  local old_cluster=$(gcloud container clusters list --project ${PROJECT_ID} --format="get(name)" | head -n 1)
  while [[ ! -z ${old_cluster} ]]; do
    gcloud container clusters delete ${old_cluster} --quiet --project ${PROJECT_ID} --region ${CLUSTER_REGION}
    old_cluster=$(gcloud container clusters list --project ${PROJECT_ID} --format="get(name)" | head -n 1)
  done

  gcloud source repos delete ${SOURCE_REPO} --project ${PROJECT_ID} --quiet 2>/dev/null || true
  gcloud source repos delete ${DEPLOYMENT_REPO} --project ${PROJECT_ID} --quiet 2>/dev/null || true
  gcloud alpha builds triggers delete ${CLOUDBUILD_TRIGGER_NAME} --project ${PROJECT_ID} --quiet 2>/dev/null || true
}

install_gitops_blueprint() {
  local build_dir=$1
  local csr_gitops_blueprint_path=${build_dir}/csr-git-ops-pipeline

  rm -rf ${csr_gitops_blueprint_path}
  mkdir -p ${build_dir}
  kpt pkg get sso://cnrm/blueprints.git/blueprints/git-ops/csr-git-ops-pipeline@master ${build_dir}

  kpt cfg set ${csr_gitops_blueprint_path} namespace "yakima-system"
  kpt cfg set ${csr_gitops_blueprint_path} project-id "${PROJECT_ID}"
  kpt cfg set ${csr_gitops_blueprint_path} project-number "$(gcloud projects describe ${PROJECT_ID} --format='get(projectNumber)')"
  kpt cfg set ${csr_gitops_blueprint_path} cluster-name "${ACP_CLUSTER_NAME}"

  kpt cfg set ${csr_gitops_blueprint_path} source-repo "${SOURCE_REPO}"
  kpt cfg set ${csr_gitops_blueprint_path} deployment-repo "${DEPLOYMENT_REPO}"

  kpt cfg list-setters ${csr_gitops_blueprint_path}

  kubectl apply --wait -f ${csr_gitops_blueprint_path}

  kubectl wait --for=condition=READY --timeout="10m" -f ${csr_gitops_blueprint_path}
  kubectl wait --for=condition=READY --timeout="10m" -f ${csr_gitops_blueprint_path}
  kubectl wait --for=condition=READY --timeout="10m" -f ${csr_gitops_blueprint_path}
}

workarounds() {
  local build_dir=$1
  kubectl delete --wait Deployment bootstrap -n krmapihosting-system --ignore-not-found
  gsutil cp gs://configconnector-operator/latest/release-bundle.tar.gz ${build_dir}/release-bundle.tar.gz
  tar zxvf ${build_dir}/release-bundle.tar.gz -C ${build_dir}
  kubectl apply -f ${build_dir}/operator-system/configconnector-operator.yaml
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

  # TODO(jcwc): Remove this command once ACP Config Sync is supported and KCC is using latest
  workarounds ${build_dir}

  install_gitops_blueprint ${build_dir}
}

main $@
