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


# Get the Config Controller Component Versions

set -o errexit -o nounset -o pipefail

function parse_image_tag() {
    cut -d':' -f2
}

function acp_version() {
    kubectl get deployments -n krmapihosting-system bootstrap -o jsonpath='{.spec.template.spec.containers[].image}{"\n"}' | parse_image_tag
}

function config_sync_version() {
    kubectl get deployment git-importer -n config-management-system -o jsonpath='{.spec.template.spec.containers[].image}{"\n"}' | parse_image_tag
}

function gatekeeper_version() {
    kubectl get deployment gatekeeper-controller-manager -n gatekeeper-system -o jsonpath='{.spec.template.spec.containers[].image}{"\n"}' | parse_image_tag
}

function config_connector_version() {
    kubectl get ns cnrm-system -o jsonpath='{.metadata.annotations.cnrm\.cloud\.google\.com/version}{"\n"}'
}

function is_cork_installed() {
    kubectl get deployment orchestrator-controller-manager -n orchestrator-system >/dev/null 2>&1
}

function cork_version() {
    kubectl get deployment orchestrator-controller-manager -n orchestrator-system -o jsonpath='{.spec.template.spec.containers[].image}{"\n"}' | parse_image_tag
}

echo "Config Controller: $(acp_version)"
echo "ConfigSync: $(config_sync_version)"
echo "Gatekeeper: $(gatekeeper_version)"
echo "Config Connector: $(config_connector_version)"
if is_cork_installed; then
    echo "Cork: $(cork_version)"
else
    echo "Cork: N/A"
fi
