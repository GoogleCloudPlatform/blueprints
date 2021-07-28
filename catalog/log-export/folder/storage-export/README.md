# storage-export package

Creates a log export on a folder that sinks to Cloud Storage

## Setters

```
Setter               Usages
bucket-policy-only   1
filter               1
folder-k8s-name      3
location             1
namespace            3
project-id           2
storage-bucket-name  3
storage-class        1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                                  Kind             Name                            Namespace
export.yaml  logging.cnrm.cloud.google.com/v1beta1       LoggingLogSink   my.folder.k8s.name-storagesink  my-namespace
export.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service          my-project-id-storage           projects
export.yaml  storage.cnrm.cloud.google.com/v1beta1       StorageBucket    my-storage-bucket               my-namespace
iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMPolicyMember  storage-project-iam-policy      my-namespace
```

## Resource References

- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)
- [StorageBucket](https://cloud.google.com/config-connector/docs/reference/resource-docs/storage/storagebucket)

