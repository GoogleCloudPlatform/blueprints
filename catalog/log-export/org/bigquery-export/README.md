# BigQuery Export blueprint

A log export on a organization that sinks to BigQuery

## Setters

```
Setter                       Usages
dataset-description          1
dataset-location             1
dataset-name                 1
default-table-expiration-ms  1
delete-contents-on-destroy   1
filter                       1
management-namespace         1
management-project-id        1
namespace                    3
org-id                       3
project-id                   5
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                                  Kind             Name                        Namespace
export.yaml  bigquery.cnrm.cloud.google.com/v1beta1      BigQueryDataset  bqlogexportdataset          logging
export.yaml  logging.cnrm.cloud.google.com/v1beta1       LoggingLogSink   123456789012-bqsink         logging
export.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service          my-project-id-bigquery      projects
iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMPolicyMember  bq-project-iam-policy       logging
iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMPartialPolicy  logging-sa-iam-permissions  config-control
```

## Resource References

- [BigQueryDataset](https://cloud.google.com/config-connector/docs/reference/resource-docs/bigquery/bigquerydataset)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/log-export/org/bigquery-export@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./bigquery-export/"
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
