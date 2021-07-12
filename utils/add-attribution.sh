#!/bin/bash
# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -o errexit -o nounset -o pipefail

PKG_PATH="${1:-.}"
BLUEPRINT_NAME="${BLUEPRINT_NAME:-$(grep -m 1 "name:" "${PKG_PATH}/Kptfile" | sed 's/[[:space:]]*name:[[:space:]]*//')}"
BLUEPRINT_VERSION="${BLUEPRINT_VERSION:-$(cd "${PKG_PATH}" && git describe --abbrev=0)}"

kpt fn source "${PKG_PATH}" |
    kpt cfg grep "apiVersion=cnrm" |
    kpt fn run --image gcr.io/kpt-fn/set-annotation:v0.1 -- "cnrm.cloud.google.com/blueprint=cnrm/${BLUEPRINT_NAME}/${BLUEPRINT_VERSION}" |
    kpt fn sink "${PKG_PATH}"
