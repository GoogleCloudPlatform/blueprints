# gke-cluster-nodepool package

GKE node pool with dedicated service account

## Setters

```
Setter               Usages
cluster-name         12
location             2
max-node-count       2
nodepool-name        12
platform-namespace   9
platform-project-id  6
projects-namespace   1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File           APIVersion                               Kind               Name                                         Namespace
node-iam.yaml  iam.cnrm.cloud.google.com/v1beta1        IAMPolicyMember    artifactreader-gke-example-us-east4-primary  config-control
node-iam.yaml  iam.cnrm.cloud.google.com/v1beta1        IAMPolicyMember    logwriter-gke-example-us-east4-primary       config-control
node-iam.yaml  iam.cnrm.cloud.google.com/v1beta1        IAMPolicyMember    metricwriter-gke-example-us-east4-primary    config-control
node-iam.yaml  iam.cnrm.cloud.google.com/v1beta1        IAMServiceAccount  gke-example-us-east4-primary                 config-control
nodepool.yaml  container.cnrm.cloud.google.com/v1beta1  ContainerNodePool  example-us-east4-primary                     config-control
```

## Resource References

- [ContainerNodePool](https://cloud.google.com/config-connector/docs/reference/resource-docs/container/containernodepool)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)

