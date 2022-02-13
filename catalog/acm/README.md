<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# ACM blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A blueprint to install Anthos Config Management (ACM) on an existing GKE cluster. The installation is done by enrolling the cluster into GKE Hub Membership, enabling and configuring the ACM feature.

## Setters

|     Name      |                          Value                           | Type | Count |
|---------------|----------------------------------------------------------|------|-------|
| cluster-name  | cluster-name                                             | str  |    16 |
| location      | us-east4                                                 | str  |     2 |
| project-id    | project-id                                               | str  |    18 |
| sync-repo     | https://source.developers.google.com/p/project_id/r/repo | str  |     1 |
| sync-repo-ref | projects/project-id/repos/repo-name                      | str  |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|         File          |                 APIVersion                 |          Kind           |                    Name                    |   Namespace    |
|-----------------------|--------------------------------------------|-------------------------|--------------------------------------------|----------------|
| config-mgmt-csr.yaml  | gkehub.cnrm.cloud.google.com/v1beta1       | GKEHubFeatureMembership | acm-membership-cluster-name                | config-control |
| config-mgmt-iam.yaml  | iam.cnrm.cloud.google.com/v1beta1          | IAMServiceAccount       | sa-acm-cluster-name                        | config-control |
| config-mgmt-iam.yaml  | iam.cnrm.cloud.google.com/v1beta1          | IAMPartialPolicy        | sa-acm-cluster-name                        | config-control |
| config-mgmt-iam.yaml  | iam.cnrm.cloud.google.com/v1beta1          | IAMPartialPolicy        | source-reader-sync-cluster-name-project-id | config-control |
| feat-config-mgmt.yaml | gkehub.cnrm.cloud.google.com/v1beta1       | GKEHubFeature           | feat-acm-cluster-name                      | config-control |
| membership.yaml       | gkehub.cnrm.cloud.google.com/v1beta1       | GKEHubMembership        | hub-membership-cluster-name                | config-control |
| services.yaml         | serviceusage.cnrm.cloud.google.com/v1beta1 | Service                 | project-id-cluster-name-gkehub             | config-control |
| services.yaml         | serviceusage.cnrm.cloud.google.com/v1beta1 | Service                 | project-id-cluster-name-acm                | config-control |

## Resource References

- [GKEHubFeatureMembership](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubfeaturemembership)
- [GKEHubFeature](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubfeature)
- [GKEHubMembership](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubmembership)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/acm@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./acm/"
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
