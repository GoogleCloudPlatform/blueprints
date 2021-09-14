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

if ! hash jq 2>/dev/null; then
    echo >&2 "Error: jq not found. Please install jq: https://stedolan.github.io/jq/download/"
fi

if ! hash yq 2>/dev/null; then
    echo >&2 "Error: yq not found. Please install yq: https://pypi.org/project/yq/"
fi

COUNT_ENABLED="false"
ARGS=()
while [[ $# -gt 0 ]]; do
  key="${1}"

  case "${key}" in
    -c|--count)
      COUNT_ENABLED="true"
      shift
      ;;
    *)
      ARGS+=("$1")
      shift
      ;;
  esac
done

set -- "${ARGS[@]}" # restore args

if [[ $# -gt 1 ]]; then
    echo >&2 "error: expected 1 argument, found $#"
fi

PKG_PATH="${1:-.}"

function print_apply_setters_configpaths() {
    local path="${1}"
    if [[ ! -f "${path}/Kptfile" ]]; then
        return
    fi

    local expr
    expr+='.'
    expr+=' | select(.pipeline != null) | .pipeline'
    expr+=' | select(. != null) | .[]'
    expr+=' | select(. != null) | .[]'
    expr+=' | select(.image | test("gcr.io/kpt-fn/apply-setters(:.*)?$"))'
    expr+=' | select(.configPath != null) | .configPath'

    yq -er "${expr}" "${path}/Kptfile" \
        | sort -u
}

function print_apply_setters_configpath_data_fields() {
    local path="${1}"
    local config_paths="$(print_apply_setters_configpaths ${path})"
    if [[ -z "${config_paths}" ]]; then
        return
    fi

    (
        set -o errexit -o nounset -o pipefail
        while IFS='' read -r config_path; do
            if [[ -f "${PKG_PATH}/${config_path}" ]]; then
                if ! yq -er ".data | keys[]" "${PKG_PATH}/${config_path}"; then
                    echo >&2 "Error: failed to parse apply-setters configPath file: ${PKG_PATH}/${config_path}"
                    exit 2
                fi
            fi
        done <<< "${config_paths}"
    ) | sort -u
}

function print_apply_setters_configmap_fields() {
    local path="${1}"
    if [[ ! -f "${path}/Kptfile" ]]; then
        return
    fi

    local expr
    expr+='.'
    expr+=' | select(.pipeline != null) | .pipeline'
    expr+=' | select(. != null) | .[]'
    expr+=' | select(. != null) | .[]'
    expr+=' | select(.image | test("gcr.io/kpt-fn/apply-setters(:.*)?$"))'
    expr+=' | select(.configMap != null) | .configMap'

    local configMaps="$(yq -er "${expr}" "${path}/Kptfile")"
    if [[ -z "${configMaps}" ]]; then
        return
    fi

    echo "${configMaps}" | yq -er "keys[]" | sort -u
}

function print_apply_setters_fields() {
    local path="${1}"
    (
        set -o errexit -o nounset -o pipefail
        print_apply_setters_configmap_fields "${path}"
        print_apply_setters_configpath_data_fields "${path}"
    ) | sort -u
}

function print_kpt_set_vars() {
    local path="${1}"
    grep -rho '# kpt-set:.*' "${path}" \
        | sort -u \
        | sed 's/# kpt-set:[[:space:]]*\(.*\)/\1/' \
        | sed 's/[^}]*\${\([^}]*\)}[^$]*/\1\n/g' \
        | sort -u \
        | sed '/^$/d'
}

function print_setters() {
    local path="${1}"
    (
        set -o errexit -o nounset -o pipefail
        print_kpt_set_vars "${path}"
        print_apply_setters_fields "${path}"
    ) | sort -u
}

function count_setter_usages() {
    local path="${1}"
    local setter="${2}"
    (
        set -o errexit -o nounset -o pipefail
        grep -rho "# kpt-set:.*\${${setter}}.*" "${path}" || true
    ) | wc -l
}

function print_setters_with_count() {
    local path="${1}"
    local setters="$(print_setters "${path}")"
    local setter=""
    local count=0
    (
        set -o errexit -o nounset -o pipefail
        echo -e "Setter\tUsages"
        if [[ -n "${setters}" ]]; then
            while IFS="" read -r setter; do
                echo -n "${setter}"
                echo -ne "\t"
                echo "$(count_setter_usages "${path}" "${setter}")"
            done <<< "${setters}"
        fi
    ) | column -t | sed 's/[[:space:]]*$//g'
}

if [[ "${COUNT_ENABLED}" == "true" ]]; then
    print_setters_with_count "${PKG_PATH}"
else
    print_setters "${PKG_PATH}"
fi
