#!/bin/bash
# go to a junk tmp dir
cd /tmp
mkdir inspectcontainer
cd inspectcontainer
# copy image to a local tmp, replace gcr* with your target
docker create --name="tmp_$$" gcr.io/thackerm-200021/kpt-folder-ref:latest
# dump filesystem to archive
docker export "tmp_$$" > fs.tar
# expand archive
tar xf fs.tar