# Service Controls Access Policy blueprint

An org-level access policy using the Access Context Manager

## Setters

```
Setter              Usages
access-policy-name  2
namespace           1
org-id              1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                                          Kind                              Name               Namespace
policy.yaml  accesscontextmanager.cnrm.cloud.google.com/v1beta1  AccessContextManagerAccessPolicy  org-access-policy  networking
```

## Resource References

- [AccessContextManagerAccessPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/accesscontextmanager/accesscontextmanageraccesspolicy)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/vpc-service-controls/access-policy@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./access-policy/"
    ```

1.  Edit the function config file(s):
    - setters.yaml

1.  Execute the function pipeline
    ```
    kpt fn render
    ```

1.  Initialize the resource inventory
    ```
    kpt live init --namespace ${NAMESPACE}"
    ```
    Replace `${NAMESPACE}` with the namespace in which to manage
    the inventory ResourceGroup (for example, `config-control`).

1.  Apply the package resources to your cluster
    ```
    kpt live apply
    ```

1.  Wait for the resources to be ready
    ```
    kpt live status --output table --poll-until current
    ```

