#!/bin/bash
#  expected to be run from yakima/kpt-folder-parent
kpt version  # sanity test

OUTPUT="$(kpt fn eval sample/ --exec ./bin/main --output unwrap --include-meta-resources)"

function fail() {
	echo "---"
	echo "${OUTPUT}"
	echo "---"
	echo "failed	" "$@"
	exit 1
}

# Integration test layout:
# IAMPolicyMember A -> Project A
# IAMPolicyMember B -> Project A
# IAMPolicyMember C -> Project A
# IAMPolicyMember D -> Project C
# Project A
# Project B

# There should be a total of 18 resources:
# 2 Project
# 2 FieldReference
# 4 FutureObject
# 4 Role
# 4 RoleBinding
# 1 setter.yaml (--include-meta-resources)
# 1 Kptfile (--include-meta-resources)
RESOURCES_EXPECTED="18"

if  [[ "$(echo "${OUTPUT}" | grep -cE "^kind: Project$")" != "2" ]]; then
	fail "kpt tests failed: incorrect number of Projects"
fi
if  [[ "$(echo "${OUTPUT}" | grep -cE "^kind: FieldReference$")" != "2" ]]; then
	fail "kpt tests failed: incorrect number of FieldReference"
fi
if  [[ "$(echo "${OUTPUT}" | grep -cE "^kind: FutureObject$")" != "4" ]]; then
	fail "kpt tests failed: incorrect number of FutureObject"
fi
if  [[ "$(echo "${OUTPUT}" | grep -cE "^kind: Role$")" != "4" ]]; then
	fail "kpt tests failed: incorrect number of Role"
fi
if  [[ "$(echo "${OUTPUT}" | grep -cE "^kind: RoleBinding$")" != "4" ]]; then
	fail "kpt tests failed: incorrect number of RoleBinding"
fi

RESOURCES_FOUND="$(echo "${OUTPUT}" | grep -cE ^kind)"
if [[ "${RESOURCES_FOUND}" != "${RESOURCES_EXPECTED}" ]]; then
	fail "kpt tests failed: incorrect number of resources generated: Got ${RESOURCES_FOUND}, Expected: ${RESOURCES_EXPECTED}"
fi

# Expect these strings to be in the output.
# These deterministic fingerprints should not change, unless the resources in the sample change.
EXPECTED=(\
"project-number-ref-project-role-1v6x34y" \
"project-number-ref-project-binding-1v6x34y" \
"project-number-ref-policy-role-oaphlm" \
"project-number-ref-policy-binding-oaphlm" \
"project-number-ref-project-role-129tfqb" \
"project-number-ref-project-binding-129tfqb" \
"project-number-ref-policy-role-vjl8n2" \
"project-number-ref-policy-binding-vjl8n2"\
)

for expect in "${EXPECTED[@]}"; do
	if [[ "$(echo "${OUTPUT}" | grep -c "$expect")" == "0" ]]; then
		fail "kpt tests failed: output missing expected string ["$expect"]"
	fi
done

if [[ "$(echo "${OUTPUT}" | grep -c 'name: project-number-ref-project-role-1v6x34y')" != "2" ]]; then
	fail "kpt tests failed: role and rolebinding should both reference the role"
fi

if [[ "$(echo "${OUTPUT}" | grep -c 'name: project-number-ref-policy-role-oaphlm')" != "2" ]]; then
	fail "kpt tests failed: role and rolebinding should both reference the role"
fi

if [[ "$(echo "${OUTPUT}" | grep -c 'name: project-number-ref-project-role-129tfqb')" != "2" ]]; then
	fail "kpt tests failed: role and rolebinding should both reference the role"
fi

if [[ "$(echo "${OUTPUT}" | grep -c 'name: project-number-ref-policy-role-vjl8n2')" != "2" ]]; then
	fail "kpt tests failed: role and rolebinding should both reference the role"
fi

# All configMap name references should come in pairs
if [[ "$(echo "${OUTPUT}" | grep -A 1 configMapRef | grep name | sort | uniq -u)" != "" ]]; then
	fail "kpt tests failed: there is a unique configMapRef name; FieldRef and Futures are not being paired together"
fi

echo "ok	integration tests passed"
