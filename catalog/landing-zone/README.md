<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Landing Zone blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
Foundational landing zone blueprint for GCP.

This blueprint configures organization level IAM permissions.

For a full tutorial, see
[Deploy a landing zone blueprint](https://cloud.google.com/anthos-config-management/docs/tutorials/landing-zone).

## Setters

|         Name          |                Value                | Type | Count |
|-----------------------|-------------------------------------|------|-------|
| billing-account-id    | AAAAAA-BBBBBB-CCCCCC                | str  |     0 |
| group-billing-admins  | gcp-billing-admins@example.com      | str  |     1 |
| group-org-admins      | gcp-organization-admins@example.com | str  |     1 |
| management-namespace  | config-control                      | str  |    28 |
| management-project-id | management-project-id               | str  |    52 |
| org-id                |                        123456789012 | str  |    32 |

## Sub-packages

This package has no sub-packages.

## Resources

|                      File                       |                  APIVersion                   |          Kind          |                       Name                        |   Namespace    |
|-------------------------------------------------|-----------------------------------------------|------------------------|---------------------------------------------------|----------------|
| iam.yaml                                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | org-admins-iam                                    | config-control |
| iam.yaml                                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | billing-admins-iam                                | config-control |
| namespaces/hierarchy.yaml                       | iam.cnrm.cloud.google.com/v1beta1             | IAMServiceAccount      | hierarchy-sa                                      | config-control |
| namespaces/hierarchy.yaml                       | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | hierarchy-sa-folderadmin-permissions              | config-control |
| namespaces/hierarchy.yaml                       | iam.cnrm.cloud.google.com/v1beta1             | IAMPartialPolicy       | hierarchy-sa-workload-identity-binding            | config-control |
| namespaces/hierarchy.yaml                       | rbac.authorization.k8s.io/v1                  | RoleBinding            | allow-resource-reference-from-hierarchy           | hierarchy      |
| namespaces/hierarchy.yaml                       | v1                                            | Namespace              | hierarchy                                         |                |
| namespaces/hierarchy.yaml                       | core.cnrm.cloud.google.com/v1beta1            | ConfigConnectorContext | configconnectorcontext.core.cnrm.cloud.google.com | hierarchy      |
| namespaces/logging.yaml                         | v1                                            | Namespace              | logging                                           |                |
| namespaces/logging.yaml                         | core.cnrm.cloud.google.com/v1beta1            | ConfigConnectorContext | configconnectorcontext.core.cnrm.cloud.google.com | logging        |
| namespaces/logging.yaml                         | iam.cnrm.cloud.google.com/v1beta1             | IAMServiceAccount      | logging-sa                                        | config-control |
| namespaces/logging.yaml                         | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | logging-sa-logadmin-permissions                   | config-control |
| namespaces/logging.yaml                         | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | logging-sa-bigqueryadmin-permissions              | config-control |
| namespaces/logging.yaml                         | iam.cnrm.cloud.google.com/v1beta1             | IAMPartialPolicy       | logging-sa-workload-identity-binding              | config-control |
| namespaces/logging.yaml                         | rbac.authorization.k8s.io/v1                  | RoleBinding            | allow-resource-reference-from-logging             | projects       |
| namespaces/networking.yaml                      | iam.cnrm.cloud.google.com/v1beta1             | IAMServiceAccount      | networking-sa                                     | config-control |
| namespaces/networking.yaml                      | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | networking-sa-networkadmin-permissions            | config-control |
| namespaces/networking.yaml                      | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | networking-sa-security-permissions                | config-control |
| namespaces/networking.yaml                      | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | networking-sa-dns-permissions                     | config-control |
| namespaces/networking.yaml                      | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | networking-sa-service-control-permissions         | config-control |
| namespaces/networking.yaml                      | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | networking-sa-xpnadmin-permissions                | config-control |
| namespaces/networking.yaml                      | iam.cnrm.cloud.google.com/v1beta1             | IAMPartialPolicy       | networking-sa-workload-identity-binding           | config-control |
| namespaces/networking.yaml                      | v1                                            | Namespace              | networking                                        |                |
| namespaces/networking.yaml                      | rbac.authorization.k8s.io/v1                  | RoleBinding            | allow-resource-reference-from-networking          | projects       |
| namespaces/networking.yaml                      | core.cnrm.cloud.google.com/v1beta1            | ConfigConnectorContext | configconnectorcontext.core.cnrm.cloud.google.com | networking     |
| namespaces/policies.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMServiceAccount      | policies-sa                                       | config-control |
| namespaces/policies.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | policies-sa-orgpolicyadmin-permissions            | config-control |
| namespaces/policies.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPartialPolicy       | policies-sa-workload-identity-binding             | config-control |
| namespaces/policies.yaml                        | v1                                            | Namespace              | policies                                          |                |
| namespaces/policies.yaml                        | core.cnrm.cloud.google.com/v1beta1            | ConfigConnectorContext | configconnectorcontext.core.cnrm.cloud.google.com | policies       |
| namespaces/projects.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMServiceAccount      | projects-sa                                       | config-control |
| namespaces/projects.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | projects-sa-projectiamadmin-permissions           | config-control |
| namespaces/projects.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | projects-sa-projectcreator-permissions            | config-control |
| namespaces/projects.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | projects-sa-projectmover-permissions              | config-control |
| namespaces/projects.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | projects-sa-projectdeleter-permissions            | config-control |
| namespaces/projects.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | projects-sa-billinguser-permissions               | config-control |
| namespaces/projects.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPolicyMember        | projects-sa-serviceusageadmin-permissions         | config-control |
| namespaces/projects.yaml                        | iam.cnrm.cloud.google.com/v1beta1             | IAMPartialPolicy       | projects-sa-workload-identity-binding             | config-control |
| namespaces/projects.yaml                        | v1                                            | Namespace              | projects                                          |                |
| namespaces/projects.yaml                        | core.cnrm.cloud.google.com/v1beta1            | ConfigConnectorContext | configconnectorcontext.core.cnrm.cloud.google.com | projects       |
| policies/deletion-policy-required-template.yaml | templates.gatekeeper.sh/v1beta1               | ConstraintTemplate     | gcprequiredeletionpolicy                          |                |
| policies/disable-guest-attributes.yaml          | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | disable-guest-attributes                          | policies       |
| policies/disable-iam-grants-default-sa.yaml     | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | disable-iam-grants-default-sa                     | policies       |
| policies/disable-nested-virtualization.yaml     | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | disable-nested-virtualization                     | policies       |
| policies/disable-sa-key-creation.yaml           | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | disable-sa-key-creation                           | policies       |
| policies/disable-serial-port.yaml               | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | disable-serial-port                               | policies       |
| policies/disable-vm-external-ip.yaml            | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | disable-vm-external-ip                            | policies       |
| policies/enforce-uniform-bucket-lvl-access.yaml | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | enforce-uniform-bucket-lvl-access                 | policies       |
| policies/folder-naming-constraint-template.yaml | templates.gatekeeper.sh/v1beta1               | ConstraintTemplate     | gcpenforcenamingv2                                |                |
| policies/restrict-cloud-sql-public-ip.yaml      | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | restrict-cloud-sql-public-ip                      | policies       |
| policies/restrict-lien-removal.yaml             | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | restrict-lien-removal                             | policies       |
| policies/skip-default-network.yaml              | resourcemanager.cnrm.cloud.google.com/v1beta1 | ResourceManagerPolicy  | skip-default-network                              | policies       |
| services.yaml                                   | blueprints.cloud.google.com/v1alpha1          | ProjectServiceSet      | management-project-id                             | config-control |

## Resource References

- ConstraintTemplate
- ProjectServiceSet
- [ConfigConnectorContext](https://cloud.google.com/config-connector/docs/how-to/advanced-install#addon-configuring)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)
- [Namespace](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#namespace-v1-core)
- [ResourceManagerPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/resourcemanager/resourcemanagerpolicy)
- [RoleBinding](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#rolebinding-v1-rbac-authorization-k8s-io)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/landing-zone@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./landing-zone/"
    ```

1.  Edit the function config file(s):
    - setters.yaml

1.  Execute the function pipeline
    ```shell
    kpt fn render
    ```

1.  Initialize the resource inventory
    ```shell
    kpt live init --namespace ${NAMESPACE}"
    ```
    Replace `${NAMESPACE}` with the namespace in which to manage
    the inventory ResourceGroup (for example, `config-control`).

1.  Apply the package resources to your cluster
    ```shell
    kpt live apply
    ```

1.  Wait for the resources to be ready
    ```shell
    kpt live status --output table --poll-until current
    ```

<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
