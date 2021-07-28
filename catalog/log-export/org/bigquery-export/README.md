# bigquery-export package

Creates a log export on a organization that sinks to BigQuery

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
iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMPolicyMember  logging-sa-iam-permissions  config-control
```

## Resource References

- [BigQueryDataset](https://cloud.google.com/config-connector/docs/reference/resource-docs/bigquery/bigquerydataset)
- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

