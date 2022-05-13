<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# PubSub Export blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A log export on a folder that sinks to PubSub

## Setters

|      Name       |          Value           | Type | Count |
|-----------------|--------------------------|------|-------|
| filter          |                          | str  |     0 |
| folder-k8s-name | my.folder.k8s.name       | str  |     3 |
| namespace       | my-namespace             | str  |     3 |
| project-id      | my-project-id            | str  |     3 |
| topic-name      | pubsub-logexport-dataset | str  |     3 |

## Sub-packages

This package has no sub-packages.

## Resources

|    File     |                 APIVersion                 |      Kind       |             Name              |  Namespace   |
|-------------|--------------------------------------------|-----------------|-------------------------------|--------------|
| export.yaml | serviceusage.cnrm.cloud.google.com/v1beta1 | Service         | my-project-id-pubsub          | projects     |
| export.yaml | logging.cnrm.cloud.google.com/v1beta1      | LoggingLogSink  | my.folder.k8s.name-pubsubsink | my-namespace |
| export.yaml | pubsub.cnrm.cloud.google.com/v1beta1       | PubSubTopic     | pubsub-logexport-dataset      | my-namespace |
| iam.yaml    | iam.cnrm.cloud.google.com/v1beta1          | IAMPolicyMember | pubsub-iam-policy             | my-namespace |

## Resource References

- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [LoggingLogSink](https://cloud.google.com/config-connector/docs/reference/resource-docs/logging/logginglogsink)
- [PubSubTopic](https://cloud.google.com/config-connector/docs/reference/resource-docs/pubsub/pubsubtopic)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/log-export/folder/pubsub-export@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./pubsub-export/"
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
