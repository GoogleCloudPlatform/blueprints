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

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"

BLUEPRINTS_REPO_URL="https://github.com/GoogleCloudPlatform/blueprints"
BLUEPRINT_TITLE_ANNOTATION="blueprints.cloud.google.com/title"
KCC_REF_URL="https://cloud.google.com/config-connector/docs/reference/resource-docs"

PKG_PATH="${1:-.}"

if ! hash jq 2>/dev/null; then
    echo >&2 "Error: jq not found. Please install jq: https://stedolan.github.io/jq/download/"
fi

if ! hash yq 2>/dev/null; then
    echo >&2 "Error: yq not found. Please install yq: https://pypi.org/project/yq/"
fi

function k8s_version() {
    local version_json="$(kubectl version --client=true -o json 2>/dev/null)"
    local major="$(echo "${version_json}" | jq -er '.clientVersion.major')"
    local minor="$(echo "${version_json}" | jq -er '.clientVersion.minor')"
    echo "v${major}.${minor}"
}

K8S_REF_URL="https://kubernetes.io/docs/reference/generated/kubernetes-api/$(k8s_version)" # /#rolebinding-v1-rbac-authorization-k8s-io"

function print_setters_table() {
    local path="${1}"
    local table="$("${SCRIPT_DIR}/kpt-list-setters.sh" --count "${path}")"
    if [[ "$(echo "${table}" | wc -l)" == "1" ]]; then
        echo "This package has no top-level setters. See sub-packages."
        return
    fi
    echo '```'
    echo "${table}"
    echo '```'
}

function print_resources() {
    local expr
    expr+='.'
    expr+=' | .apiVersion + "\t"'
    expr+=' + .kind + "\t"'
    expr+=' + .metadata.name + "\t"'
    expr+=' + .metadata.namespace'

    yq -er "${expr}"
}

function prepend_lines() {
    local prefix="${1}"
    while IFS='' read -r line; do
        echo -en "${prefix}"
        echo "${line}"
    done
}

function print_kpt_fn_config_paths() {
    local path="${1}"
    if [[ ! -f "${path}/Kptfile" ]]; then
        return
    fi

    local expr
    expr+='.'
    expr+=' | select(.pipeline != null) | .pipeline'
    expr+=' | select(. != null) | .[]'
    expr+=' | select(. != null) | .[]'
    expr+=' | select(.configPath != null) | .configPath'

    yq -er "${expr}" "${path}/Kptfile" \
        | sort -u
}

function remove_config_paths() {
    local path="${1}"
    local filepath=""
    local config_paths="$(print_kpt_fn_config_paths "${path}")"

    while IFS='' read -r filepath; do
        while IFS='' read -r config_path; do
            if [[ "${filepath}" == "${config_path}" ]]; then
                # skip this filepath
                # break this loop and continue the parent loop
                continue 2
            fi
        done <<< "${config_paths}"
        echo "${filepath}"
    done
}

