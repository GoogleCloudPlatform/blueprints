PROJECT_ID ?= $(shell gcloud config get-value project)
IMG ?= gcr.io/${PROJECT_ID}/preview-hierarchy:latest

debug: build
	kpt fn run samples/ --enable-exec --exec-path ./render-hierarchy -- output=test.svg

build: clean
	go fmt && go vet && \
	go build -o render-hierarchy .

test:
	go test -cover

clean:
	-rm render-hierarchy

docker-release: docker-build docker-push

docker-build: test
	docker build . -t ${IMG}

docker-push:
	docker push ${IMG}

final: docker-build
	kpt fn run samples/ \
		--results-dir=./results \
		--mount type=bind,src="$$(pwd)/",dst=/source,rw=true \
		--image=${IMG} \
		-- output=/source/test.svg

.PHONY : debug build clean docker-build final
