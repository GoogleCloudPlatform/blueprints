FROM golang:1.14
ENV CGO_ENABLED=0
WORKDIR /go/src/
COPY . .
COPY /usr/local/google/home/thackerm/go/src/cnrm.googlesource.com/cork /usr/local/google/home/thackerm/go/src/cnrm.googlesource.com/cork
RUN go build -v -o /usr/local/bin/folder-parent ./

FROM alpine:latest
COPY --from=0 /usr/local/bin/folder-parent /usr/local/bin/folder-parent
CMD ["folder-parent"]
