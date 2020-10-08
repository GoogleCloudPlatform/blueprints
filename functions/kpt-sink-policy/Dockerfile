FROM golang:1.14
ENV CGO_ENABLED=0
WORKDIR /go/src/
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY main.go .
RUN go build -v -o /usr/local/bin/kpt-sink-policy-function ./

FROM alpine:latest
COPY --from=0 /usr/local/bin/kpt-sink-policy-function /usr/local/bin/kpt-sink-policy-function
CMD ["/usr/local/bin/kpt-sink-policy-function"]
