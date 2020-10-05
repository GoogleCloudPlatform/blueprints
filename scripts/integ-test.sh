#!/bin/bash
#  expected to be run from yakima/kpt-folder-parent
kpt version  # sanity test

OUTPUT="$(kpt fn run sample/ --enable-exec --exec-path ./bin/main --dry-run)"

# There should be a total of 11 resources:
# 3 pairs of cork CRs
# 2 pairs of RBAC; 1 per namespace x 2 namespaces
# the root folder
TOTAL_RESOURCES="11"
if [ "$(echo "$OUTPUT" | grep -cE ^kind)" != "$TOTAL_RESOURCES" ]
then
	echo "failed	kpt tests failed: insufficient resources generated"
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
