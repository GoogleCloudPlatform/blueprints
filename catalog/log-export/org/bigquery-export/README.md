<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# BigQuery Export blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A log export on a organization that sinks to BigQuery

## Setters

|            Name             |                Value                 | Type | Count |
|-----------------------------|--------------------------------------|------|-------|
| dataset-description         | BigQuery audit logs for organization | str  |     1 |
| dataset-location            | US                                   | str  |     1 |
| dataset-name                | audit-logs                           | str  |     1 |
| default-table-expiration-ms |                              3600000 | int  |     1 |
| delete-contents-on-destroy  | false                                | str  |     1 |
| filter                      |                                      | str  |     0 |
| management-namespace        | config-control                       | str  |     1 |
| management-project-id       | management-project-id                | str  |     1 |
| namespace                   | logging                              | str  |     3 |
| org-id                      |                         123456789012 | str  |     3 |
| project-id                  | my-project-id                        | str  |     5 |

## Sub-packages

This package has no sub-packages.

## Resources

|    File     |                 APIVersion                 |       Kind       |            Name            |   Namespace    |
|-------------|--------------------------------------------|------------------|----------------------------|----------------|
| export.yaml | serviceusage.cnrm.cloud.google.com/v1beta1 | Service          | my-project-id-bigquery     | projects       |
| export.yaml | logging.cnrm.cloud.google.com/v1beta1      | LoggingLogSink   | 123456789012-bqsink        | logging        |
| export.yaml | bigquery.cnrm.cloud.google.com/v1beta1     | BigQueryDataset  | bqlogexportdataset         | logging        |
| iam.yaml    | iam.cnrm.cloud.google.com/v1beta1          | IAMPolicyMember  | bq-project-iam-policy      | logging        |
| iam.yaml    | iam.cnrm.cloud.google.com/v1beta1          | IAMPartialPolicy | logging-sa-iam-permissions | config-control |

## Resource References

- [BigQueryDataset](https://cloud.google.com/config-connector/docs/reference/resource-docs/bigquery/bigquerydataset)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/log-export/org/bigquery-export@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./bigquery-export/"
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
