<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Project blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A project and a project namespace in which to manage project resources with
Config Connector.

## Setters

|         Name          |         Value         | Type | Count |
|-----------------------|-----------------------|------|-------|
| billing-account-id    | AAAAAA-BBBBBB-CCCCCC  | str  |     1 |
| folder-name           | name.of.folder        | str  |     1 |
| folder-namespace      | hierarchy             | str  |     1 |
| management-namespace  | config-control        | str  |     2 |
| management-project-id | management-project-id | str  |     5 |
| networking-namespace  | networking            | str  |     1 |
| project-id            | project-id            | str  |    18 |
| projects-namespace    | projects              | str  |     3 |

## Sub-packages

- [kcc-namespace](kcc-namespace)

## Resources

|     File     |                  APIVersion                   |  Kind   |    Name    | Namespace |
|--------------|-----------------------------------------------|---------|------------|-----------|
| project.yaml | resourcemanager.cnrm.cloud.google.com/v1beta1 | Project | project-id | projects  |

## Resource References

- [Project](https://cloud.google.com/config-connector/docs/reference/resource-docs/resourcemanager/project)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/project@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./project/"
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
