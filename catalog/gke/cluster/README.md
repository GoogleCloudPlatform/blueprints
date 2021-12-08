# GKE Cluster blueprint

A GKE cluster with public masters and private nodes

## Setters

```
Setter               Usages
cluster-name         2
location             1
master-ip-range      1
network-ref          1
platform-namespace   1
pods-range-name      1
project-id           4
projects-namespace   1
security-group       1
services-range-name  1
subnet-ref           1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                APIVersion                                  Kind              Name                               Namespace
cluster.yaml        container.cnrm.cloud.google.com/v1beta1     ContainerCluster  example-us-east4                   config-control
container-api.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service           project-id-cluster-name-container  projects
```

## Resource References

- [ContainerCluster](https://cloud.google.com/config-connector/docs/reference/resource-docs/container/containercluster)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gke/cluster@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./cluster/"
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

