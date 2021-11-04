# ACM blueprint

A blueprint to install Anthos Config Management (ACM) on an existing GKE cluster. The installation is done by enrolling the cluster into GKE Hub Membership, enabling and configuring the ACM feature.

## Setters

```
Setter               Usages
cluster-name         17
location             3
platform-namespace   9
platform-project-id  20
policy-dir           2
sync-repo            2
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                     APIVersion                                  Kind                     Name                                                 Namespace
acm-membership-api.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service                  platform-project-id-cluster-name-acm                 platform-namespace
acm-membership-api.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service                  platform-project-id-cluster-name-gkehub              platform-namespace
config-mgmt-csr.yaml     gkehub.cnrm.cloud.google.com/v1beta1        GKEHubFeatureMembership  feature-membership-name                              platform-namespace
config-mgmt-iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMPartialPolicy         sa-acm-gke-cluster                                   platform-namespace
config-mgmt-iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMPartialPolicy         source-reader-sync-cluster-name-platform-project-id  platform-namespace
config-mgmt-iam.yaml     iam.cnrm.cloud.google.com/v1beta1           IAMServiceAccount        sa-acm-gke-cluster                                   platform-namespace
feat-config-mgmt.yaml    gkehub.cnrm.cloud.google.com/v1beta1        GKEHubFeature            feature-name                                         platform-namespace
membership.yaml          gkehub.cnrm.cloud.google.com/v1beta1        GKEHubMembership         membership-name                                      platform-namespace
```

## Resource References

- [GKEHubFeatureMembership](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubfeaturemembership)
- [GKEHubFeature](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubfeature)
- [GKEHubMembership](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubmembership)
- [IAMPartialPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampartialpolicy)
- [IAMServiceAccount](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamserviceaccount)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/acm@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./acm/"
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

