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
management-namespace   27
management-project-id  50
org-id                 30
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
namespaces/logging.yaml                          core.cnrm.cloud.google.com/v1beta1             ConfigConnectorContext  configconnectorcontext.core.cnrm.cloud.google.com  logging
namespaces/logging.yaml                          iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         logging-sa-bigqueryadmin-permissions               config-control
namespaces/logging.yaml                          iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         logging-sa-logadmin-permissions                    config-control
namespaces/logging.yaml                          iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         logging-sa-workload-identity-binding               config-control
namespaces/logging.yaml                          iam.cnrm.cloud.google.com/v1beta1              IAMServiceAccount       logging-sa                                         config-control
namespaces/logging.yaml                          rbac.authorization.k8s.io/v1                   RoleBinding             allow-resource-reference-from-logging              projects
namespaces/logging.yaml                          v1                                             Namespace               logging
namespaces/networking.yaml                       core.cnrm.cloud.google.com/v1beta1             ConfigConnectorContext  configconnectorcontext.core.cnrm.cloud.google.com  networking
namespaces/networking.yaml                       iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         networking-sa-dns-permissions                      config-control
namespaces/networking.yaml                       iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         networking-sa-networkadmin-permissions             config-control
namespaces/networking.yaml                       iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         networking-sa-security-permissions                 config-control
namespaces/networking.yaml                       iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         networking-sa-service-control-permissions          config-control
namespaces/networking.yaml                       iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         networking-sa-workload-identity-binding            config-control
namespaces/networking.yaml                       iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         networking-sa-xpnadmin-permissions                 config-control
namespaces/networking.yaml                       iam.cnrm.cloud.google.com/v1beta1              IAMServiceAccount       networking-sa                                      config-control
namespaces/networking.yaml                       rbac.authorization.k8s.io/v1                   RoleBinding             allow-resource-reference-from-networking           projects
namespaces/networking.yaml                       v1                                             Namespace               networking
namespaces/policies.yaml                         core.cnrm.cloud.google.com/v1beta1             ConfigConnectorContext  configconnectorcontext.core.cnrm.cloud.google.com  policies
namespaces/policies.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         policies-sa-orgpolicyadmin-permissions             config-control
namespaces/policies.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         policies-sa-workload-identity-binding              config-control
namespaces/policies.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMServiceAccount       policies-sa                                        config-control
namespaces/policies.yaml                         v1                                             Namespace               policies
namespaces/projects.yaml                         core.cnrm.cloud.google.com/v1beta1             ConfigConnectorContext  configconnectorcontext.core.cnrm.cloud.google.com  projects
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-billinguser-permissions                config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-projectcreator-permissions             config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-projectdeleter-permissions             config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-projectmover-permissions               config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-serviceusageadmin-permissions          config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMPartialPolicy         projects-sa-workload-identity-binding              config-control
namespaces/projects.yaml                         iam.cnrm.cloud.google.com/v1beta1              IAMServiceAccount       projects-sa                                        config-control
namespaces/projects.yaml                         v1                                             Namespace               projects
policies/deletion-policy-required-template.yaml  templates.gatekeeper.sh/v1beta1                ConstraintTemplate      gcprequiredeletionpolicy
policies/disable-guest-attributes.yaml           resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   disable-guest-attributes                           policies
policies/disable-nested-virtualization.yaml      resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   disable-nested-virtualization                      policies
policies/disable-sa-key-creation.yaml            resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   disable-sa-key-creation                            policies
policies/disable-serial-port.yaml                resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   disable-serial-port                                policies
policies/disable-vm-external-ip.yaml             resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   disable-vm-external-ip                             policies
policies/enforce-uniform-bucket-lvl-access.yaml  resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   enforce-uniform-bucket-lvl-access                  policies
policies/folder-naming-constraint-template.yaml  templates.gatekeeper.sh/v1beta1                ConstraintTemplate      gcpenforcenamingv2
policies/restrict-cloud-sql-public-ip.yaml       resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   restrict-cloud-sql-public-ip                       policies
policies/restrict-lien-removal.yaml              resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   restrict-lien-removal                              policies
policies/skip-default-network.yaml               resourcemanager.cnrm.cloud.google.com/v1beta1  ResourceManagerPolicy   skip-default-network                               policies
services.yaml                                    serviceusage.cnrm.cloud.google.com/v1beta1     Service                 management-project-id-cloudbilling                 config-control
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
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/landing-zone@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./landing-zone/"
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
