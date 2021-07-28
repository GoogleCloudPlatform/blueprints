# shared-vpc package

Configures a project as the Host project for a Shared VPC.

Creation of a Shared VPC requires **compute.organizations.enableXpnHost**
permission on the org. This permission can only be granted by an org admin.

## Setters

```
Setter      Usages
namespace   1
project-id  2
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File            APIVersion                             Kind                         Name                  Namespace
sharedVPC.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeSharedVPCHostProject  project-id-sharedvpc  networking
```

## Resource References

- [ComputeSharedVPCHostProject](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computesharedvpchostproject)
- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)

