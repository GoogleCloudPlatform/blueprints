# GKE Package

A kpt package to configure a GKE cluster with a primary node pool and a dedicated subnet.

## Resources

None at top level. See sub-packages.

## Sub-packages

- [cluster](/catalog/gke/cluster/) - a GKE cluster
- [nodepools/primary](/catalog/gke/nodepools/primary/) - a GKE node pool
- [subnet](/catalog/gke/subnet/) - a GCE subnet, dedicated for use by this GKE cluster

## Setters

Setters are inherited by sub-packages.

```
$ kpt cfg list-setters .
./
          NAME                       VALUE                SET BY   DESCRIPTION   COUNT   REQUIRED   IS SET
  cluster-name           example-us-west4                                        0       No         No
  environment            dev                                                     0       No         No
  location               us-east4                                                0       No         No
  master-ip-range        10.254.0.0/28                                           0       No         No
  network-name           default                                                 0       No         No
  network-project-id     network-project-id                                      0       No         No
  networking-namespace   config-control                                          0       No         No
  node-ip-range          10.3.4.0/22                                             0       No         No
  platform-namespace     config-control                                          0       No         No
  platform-project-id    platform-project-id                                     0       No         No
  pod-ip-range           172.17.0.0/16                                           0       No         No
  projects-namespace     projects                                                0       No         No
  security-group         gke-security-group@example.com                          0       No         No
  service-ip-range       172.18.0.0/16                                           0       No         No
```
