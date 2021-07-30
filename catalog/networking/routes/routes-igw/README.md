# Internet Gateway Compute Route blueprint

An egress route to the default internet gateway

## Setters

```
Setter             Usages
destination-range  1
namespace          2
network-name       1
project-id         1
route-name         1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File        APIVersion                             Kind          Name           Namespace
route.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeRoute  route-example  networking
```

## Resource References

- [ComputeRoute](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computeroute)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/routes/routes-igw@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./routes-igw/"
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

