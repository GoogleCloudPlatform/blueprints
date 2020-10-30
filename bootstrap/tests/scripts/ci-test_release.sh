#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

$(dirname "${BASH_SOURCE}")/run_blueprints_test.sh $@
