#!/usr/bin/env bash

# Generate ServiceMap YAML from directory of Config Connector ServiceMapping YAML.

set -o errexit -o nounset -o pipefail

FUNC_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "${FUNC_ROOT}"

CNRM_PATH="${CNRM_PATH:-./cnrm}"
SERVICE_MAPPINGS_PATH="config/servicemappings"

mkdir -p "${CNRM_PATH}"
cd "${CNRM_PATH}"

REPO_ROOT=$(git rev-parse --show-toplevel)
if [[ "${REPO_ROOT}" != "${PWD}" ]]; then
    # Not at the root of a git repo
    echo "CNRM not found."

    echo "CorpSSO login required. Checking gcertstatus..."
    if ! gcertstatus -check_remaining=1m > /dev/null; then
        echo "CorpSSO login expired. Running gcert..."
        gcert
    else
        echo "CorpSSO login valid."
    fi

    echo "Cloning CNRM Repo..."
    git clone sso://cnrm/cnrm .
fi

echo "Reading ServiceMappings: ${PWD}/${SERVICE_MAPPINGS_PATH}"
cd "./${SERVICE_MAPPINGS_PATH}"

DATA="{"

for FILE in *.yaml; do
    YAML="$(< "${FILE}")"
    RESOURCE_GROUP=$(echo "${YAML}" | yq -er ".metadata.name")
    #RESOURCE_VERSION=$(echo "${YAML}" | yq -er ".metadata.version")
    SERVICE_HOSTNAME=$(echo "${YAML}" | yq -er ".spec.serviceHostName")

    # For each element in .spec.resources, map KIND.GROUP to an Array of Service Hostnames
    while read -r LINE; do
        # trim wrapping curly braces and append comma
        # Syntax requires bash 4.2+
        DATA+="${LINE:1:-1},"
        #echo "${LINE:1:-1}"
    done <<< "$(echo "${YAML}" | yq -erc ".spec.resources[] | { (.kind + \".${RESOURCE_GROUP}\"): [ \"${SERVICE_HOSTNAME}\" ] } | .")"
done

# trim trailing comma
DATA="${DATA::-1}"
DATA+="}"

echo "Writing ServiceMap: ${FUNC_ROOT}/service-map.yaml"
echo "${DATA}" \
    | yq -ery '{ apiVersion: "blueprints.cloud.google.com/v1alpha1", kind: "ServiceMap", metadata: { name: "service-map" }, data: . }' \
    > "${FUNC_ROOT}/service-map.yaml"

chmod a+r "${FUNC_ROOT}/service-map.yaml"
