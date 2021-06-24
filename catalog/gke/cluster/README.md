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
$ kpt cfg list-setters .
./
          NAME                       VALUE                SET BY   DESCRIPTION   COUNT   REQUIRED   IS SET
  cluster-name           example-us-west4                                        3       No         No
  environment            dev                                                     1       No         No
  location               us-east4                                                1       No         No
  master-ip-range        10.254.0.0/28                                           1       No         No
  network-name           default                                                 1       No         No
  network-project-id     network-project-id                                      1       No         No
  networking-namespace   networking                                              1       No         No
  platform-namespace     config-control                                          1       No         No
  platform-project-id    platform-project-id                                     5       No         No
  projects-namespace     projects                                                1       No         No
  security-group         gke-security-group@example.com                          1       No         No
```
