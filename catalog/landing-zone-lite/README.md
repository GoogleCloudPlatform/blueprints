<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Landing Zone Lite blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
Foundational landing zone blueprint for GCP for creating only a resource
hierarchy and projects.

This blueprint configures organization level IAM permissions.

For a full tutorial, see
[Deploy a landing zone blueprint](https://cloud.google.com/anthos-config-management/docs/tutorials/landing-zone).

## Setters

|         Name          |                Value                | Type | Count |
|-----------------------|-------------------------------------|------|-------|
| billing-account-id    | AAAAAA-BBBBBB-CCCCCC                | str  |     0 |
| group-billing-admins  | gcp-billing-admins@example.com      | str  |     1 |
| group-org-admins      | gcp-organization-admins@example.com | str  |     1 |
| management-namespace  | config-control                      | str  |    14 |
| management-project-id | management-project-id               | str  |    24 |
| org-id                |                        123456789012 | str  |    11 |

## Sub-packages

This package has no sub-packages.

## Resources

|           File            |              APIVersion              |          Kind          |                       Name                        |   Namespace    |
|---------------------------|--------------------------------------|------------------------|---------------------------------------------------|----------------|
| iam.yaml                  | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | org-admins-iam                                    | config-control |
| iam.yaml                  | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | billing-admins-iam                                | config-control |
| namespaces/hierarchy.yaml | iam.cnrm.cloud.google.com/v1beta1    | IAMServiceAccount      | hierarchy-sa                                      | config-control |
| namespaces/hierarchy.yaml | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | hierarchy-sa-folderadmin-permissions              | config-control |
| namespaces/hierarchy.yaml | iam.cnrm.cloud.google.com/v1beta1    | IAMPartialPolicy       | hierarchy-sa-workload-identity-binding            | config-control |
| namespaces/hierarchy.yaml | rbac.authorization.k8s.io/v1         | RoleBinding            | allow-resource-reference-from-hierarchy           | hierarchy      |
| namespaces/hierarchy.yaml | v1                                   | Namespace              | hierarchy                                         |                |
| namespaces/hierarchy.yaml | core.cnrm.cloud.google.com/v1beta1   | ConfigConnectorContext | configconnectorcontext.core.cnrm.cloud.google.com | hierarchy      |
| namespaces/projects.yaml  | iam.cnrm.cloud.google.com/v1beta1    | IAMServiceAccount      | projects-sa                                       | config-control |
| namespaces/projects.yaml  | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | projects-sa-projectiamadmin-permissions           | config-control |
| namespaces/projects.yaml  | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | projects-sa-projectcreator-permissions            | config-control |
| namespaces/projects.yaml  | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | projects-sa-projectmover-permissions              | config-control |
| namespaces/projects.yaml  | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | projects-sa-projectdeleter-permissions            | config-control |
| namespaces/projects.yaml  | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | projects-sa-billinguser-permissions               | config-control |
| namespaces/projects.yaml  | iam.cnrm.cloud.google.com/v1beta1    | IAMPolicyMember        | projects-sa-serviceusageadmin-permissions         | config-control |
| namespaces/projects.yaml  | iam.cnrm.cloud.google.com/v1beta1    | IAMPartialPolicy       | projects-sa-workload-identity-binding             | config-control |
| namespaces/projects.yaml  | v1                                   | Namespace              | projects                                          |                |
| namespaces/projects.yaml  | core.cnrm.cloud.google.com/v1beta1   | ConfigConnectorContext | configconnectorcontext.core.cnrm.cloud.google.com | projects       |
| services.yaml             | blueprints.cloud.google.com/v1alpha1 | ProjectServiceSet      | management-project-id                             | config-control |

## Resource References

- ProjectServiceSet
- [ConfigConnectorContext](https://cloud.google.com/config-connector/docs/how-to/advanced-install#addon-configuring)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)
- [Namespace](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#namespace-v1-core)
- [RoleBinding](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#rolebinding-v1-rbac-authorization-k8s-io)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/landing-zone-lite@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./landing-zone-lite/"
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
