<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Simple Hierarchy blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A simple GCP resource hierarchy with top-level folders

## Setters

This package has no top-level setters. See sub-packages.

## Sub-packages

This package has no sub-packages.

## Resources

|              File               |              APIVersion              |        Kind        |         Name         | Namespace |
|---------------------------------|--------------------------------------|--------------------|----------------------|-----------|
| hierarchy.yaml                  | blueprints.cloud.google.com/v1alpha3 | ResourceHierarchy  | root-hierarchy       | hierarchy |
| policies/naming-constraint.yaml | constraints.gatekeeper.sh/v1beta1    | GCPEnforceNamingV2 | enforce-folder-names |           |

## Resource References

- GCPEnforceNamingV2
- ResourceHierarchy

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/hierarchy/simple@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./simple/"
    ```

1.  Edit the function config file(s):
    - setters.yaml

1.  Execute the function pipeline
    ```shell
    kpt fn render
    ```

1.  Initialize the resource inventory
    ```shell
    kpt live init --namespace ${NAMESPACE}"
    ```
    Replace `${NAMESPACE}` with the namespace in which to manage
    the inventory ResourceGroup (for example, `config-control`).

1.  Apply the package resources to your cluster
    ```shell
    kpt live apply
    ```

1.  Wait for the resources to be ready
    ```shell
    kpt live status --output table --poll-until current
    ```

<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
