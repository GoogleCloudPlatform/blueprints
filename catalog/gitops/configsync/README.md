# configsync-csr package

Configure Config Sync to use Cloud Source Repository (CSR)

## Setters

```
Setter           Usages
cluster-name     8
configsync-dir   1
deployment-repo  1
namespace        3
project-id       9
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                    APIVersion                         Kind               Name                                        Namespace
config-management.yaml  configmanagement.gke.io/v1         ConfigManagement   config-management
configsync-iam.yaml     iam.cnrm.cloud.google.com/v1beta1  IAMPolicyMember    source-reader-sync-cluster-name-project-id  config-control
configsync-iam.yaml     iam.cnrm.cloud.google.com/v1beta1  IAMPolicyMember    sync-cluster-name                           config-control
configsync-iam.yaml     iam.cnrm.cloud.google.com/v1beta1  IAMServiceAccount  sync-cluster-name                           config-control
```

## Resource References

- [ConfigManagement](https://cloud.google.com/anthos-config-management/docs/configmanagement-fields)
- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)

