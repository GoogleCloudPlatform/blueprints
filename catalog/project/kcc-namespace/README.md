# Project Config Connector Namespace Package

A kpt package to configure a Kubernetes namespace for use with Config Connector
to manage GCP resources in a specific project.

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
- [RoleBinding](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#rolebinding-v1-rbac-authorization-k8s-io)
- [Namespace](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#namespace-v1-core)

## Sub-packages

None.

## Setters

Setters are inherited by sub-packages.

```
$ kpt cfg list-setters .
./
          NAME                    VALUE           SET BY            DESCRIPTION             COUNT   REQUIRED   IS SET
  management-namespace    config-control                                                    2       No         No
  management-project-id   management-project-id            Config Controller host project   6       No         No
                                                           id.
  networking-namespace    networking                       Namespace for networking.        1       No         No
  project-id              project-id                       Project ID                       16      No         No
  projects-namespace      projects                         Namespace for projects.          2       No         No
```
