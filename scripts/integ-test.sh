#!/bin/bash
#  expected to be run from yakima/kpt-folder-parent
kpt version  # sanity test

OUTPUT="$(kpt fn run sample/ --enable-exec --exec-path ./bin/main --dry-run)"
if [ "$(echo "$OUTPUT" | grep -c FutureObject)" == "1" ] && 
	[ "$(echo "$OUTPUT" | grep -c FieldReference)" == "1" ] &&
	[ "$(echo "$OUTPUT" | grep -cE ^kind)" == "3" ]
then
	echo "ok	kpt tests passed"
	exit 0
fi
echo "failed	kpt tests failed"
exit 1
