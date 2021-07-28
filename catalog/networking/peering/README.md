# Network Peering blueprint

A peering between two private networks

## Setters

```
Setter         Usages
local-network  4
namespace      6
peer-network   4
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File          APIVersion                             Kind                   Name                           Namespace
peering.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeNetworkPeering  local-network-to-peer-network  namespace
peering.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeNetworkPeering  peer-network-to-local-network  namespace
```

## Resource References

- [ComputeNetworkPeering](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computenetworkpeering)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/peering@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./peering/"
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

