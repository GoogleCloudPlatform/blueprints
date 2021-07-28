# env-bu-hierarchy package

Resource hierarchy blueprint for GCP

## Setters

```
Setter     Usages
namespace  3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                             APIVersion                                     Kind                Name                  Namespace
hierarchy.yaml                   blueprints.cloud.google.com/v1alpha3           ResourceHierarchy   root-hierarchy        hierarchy
policies/naming-constraint.yaml  constraints.gatekeeper.sh/v1beta1              GCPEnforceNamingV2  enforce-folder-names
shared-folders.yaml              resourcemanager.cnrm.cloud.google.com/v1beta1  Folder              dev.shared            hierarchy
shared-folders.yaml              resourcemanager.cnrm.cloud.google.com/v1beta1  Folder              prod.shared           hierarchy
```

## Resource References

- [Folder](https://cloud.google.com/config-connector/docs/reference/resource-docs/resourcemanager/folder)
- GCPEnforceNamingV2
- ResourceHierarchy

