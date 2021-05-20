PROJECT_ID ?= $(shell gcloud config get-value project)
IMG ?= gcr.io/${PROJECT_ID}/generate-folders:latest

all: fmt test lint build

.PHONY: build
build:
	npm run build

.PHONY: fmt
fmt:
	npm run fixlint

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test: unit-test

.PHONY: unit-test
unit-test:
	npm run test

.PHONY: docker-release
docker-release: docker-build docker-push

.PHONY: docker-build
docker-build: fmt test lint build
	npm run kpt:docker-build

.PHONY: docker-build-local
docker-build-local: docker-build
	docker tag gcr.io/yakima-eap/generate-folders:dev ${IMG}

