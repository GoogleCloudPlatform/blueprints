# gke-cluster-subnet package

GCP subnet for a GKE cluster

## Setters

```
Setter                Usages
cluster-name          3
location              2
networking-namespace  2
network-name          2
network-project-id    3
node-ip-range         2
platform-project-id   3
pod-ip-range          2
service-ip-range      2
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                             Kind               Name                                  Namespace
subnet.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeSubnetwork  platform-project-id-example-us-east4  networking
```

## Resource References

- [ComputeSubnetwork](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computesubnetwork)
- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)

