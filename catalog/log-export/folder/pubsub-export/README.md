# PubSub Export blueprint

A log export on a folder that sinks to PubSub

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

- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [PubSubTopic](https://cloud.google.com/config-connector/docs/reference/resource-docs/pubsub/pubsubtopic)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/log-export/folder/pubsub-export@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./pubsub-export/"
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

