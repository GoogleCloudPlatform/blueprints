#!/bin/bash

BLUEPRINT_NAME=$1
BLUEPRINT_VERSION=$2

kpt fn source . |
  kpt cfg grep "apiVersion=cnrm" |
  kpt fn run --image gcr.io/kpt-fn/set-annotation:v0.1 -- "cnrm.cloud.google.com/blueprint=cnrm/${BLUEPRINT_NAME}/${BLUEPRINT_VERSION}" |
  kpt fn sink .
