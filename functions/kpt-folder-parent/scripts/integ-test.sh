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

# There should be a total of 16 resources:
# 4 Folders, 2 Projects
# 4 Cork References
# 6 RBAC Objects, 1 role and 1 binding for 3 namespaces
TOTAL_RESOURCES="16"

# Expect these strings to be in the output.
# These are three RBAC bindings with a deterministic hash suffix that should not change, unless the resources in sample change.
EXPECTED=("name: folder-ref-binding-1hl814y" \
"folder-ref-binding-g90evd" \
"folder-ref-binding-13tnx6")

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

if [ "$(echo "$OUTPUT" | grep -c FutureObject)" == "4" ] && 
	[ "$(echo "$OUTPUT" | grep -c FieldReference)" == "4" ] &&
	[ "$(echo "$OUTPUT" | grep -c RoleBinding)" == "3" ] &&
	[ "$(echo "$OUTPUT" | grep -cE "^kind: Role")" == "6" ]
then
	echo "ok	kpt tests passed"
	exit 0
fi
echo "failed	kpt tests failed: incorrect resource kind totals"
exit 1
