PROJECT_ID ?= $(shell gcloud config get-value project)
IMG ?= gcr.io/${PROJECT_ID}/kpt-docs:latest
debug: build
	kpt fn run testdata/ --enable-exec --exec-path ./kpt-docs -- baseDir="testdata/"
build: clean
	go fmt && go vet && \
	go build -o kpt-docs .
test:
	go test -cover
clean:
	-rm kpt-docs
docker-release: docker-build docker-push
docker-build: test
	docker build . -t ${IMG}
docker-push:
	docker push ${IMG}
final: docker-build
	kpt fn run . \
		--mount type=bind,src="$$(pwd)/testdata",target="/blueprints",rw=true \
		--image=${IMG} \
		-- baseDir="/blueprints"
.PHONY : debug build clean docker-build final