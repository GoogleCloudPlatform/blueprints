<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Cloud Logging Log Bucket Export blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A log export on a folder that sinks to Cloud Logging Log Bucket

## Setters

|        Name         |       Value       | Type | Count |
|---------------------|-------------------|------|-------|
| filter              |                   | str  |     0 |
| folder-id           |      123456789012 | str  |     2 |
| location            | global            | str  |     2 |
| log-bucket-k8s-name | my-log-k8s-bucket | str  |     2 |
| namespace           | my-namespace      | str  |     3 |
| project-id          | my-project-id     | str  |     4 |
| retentionDays       |                30 | int  |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|    File     |                 APIVersion                 |       Kind       |              Name              |  Namespace   |
|-------------|--------------------------------------------|------------------|--------------------------------|--------------|
| export.yaml | serviceusage.cnrm.cloud.google.com/v1beta1 | Service          | my-project-id-logbucket        | my-namespace |
| export.yaml | logging.cnrm.cloud.google.com/v1beta1      | LoggingLogSink   | 123456789012-fldrlogbucketsink | my-namespace |
| export.yaml | logging.cnrm.cloud.google.com/v1beta1      | LoggingLogBucket | my-log-k8s-bucket              | my-namespace |

## Resource References

- [LoggingLogBucket](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogbucket)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/log-export/folder/logbucket-export@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./logbucket-export/"
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
