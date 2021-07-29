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
$ kpt-list-setters.sh catalog/gke --count
Setter                Usages
cluster-name          19
environment           2
location              6
master-ip-range       2
max-node-count        2
networking-namespace  4
network-name          4
network-project-id    5
node-ip-range         2
nodepool-name         12
platform-namespace    11
platform-project-id   15
pod-ip-range          2
projects-namespace    3
security-group        2
service-ip-range      2
```
