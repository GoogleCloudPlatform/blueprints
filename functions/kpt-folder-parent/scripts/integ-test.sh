#!/bin/bash
#  expected to be run from yakima/kpt-folder-parent
kpt version  # sanity test
TMPDIR=$(mktemp -d)
OUTPUT="$(kpt fn run sample/ --enable-exec --exec-path ./bin/main --dry-run --results-dir ${TMPDIR})"

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

# There should be a total of 8 resources:
# 4 Folders, 4 Projects
# 2 Folders(b,c) and 4 Projects(c,d,e,ref-ther) should have FolderRefs injected
# There should also be a deprecation warning in results-dir
TOTAL_RESOURCES="8"


if [ "$(echo "$OUTPUT" | grep -cE ^kind)" != "$TOTAL_RESOURCES" ]
then
	echo "failed	kpt tests failed: incorrect number of resources generated"
	echo "Got $(echo "$OUTPUT" | grep -cE ^kind) resources, expected ${TOTAL_RESOURCES}"
	exit 1
fi

if  [ "$(echo "$OUTPUT" | grep -c Folder)" == "4" ] &&
	[ "$(echo "$OUTPUT" | grep -c Project)" == "4" ] &&
	[ "$(echo "$OUTPUT" | grep -c folderRef)" == "6" ] &&
	[ "$(cat "$TMPDIR/results-0.yaml" | grep -c warning)" == "1" ]
then
	echo "ok	kpt tests passed"
	exit 0
fi
echo "failed	kpt tests failed: incorrect resource kind totals"
exit 1
