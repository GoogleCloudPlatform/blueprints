# GKE Node Pool Package

A kpt package to configure a GKE node pool.

## Resources

- [node-iam.yaml](/catalog/gke/nodepool/primary/node-iam.yaml)
  - [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount) to identify GKE nodes in this pool
  - [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember) to allow fluentd to send logs to StackDriver
  - [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember) to allow fluentd to send metrics to StackDriver
  - [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember) to allow kubelet and docker or containerd to read container images from Artifact Registry in the platform project.
- [nodepool.yaml](/catalog/gke/nodepool/primary/nodepool.yaml)
  - [ContainerNodePool](https://cloud.google.com/config-connector/docs/reference/resource-docs/container/containernodepool) to configure a GKE node pool.

## Setters

Setters are inherited by sub-packages.

```
$ utils/kpt-list-setters.sh catalog/gke/nodepools/primary --count
Setter               Usages
cluster-name         12
location             2
max-node-count       2
nodepool-name        12
platform-namespace   9
platform-project-id  6
projects-namespace   1
```
