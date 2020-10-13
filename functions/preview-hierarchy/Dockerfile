FROM golang:1.14-stretch
ENV CGO_ENABLED=0
WORKDIR /go/src/github.com/google/render-gcp-hierarchy

COPY third_party ./third_party/
COPY go.mod go.sum ./
COPY *.go ./

# Prereq: licensetool must be built prior to docker-build.
COPY bin/licensetool .
COPY LICENSE .

# Process imports' licenses.
RUN go mod vendor
RUN ./licensetool

RUN go build -v -o /usr/local/bin/function ./

FROM alpine:latest
COPY template.tmpl /
COPY --from=0 /go/src/github.com/google/render-gcp-hierarchy/LICENSE LICENSE
COPY --from=0 /go/src/github.com/google/render-gcp-hierarchy/THIRD_PARTY_NOTICES/ THIRD_PARTY_NOTICES/
COPY --from=0 /go/src/github.com/google/render-gcp-hierarchy/MIRRORED_LIBRARY_SOURCE/ MIRRORED_LIBRARY_SOURCE/
COPY --from=0 /usr/local/bin/function /function
CMD ["/function"]
