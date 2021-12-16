# Landing Zone blueprint

Foundational landing zone blueprint for GCP.

This blueprint configures organization level IAM permissions.

For a full tutorial, see
[Deploy a landing zone blueprint](https://cloud.google.com/anthos-config-management/docs/tutorials/landing-zone).

## Setters

```
Setter                 Usages
billing-account-id     0
group-billing-admins   1
group-org-admins       1
management-namespace   15
management-project-id  26
org-id                 2
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                                             APIVersion                                     Kind                    Name                                               Namespace
iam.yaml                                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         billing-admins-iam                                 config-control
iam.yaml                                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         org-admins-iam                                     config-control
namespaces/hierarchy.yaml                        core.cnrm.cloud.google.com/v1beta1             ConfigConnectorContext  configconnectorcontext.core.cnrm.cloud.google.com  hierarchy
namespaces/hierarchy.yaml                        iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         hierarchy-sa-folderadmin-permissions               config-control
namespaces/hierarchy.yaml                        iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         hierarchy-sa-workload-identity-binding             config-control
namespaces/hierarchy.yaml                        iam.cnrm.cloud.google.com/v1beta1              IAMServiceAccount       hierarchy-sa                                       config-control
namespaces/hierarchy.yaml                        rbac.authorization.k8s.io/v1                   RoleBinding             allow-resource-reference-from-hierarchy            hierarchy
namespaces/hierarchy.yaml                        v1                                             Namespace               hierarchy
namespaces/projects.yaml                         core.cnrm.cloud.google.com/v1beta1             ConfigConnectorContext  configconnectorcontext.core.cnrm.cloud.google.com  projects
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-billinguser-permissions                config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-projectiamadmin-permissions            config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-projectcreator-permissions             config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-projectdeleter-permissions             config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-projectmover-permissions               config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-serviceusageadmin-permissions          config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-workload-identity-binding              config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMServiceAccount       projects-sa                                        config-control
namespaces/projects.yaml                         v1                                             Namespace               projects
services.yaml                                    serviceusage.cnrm.cloud.google.com/v1beta1     Service                 management-project-id-cloudbilling                 config-control
services.yaml                                    serviceusage.cnrm.cloud.google.com/v1beta1     Service                 management-project-id-resourcemanager              config-control
services.yaml                                    serviceusage.cnrm.cloud.google.com/v1beta1     Service                 management-project-id-serviceusage                 config-control
```

## Resource References

- [ConfigConnectorContext](https://cloud.google.com/config-connector/docs/how-to/advanced-install#addon-configuring)
- ConstraintTemplate
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)
- [Namespace](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#namespace-v1-core)
- [ResourceManagerPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/resourcemanager/resourcemanagerpolicy)
- [RoleBinding](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#rolebinding-v1-rbac-authorization-k8s-io)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/landing-zone-lite@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./landing-zone-lite/"
    ```

1.  Edit the function config file(s):
    - setters.yaml

1.  Execute the function pipeline
    ```
    kpt fn render
    ```

1.  Initialize the resource inventory
    ```
    kpt live init --namespace ${NAMESPACE}"
    ```
    Replace `${NAMESPACE}` with the namespace in which to manage
    the inventory ResourceGroup (for example, `config-control`).

1.  Apply the package resources to your cluster
    ```
    kpt live apply
    ```

1.  Wait for the resources to be ready
    ```
    kpt live status --output table --poll-until current
    ```
