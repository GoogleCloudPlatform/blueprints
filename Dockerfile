FROM golang:1.14
ENV CGO_ENABLED=0
WORKDIR /go/src/
COPY . .
RUN go build -v -o /usr/local/bin/folder-parent ./

FROM alpine:latest
COPY --from=0 /usr/local/bin/folder-parent /usr/local/bin/folder-parent
CMD ["folder-parent"]
