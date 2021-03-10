#!/usr/bin/env bash

# kpt-gen builds and runs the kpt-gen-tenant docker container locally.
# See the kpt-gen-tenant README.md for details.
# Arguments passed to kpt-gen will be passed to kpt-gen-tenant (like --update).

set -o errexit -o nounset -o pipefail -o posix

CMD=kpt-gen-tenant

REPO_ROOT=$(git rev-parse --show-toplevel)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
PKGPATH=https://source.cloud.google.com/yakima-eap/blueprints.git
GITCOOKIES="${HOME}/.gitcookies"

function regen_creds() {
    echo >&2 "Please regenerate git credentials for Cloud Source Repositories:"
    echo >&2 "https://source.developers.google.com/new-password"
}

if [[ ! -f "${GITCOOKIES}" ]]; then
    echo >&2 "File not found: ${GITCOOKIES}"
    regen_creds
    exit 2
fi
if ! grep -q "^source.developers.google.com"$'\t' "${GITCOOKIES}"; then
    echo >&2 "Git cookie for \"source.developers.google.com\" not found: ${GITCOOKIES}"
    regen_creds
    exit 2
fi

docker build -t local/${CMD} ${SCRIPT_DIR}/scripts/${CMD}
docker run \
  -e WORKDIR=/workdir \
  -e "CHOWN=$(id -u ${USER}):$(id -g ${USER})" \
  -v "${GITCOOKIES}:/root/.gitcookies" \
  -v "${SCRIPT_DIR}:/workdir" \
  -v "${REPO_ROOT}:/context" \
  local/${CMD} \
    --workdir "/workdir" \
    --context "/context" \
    --pkgpath "${PKGPATH}" \
    --skip_headers \
    $@
