# namespace

A Kubernetes namespace with appropriate defaults for use with ACM enrolled clusters. It creates a namespace, assigns admin role for the created namespace to a given email group, and creates a RepoSync for the created namespace.

## Setters

```
Setter                     Usages
config-dir                 2
gcp-service-account-email  2
namespace-admin-group      2
namespace-name             7
namespace-repo             2
platform-namespace         2
platform-project-id        4
ref-sa-namespace-repo      2
repo                       0
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                          APIVersion                         Kind              Name                    Namespace
namespace-repo-sync-iam.yaml  iam.cnrm.cloud.google.com/v1beta1  IAMPartialPolicy  cluster-namespace-name  config-control
namespace-repo-sync.yaml      configsync.gke.io/v1beta1          RepoSync          repo-sync               namespace-name
namespace.yaml                v1                                 Namespace         namespace-name
rolebinding.yaml              rbac.authorization.k8s.io/v1       RoleBinding       namespace-name-admin    namespace-name
```

## Resource References

- RepoSync
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
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

