# If builds break, this version may need to be pinned.
ARG cloud_sdk_version=latest

# Fetch license tool (NOTE: You must be ACL'd to read this GCS object).
FROM gcr.io/google.com/cloudsdktool/cloud-sdk:${cloud_sdk_version} as dep
WORKDIR /dep
RUN gsutil cp gs://yakima-build/licensetool licensetool
RUN chmod +x ./licensetool

FROM golang:1.14 as build
ENV CGO_ENABLED=0
WORKDIR /go/src/
# Copy in source and modules
COPY go.mod .
COPY go.sum .
COPY main.go .
COPY LICENSE .

# Pull libs, copy licenses
RUN go mod vendor
COPY --from=dep /dep/licensetool .
RUN ./licensetool

# Build function
RUN go build -v -o /usr/local/bin/kpt-sink-policy-function ./

FROM alpine:latest
COPY --from=build /go/src/LICENSE /go/src/LICENSE
COPY --from=build /go/src/THIRD_PARTY_NOTICES/ THIRD_PARTY_NOTICES/
COPY --from=build /go/src/MIRRORED_LIBRARY_SOURCE/ MIRRORED_LIBRARY_SOURCE/
COPY --from=build /usr/local/bin/kpt-sink-policy-function /usr/local/bin/kpt-sink-policy-function
CMD ["/usr/local/bin/kpt-sink-policy-function"]
