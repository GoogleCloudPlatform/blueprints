<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# GKE Node Pool blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A GKE node pool with a dedicated service account

## Setters

|      Name      |      Value       | Type | Count |
|----------------|------------------|------|-------|
| cluster-name   | example-us-east4 | str  |    11 |
| location       | us-east4         | str  |     1 |
| max-node-count |                2 | int  |     1 |
| nodepool-name  | primary          | str  |    11 |
| project-id     | project-id       | str  |     5 |

## Sub-packages

This package has no sub-packages.

## Resources

|     File      |               APIVersion                |       Kind        |                    Name                     |   Namespace    |
|---------------|-----------------------------------------|-------------------|---------------------------------------------|----------------|
| node-iam.yaml | iam.cnrm.cloud.google.com/v1beta1       | IAMServiceAccount | gke-example-us-east4-primary                | config-control |
| node-iam.yaml | iam.cnrm.cloud.google.com/v1beta1       | IAMPolicyMember   | logwriter-gke-example-us-east4-primary      | config-control |
| node-iam.yaml | iam.cnrm.cloud.google.com/v1beta1       | IAMPolicyMember   | metricwriter-gke-example-us-east4-primary   | config-control |
| node-iam.yaml | iam.cnrm.cloud.google.com/v1beta1       | IAMPolicyMember   | artifactreader-gke-example-us-east4-primary | config-control |
| nodepool.yaml | container.cnrm.cloud.google.com/v1beta1 | ContainerNodePool | example-us-east4-primary                    | config-control |

## Resource References

- [ContainerNodePool](https://cloud.google.com/config-connector/docs/reference/resource-docs/container/containernodepool)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gke/nodepools/primary@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./primary/"
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
