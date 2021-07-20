# GKE Cluster Package

A kpt package to configure a GKE cluster.

## Resources

- [cluster.yaml](/catalog/gke/cluster/cluster.yaml)
  - [ContainerCluster](https://cloud.google.com/config-connector/docs/reference/resource-docs/container/containercluster) to configure a GKE cluster.
- [container-api.yaml](/catalog/gke/cluster/container-api.yaml)
  - [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service) to enable the container.googleapis.com API.

## Setters

Setters are inherited by sub-packages.

```
$ utils/kpt-list-setters.sh catalog/gke/cluster --count
Setter                Usages
cluster-name          4
environment           2
location              2
master-ip-range       2
networking-namespace  2
network-name          2
network-project-id    2
platform-namespace    2
platform-project-id   6
projects-namespace    2
security-group        2
```
