# Namespace

A Kubernetes namespace with appropriate defaults

## Setters

```
Setter                 Usages
cluster-name           3
namespace-admin-group  2
namespace-name         3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File              APIVersion                    Kind         Name              Namespace
namespace.yaml    v1                            Namespace    example-ns
rolebinding.yaml  rbac.authorization.k8s.io/v1  RoleBinding  namespace-admins  example-ns
```

## Resource References

- [Namespace](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#namespace-v1-core)
- [RoleBinding](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#rolebinding-v1-rbac-authorization-k8s-io)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/namespace@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./namespace/"
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
