#!/bin/bash
#  expected to be run from yakima/kpt-folder-parent
kpt version  # sanity test

OUTPUT="$(kpt fn run sample/ --enable-exec --exec-path ./bin/main --dry-run)"
# If the function runs successfully, there will be two pairs of fields & futures, one each for the the child folder, and child project
# There should be a total of 7 resources (2 pairs of cork CRs, 2 RBAC, and the root folder), indicated by the number of lines starting with "kind"
# TODO(thackerm): expand assertions to include more yaml content.
if [ "$(echo "$OUTPUT" | grep -c FutureObject)" == "2" ] && 
	[ "$(echo "$OUTPUT" | grep -c FieldReference)" == "2" ] &&
	[ "$(echo "$OUTPUT" | grep -c RoleBinding)" == "1" ] &&
	[ "$(echo "$OUTPUT" | grep -cE "^kind: Role")" == "2" ] &&
	[ "$(echo "$OUTPUT" | grep -cE ^kind)" == "8" ]
then
	echo "ok	kpt tests passed"
	exit 0
fi
echo "failed	kpt tests failed"
exit 1
