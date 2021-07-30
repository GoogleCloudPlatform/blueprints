#!/usr/bin/env bash
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

set -o errexit -o nounset -o pipefail

PKG_PATH="${1:-.}"

CATALOG_PATH="catalog"
BLUEPRINT_TOOL="cnrm"
BLUEPRINT_ANNOTATION="cnrm.cloud.google.com/blueprint"

KPT_VERSION="$(kpt version)"
if [[ "${KPT_VERSION}" != "1."* || "${KPT_VERSION}" == "1.0.0-beta.1" || "${KPT_VERSION}" == "1.0.0-alpha"* ]]; then
    echo >&2 "Error: requires kpt verion of at least 1.0.0-beta.2"
    exit 2
fi

function print_catalog_path() {
    local path="${1}"
    if [[ ! -f "${path}/Kptfile" ]]; then
        echo >&2 "Error: no Kptfile in package path: ${path}"
        return 2
    fi
    local full_path="$(cd "${path}" && pwd -P)"
    local repo_root="$(cd "${full_path}" && git rev-parse --show-toplevel)"
    local prefix="${repo_root}/${CATALOG_PATH}/"
    if [[ "${full_path}" != "${prefix}"* ]]; then
        echo >&2 "Error: package not in catalog: ${path}"
        return 2
    fi
    local relative_path="${full_path#"${prefix}"}"
    echo "${relative_path}"
}

function print_repo_version() {
    local path="${1}"
    echo "$(cd "${path}" && git describe --abbrev=0)"
}

BLUEPRINT_NAME="${BLUEPRINT_NAME:-$(print_catalog_path "${PKG_PATH}")}"
BLUEPRINT_VERSION="${BLUEPRINT_VERSION:-$(print_repo_version "${PKG_PATH}")}"
BLUEPRINT_ATTRIBTUION="${BLUEPRINT_TOOL}/${BLUEPRINT_NAME}/${BLUEPRINT_VERSION}"

kpt fn eval "${PKG_PATH}" --image gcr.io/kpt-fn/set-annotation:v0.1 -- "${BLUEPRINT_ANNOTATION}=${BLUEPRINT_ATTRIBTUION}"
