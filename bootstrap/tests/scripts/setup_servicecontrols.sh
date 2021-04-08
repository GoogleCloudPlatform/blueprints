#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail
set -x

ORG_ID=$1
RAND_SUFFIX=$2
PROJECT_ID=$3
VPC_NAME=$4
ACCESS_POLICY_NAME=$5
BILLING_ACCOUNT=$6
TEST_PROJECT_ID=$7
FOLDER_ID=$8
ROOT_DIR=$(dirname "${BASH_SOURCE}")/../../..

# clean up any previous access policy
OLD_POLICY=$(gcloud access-context-manager policies list --organization="${ORG_ID}" --format="value(name)")

if [ -n "${OLD_POLICY}" ]; then
    gcloud beta access-context-manager policies delete ${OLD_POLICY} --quiet
fi
gcloud services enable accesscontextmanager.googleapis.com --project=$TEST_PROJECT_ID

# create a new project for the test
mkdir -p landing-zone/projects
cat > landing-zone/projects/vpcsc-proj.yaml <<EOF
apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Project
metadata:
  annotations:
    cnrm.cloud.google.com/auto-create-network: "false"
  name: ${PROJECT_ID}
  namespace: projects
spec:
  name: ${PROJECT_ID}
  folderRef:
    external: "${FOLDER_ID}"
  billingAccountRef:
    external: ${BILLING_ACCOUNT}
EOF

# allow project factory SA to attach to billing account per https://docs.google.com/document/d/1W4Q4lm8NSsM9LN5lVVZJfeWMubguShwIJ2RpGZ2MCcM/edit#heading=h.fclj5i5qhyda
until PFACTORY_SA="$(kubectl get ConfigConnectorContext -n projects -o jsonpath='{.items[0].spec.googleServiceAccount}' 2> /dev/null)"
do
    echo "Waiting for ConfigConnectorContext..."
    sleep 5
done
gcloud alpha billing accounts add-iam-policy-binding ${BILLING_ACCOUNT} --role=roles/billing.admin --member="serviceAccount:${PFACTORY_SA}"

# setup vpc
mkdir -p landing-zone/network/${VPC_NAME}
cp -rf ${ROOT_DIR}/blueprints/networking/network/vpc/ landing-zone/network/${VPC_NAME}/vpc
kpt cfg set landing-zone/network/${VPC_NAME} network-name ${VPC_NAME} -R
kpt cfg set landing-zone/network/${VPC_NAME} project-id ${PROJECT_ID} -R

# setup access policy
mkdir -p landing-zone/network/shared
cp -rf ${ROOT_DIR}/blueprints/networking/vpc-service-controls/access-policy landing-zone/network/shared/accesspolicy
kpt cfg set landing-zone/network/shared/accesspolicy access-policy-name ${ACCESS_POLICY_NAME}
kpt cfg set landing-zone/network/shared/accesspolicy org-id ${ORG_ID}

# set up perimeter for vpc
cp -rf ${ROOT_DIR}/blueprints/networking/vpc-service-controls/perimeter landing-zone/network/${VPC_NAME}/perimeter
kpt cfg set landing-zone/network/${VPC_NAME}/perimeter perimeter-name ${RAND_SUFFIX}
kpt cfg set landing-zone/network/${VPC_NAME}/perimeter org-id ${ORG_ID}
kpt cfg set landing-zone/network/${VPC_NAME}/perimeter suffix "sharedrestricted"
kpt cfg set landing-zone/network/${VPC_NAME}/perimeter access-policy-name ${ACCESS_POLICY_NAME}
kpt cfg set landing-zone/network/${VPC_NAME}/perimeter project-id ${PROJECT_ID}
kpt cfg annotate landing-zone/network/${VPC_NAME}/perimeter --kv "cnrm.cloud.google.com/deletion-policy=abandon" --kind AccessContextManagerAccessLevel


git add -A && git commit -m "Create landing zones service controls" && git push origin main --force