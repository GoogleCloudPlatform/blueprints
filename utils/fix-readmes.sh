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

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "${REPO_ROOT}"

PKG_PATH="${1:-catalog}"

function fix_readmes() {
    local parent="${1}"
    while IFS='' read -r -d $'\0' child; do
        child=${child#"./"}
        if [[ "$(basename "${child}")" == .* ]]; then
            # invisible dir
            continue
        fi
        if [[ -f "${child}/Kptfile" ]]; then
            # kpt package
            echo "Generating ${child}/README.md"
            pushd ${child}
             pkgName=$(basename $child)
             kpt fn eval -i gcr.io/kpt-fn-contrib/generate-kpt-pkg-docs@sha256:046b57ae98fc7c0ae35713fcf50d8d0c2c34fcd1d576dec516ac075cc9f8d519 --include-meta-resources --mount type=bind,src="$(pwd)",dst=/tmp,rw=true -- readme-path=/tmp/README.md repo-path="https://github.com/GoogleCloudPlatform/blueprints.git/${parent}/" pkg-name="${pkgName}"
            popd
        fi
        fix_readmes "${child}"
    done < <(find "${parent}" -mindepth 1 -maxdepth 1 -type d -print0)
}

fix_readmes "${PKG_PATH}"
