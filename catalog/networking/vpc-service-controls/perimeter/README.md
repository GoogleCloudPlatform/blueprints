# Service Controls Perimeter blueprint

A basic access level restricting access to a specific region using the
Access Context Manager

## Setters

```
Setter               Usages
access-policy-name   2
namespace            4
org-id               1
perimeter-name       5
project-id           1
project-namespace    1
restricted-services  1
suffix               5
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File               APIVersion                                          Kind                                  Name                Namespace
access-level.yaml  accesscontextmanager.cnrm.cloud.google.com/v1beta1  AccessContextManagerAccessLevel       alregionperimeter   networking
perimeter.yaml     accesscontextmanager.cnrm.cloud.google.com/v1beta1  AccessContextManagerServicePerimeter  spcregionperimeter  networking
```

## Resource References

- [AccessContextManagerAccessLevel](https://cloud.google.com/config-connector/docs/reference/resource-docs/accesscontextmanager/accesscontextmanageraccesslevel)
- [AccessContextManagerServicePerimeter](https://cloud.google.com/config-connector/docs/reference/resource-docs/accesscontextmanager/accesscontextmanagerserviceperimeter)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/vpc-service-controls/perimeter@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./perimeter/"
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