function remove_invisible_files() {
    local filepath=""
    while IFS='' read -r filepath; do
        filepath="${filepath#"./"}"
        if [[ "${filepath}" == .* ]]; then
            # whole path is invisible
            continue
        elif [[ "$(basename "${filepath}")" == .* ]]; then
            # file is invisible
            continue
        elif [[ "${filepath}" == */.*/* ]]; then
            # intermediate directory is invisible
            continue
        fi
        echo "${filepath}"
    done
}

function print_relative_subpackages() {
    local path="${1}"
    local filepath=""
    (
        set -o errexit -o nounset -o pipefail
        cd "${path}"
        while IFS='' read -r -d $'\0' filepath; do
            filepath="${filepath#"./"}"
            dirpath="$(dirname "${filepath}")"
            echo "${dirpath}"
        done < <(find . -mindepth 2 -name "Kptfile" -print0)
    )
}

function remove_subpackage_files() {
    local path="${1}"
    local filepath=""
    local subpkg_paths="$(print_relative_subpackages "${path}")"

    while IFS='' read -r filepath; do
        while IFS='' read -r subpkg_path; do
            if [[ "${filepath}" == "${subpkg_path}"/** ]]; then
                # skip this filepath
                # break this loop and continue the parent loop
                continue 2
            fi
        done <<< "${subpkg_paths}"
        echo "${filepath}"
    done
}

# Print the yaml files in this directory. One on each line.
# Recurses into all subdirectories.
# Include:
# - *.yaml
# - *.yml
# - TODO: detect yaml files without suffix (does kpt support these?)
function print_relative_yaml_files() {
    local path="${1}"
    local filepath=""
    (
        set -o errexit -o nounset -o pipefail
        cd "${path}"
        while IFS='' read -r -d $'\0' filepath; do
            echo "${filepath#"./"}"
        done < <(find . \( -name "*.yaml" -o -name "*.yml" \) -print0)
    )
}

# Print the yaml files in this package. One on each line.
# Include:
# - *.yaml
# - *.yml
# - TODO: *.json
# Exclude:
# - Kptfiles
# - Function ConfigPaths
# - Invisible files (starting with a period)
# - TODO: Files listed in .krmignore
function print_kpt_pkg_files() {
    local path="${1}"
    print_relative_yaml_files "${path}" \
        | remove_invisible_files \
        | remove_subpackage_files "${path}" \
        | remove_config_paths "${path}"
}

# Print details about the KRM resources in this package.
function print_resource_table() {
    local path="${1}"
    local filepath=""

    local pkg_files="$(print_kpt_pkg_files "${path}")"
    if [[ -z "${pkg_files}" ]]; then
        echo "This package has no top-level resources. See sub-packages."
        return
    fi

    echo '```'
    (
        set -o errexit -o nounset -o pipefail
        echo -e "File\tAPIVersion\tKind\tName\tNamespace"
        (
            set -o errexit -o nounset -o pipefail
            while IFS='' read -r filepath; do
                cat "${path}/${filepath}" \
                    | print_resources \
                    | prepend_lines "${filepath}\t"
            done <<< "${pkg_files}"
        ) | sort
    ) | column -t | sed 's/[[:space:]]*$//g'
    echo '```'
}

function print_kcc_resource_kinds() {
    local path="${1}"
    local filepath=""

    local pkg_files="$(print_kpt_pkg_files "${path}")"
    if [[ -z "${pkg_files}" ]]; then
        # no files, print nothing
        return
    fi

    (
        set -o errexit -o nounset -o pipefail
        while IFS='' read -r filepath; do
            filepath=${filepath#"./"}
            cat "${path}/${filepath}" | yq -er '. | .apiVersion + "\t" + .kind'
        done <<< "${pkg_files}"
    ) | sort -u
}

function print_subpackage_list() {
    local path="${1}"
    local full_path="$(cd "${path}" && pwd -P)"
    local repo_root=$(git rev-parse --show-toplevel)
    local filepath=""

    local subpkg_kptfiles="$(find "${full_path}" -mindepth 2 -type f -name "Kptfile")"
    if [[ -z "${subpkg_kptfiles}" ]]; then
        echo "This package has no sub-packages."
        return
    fi

    (
        set -o errexit -o nounset -o pipefail
        while IFS='' read -r filepath; do
            filepath="${filepath%"/Kptfile"}"
            echo "- [${filepath#"${full_path}/"}](/${filepath#"${repo_root}/"})"
        done <<< "${subpkg_kptfiles}"
    ) | sort
}

function pkg_title() {
    local path="${1}"
    local name=""
    if [[ -f "${path}/Kptfile" ]]; then
        # package title annotation
        name="$(yq -er ".metadata.annotations[\"${BLUEPRINT_TITLE_ANNOTATION}\"]" "${path}/Kptfile")"
    fi
    if [[ -z "${name}" || "${name}" == "null" ]]; then
        # package name
        name="$(yq -er '.metadata.name' "${path}/Kptfile")"
    fi
    if [[ -z "${name}" || "${name}" == "null" ]]; then
        # directory name
        name=$(cd ${path} && basename "${PWD}")
    fi
    echo "${name}"
}

function pkg_description() {
    local path="${1}"
    local desc=""
    if [[ -f "${path}/Kptfile" ]]; then
        desc="$(yq -er '.info.description' "${path}/Kptfile")"
    fi
    if [[ -z "${desc}" || "${desc}" == "null" ]]; then
        desc="**TODO: add description**"
    fi
    echo "${desc}"
}

function print_resource_link_list() {
    local path="${1}"

    local resource_kinds="$(print_kcc_resource_kinds "${path}")"
    if [[ -z "${resource_kinds}" ]]; then
        echo "This package has no top-level resources. See sub-packages."
        return
    fi

    (
        set -o errexit -o nounset -o pipefail
        while IFS='' read -r line; do
            api_version=$(echo "${line}" | cut -d $'\t' -f 1)
            group=$(echo "${api_version}" | cut -d '/' -f 1)
            group_version=$(echo "${api_version}" | cut -d '/' -f 2)
            kind=$(echo "${line}" | cut -d $'\t' -f 2)

            if [[ "${kind}" == "ConfigConnectorContext" && "${group}" == "core.cnrm.cloud.google.com" ]]; then
                # KCC config. No reference doc yet.
                # https://github.com/GoogleCloudPlatform/k8s-config-connector/issues/344
                echo "- [ConfigConnectorContext](https://cloud.google.com/config-connector/docs/how-to/advanced-install#addon-configuring)"
            elif [[ "${kind}" == "ConfigManagement" && "${group}" == "configmanagement.gke.io" ]]; then
                # ACM Operator config
                echo "- [ConfigManagement](https://cloud.google.com/anthos-config-management/docs/configmanagement-fields)"
            elif [[ "${group}" == *.cnrm.cloud.google.com ]]; then
                # KCC resource
                group_prefix="${group%%.cnrm.cloud.google.com}"
                kind_lower="$(echo "${kind}" | tr '[:upper:]' '[:lower:]')"
                echo "- [${kind}](${KCC_REF_URL}/${group_prefix}/${kind_lower})"
            elif [[ "${group}" == "${api_version}" ]]; then
                # K8s core resource
                kind_lower="$(echo "${kind}" | tr '[:upper:]' '[:lower:]')"
                anchor="${kind_lower}-${api_version}-core"
                echo "- [${kind}](${K8S_REF_URL}/#${anchor})"
            elif [[ "${group}" == *.k8s.io ]]; then
                # K8s resource
                kind_lower="$(echo "${kind}" | tr '[:upper:]' '[:lower:]')"
                anchor="${kind_lower}-${group_version}-$(echo "${group}" | tr '.' '-')"
                echo "- [${kind}](${K8S_REF_URL}/#${anchor})"
            else
                # Other resource type
                echo "- ${kind}"
            fi
        done <<< "${resource_kinds}"
    ) | sort
}

function print_usage() {
    local path="${1}"
    local full_path="$(cd "${path}" && pwd -P)"
    local repo_root=$(git rev-parse --show-toplevel)
    local relative_pkg_path="${full_path#"${repo_root}/"}"
    local config_paths="$(print_kpt_fn_config_paths "${path}")"

    echo "1.  Clone the package:"
    echo '    ```'
    echo "    kpt pkg get ${BLUEPRINTS_REPO_URL}.git/${relative_pkg_path}@\${VERSION}"
    echo '    ```'
    echo '    Replace `${VERSION}` with the desired repo branch or tag'
    echo '    (for example, `main`).'
    echo

    echo "1.  Move into the local package:"
    echo '    ```'
    echo "    cd \"./$(basename ${relative_pkg_path})/\""
    echo '    ```'
    echo

    if [[ -n "${config_paths}" ]]; then
        echo "1.  Edit the function config file(s):"
        echo "${config_paths}" | prepend_lines "    - "
        echo
    fi

    if [[ -f "${path}/Kptfile" ]]; then
        echo "1.  Execute the function pipeline"
        echo '    ```'
        echo "    kpt fn render"
        echo '    ```'
        echo
    fi

    echo "1.  Initialize the resource inventory"
    echo '    ```'
    echo "    kpt live init --namespace "\${NAMESPACE}\"""
    echo '    ```'
    echo '    Replace `${NAMESPACE}` with the namespace in which to manage'
    echo '    the inventory ResourceGroup (for example, `config-control`).'
    echo

    echo "1.  Apply the package resources to your cluster"
    echo '    ```'
    echo "    kpt live apply"
    echo '    ```'
    echo

    echo "1.  Wait for the resources to be ready"
    echo '    ```'
    echo "    kpt live status --output table --poll-until current"
    echo '    ```'
}

echo "# $(pkg_title "${PKG_PATH}")"
echo
echo "$(pkg_description "${PKG_PATH}")"
echo
echo "## Setters"
echo
print_setters_table "${PKG_PATH}"
echo
echo "## Sub-packages"
echo
print_subpackage_list "${PKG_PATH}"
echo
echo "## Resources"
echo
print_resource_table "${PKG_PATH}"
echo
echo "## Resource References"
echo
print_resource_link_list "${PKG_PATH}"
echo
echo "## Usage"
echo
print_usage "${PKG_PATH}"
echo
