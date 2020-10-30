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

  kubectl wait --for=condition=READY --timeout="10m" -f ${csr_gitops_blueprint_path}/iam.yaml
  kubectl wait --for=condition=READY --timeout="10m" -f ${csr_gitops_blueprint_path}/source-repositories.yaml
  kubectl wait --for=condition=READY --timeout="10m" -f ${csr_gitops_blueprint_path}/hydration-trigger.yaml
}

# From: https://docs.google.com/document/d/1VeC6cNo5vsD3-niYNZYfWZxsrqGxoKjpfDSY5QLH3a4/edit#
# TODO(b/171985454): Delete this function once ACP push to prod is successful
workarounds() {
  local build_dir=$1
  kubectl delete --wait Deployment bootstrap -n krmapihosting-system --ignore-not-found
  kubectl delete k8sallowedresources restricthumanresourceaccess || true # This might not exist yet
  gsutil cp gs://configconnector-operator/latest/release-bundle.tar.gz ${build_dir}/release-bundle.tar.gz
  tar zxvf ${build_dir}/release-bundle.tar.gz -C ${build_dir}

  local configconnector_output=$(kubectl apply -f ${build_dir}/operator-system/configconnector-operator.yaml 2>&1)
  echo ${configconnector_output}

  while [[ ${configconnector_output} =~ "Internal error occurred: failed calling webhook" ]]
  do
    echo "Retrying to apply config connector operator..."
    configconnector_output=$(kubectl apply -f ${build_dir}/operator-system/configconnector-operator.yaml 2>&1)
    echo ${configconnector_output}
    sleep 5
  done
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

  # TODO(b/171985454): Remove this command once ACP Config Sync is supported and is using latest KCC
  workarounds ${build_dir}

  install_gitops_blueprint ${build_dir}
}

main $@
