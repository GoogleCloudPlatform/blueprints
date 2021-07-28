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

