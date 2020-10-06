debug: build
	kpt fn run samples/ --enable-exec --exec-path ./render-hierarchy -- output=test.svg

build: clean
	go fmt && go vet && \
	go build -o render-hierarchy .

test:
	go test -cover

clean:
	-rm render-hierarchy

docker-build:
	docker build -t gob/blueprints/preview-hierarchy:0.1 .

final: docker-build
	kpt fn run samples/ \
		--results-dir=./results \
		--mount type=bind,src="$$(pwd)/",dst=/source,rw=true \
		--image=gob/blueprints/preview-hierarchy:0.1 \
		-- output=/source/test.svg

.PHONY : debug build clean docker-build final

