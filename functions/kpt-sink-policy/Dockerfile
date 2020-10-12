FROM golang:1.14
ENV CGO_ENABLED=0
WORKDIR /go/src/
# Copy in source and modules
COPY go.mod .
COPY go.sum .
COPY main.go .

# Prereq: licensetool must be built prior to docker-build.
COPY bin/licensetool .
COPY LICENSE .

# Process imports' licenses.
RUN go mod vendor
RUN ./licensetool

# Build function
RUN go build -v -o /usr/local/bin/kpt-sink-policy-function ./

FROM alpine:latest
COPY --from=0 /go/src/LICENSE /go/src/LICENSE
COPY --from=0 /go/src/THIRD_PARTY_NOTICES/ THIRD_PARTY_NOTICES/
COPY --from=0 /go/src/MIRRORED_LIBRARY_SOURCE/ MIRRORED_LIBRARY_SOURCE/
COPY --from=0 /usr/local/bin/kpt-sink-policy-function /usr/local/bin/kpt-sink-policy-function
CMD ["/usr/local/bin/kpt-sink-policy-function"]
