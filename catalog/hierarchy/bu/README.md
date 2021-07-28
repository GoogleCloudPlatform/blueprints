# bu-hierarchy package

Resource hierarchy blueprint for GCP

## Setters

```
Setter     Usages
namespace  1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                             APIVersion                            Kind                Name                  Namespace
hierarchy.yaml                   blueprints.cloud.google.com/v1alpha3  ResourceHierarchy   root-hierarchy        hierarchy
policies/naming-constraint.yaml  constraints.gatekeeper.sh/v1beta1     GCPEnforceNamingV2  enforce-folder-names
```

## Resource References

- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- GCPEnforceNamingV2
- ResourceHierarchy

