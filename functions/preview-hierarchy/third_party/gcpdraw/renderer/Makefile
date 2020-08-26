.PHONY: clean
OBJECT=web

clean:
	rm -f ${OBJECT}

build:
	GO111MODULE=on go build -o ${OBJECT}

deploy:
	gcloud app deploy --project=${PROJECT}

deploy-no-promote:
	gcloud app deploy --project=${PROJECT} --no-promote
