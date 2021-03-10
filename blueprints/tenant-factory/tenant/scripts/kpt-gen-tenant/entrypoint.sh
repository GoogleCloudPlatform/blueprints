#!/bin/bash

set -o errexit -o nounset -o pipefail -o posix

# Change ownership of files created inside the docker container, so that they end up owned by the current user (and not root)
if [[ -z "${WORKDIR:-}" || -z "${CHOWN:-}" ]]; then
    echo "Must set WORKDIR and CHOWN env vars" >&2
    exit 1
fi

function finish {
  find ${WORKDIR} -uid 0 -exec chown ${CHOWN} {} +
}
trap finish EXIT

/bin/kpt-gen-tenant $@
