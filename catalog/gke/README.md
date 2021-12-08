# GKE blueprint

A GKE cluster with a primary node pool. An existing subnet needs to be provided where the cluster should be created.

## Setters

```
Setter               Usages
cluster-name         13
location             2
master-ip-range      1
max-node-count       1
network-ref          1
nodepool-name        11
platform-namespace   9
pods-range-name      1
project-id           9
projects-namespace   1
security-group       1
services-range-name  1
subnet-ref           1
```

## Sub-packages

- [cluster](/catalog/gke/cluster)
- [nodepools/primary](/catalog/gke/nodepools/primary)

## Resources

This package has no top-level resources. See sub-packages.

## Resource References

This package has no top-level resources. See sub-packages.

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gke@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./gke/"
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

