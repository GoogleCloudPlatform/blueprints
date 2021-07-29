# Project Namespace Package

Kubernetes namespace configured for use with Config Connector to manage GCP
resources in a specific project.

## Setters

```
Setter                 Usages
management-namespace   2
management-project-id  6
networking-namespace   1
project-id             16
projects-namespace     2
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                       APIVersion                          Kind                    Name                                               Namespace
kcc-namespace-viewer.yaml  rbac.authorization.k8s.io/v1        RoleBinding             cnrm-network-viewer-project-id                     networking
kcc-namespace-viewer.yaml  rbac.authorization.k8s.io/v1        RoleBinding             cnrm-project-viewer-project-id                     projects
kcc-project-owner.yaml     iam.cnrm.cloud.google.com/v1beta1   IAMPolicyMember         kcc-project-id-owners-permissions                  projects
kcc.yaml                   core.cnrm.cloud.google.com/v1beta1  ConfigConnectorContext  configconnectorcontext.core.cnrm.cloud.google.com  project-id
kcc.yaml                   iam.cnrm.cloud.google.com/v1beta1   IAMPolicyMember         project-id-sa-workload-identity-binding            config-control
kcc.yaml                   iam.cnrm.cloud.google.com/v1beta1   IAMServiceAccount       kcc-project-id                                     config-control
namespace.yaml             v1                                  Namespace               project-id
```

## Resource References

- [ConfigConnectorContext](https://cloud.google.com/config-connector/docs/how-to/advanced-install#addon-configuring)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)
- [Namespace](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#namespace-v1-core)
- [RoleBinding](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#rolebinding-v1-rbac-authorization-k8s-io)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/project/kcc-namespace@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./kcc-namespace/"
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

