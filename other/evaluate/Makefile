.PHONY: fix vet fmt test lint

GOPATH := $(shell go env GOPATH)
PROJECT_ID ?= $(shell gcloud config get-value project)
IMG ?= gcr.io/${PROJECT_ID}/evaluate:latest

all: fix vet fmt test lint build
build:
	go build -o bin/main ./...
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
vet:
	go vet ./...
docker-release: docker-build docker-push
docker-build: fix vet fmt test lint
	docker build . -t ${IMG}
docker-push:
	docker push ${IMG}

