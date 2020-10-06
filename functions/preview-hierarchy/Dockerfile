FROM golang:1.14-stretch
ENV CGO_ENABLED=0
WORKDIR /go/src/github.com/google/render-gcp-hierarchy

COPY third_party ./third_party/
COPY go.mod go.sum ./
RUN ls third_party/gcpdraw/
RUN go mod download

COPY *.go ./
RUN go build -v -o /usr/local/bin/function ./

FROM alpine:latest
COPY template.tmpl /
COPY --from=0 /usr/local/bin/function /function
CMD ["/function"]
