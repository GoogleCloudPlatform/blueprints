# If builds break, this version may need to be pinned.
ARG cloud_sdk_version=latest

# Fetch license tool (NOTE: You must be ACL'd to read this GCS object).
FROM gcr.io/google.com/cloudsdktool/cloud-sdk:${cloud_sdk_version} as dep
WORKDIR /dep
RUN gsutil cp gs://yakima-build/licensetool licensetool
RUN chmod +x ./licensetool

FROM golang:1.14 as builder
ENV CGO_ENABLED=0
WORKDIR /go/src/
COPY go.mod .
COPY go.sum .
COPY main.go .
# Pull libs, copy licenses
RUN go mod vendor
COPY --from=dep /dep/licensetool .
RUN ./licensetool

# Build
RUN go build -v -o /usr/local/bin/evaluate ./

FROM alpine:latest
COPY --from=builder /go/src/THIRD_PARTY_NOTICES/ THIRD_PARTY_NOTICES/
COPY --from=builder /go/src/MIRRORED_LIBRARY_SOURCE/ MIRRORED_LIBRARY_SOURCE/
COPY --from=builder /usr/local/bin/evaluate /usr/local/bin/evaluate
ENTRYPOINT ["evaluate"]
