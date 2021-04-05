#!/bin/bash
#  expected to be run from yakima/kpt-folder-parent
kpt version  # sanity test

# Run function with full sample input and specific config inputs
OUTPUT="$(kpt fn run sample/ --enable-exec --exec-path ./bin/main --dry-run -- namespace=example disable-on-destroy=false)"

function fail() {
	echo "---"
	echo "${OUTPUT}"
	echo "---"
	echo -e "failed	" "$@"
	exit 1
}

function expectNOfKind() {
	if  [[ "$(echo "${OUTPUT}" | grep -cE "^kind: $2$")" != "$1" ]]; then
		fail "kpt tests failed: incorrect number of $2"
	fi
}

expectNOfKind 1 ContainerCluster
expectNOfKind 1 ComputeNetwork
expectNOfKind 1 ComputeSubnetwork
expectNOfKind 2 Project
expectNOfKind 1 SpannerInstance
expectNOfKind 1 SpannerDatabase
expectNOfKind 4 Service

function expectResouceCount() {
	RESOURCES_EXPECTED=${1}
	RESOURCES_FOUND="$(echo "${OUTPUT}" | grep -cE ^kind)"
	if [[ "${RESOURCES_FOUND}" != "${RESOURCES_EXPECTED}" ]]; then
		fail "kpt tests failed: incorrect number of resources generated: Got ${RESOURCES_FOUND}, Expected: ${RESOURCES_EXPECTED}"
	fi
}

expectResouceCount "11"

function expectService() {
	local name=$1
	local namespace=$2
	local projectID=$3
	local resourceID=$4
	local serviceYaml
	read -r -d '' serviceYaml << EOF
apiVersion: serviceusage.cnrm.cloud.google.com/v1beta1
kind: Service
metadata:
  name: ${name}
  namespace: ${namespace}
  annotations:
    cnrm.cloud.google.com/disable-on-destroy: "false"
    cnrm.cloud.google.com/project-id: ${projectID}
    config.kubernetes.io/path: '${namespace}/service_${name}.yaml'
spec:
  resourceID: ${resourceID}
EOF
	# merge each resource into a single line to compare & count with grep
	if [[ "$(echo "${OUTPUT}" | tr -d '\n' | sed 's/---/\n/g' | grep -c "$(echo "${serviceYaml}" | tr -d '\n')")" != "1" ]]; then
		fail "kpt tests failed: output missing expected service:\n${serviceYaml}"
	fi
}

# expectService "${project-id}-${short-resource-id}" "${namespace}" "${project-id}" "${resource-id}"
expectService "service-project-id-container" "example" "service-project-id" "container.googleapis.com"
expectService "service-project-id-spanner" "example" "service-project-id" "spanner.googleapis.com"
expectService "host-project-id-compute" "example" "host-project-id" "compute.googleapis.com"
expectService "projects-cloudresourcemanager" "example" "projects" "cloudresourcemanager.googleapis.com"

# Run function with partial sample input and default config
OUTPUT="$(kpt fn run sample/cluster.yaml --enable-exec --exec-path ./bin/main --dry-run)"

function expectServiceDefault() {
	local name=$1
	local namespace=$2
	local projectID=$3
	local resourceID=$4
	local serviceYaml
	read -r -d '' serviceYaml << EOF
apiVersion: serviceusage.cnrm.cloud.google.com/v1beta1
kind: Service
metadata:
  name: ${name}
  namespace: ${namespace}
  annotations:
    cnrm.cloud.google.com/project-id: ${projectID}
    config.kubernetes.io/path: '${namespace}/service_${name}.yaml'
spec:
  resourceID: ${resourceID}
EOF
	# merge each resource into a single line to compare & count with grep
	if [[ "$(echo "${OUTPUT}" | tr -d '\n' | sed 's/---/\n/g' | grep -c "$(echo "${serviceYaml}" | tr -d '\n')")" != "1" ]]; then
		fail "kpt tests failed: output missing expected service:\n${serviceYaml}"
	fi
}

expectNOfKind 1 ContainerCluster
expectNOfKind 1 Service

expectResouceCount "2"

expectServiceDefault "service-project-id-container" "gcp-services" "service-project-id" "container.googleapis.com"

echo "ok	integration tests passed"
