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


SHELL := /usr/bin/env bash
DOCKER_TAG_VERSION_DEVELOPER_TOOLS := 0.15
DOCKER_IMAGE_DEVELOPER_TOOLS := cft/developer-tools-krm
REGISTRY_URL := gcr.io/cloud-foundation-cicd

.PHONY: docker_check_lint
docker_check_lint:
	docker run --rm -it \
		-v $(CURDIR):/workspace \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		./utils/check_lint.sh


.PHONY: docker_fix_lint
docker_fix_lint:
	docker run --rm -it \
		-v $(CURDIR):/workspace \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		./utils/fix_lint.sh

.PHONY: docker_run
docker_run:
	docker run --rm -it \
		-v $(CURDIR):/workspace \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		/bin/bash
