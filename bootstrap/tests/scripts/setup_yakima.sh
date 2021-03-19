#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID=$1
CLUSTER_NAME=$2
CLUSTER_REGION=$3
SOURCE_REPO=$4
DEPLOYMENT_REPO=$5
CLOUDBUILD_TRIGGER_NAME="yakima-source-repo-cicd-trigger"

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

main() {
  echo "Setting up Yakima..."
  cd $(dirname "${BASH_SOURCE}")/..
  local test_dir=$(pwd)
  local build_dir=${test_dir}/build
  rm -rf ${build_dir}/*
  mkdir -p ${build_dir}


  teardown_existing_yakimas
  ${test_dir}/../bootstrap.sh create -c ${CLUSTER_NAME} -p ${PROJECT_ID} -d ${DEPLOYMENT_REPO} -s ${SOURCE_REPO} --benchmark
  # Give Yakima SA org admin permissions per http://go/landing-zone-user-guide#heading=h.uy5ctyzfekh0
  CNRM_SA="$(kubectl get ConfigConnectorContext -n yakima-system -o jsonpath='{.items[0].spec.googleServiceAccount}')"
  ORG_ID=$(gcloud projects get-ancestors ${PROJECT_ID} --format='get(id)' | tail -1)
  gcloud organizations add-iam-policy-binding $ORG_ID --role=roles/resourcemanager.organizationAdmin --member="serviceAccount:${CNRM_SA}"
  # ACM can OOM during build, this patch increases mem limit
  # b/182570433 b/183159948 workaround via go/acm-support-playbook:memory
  kubectl patch ConfigManagement config-management --patch "$(cat scripts/acm-patch.yaml)" --type=merge
}

main $@
