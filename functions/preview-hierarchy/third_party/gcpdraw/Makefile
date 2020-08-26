 package:
	goxc

cross-compile:
	gox -os="linux" -arch="386 amd64 arm arm64" -output="dist/gcpdraw_{{.OS}}_{{.Arch}}/gcpdraw" gob/gcpdraw/cmd/...
	gox -os="darwin" -arch="386 amd64" -output="dist/gcpdraw_{{.OS}}_{{.Arch}}/gcpdraw" gob/gcpdraw/cmd/...
	gox -os="windows" -arch="386 amd64" -output="dist/gcpdraw_{{.OS}}_{{.Arch}}/gcpdraw" gob/gcpdraw/cmd/...

# For icons
build-static:
	statik -src=config/
sync-gcs:
	gsutil -m cp -r icons/product  gs://gcpdraw-icons/
	gsutil -m cp -r icons/gsuite  gs://gcpdraw-icons/
	gsutil -m cp -r icons/oss  gs://gcpdraw-icons/
	gsutil -m cp -r icons/user  gs://gcpdraw-icons/
	gsutil -m cp -r icons/others  gs://gcpdraw-icons/

# For sync examples to web/client/src/config/examples
sync-example:
	./scripts/sync_example_to_web.sh
sync-config:
	cp -f config/* web/client/src/config/cards/

test:
	go test -v ./gcpdraw/...
