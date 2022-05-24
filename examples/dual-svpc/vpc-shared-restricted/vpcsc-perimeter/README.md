<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Service Controls Perimeter blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A basic access level restricting access to a specific region using the
Access Context Manager

## Setters

|        Name         |                       Value                       | Type  | Count |
|---------------------|---------------------------------------------------|-------|-------|
| access-policy-name  | org-access-policy                                 | str   |     2 |
| namespace           | networking                                        | str   |     4 |
| org-id              | example-org                                       | str   |     1 |
| perimeter-name      | regionperimeter                                   | str   |     0 |
| project-id          | vpcsc-project-id                                  | str   |     1 |
| project-namespace   | projects                                          | str   |     1 |
| restricted-services | [storage.googleapis.com, bigquery.googleapis.com] | array |     1 |
| suffix              |                                                   | str   |     0 |

## Sub-packages

This package has no sub-packages.

## Resources

|       File        |                     APIVersion                     |                 Kind                 |        Name        | Namespace  |
|-------------------|----------------------------------------------------|--------------------------------------|--------------------|------------|
| access-level.yaml | accesscontextmanager.cnrm.cloud.google.com/v1beta1 | AccessContextManagerAccessLevel      | alregionperimeter  | networking |
| perimeter.yaml    | accesscontextmanager.cnrm.cloud.google.com/v1beta1 | AccessContextManagerServicePerimeter | spcregionperimeter | networking |

## Resource References

- [AccessContextManagerAccessLevel](https://cloud.google.com/config-connector/docs/reference/resource-docs/accesscontextmanager/accesscontextmanageraccesslevel)
- [AccessContextManagerServicePerimeter](https://cloud.google.com/config-connector/docs/reference/resource-docs/accesscontextmanager/accesscontextmanagerserviceperimeter)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/vpc-service-controls/perimeter@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./perimeter/"
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
