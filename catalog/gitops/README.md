# CSR GitOps Pipeline blueprint

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

```
Setter           Usages
cluster-name     9
configsync-dir   1
deployment-repo  4
namespace        10
project-id       16
project-number   2
source-repo      5
```

## Sub-packages

- [configsync](/catalog/gitops/configsync)

## Resources

```
File                      APIVersion                                  Kind                  Name                              Namespace
cloudbuild-iam.yaml       iam.cnrm.cloud.google.com/v1beta1           IAMPartialPolicy       deployment-repo-cloudbuild-write  config-control
cloudbuild-iam.yaml       iam.cnrm.cloud.google.com/v1beta1           IAMPartialPolicy       source-repo-cloudbuild-read       config-control
hydration-trigger.yaml    cloudbuild.cnrm.cloud.google.com/v1beta1    CloudBuildTrigger     source-repo-cicd-trigger          config-control
services.yaml             serviceusage.cnrm.cloud.google.com/v1beta1  Service               cloudbuild.googleapis.com         config-control
services.yaml             serviceusage.cnrm.cloud.google.com/v1beta1  Service               sourcerepo.googleapis.com         config-control
source-repositories.yaml  sourcerepo.cnrm.cloud.google.com/v1beta1    SourceRepoRepository  deployment-repo                   config-control
source-repositories.yaml  sourcerepo.cnrm.cloud.google.com/v1beta1    SourceRepoRepository  source-repo                       config-control
```

## Resource References

- [CloudBuildTrigger](https://cloud.google.com/config-connector/docs/reference/resource-docs/cloudbuild/cloudbuildtrigger)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)
- [SourceRepoRepository](https://cloud.google.com/config-connector/docs/reference/resource-docs/sourcerepo/sourcereporepository)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gitops@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./gitops/"
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
