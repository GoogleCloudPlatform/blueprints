# gke-cluster package

GKE cluster with public masters and private nodes

## Setters

```
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

## Sub-packages

This package has no sub-packages.

## Resources

```
File                APIVersion                                  Kind              Name                                        Namespace
cluster.yaml        container.cnrm.cloud.google.com/v1beta1     ContainerCluster  example-us-east4                            config-control
container-api.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service           platform-project-id-cluster-name-container  projects
```

## Resource References

- [ContainerCluster](https://cloud.google.com/config-connector/docs/reference/resource-docs/container/containercluster)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

