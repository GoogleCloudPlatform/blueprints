#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

# prereqs
if [[ -z "${BILLING_ACCOUNT}" ]]; then
    echo "BILLING_ACCOUNT env var is not set"
    exit 1
elif [[ -z "${FOLDER_ID}" ]]; then
    echo "FOLDER_ID env var is not set"
    exit 1
fi

PROJECT_ID=ci-blueprints-${RANDOM}
gcloud projects create ${PROJECT_ID} --folder="${FOLDER_ID}" --quiet
gcloud beta billing projects link ${PROJECT_ID} --billing-account="${BILLING_ACCOUNT}" --quiet
gcloud services enable compute.googleapis.com  --project=$PROJECT_ID --quiet
HAS_DEFAULT_NETWORK=$(gcloud compute networks list --filter="name=default" --format="value(name)" --project=$PROJECT_ID)
if [[ -z "${HAS_DEFAULT_NETWORK}" ]]; then
    echo "Default network not found. Creating default network."
    gcloud compute networks create default --subnet-mode=auto --project=$PROJECT_ID --quiet
fi
echo "export PROJECT_ID=${PROJECT_ID}"
