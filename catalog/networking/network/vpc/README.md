# vpc-package package

**TODO: add description**

## Setters

```
Setter        Usages
namespace     1
network-name  1
project-id    3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File           APIVersion                                  Kind            Name                Namespace
services.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service         project-id-compute  projects
vpc.yaml       compute.cnrm.cloud.google.com/v1beta1       ComputeNetwork  network-name        networking
```

## Resource References

- [ComputeNetwork](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computenetwork)
- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

