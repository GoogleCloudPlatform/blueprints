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

check_readmes(){
    echo "Check Readme generation"
    # copy catalog to tmpDir
    # tmpDir has to be a path on host as dockerd could be mounted in dev container
    tmpDirInWorkspace=".tmp"
    rm -rf ${tmpDirInWorkspace}
    mkdir -p ${tmpDirInWorkspace}
    cp -R catalog "$tmpDirInWorkspace"
    catalogTmpDir="$tmpDirInWorkspace/catalog"
    # generate tmpDir blueprint readmes
    fix_readmes ${catalogTmpDir} ${tmpDirInWorkspace} > /dev/null
    local diffExitCode=1
    # check if both generated and current are same
    diff -qr catalog "$catalogTmpDir" && diffExitCode=$? || diffExitCode=$?
    if [[ $diffExitCode -ne 0 ]]; then
        echo "Incorrect readme files found in catalog. Please run make docker_fix_lint and review changes."
        exit $diffExitCode
    else
        echo "All readmes in the catalog are generated correctly."
    fi
    # shellcheck disable=SC2064
    trap "rm -rf $tmpDirInWorkspace" ERR EXIT
}

function fix_readmes() {
    local parent="${1}"
    local tmpPrefix="${2}"
    while IFS='' read -r -d $'\0' child; do
        child=${child#"./"}
        if [[ "$(basename "${child}")" == .* ]]; then
            # invisible dir
            continue
        fi
        if [[ -f "${child}/Kptfile" ]]; then
            # kpt package
            echo "Generating ${child}/README.md"
            pkgName=$(basename $child)
            # if DOCKER_HOST_PATH dockderd socket mounted
            if [[ -z "${DOCKER_HOST_PATH-}" ]]; then
                MOUNT_PATH="$(pwd)/${child}"
            else 
                MOUNT_PATH="${DOCKER_HOST_PATH}/${child}"
            fi
            # if tmpPrefix is set, adjust repoPath to trim tmpPrefix
            repoPath=$parent
            if [[ ! -z "${tmpPrefix}" ]];then
                repoPath="${parent#$tmpPrefix/}"
            fi
            kpt fn eval -i gcr.io/kpt-fn-contrib/generate-kpt-pkg-docs@sha256:046b57ae98fc7c0ae35713fcf50d8d0c2c34fcd1d576dec516ac075cc9f8d519 ${child} --as-current-user --mount type=bind,src="${MOUNT_PATH}",dst=/tmp,rw=true -- readme-path=/tmp/README.md repo-path="https://github.com/GoogleCloudPlatform/blueprints.git/${repoPath}/" pkg-name="${pkgName}"
        fi
        fix_readmes "${child}" "${tmpPrefix}"
    done < <(find "${parent}" -mindepth 1 -maxdepth 1 -type d -print0)
}

function init_schema_check(){
    # create temp dir
    tmpDirInWorkspace=".tmp"
    rm -rf "${tmpDirInWorkspace}"
    mkdir -p "${tmpDirInWorkspace}"
    cp -R catalog "$tmpDirInWorkspace"
    cp -R examples "$tmpDirInWorkspace"

    # re create kind cluster
    kind delete cluster --name yaml-validator-cluster
    kind create cluster --name yaml-validator-cluster --retain || kind export logs --name yaml-validator-cluster $ARTIFACTS
 
    # create namespaces used in blueprints
    for ns in config-control \
            hierarchy \
            logging \
            networking \
            projects \
            firewalls-namespace \
            namespace \
            platform-namespace \
            my-namespace \
            policies;
        # create via apply so we dont error out if already exists
        do kubectl create namespace "${ns}" --dry-run=client -o yaml | kubectl apply -f - ; 
    done

    # clone and apply KCC CRDs
    crdTmpDir="$tmpDirInWorkspace/kcc"
    git clone --depth 1 --branch v1.80.0 https://github.com/GoogleCloudPlatform/k8s-config-connector.git "${crdTmpDir}"
    kubectl apply -f "${crdTmpDir}/crds"

    # schema check
    check_schema "$tmpDirInWorkspace/catalog"
    check_schema "$tmpDirInWorkspace/examples"

    # cleanup
    # shellcheck disable=SC2064
    trap "rm -rf $tmpDirInWorkspace && kind delete cluster --name yaml-validator-cluster" ERR EXIT
}

function check_schema() {
    local parent="${1}"
    while IFS='' read -r -d $'\0' child; do
        child=${child#"./"}
        if [[ "$(basename "${child}")" == .* ]]; then
            # invisible dir
            continue
        fi
        if [[ -f "${child}/Kptfile" ]]; then
            echo "working in ${child}"
            # mark certain CRs as local resources which are not available in kind
            for kind in ConfigConnectorContext \
                GCPEnforceNamingV2 \
                ConfigManagement \
                RootSync \
                ConstraintTemplate \
                GCPRequireDeletionPolicy; do
              # run in context of ${child} package as we may have duplicate GVKNN resources
              kpt fn eval "${child}" --image gcr.io/kpt-fn/set-annotations:unstable --match-kind "${kind}" -- config.kubernetes.io/local-config="true" &> /dev/null
            done

            kpt live init "${child}" &> /dev/null
            kptOp=$(kpt live apply "${child}" --dry-run --server-side --install-resource-group --output json)
            passed=$(echo "${kptOp}" | jq 'select(.type == "summary")' | jq 'if .failed == 0 then true else false end')
            if $passed; then
              echo "${child} passed"
            else
              echo "${child} failed"
              echo "${kptOp}" | jq
              exit 1
            fi
        fi
        check_schema "${child}"
    done < <(find "${parent}" -mindepth 1 -maxdepth 1 -type d -print0)
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
    check_readmes
    init_schema_check
}

fix_lint(){
    REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
    cd "${REPO_ROOT}"
    fix_license
    fix_yaml_fmt
    fix_readmes "catalog"
}
