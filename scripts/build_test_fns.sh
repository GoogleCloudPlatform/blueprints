#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail
ignone_fns=("./functions/hack")
for fn in $(find ./functions -maxdepth 1 -mindepth 1 -type d);do
    # ignore any fn paths in ignone_fns
    if [[ ! ${ignone_fns[*]} =~ ${fn} ]]; then
        echo "working in ${fn}"
        pushd "${fn}"
        make build
        popd
    fi
done
