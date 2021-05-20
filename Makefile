SHELL := /usr/bin/env bash

DOCKER_TAG_VERSION_DEVELOPER_TOOLS := 0.15
DOCKER_IMAGE_DEVELOPER_TOOLS := cft/developer-tools-krm
REGISTRY_URL := gcr.io/cloud-foundation-cicd

.PHONY: docker_run
docker_run:
	docker run --rm -it \
		-v $(CURDIR):/workspace \
		-e ORG_ID \
		-e FOLDER_ID \
		-e BILLING_ACCOUNT \
		-e PROJECT_ID \
		-v ~/.config/gcloud:/root/.config/gcloud \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		/bin/bash

.PHONY: docker_test_project_prepare
docker_test_project_prepare:
	docker run --rm -it \
		-e ORG_ID \
		-e FOLDER_ID \
		-e BILLING_ACCOUNT \
		-v $(CURDIR):/workspace \
		-v ~/.config/gcloud:/root/.config/gcloud \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		./scripts/create_test_project.sh

.PHONY: docker_test_bootstrap_prepare
docker_test_bootstrap_prepare:
	docker run --rm -it \
		-e ORG_ID \
		-e FOLDER_ID \
		-e BILLING_ACCOUNT \
		-e PROJECT_ID \
		-v $(CURDIR):/workspace \
		-v ~/.config/gcloud:/root/.config/gcloud \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		./scripts/create_bootstrap.sh

.PHONY: docker_build_fns
docker_build_fns:
	docker run --rm -it \
		-v $(CURDIR):/workspace \
		$(REGISTRY_URL)/${DOCKER_IMAGE_DEVELOPER_TOOLS}:${DOCKER_TAG_VERSION_DEVELOPER_TOOLS} \
		./scripts/build_test_fns.sh