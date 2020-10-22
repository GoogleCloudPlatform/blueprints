# If builds break, this version may need to be pinned.
ARG cloud_sdk_version=latest

# Fetch license tool (NOTE: You must be ACL'd to read this GCS object).
FROM gcr.io/google.com/cloudsdktool/cloud-sdk:${cloud_sdk_version} as dep
WORKDIR /dep
RUN gsutil cp gs://yakima-build/licensetool licensetool
RUN chmod +x ./licensetool

# Copy in preview-hierarchy
FROM golang:1.14-stretch as build
ENV CGO_ENABLED=0
WORKDIR /go/src/github.com/google/render-gcp-hierarchy

COPY third_party ./third_party/
COPY go.mod go.sum ./
COPY *.go ./
COPY LICENSE ./

# Process imports' licenses.
RUN go mod vendor
COPY --from=dep /dep/licensetool .
RUN ./licensetool

# Build preview-hierarchy
RUN go build -v -o /usr/local/bin/function ./

# Final collection of artifacts
FROM alpine:latest
COPY template.tmpl /
COPY --from=build /go/src/github.com/google/render-gcp-hierarchy/LICENSE LICENSE
COPY --from=build /go/src/github.com/google/render-gcp-hierarchy/THIRD_PARTY_NOTICES/ THIRD_PARTY_NOTICES/
COPY --from=build /go/src/github.com/google/render-gcp-hierarchy/MIRRORED_LIBRARY_SOURCE/ MIRRORED_LIBRARY_SOURCE/
COPY --from=build /usr/local/bin/function /function
CMD ["/function"]
