# boa-manifests

## Description
sample description

## Usage

### Fetch the package
`kpt pkg get REPO_URI[.git]/PKG_PATH[@VERSION] boa-manifests`
Details: https://kpt.dev/reference/cli/pkg/get/

### View package content
`kpt pkg tree boa-manifests`
Details: https://kpt.dev/reference/cli/pkg/tree/

### Apply the package
```
kpt live init boa-manifests
kpt live apply boa-manifests --reconcile-timeout=2m --output=table
```
Details: https://kpt.dev/reference/cli/live/
