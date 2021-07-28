# spanner package

Spanner database and instance with deletion policy

## Setters

```
Setter         Usages
config-region  1
database-name  1
instance-name  3
namespace      2
num-nodes      1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                                               APIVersion                             Kind                      Name                                                 Namespace
policies/deletion-policy-required-constraint.yaml  constraints.gatekeeper.sh/v1beta1      GCPRequireDeletionPolicy  enforce-deletion-policy-annotation-spanner-instance
spanner.yaml                                       spanner.cnrm.cloud.google.com/v1beta1  SpannerDatabase           spanner-sample-database                              my-namespace
spanner.yaml                                       spanner.cnrm.cloud.google.com/v1beta1  SpannerInstance           spanner-sample-instance                              my-namespace
```

## Resource References

- GCPRequireDeletionPolicy
- [SpannerDatabase](https://cloud.google.com/config-connector/docs/reference/resource-docs/spanner/spannerdatabase)
- [SpannerInstance](https://cloud.google.com/config-connector/docs/reference/resource-docs/spanner/spannerinstance)

