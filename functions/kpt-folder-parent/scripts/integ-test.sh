#!/bin/bash
#  expected to be run from yakima/kpt-folder-parent
kpt version  # sanity test

OUTPUT="$(kpt fn run sample/ --enable-exec --exec-path ./bin/main --dry-run)"

# TODO(b/172476714): Split out the test cases and general refactor

# Integration test layout:
# folder-a (ns 1)
# |- folder-b (ns 1)
# |  |- project-c (ns 1)
# |- folder-c (ns 2)
# 
# folder-d (ns 3)
# |- project-d (ns 1)
# |- project-e (ns 1)
#
# outer-folder (other-ns -- not defined in sample)
# |- project-ref-other (ns 1)

# There should be a total of 18 resources:
# 4 Folders, 4 Projects
# 6 Cork References
# 8 RBAC Objects, 1 role and 1 binding for 4 namespaces
TOTAL_RESOURCES="22"

# Expect these strings to be in the output.
# These are three RBAC bindings with a deterministic hash suffix that should not change, unless the resources in sample change.
EXPECTED=("folder-ref-binding-edd7ym" \
"folder-ref-binding-g90evd" \
"folder-ref-binding-f7vffq" \
"folder-ref-binding-1ip8jcq") # 1ip8jcq is expected for other-ns, a hash composed of the referring and referred objects (see TestDeterminismForIntegration)

for expect in "${EXPECTED[@]}"; do
	if [ "$(echo "$OUTPUT" | grep -c "$expect")" == "0" ]; then
		echo "failed	kpt tests failed: output missing expected string ["$expect"]"
		exit 1
	fi
done

if [ "$(echo "$OUTPUT" | grep -cE ^kind)" != "$TOTAL_RESOURCES" ]
then
	echo "failed	kpt tests failed: incorrect number of resources generated"
	echo "Got $(echo "$OUTPUT" | grep -cE ^kind) resources, expected ${TOTAL_RESOURCES}"
	exit 1
fi

if [ "$(echo "$OUTPUT" | grep -c 'name: folder-ref-role-g90evd')" != "2" ]
then
	echo "failed	kpt tests failed: should have role and binding yaml both reference role"
	exit 1
fi

# All configMap name references should come in pairs
if [ "$(echo "$OUTPUT" | grep -A 1 configMapRef | grep name | sort | uniq -u)" != "" ]
then
	echo "failed	kpt tests failed: there is a unique configMapRef name; FieldRef and Futures are not being paired together"
	exit 1
fi

if [ "$(echo "$OUTPUT" | grep -c FutureObject)" == "6" ] && 
	[ "$(echo "$OUTPUT" | grep -c FieldReference)" == "6" ] &&
	[ "$(echo "$OUTPUT" | grep -c RoleBinding)" == "4" ] &&
	[ "$(echo "$OUTPUT" | grep -cE "^kind: Role")" == "8" ]
then
	echo "ok	kpt tests passed"
	exit 0
fi
echo "failed	kpt tests failed: incorrect resource kind totals"
exit 1
