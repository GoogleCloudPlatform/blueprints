# GKE Subnet Package

A kpt package to configure a GCE subnetwork.

## Resources

- [subnet.yaml](/catalog/gke/subnet/subnet.yaml)
  - [ComputeSubnetwork](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computesubnetwork) to configure a GCE subnetwork

## Setters

Setters are inherited by sub-packages.

```
$ kpt cfg list-setters .
./
          NAME                  VALUE          SET BY   DESCRIPTION   COUNT   REQUIRED   IS SET
  cluster-name           example-us-west4                             2       No         No
  location               us-east4                                     1       No         No
  network-name           default                                      1       No         No
  network-project-id     network-project-id                           2       No         No
  networking-namespace   networking                                   1       No         No
  node-ip-range          10.3.4.0/22                                  1       No         No
  platform-project-id    platform-project-id                          2       No         No
  pod-ip-range           172.17.0.0/16                                1       No         No
  service-ip-range       172.18.0.0/16                                1       No         No
```
