# bigquery-export package

Creates a log export on a folder that sinks to BigQuery

## Setters

```
Setter                       Usages
dataset-description          1
dataset-location             1
dataset-name                 1
default-table-expiration-ms  1
delete-contents-on-destroy   1
filter                       1
folder-k8s-name              3
namespace                    3
project-id                   3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                                  Kind             Name                       Namespace
export.yaml  bigquery.cnrm.cloud.google.com/v1beta1      BigQueryDataset  bqlogexportdataset         my-namespace
export.yaml  logging.cnrm.cloud.google.com/v1beta1       LoggingLogSink   my.folder.k8s.name-bqsink  my-namespace
export.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service          my-project-id-bigquery     projects
iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMPolicyMember  bq-project-iam-policy      my-namespace
```

## Resource References

- [BigQueryDataset](https://cloud.google.com/config-connector/docs/reference/resource-docs/bigquery/bigquerydataset)
- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

