# dns-peered-managed-zone package

**TODO: add description**

## Setters

```
Setter               Usages
domain               1
managed-zone-name    1
namespace            3
network-name         1
peered-network-name  1
project-id           3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File           APIVersion                                  Kind            Name                   Namespace
dns.yaml       dns.cnrm.cloud.google.com/v1beta1           DNSManagedZone  dnsmanagedzone-sample  networking
services.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service         project-id-dns         projects
```

## Resource References

- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- [DNSManagedZone](https://cloud.google.com/config-connector/docs/reference/resource-docs/dns/dnsmanagedzone)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

