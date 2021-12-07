# GKE blueprint

A GKE cluster with a primary node pool and a dedicated subnet.

For a full tutorial, see
[Managing GKE clusters with ConfigController](https://cloud.google.com/anthos-config-management/docs/tutorials/gke-cluster-blueprint).

## Setters

```
Setter                Usages
cluster-name          15
environment           2
location              5
master-ip-range       2
max-node-count        2
network-name          2
network-project-id    3
networking-namespace  1
node-ip-range         0
nodepool-name         12
platform-namespace    11
pod-ip-range          1
project-id            11
projects-namespace    3
security-group        2
service-ip-range      1
subnet-name           2
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

