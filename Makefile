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
DOCKER_TAG_VERSION_DEVELOPER_TOOLS := 1.1.3
DOCKER_IMAGE_DEVELOPER_TOOLS := cft/developer-tools-krm
REGISTRY_URL := gcr.io/cloud-foundation-cicd

.PHONY: docker_check_lint
docker_check_lint:
	docker run --rm -it \
		-v $(CURDIR):/workspace \
		-v /var/run/docker.sock:/var/run/docker.sock \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		./utils/check_lint.sh


.PHONY: docker_fix_lint
docker_fix_lint:
	docker run --rm -it \
		-v $(CURDIR):/workspace \
		-v /var/run/docker.sock:/var/run/docker.sock \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		./utils/fix_lint.sh

.PHONY: docker_run
docker_run:
	docker run --rm -it \
		-e ORG_ID \
		-e FOLDER_ID \
		-e BILLING_ACCOUNT \
		-e PROJECT_ID \
		-e CLUSTER_NAME \
		-v $(CURDIR):/workspace \
		-v $(CURDIR)/utils/testutils/krmt.sh:/usr/local/bin/krmt \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v ~/.config/gcloud:/root/.config/gcloud \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		/bin/bash

.PHONY: docker_test_prepare_project
docker_test_prepare_project:
	docker run --rm -it \
		-e ORG_ID \
		-e FOLDER_ID \
		-e BILLING_ACCOUNT \
		-v $(CURDIR):/workspace \
		-v ~/.config/gcloud:/root/.config/gcloud \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		/bin/bash -c 'source /workspace/utils/testutils/krmt_helpers.sh && create_project'

.PHONY: docker_test_prepare_cc
docker_test_prepare_cc:
	docker run --rm -it \
		-e ORG_ID \
		-e FOLDER_ID \
		-e BILLING_ACCOUNT \
		-e PROJECT_ID \
		-v $(CURDIR):/workspace \
		-v ~/.config/gcloud:/root/.config/gcloud \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		/bin/bash -c 'source /workspace/utils/testutils/krmt_helpers.sh && create_cc'

.PHONY: docker_test_prepare_all
docker_test_prepare_all:
	docker run --rm -it \
		-e ORG_ID \
		-e FOLDER_ID \
		-e BILLING_ACCOUNT \
		-e PROJECT_ID \
		-v $(CURDIR):/workspace \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v ~/.config/gcloud:/root/.config/gcloud \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		/bin/bash -c '/workspace/utils/testutils/create_all.sh'
