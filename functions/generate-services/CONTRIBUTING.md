# Contributing

## Build & Test

```
make
```

## Exec From Binary

```
go build -v -o generate-services ./
kpt fn run sample/ --enable-exec --exec-path ./generate-services-function
```

NOTE: If you sudo docker then you need to sudo kpt and there's an obnoxious set of auth stuff you will likely have to do to enable kpt to run gcr images.

## Build Image

```
gcloud config set project ${PROJECT_ID}
make docker-build-local
```

## Build ServiceMap

The service-map.yaml file is generated using Config Connector source code, which is proprietary and requires access to Google's CNRM repository.

The following command will authenticate with the repo, clone the Config Connector source, and generate a new service-map.yaml file.

If the repo is already cloned, the local files will be used (useful for testing new changes). Delete or pull to get the latest changes.

```
make service-map
```

If the service-map.yaml changes, commit it into the generate-services repo and publish a new release. 

## Release

```
gcloud config set project yakima-eap
gcloud builds submit -t gcr.io/yakima-eap/generate-services:latest .
```
