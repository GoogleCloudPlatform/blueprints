# project-package package

A project and a project namespace in which to manage project resources with
Config Controller.

## Setters

```
Setter                 Usages
billing-account-id     1
folder-name            1
folder-namespace       1
management-namespace   2
management-project-id  6
networking-namespace   1
project-id             18
projects-namespace     3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                       APIVersion                                     Kind                    Name                                               Namespace
cnrm-cross-namespace.yaml  rbac.authorization.k8s.io/v1                   RoleBinding             cnrm-network-viewer-project-id                     networking
cnrm-cross-namespace.yaml  rbac.authorization.k8s.io/v1                   RoleBinding             cnrm-project-viewer-project-id                     projects
project-management.yaml    core.cnrm.cloud.google.com/v1beta1             ConfigConnectorContext  configconnectorcontext.core.cnrm.cloud.google.com  project-id
project-management.yaml    iam.cnrm.cloud.google.com/v1beta1              IAMPolicyMember         kcc-project-id-owners-permissions                  projects
project-management.yaml    iam.cnrm.cloud.google.com/v1beta1              IAMPolicyMember         project-id-sa-workload-identity-binding            config-control
project-management.yaml    iam.cnrm.cloud.google.com/v1beta1              IAMServiceAccount       kcc-project-id                                     config-control
project-management.yaml    v1                                             Namespace               project-id
project.yaml               resourcemanager.cnrm.cloud.google.com/v1beta1  Project                 project-id                                         projects
```

## Resource References

- [ConfigConnectorContext](https://cloud.google.com/config-connector/docs/how-to/advanced-install#addon-configuring)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)
- [Namespace](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#namespace-v1-core)
- [Project](https://cloud.google.com/config-connector/docs/reference/resource-docs/resourcemanager/project)
- [RoleBinding](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#rolebinding-v1-rbac-authorization-k8s-io)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/project@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./project/"
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

