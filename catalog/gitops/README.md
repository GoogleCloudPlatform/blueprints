# gitops package

This blueprint generates a GitOps CI/CD pipeline for use with ACM

## Setters

```
Setter           Usages
cluster-name     9
configsync-dir   1
deployment-repo  4
namespace        10
project-id       16
project-number   2
source-repo      5
```

## Sub-packages

- [catalog/gitops/configsync](/catalog/gitops/configsync/)

## Resources

```
File                      APIVersion                                  Kind                  Name                              Namespace
cloudbuild-iam.yaml       iam.cnrm.cloud.google.com/v1beta1           IAMPolicyMember       deployment-repo-cloudbuild-write  config-control
cloudbuild-iam.yaml       iam.cnrm.cloud.google.com/v1beta1           IAMPolicyMember       source-repo-cloudbuild-read       config-control
hydration-trigger.yaml    cloudbuild.cnrm.cloud.google.com/v1beta1    CloudBuildTrigger     source-repo-cicd-trigger          config-control
services.yaml             serviceusage.cnrm.cloud.google.com/v1beta1  Service               cloudbuild.googleapis.com         config-control
services.yaml             serviceusage.cnrm.cloud.google.com/v1beta1  Service               sourcerepo.googleapis.com         config-control
source-repositories.yaml  sourcerepo.cnrm.cloud.google.com/v1beta1    SourceRepoRepository  deployment-repo                   config-control
source-repositories.yaml  sourcerepo.cnrm.cloud.google.com/v1beta1    SourceRepoRepository  source-repo                       config-control
```

## Resource References

- [CloudBuildTrigger](https://cloud.google.com/config-connector/docs/reference/resource-docs/cloudbuild/cloudbuildtrigger)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)
- [SourceRepoRepository](https://cloud.google.com/config-connector/docs/reference/resource-docs/sourcerepo/sourcereporepository)

