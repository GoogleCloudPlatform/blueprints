<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Google Cloud Storage Bucket blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A Google Cloud Storage bucket

## Setters

|     Name      |       Value        | Type | Count |
|---------------|--------------------|------|-------|
| name          | bucket2            | str  |     1 |
| project-id    | blueprints-project | str  |     2 |
| storage-class | standard           | str  |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|    File     |              APIVersion               |     Kind      |           Name            |   Namespace    |
|-------------|---------------------------------------|---------------|---------------------------|----------------|
| bucket.yaml | storage.cnrm.cloud.google.com/v1beta1 | StorageBucket | blueprints-project-bucket | config-control |

## Resource References

- [StorageBucket](https://cloud.google.com/config-connector/docs/reference/resource-docs/storage/storagebucket)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/bucket@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./bucket/"
    ```

1.  Edit the function config file(s):
    - setters.yaml

1.  Execute the function pipeline
    ```shell
    kpt fn render
    ```

1.  Initialize the resource inventory
    ```shell
    kpt live init --namespace ${NAMESPACE}
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
