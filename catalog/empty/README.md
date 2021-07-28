# Empty blueprint

An example of an empty blueprint.

## Setters

This package has no top-level setters. See sub-packages.

## Sub-packages

This package has no sub-packages.

## Resources

```
File       APIVersion  Kind       Name  Namespace
noop.yaml  v1          ConfigMap  noop  config-control
```

## Resource References

- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/empty@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./empty/"
    ```

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

