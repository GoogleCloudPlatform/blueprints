# Contributing

## Build & Test

```
make
```

## Exec From Binary

```
go build -v -o project-number-ref ./
kpt fn run sample/ --enable-exec --exec-path ./project-number-ref-function
```

NOTE: If you sudo docker then you need to sudo kpt and there's an obnoxious set of auth stuff you will likely have to do to enable kpt to run gcr images.

## Build Image

```
gcloud config set project ${PROJECT_ID}
make docker-build
```

## Release

```
gcloud config set project yakima-eap
gcloud builds submit -t gcr.io/yakima-eap/project-number-ref:latest .
```
