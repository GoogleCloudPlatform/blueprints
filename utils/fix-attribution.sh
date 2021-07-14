#!/bin/bash
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

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "${REPO_ROOT}"

COLOR_RED='\033[0;31m'
COLOR_NONE='\033[0m'

function handle_dir() {
    local parent_path="${1}"
    local parent_name="${2:-}"
    for child_path in "${parent_path}"/*; do
        local child_name=""
        if [[ -d "${child_path}" ]]; then
            # Attribute parents before children so that package names are as specific as possible
            if [[ -f "${child_path}/Kptfile" ]]; then
                kptfile_version="$(grep -m 1 "apiVersion:" "${child_path}/Kptfile" | sed 's/[[:space:]]*apiVersion:[[:space:]]*//')"
                child_name="$(grep -m 1 "name:" "${child_path}/Kptfile" | sed 's/[[:space:]]*name:[[:space:]]*//')"
                if [[ -n "${parent_name}" ]]; then
                    child_name="${parent_name}:${child_name}"
                fi
                
                if [[ "${kptfile_version}" == "kpt.dev/v1alpha1" ]]; then
                    echo -en "Processing:\t"
                    echo -n "${child_path}"
                    echo -en "\t"
                    echo "(name: ${child_name})"
                    BLUEPRINT_NAME="${child_name}" utils/add-attribution.sh "${child_path}"
                else
                    echo -en "Skipping:\t"
                    echo -n "${child_path}"
                    echo -en "\t${COLOR_RED}"
                    echo -n "(Unsupported apiVersion: ${kptfile_version})"
                    echo -e "${COLOR_NONE}"
                fi
            fi
            if [[ -n "${child_name}" ]]; then
                handle_dir "${child_path}" "${child_name}"
            elif [[ -n "${parent_name}" ]]; then
                handle_dir "${child_path}" "${parent_name}"
            else
                handle_dir "${child_path}"
            fi
        fi
    done
}

handle_dir "catalog"
