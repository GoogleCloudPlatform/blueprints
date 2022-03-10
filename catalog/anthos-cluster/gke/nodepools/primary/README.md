# GKE Node Pool blueprint

A GKE node pool with a dedicated service account

## Setters

```
Setter              Usages
cluster-name        11
location            1
max-node-count      1
nodepool-name       11
platform-namespace  8
project-id          5
projects-namespace  0
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File           APIVersion                               Kind               Name                                         Namespace
node-iam.yaml  iam.cnrm.cloud.google.com/v1beta1        IAMPolicyMember    artifactreader-gke-example-us-east4-primary  config-control
node-iam.yaml  iam.cnrm.cloud.google.com/v1beta1        IAMPolicyMember    logwriter-gke-example-us-east4-primary       config-control
node-iam.yaml  iam.cnrm.cloud.google.com/v1beta1        IAMPolicyMember    metricwriter-gke-example-us-east4-primary    config-control
node-iam.yaml  iam.cnrm.cloud.google.com/v1beta1        IAMServiceAccount  gke-example-us-east4-primary                 config-control
nodepool.yaml  container.cnrm.cloud.google.com/v1beta1  ContainerNodePool  example-us-east4-primary                     config-control
```

## Resource References

- [ContainerNodePool](https://cloud.google.com/config-connector/docs/reference/resource-docs/container/containernodepool)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gke/nodepools/primary@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./primary/"
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

