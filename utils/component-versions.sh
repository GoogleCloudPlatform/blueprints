#!/usr/bin/env bash

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
