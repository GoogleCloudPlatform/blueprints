# Environment Business Unit Hierarchy package

A GCP resource hierarchy organized by environments, business units, and
teams

## Setters

```
Setter     Usages
namespace  3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                             APIVersion                                     Kind                Name                  Namespace
hierarchy.yaml                   blueprints.cloud.google.com/v1alpha3           ResourceHierarchy   root-hierarchy        hierarchy
policies/naming-constraint.yaml  constraints.gatekeeper.sh/v1beta1              GCPEnforceNamingV2  enforce-folder-names
shared-folders.yaml              resourcemanager.cnrm.cloud.google.com/v1beta1  Folder              dev.shared            hierarchy
shared-folders.yaml              resourcemanager.cnrm.cloud.google.com/v1beta1  Folder              prod.shared           hierarchy
```

## Resource References

- [Folder](https://cloud.google.com/config-connector/docs/reference/resource-docs/resourcemanager/folder)
- GCPEnforceNamingV2
- ResourceHierarchy

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/hierarchy/env-bu@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./env-bu/"
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

