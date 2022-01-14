<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# CSR GitOps Pipeline blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A GitOps Continuous Deployment pipeline using Anthos Config Management (ACM),
Cloud Source Repository (CSR), and Cloud Build.

After installing this blueprint, you will be able to:

1.  Manage your git repository config with version control
2.  Manage your infrastructure with version control
3.  Create merge requests to review changes
4.  Manage plain KRM or auto-rendered blueprints
5.  Specify kpt functions to hydrate and validate your config automatically
6.  Automatically apply your config changes to your Config Controller
    cluster on merge

## Setters

|      Name       |      Value      | Type | Count |
|-----------------|-----------------|------|-------|
| cluster-name    | cluster-name    | str  |     9 |
| configsync-dir  | config          | str  |     1 |
| deployment-repo | deployment-repo | str  |     4 |
| namespace       | config-control  | str  |    10 |
| project-id      | project-id      | str  |    16 |
| project-number  |   1234567890123 | str  |     2 |
| source-repo     | source-repo     | str  |     5 |

## Sub-packages

- [configsync-csr](configsync)

## Resources

|           File           |                 APIVersion                 |         Kind         |               Name               |   Namespace    |
|--------------------------|--------------------------------------------|----------------------|----------------------------------|----------------|
| cloudbuild-iam.yaml      | iam.cnrm.cloud.google.com/v1beta1          | IAMPartialPolicy     | deployment-repo-cloudbuild-write | config-control |
| cloudbuild-iam.yaml      | iam.cnrm.cloud.google.com/v1beta1          | IAMPartialPolicy     | source-repo-cloudbuild-read      | config-control |
| hydration-trigger.yaml   | cloudbuild.cnrm.cloud.google.com/v1beta1   | CloudBuildTrigger    | source-repo-cicd-trigger         | config-control |
| services.yaml            | serviceusage.cnrm.cloud.google.com/v1beta1 | Service              | sourcerepo.googleapis.com        | config-control |
| services.yaml            | serviceusage.cnrm.cloud.google.com/v1beta1 | Service              | cloudbuild.googleapis.com        | config-control |
| source-repositories.yaml | sourcerepo.cnrm.cloud.google.com/v1beta1   | SourceRepoRepository | source-repo                      | config-control |
| source-repositories.yaml | sourcerepo.cnrm.cloud.google.com/v1beta1   | SourceRepoRepository | deployment-repo                  | config-control |

## Resource References

- [CloudBuildTrigger](https://cloud.google.com/config-connector/docs/reference/resource-docs/cloudbuild/cloudbuildtrigger)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)
- [SourceRepoRepository](https://cloud.google.com/config-connector/docs/reference/resource-docs/sourcerepo/sourcereporepository)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gitops@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./gitops/"
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
