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

set -o errexit
set -o pipefail

check_addlicense(){
    addlicenseInPath=$(which addlicense) || true
    # todo: bake into devtool image
    PATH=$PATH:$(go env GOPATH)/bin
    if [[ -z "$addlicenseInPath" ]]; then
        echo "addlicense not in path, attempting to install"
        go get -u github.com/google/addlicense
    fi
}

check_license(){
    echo "Check license headers"
    check_addlicense
    local errcode=1
    addlicense -check . && errcode=$? || errcode=$?
    if [[ $errcode -ne 0 ]]; then
        echo "Files listed above have incorrect headers. Please run make docker_fix_lint and review changes."
        exit $errcode
    else
        echo "All files have correct headers"
    fi
}

check_yaml_fmt(){
    echo "Check yaml format"
    # copy catalog to tmpDir
    tmpDir=$(mktemp -d)
    cp -R catalog "$tmpDir"
    catalogTmpDir="$tmpDir/catalog"
    # format tmpDir blueprints
    # todo: switch to kpt v1 after v1 branch merged
    kpt fn eval "$catalogTmpDir" --image gcr.io/kpt-fn/format:unstable > /dev/null
    local diffExitCode=1
    # check if both formatted and current are same
    diff -qr catalog "$catalogTmpDir" && diffExitCode=$? || diffExitCode=$?
    if [[ $diffExitCode -ne 0 ]]; then
        echo "Unformatted yaml files found in catalog. Please run make docker_fix_lint and review changes."
        exit $diffExitCode
    else
        echo "All yaml files in catalog are formatted."
    fi
    # shellcheck disable=SC2064
    trap "rm -rf $tmpDir" EXIT
}

fix_license(){
    echo "Fix license headers"
    check_addlicense
    addlicense .
}

fix_yaml_fmt(){
    echo "Fix yaml format"
    kpt fn eval catalog --image gcr.io/kpt-fn/format:unstable
}

check_lint(){
    check_license
    check_yaml_fmt
}

fix_lint(){
    fix_license
    fix_yaml_fmt
}
