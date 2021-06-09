#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

PROJECT_ID="yakima-eap-testing"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
CLUSTER_NAME="presub-${TIMESTAMP}"
SOURCE_REPO_NAME="source-repo-${TIMESTAMP}"
DEPLOYMENT_REPO_NAME="deployment-repo-${TIMESTAMP}"
ACP_CLUSTER_NAME="krmapihost-${CLUSTER_NAME}"

while [[ $# -gt 0 ]]
do
  arg="$1"
  case "${arg}" in
    -p|--project)
      PROJECT_ID="$2"
      shift # Remove argument name from processing
      shift # Remove argument value from processing
      ;;
    *)
      echo >&2 "Invalid command line parameter: ${arg}"
      exit 1
  esac
done

if [ -n "${GOOGLE_TEST_CREDENTIALS:-}" ]; then
  gcloud auth activate-service-account --key-file "${GOOGLE_TEST_CREDENTIALS}"
fi

gcloud components update --quiet
gcloud components install pkg --quiet
gcloud components install alpha --quiet

export ENABLE_KRMAPIHOSTING=false


OLD_CLUSTERS=$(gcloud container clusters list --project ${PROJECT_ID} --format="get(name)")
# both sourcerepo and cloudbuild maybe disabled during a successful teardown
if [ -n "$(gcloud services list --enabled --project="${PROJECT_ID}" --format="get(config.name)" --filter="config.name=sourcerepo.googleapis.com")" ]; then
  OLD_REPOS=$(gcloud source repos list --project="${PROJECT_ID}" --format="get(name)")
fi

if [ -n "$(gcloud services list --enabled --project="${PROJECT_ID}" --format="get(config.name)" --filter="config.name=cloudbuild.googleapis.com")" ]; then
  OLD_TRIGGERS=$(gcloud beta builds triggers list --project="${PROJECT_ID}" --format="get(name)")
fi

OLD_CONFIG_SYNC_SA=$(gcloud iam service-accounts list --project="${PROJECT_ID}" --format="get(email)" --filter="config-sync-sa")

if [ -n "${OLD_CLUSTERS}" ]; then
  echo "Deleting stale cluster(s): ${OLD_CLUSTERS}"
  gcloud container clusters delete ${OLD_CLUSTERS} --quiet --project ${PROJECT_ID} --region us-central1
fi

if [ -n "${OLD_REPOS-}" ]; then
for REPO in ${OLD_REPOS[@]}; do
  echo "Deleting stale repo: ${REPO}"
  gcloud source repos delete ${REPO} --project="${PROJECT_ID}" --quiet
  done
fi

if [ -n "${OLD_TRIGGERS-}" ]; then
for TRIGGER in ${OLD_TRIGGERS[@]}; do
  echo "Deleting stale trigger: ${TRIGGER}"
  gcloud beta builds triggers delete ${TRIGGER} --project="${PROJECT_ID}" --quiet
  done
fi

if [ -n "${OLD_CONFIG_SYNC_SA}" ]; then
for SA in ${OLD_CONFIG_SYNC_SA[@]}; do
  echo "Deleting stale config-sync sa: ${SA}"
  gcloud iam service-accounts delete ${SA} --project="${PROJECT_ID}" --quiet
  done
fi

$(dirname "$BASH_SOURCE")/../../bootstrap.sh create -c ${CLUSTER_NAME} -d ${DEPLOYMENT_REPO_NAME} -s ${SOURCE_REPO_NAME}  -p ${PROJECT_ID} --benchmark

gcloud container clusters describe ${ACP_CLUSTER_NAME} --project ${PROJECT_ID} --region us-central1
# get info about deployed bundle components (https://cnrm.git.corp.google.com/platform/+/refs/heads/main/scripts/acp-version.sh)
echo "ACP: $(kubectl get deployments -n krmapihosting-system -o jsonpath='{..image}{"\n"}' | cut -d':' -f2)"
echo "ConfigSync: $(kubectl get deployment git-importer -n config-management-system -o jsonpath='{.spec.template.spec.containers[].image}{"\n"}' | cut -d':' -f2)"
echo "Gatekeeper: $(kubectl get deployment gatekeeper-controller-manager -n gatekeeper-system -o jsonpath='{.spec.template.spec.containers[].image}{"\n"}' | cut -d':' -f2)"
echo "KCC: $(kubectl get ns cnrm-system -o jsonpath='{.metadata.annotations.cnrm\.cloud\.google\.com/version}{"\n"}')"

$(dirname "$BASH_SOURCE")/../../bootstrap.sh delete -c ${CLUSTER_NAME} -d ${DEPLOYMENT_REPO_NAME} -s ${SOURCE_REPO_NAME} -p ${PROJECT_ID} --benchmark

echo "SUCCESS"
