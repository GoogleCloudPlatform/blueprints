#! /bin/bash
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


source /workspace/utils/testutils/krmt_helpers.sh
export CREATE_PROJECT_ID=ci-blueprints-${RANDOM}
echo "Preparing ${CREATE_PROJECT_ID}"
create_project
export PROJECT_ID=${CREATE_PROJECT_ID}
create_cc
krmt
krmt_run_all
