# GKE Subnet Package

A kpt package to configure a GCE subnetwork.

## Resources

- [subnet.yaml](/catalog/gke/subnet/subnet.yaml)
  - [ComputeSubnetwork](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computesubnetwork) to configure a GCE subnetwork

## Setters

Setters are inherited by sub-packages.

```
$ utils/kpt-list-setters.sh catalog/gke/subnet --count
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
