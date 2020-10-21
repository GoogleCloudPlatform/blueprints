.PHONY: fix vet fmt test lint

GOPATH := $(shell go env GOPATH)

PROJECT_ID ?= $(shell gcloud config get-value project)
IMG ?= gcr.io/${PROJECT_ID}/sink-policy:latest

all: fix vet fmt test lint build

build:
	go build -o bin/main ./...
	# TLDR: `make` can access parent dirs but docker can't, so make the shared 3p licensetool.
	go build -o bin/licensetool ../hack/3p/main.go

fix:
	go fix ./...

fmt:
	go fmt ./...

lint:
	(which $(GOPATH)/bin/golangci-lint || go get github.com/golangci/golangci-lint/cmd/golangci-lint)
	$(GOPATH)/bin/golangci-lint run ./...

test: unit-test

unit-test:
	go test -cover ./...

full-test: unit-test build
	scripts/integ-test.sh

vet:
	go vet ./...

docker-release: docker-build docker-push

docker-build: fix vet fmt test lint build
	docker build . -t ${IMG}

docker-push:
	docker push ${IMG}
