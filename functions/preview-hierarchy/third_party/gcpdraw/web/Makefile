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

deploy-dispatch:
	gcloud app deploy --project=${PROJECT} dispatch.yaml

deploy-maintenance:
	gcloud app deploy --project=${PROJECT} maintenance/app.yaml

quick-deploy-dev:
	pushd client && npm run build && popd && gcloud app deploy --project=google.com:gcpdraw-dev -q