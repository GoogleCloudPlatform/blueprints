GOPATH := $(shell go env GOPATH)

PROJECT_ID ?= $(shell gcloud config get-value project)
IMG ?= gcr.io/${PROJECT_ID}/generate-services:latest

all: fix vet fmt test lint build

.PHONY: build
build:
	go build -o bin/main ./main.go

.PHONY: fix
fix:
	go fix ./...

.PHONY: fmt
fmt:
	go fmt ./...

.PHONY: lint
lint:
	(which $(GOPATH)/bin/golangci-lint || go get github.com/golangci/golangci-lint/cmd/golangci-lint)
	$(GOPATH)/bin/golangci-lint run ./...

.PHONY: test
test: unit-test

.PHONY: unit-test
unit-test:
	go test -cover ./...

.PHONY: full-test
full-test: unit-test build
	scripts/integ-test.sh

.PHONY: vet
vet:
	go vet ./...

.PHONY: licensetool
# Fetch licensetool binary (NOTE: You must be ACL'd to read this GCS object).
licensetool:
	gsutil cp gs://yakima-build/licensetool licensetool
	chmod a+x ./licensetool

.PHONY: docker-release
docker-release: docker-build docker-push

.PHONY: docker-build
docker-build: fix vet fmt test lint build
	docker build . -t ${IMG}

.PHONY: docker-build-local
docker-build-local: fix vet fmt test lint build licensetool
	docker build . -t ${IMG} -f Dockerfile.local

.PHONY: docker-push
docker-push:
	docker push ${IMG}

.PHONY: service-map
service-map:
	scripts/service-map.sh
