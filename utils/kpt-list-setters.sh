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

# Reads a setters.yaml file and extracts the data keys.
# Assumptions to simplify yaml parsing:
# - file named setter.yaml
# - setter.yaml only contains a ConfigMap
# - data map is at the end of the file
# - setter names are not wrapped in quotes or brackets
function list_setters_yaml() {
    if [[ ! -f "${PKG_PATH}/setters.yaml" ]]; then
        return
    fi
    cat "${PKG_PATH}/setters.yaml" \
        | sed -n '/^data:/,$p' \
        | grep -Eho ' +[^#: ]+:' \
        | sed 's/ *\([^ ]*\):/\1/' \
        | sort -u
}

function list_kpt_set() {
    grep -rho '# kpt-set:.*' "${PKG_PATH}" \
        | sort -u \
        | sed 's/# kpt-set:[[:space:]]*\(.*\)/\1/' \
        | sed 's/[^}]*\${\([^}]*\)}[^$]*/\1\n/g' \
        | sort -u \
        | sed '/^$/d'
}

function list_setters() {
    (
        list_setters_yaml
        list_kpt_set
    ) | sort -u
}

function list_setters_with_count() {
    local setters="$(list_setters)"
    local setter=""
    local count=0
    (
        echo -e "Setter\tUsages"
        if [[ -n "${setters}" ]]; then
            while IFS="" read -r setter; do
                count="$( (grep -rho "# kpt-set:.*\${${setter}}.*" "${PKG_PATH}" || true) | wc -l)"
                echo -n "${setter}"
                echo -ne "\t"
                echo "${count}"
            done <<< "${setters}"
        fi
    ) | column -t | sed 's/[[:space:]]*$//g'
}

if [[ "${COUNT_ENABLED}" == "true" ]]; then
    list_setters_with_count
else
    list_setters
fi
