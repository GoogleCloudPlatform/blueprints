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
$ kpt cfg list-setters .
./
         NAME                  VALUE          SET BY   DESCRIPTION   COUNT   REQUIRED   IS SET
  cluster-name          example-us-east4                             11      No         No
  location              us-east4                                     1       No         No
  max-node-count        2                                            1       No         No
  nodepool-name         primary                                      11      No         No
  platform-namespace    config-control                               8       No         No
  platform-project-id   platform-project-id                          5       No         No
  projects-namespace    projects                                     0       No         No
```
