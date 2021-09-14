#! /bin/bash
# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -o errexit
set -o pipefail

# krmt_run_all runs all tests
krmt_run_all(){
    pushd test/integration
    go test ./... -v -timeout 0 -p=1
}

# krmt prepares container for test execution by generating kubeconfig and getting dependencies.
krmt(){
    # prereqs
    PROJECT_ID=${1:-${PROJECT_ID}}
    if [[ -z "${PROJECT_ID}" ]]; then
        echo "PROJECT_ID flag nor env var not set"
        exit 1
    elif [[ -z "${BILLING_ACCOUNT}" ]]; then
        echo "BILLING_ACCOUNT env var is not set"
        exit 1
    elif [[ -z "${FOLDER_ID}" ]]; then
        echo "FOLDER_ID env var is not set"
        exit 1
    fi
    if [[ -z "${CLUSTER_NAME}" ]]; then
        echo "CC_NAME env var not set. Finding first available cluster in ${PROJECT_ID}"
        CLUSTER_NAME=$(gcloud alpha anthos config controller list --location=us-central1 --project="${PROJECT_ID}" --format="value(name)" --limit 1 --quiet | cut -d/ -f6)
        if [ -z "${CLUSTER_NAME}" ]; then
            echo "Unable to find cluster in ${PROJECT_ID}"
            exit 1
        else
            echo "Found ${CLUSTER_NAME}, generating credentials"
            gcloud alpha anthos config controller get-credentials "${CLUSTER_NAME}" --project="${PROJECT_ID}" --location us-central1
        fi
    fi

    # jump to test dir
    pushd test/integration 
    # godeps
    go get -t ./...
    # git config
    git config --global user.email "blueprints-ci-test@google.com"
    git config --global user.name "BlueprintsTest"
    popd
}

# create_project creates a project with a default network.
create_project(){
    if [[ -z "${BILLING_ACCOUNT}" ]]; then
        echo "BILLING_ACCOUNT env var is not set"
        exit 1
    elif [[ -z "${FOLDER_ID}" ]]; then
        echo "FOLDER_ID env var is not set"
        exit 1
    fi
    if [[ -z "${CREATE_PROJECT_ID}" ]]; then
        PROJECT_ID=ci-blueprints-${RANDOM}
        echo "CREATE_PROJECT_ID env var is not set, creating random project-id ${PROJECT_ID}"
    else
        echo "Creating ${CREATE_PROJECT_ID}"
        PROJECT_ID=${CREATE_PROJECT_ID}
    fi

    gcloud projects create ${PROJECT_ID} --folder="${FOLDER_ID}" --quiet
    gcloud beta billing projects link ${PROJECT_ID} --billing-account="${BILLING_ACCOUNT}" --quiet
    gcloud services enable compute.googleapis.com  --project=$PROJECT_ID --quiet
    HAS_DEFAULT_NETWORK=$(gcloud compute networks list --filter="name=default" --format="value(name)" --project=$PROJECT_ID)
    if [[ -z "${HAS_DEFAULT_NETWORK}" ]]; then
        echo "Default network not found. Creating default network."
        gcloud compute networks create default --subnet-mode=auto --project=$PROJECT_ID --quiet
    fi
}

# create_cc creates a config controller cluster.
create_cc(){
    PROJECT_ID=${1:-${PROJECT_ID}}
    if [[ -z "${PROJECT_ID}" ]]; then
        echo "PROJECT_ID flag nor env var not set"
        exit 1
    fi

    CC_NAME="${CC_NAME:-testcc}"
    echo "Creating Config Controller ${CC_NAME} in ${PROJECT_ID}"
    echo "Enabling services"
    gcloud services enable krmapihosting.googleapis.com container.googleapis.com cloudresourcemanager.googleapis.com --project=$PROJECT_ID
    echo "Creating CC"
    gcloud alpha anthos config controller create ${CC_NAME} --location=us-central1 --project=$PROJECT_ID
    gcloud alpha anthos config controller get-credentials ${CC_NAME} --location us-central1 --project=$PROJECT_ID
    echo "Configuring CC"
    export SA_EMAIL="$(kubectl get ConfigConnectorContext -n config-control \
        -o jsonpath='{.items[0].spec.googleServiceAccount}' 2> /dev/null)"
    gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
        --member "serviceAccount:${SA_EMAIL}" \
        --role "roles/owner" \
        --project "${PROJECT_ID}"
}
