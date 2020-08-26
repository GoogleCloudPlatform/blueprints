FROM golang:1.14-stretch
ENV CGO_ENABLED=0
WORKDIR /go/src/github.com/google/render-gcp-hierarchy

COPY go.mod go.sum gcpdraw ./
RUN go mod download

COPY . .
RUN go build -v -o /usr/local/bin/function ./

FROM alpine:latest
COPY template.txt /
COPY --from=0 /usr/local/bin/function /function
CMD ["/function"]
