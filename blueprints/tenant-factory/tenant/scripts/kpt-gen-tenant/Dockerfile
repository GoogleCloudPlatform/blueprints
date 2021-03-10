FROM golang:1.15-buster AS builder
RUN mkdir /build
WORKDIR /build
COPY . /build/
RUN CGO_ENABLED=0 GOOS=linux go build -o kpt-gen-tenant .

#FROM gcr.io/distroless/static
FROM debian:buster
RUN apt-get update && apt-get install --yes git
RUN git config --global http.cookiefile /root/.gitcookies
ADD https://github.com/GoogleContainerTools/kpt/releases/download/v0.37.1/kpt_linux_amd64-0.37.1.tar.gz /tmp/kpt.tgz
RUN cd /bin && tar zxf /tmp/kpt.tgz && rm /tmp/kpt.tgz
RUN /bin/kpt version
ADD entrypoint.sh /entrypoint.sh
COPY --from=builder /build/kpt-gen-tenant /bin/
ENTRYPOINT ["/entrypoint.sh"]