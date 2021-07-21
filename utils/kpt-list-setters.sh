#!/usr/bin/env bash

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
    (
        echo -e "Setter\tUsages"
        SETTERS="$(list_setters)"
        if [[ -n "${SETTERS}" ]]; then
            while IFS="" read -r SETTER; do
                COUNT="$((grep -rho "# kpt-set:.*\${${SETTER}}.*" "${PKG_PATH}" || true) | wc -l)"
                echo -n "${SETTER}"
                echo -ne "\t"
                echo "${COUNT}"
            done <<< "${SETTERS}"
        fi
    ) | column -t 
}

if [[ "${COUNT_ENABLED}" == "true" ]]; then
    list_setters_with_count
else
    list_setters
fi
