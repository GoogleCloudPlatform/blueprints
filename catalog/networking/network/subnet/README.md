# subnetwork-package package

**TODO: add description**

## Setters

```
Setter                              Usages
ip-cidr-range                       1
namespace                           3
network-name                        6
prefix                              4
project-id                          3
region                              3
source-subnetwork-ip-ranges-to-nat  1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                             Kind               Name                     Namespace
nat.yaml     compute.cnrm.cloud.google.com/v1beta1  ComputeRouterNAT   network-name-router-nat  networking
nat.yaml     compute.cnrm.cloud.google.com/v1beta1  ComputeRouter      network-name-router      networking
subnet.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeSubnetwork  network-name-subnetwork  networking
```

## Resource References

- [ComputeRouter](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computerouter)
- [ComputeRouterNAT](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computerouternat)
- [ComputeSubnetwork](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computesubnetwork)
- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)

