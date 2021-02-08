# If builds break, this version may need to be pinned.
ARG cloud_sdk_version=latest
# Fetch license tool (NOTE: You must be ACL'd to read this GCS object).
FROM gcr.io/google.com/cloudsdktool/cloud-sdk:${cloud_sdk_version} as dep
WORKDIR /dep
RUN gsutil cp gs://yakima-build/licensetool licensetool
RUN chmod +x ./licensetool
# builder
FROM golang:1.15 as build
ENV CGO_ENABLED=0
WORKDIR /go/src/
# Copy in source and modules
COPY go.mod go.sum ./
COPY *.go ./
COPY LICENSE ./
# Pull libs, copy licenses
RUN go mod vendor
COPY --from=dep /dep/licensetool .
RUN ./licensetool
# Build function
RUN go build -v -o /usr/local/bin/kpt-docs ./
# Final image
FROM alpine:latest
RUN mkdir -p /usr/local/bin/blueprints
COPY --from=build /usr/local/bin/kpt-docs /usr/local/bin/kpt-docs
# git is needed in path for kpt, but not used for list-setters
RUN touch /usr/local/bin/git
RUN chmod +x /usr/local/bin/git
CMD ["/usr/local/bin/kpt-docs"]