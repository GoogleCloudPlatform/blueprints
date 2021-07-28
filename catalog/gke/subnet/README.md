# GKE Subnet blueprint

A GCP subnet for a GKE cluster with private nodes

## Setters

```
Setter                Usages
cluster-name          3
location              2
networking-namespace  2
network-name          2
network-project-id    3
node-ip-range         2
platform-project-id   3
pod-ip-range          2
service-ip-range      2
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                             Kind               Name                                  Namespace
subnet.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeSubnetwork  platform-project-id-example-us-east4  networking
```

## Resource References

- [ComputeSubnetwork](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computesubnetwork)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gke/subnet@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./subnet/"
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

