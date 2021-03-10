# kpt-gen-tenant

## Build Binary

```
go build -o bin/kpt-gen-tenant .
```

## Usage Dependencies

- Landing Zones Blueprint
- Environs Blueprint

## Clone Package Source

```
# TODO: validate this uri format works
UPSTREAM=https://github.com/GoogleCloudPlatform/blueprints.git/tenant
```

OR

```
cd ${HOME}/workspace
git clone https://github.com/GoogleCloudPlatform/blueprints
UPSTREAM=file:/${HOME}/workspace/blueprints.git/packages
```

## Create Local Git Workspace

```
WORKDIR=${HOME}/workspace/gcp-config
mkdir -p ${WORKDIR}
cd ${WORKDIR}
git init
```

## Configure Tenants

```
mkdir -p tenants/
cd tenants
```

For each Tenant:

```
TENANT=example
TENANT_ADMIN_GROUP=example@example.org
kpt pkg get "${UPSTREAM}" "${TENANT}"
pushd "${TENANT}"

kpt cfg set tenant-name "${TENANT}"
kpt cfg set tenant-admin-group "${TENANT_ADMIN_GROUP}"
```

## Generate Tenant Sub-Packages

```
./kpt-gen.sh --pkgpath "${UPSTREAM}"
```

OR 

```
bin/kpt-gen-tenant --context "${REPO_ROOT}" --workdir "${WORKDIR}" --pkgpath "${UPSTREAM}"
```
