# service-controls-perimeter package

**TODO: add description**

## Setters

```
Setter               Usages
access-policy-name   2
namespace            4
org-id               1
perimeter-name       5
project-id           1
project-namespace    1
restricted-services  1
suffix               5
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File               APIVersion                                          Kind                                  Name                Namespace
access-level.yaml  accesscontextmanager.cnrm.cloud.google.com/v1beta1  AccessContextManagerAccessLevel       alregionperimeter   networking
perimeter.yaml     accesscontextmanager.cnrm.cloud.google.com/v1beta1  AccessContextManagerServicePerimeter  spcregionperimeter  networking
```

## Resource References

- [AccessContextManagerAccessLevel](https://cloud.google.com/config-connector/docs/reference/resource-docs/accesscontextmanager/accesscontextmanageraccesslevel)
- [AccessContextManagerServicePerimeter](https://cloud.google.com/config-connector/docs/reference/resource-docs/accesscontextmanager/accesscontextmanagerserviceperimeter)

