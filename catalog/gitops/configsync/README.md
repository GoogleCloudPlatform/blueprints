# CSR ConfigSync blueprint

A GitOps Continuous Deployment pipeline using Anthos Config Management (ACM)
and Cloud Source Repository (CSR).

After installing this blueprint, you will be able to:

1.  Manage your infrastructure with version control
2.  Manage plain KRM or manually rendered blueprints
3.  Automatically apply your config changes to your Config Controller
    cluster on merge

## Setters

```
Setter           Usages
cluster-name     8
configsync-dir   1
deployment-repo  1
namespace        3
project-id       9
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                    APIVersion                         Kind               Name                                        Namespace
config-management.yaml  configmanagement.gke.io/v1         ConfigManagement   config-management
configsync-iam.yaml     iam.cnrm.cloud.google.com/v1beta1  IAMPartialPolicy    source-reader-sync-cluster-name-project-id  config-control
configsync-iam.yaml     iam.cnrm.cloud.google.com/v1beta1  IAMPartialPolicy    sync-cluster-name                           config-control
configsync-iam.yaml     iam.cnrm.cloud.google.com/v1beta1  IAMServiceAccount  sync-cluster-name                           config-control
```

## Resource References

- [ConfigManagement](https://cloud.google.com/anthos-config-management/docs/configmanagement-fields)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gitops/configsync@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./configsync/"
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
