#!/bin/bash
#  expected to be run from yakima/kpt-folder-parent
kpt version  # sanity test

OUTPUT="$(kpt fn run sample/ --enable-exec --exec-path ./bin/main --dry-run)"

# There should be a total of 11 resources:
# 3 pairs of cork CRs
# 2 pairs of RBAC; 1 per namespace x 2 namespaces
# the root folder
TOTAL_RESOURCES="11"

# Expect these strings to be in the output.
# These are two RBAC bindings with a deterministic hash suffix that should not change, unless the resources in sample change.
EXPECTED=("name: folder-ref-binding-1m8f2xj" \
"folder-ref-binding-g90evd")

for expect in "${EXPECTED[@]}"; do
	if [ "$(echo "$OUTPUT" | grep -c "$expect")" == "0" ]; then
		echo "failed	kpt tests failed: output missing expected string ["$expect"]"
		exit 1
	fi
done

if [ "$(echo "$OUTPUT" | grep -cE ^kind)" != "$TOTAL_RESOURCES" ]
then
	echo "failed	kpt tests failed: insufficient resources generated"
	exit 1
fi

if [ "$(echo "$OUTPUT" | grep -c 'name: folder-ref-role-g90evd')" != "2" ]
then
	echo "failed	kpt tests failed: should have role and binding yaml both reference role"
	exit 1
fi

if [ "$(echo "$OUTPUT" | grep -c FutureObject)" == "3" ] && 
	[ "$(echo "$OUTPUT" | grep -c FieldReference)" == "3" ] &&
	[ "$(echo "$OUTPUT" | grep -c RoleBinding)" == "2" ] &&
	[ "$(echo "$OUTPUT" | grep -cE "^kind: Role")" == "4" ]
then
	echo "ok	kpt tests passed"
	exit 0
fi
echo "failed	kpt tests failed: incorrect resource kind totals"
exit 1
