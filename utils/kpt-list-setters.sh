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

function list_setters() {
    grep -rho '# kpt-set:.*' "${PKG_PATH}" \
        | sort -u \
        | sed 's/# kpt-set:[[:space:]]*\(.*\)/\1/' \
        | sed 's/[^}]*\${\([^}]*\)}[^$]*/\1\n/g' \
        | sort -u \
        | sed '/^$/d'
}

function list_setters_with_count() {
    (
        echo -e "Setter\tUsages"
        while IFS="" read -r SETTER; do
            COUNT="$(grep -rho "# kpt-set:.*\${${SETTER}}.*" "${PKG_PATH}" | wc -l)"
            echo -n "${SETTER}"
            echo -ne "\t"
            echo "${COUNT}"
        done <<< "$(list_setters)"
    ) | column -t 
}

if [[ "${COUNT_ENABLED}" == "true" ]]; then
    list_setters_with_count
else
    list_setters
fi
