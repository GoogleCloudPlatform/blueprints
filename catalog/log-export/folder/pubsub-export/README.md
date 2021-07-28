# pubsub-export package

Creates a log export on a folder that sinks to PubSub

## Setters

```
Setter           Usages
filter           1
folder-k8s-name  3
namespace        3
project-id       2
topic-name       3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                                  Kind             Name                           Namespace
export.yaml  logging.cnrm.cloud.google.com/v1beta1       LoggingLogSink   my.folder.k8s.name-pubsubsink  my-namespace
export.yaml  pubsub.cnrm.cloud.google.com/v1beta1        PubSubTopic      pubsub-logexport-dataset       my-namespace
export.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service          my-project-id-pubsub           projects
iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMPolicyMember  pubsub-iam-policy              my-namespace
```

## Resource References

- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [PubSubTopic](https://cloud.google.com/config-connector/docs/reference/resource-docs/pubsub/pubsubtopic)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

