# GKE ACM blueprint

A GKEHub Membership and ACM enrollment blueprint for Config Sync and Policy Controller for a pre-provisioned GKE cluster

## Setters

```
Setter                    Usages
auditIntervalSeconds      2
cluster-name              5
exemptableNamespaces      2
feature-membership-name   2
feature-name              3
gcpServiceAccountEmail    2
location                  3
logDeniesEnabled          2
membership-name           3
platform-namespace        6
platform-project-id       10
policyDir                 2
referentialRulesEnabled   2
sourceFormat              2
syncBranch                2
syncRepo                  2
syncRev                   2
syncWaitSecs              2
templateLibraryInstalled  2
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                     APIVersion                                  Kind                     Name                                     Namespace
acm-membership-api.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service                  platform-project-id-cluster-name-acm     platform-namespace
acm-membership-api.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service                  platform-project-id-cluster-name-gkehub  platform-namespace
config-mgmt-csr.yaml     gkehub.cnrm.cloud.google.com/v1beta1        GKEHubFeatureMembership  feature-membership-name                  platform-namespace
config-mgmt.yaml         gkehub.cnrm.cloud.google.com/v1beta1        GKEHubFeature            feature-name                             platform-namespace
membership.yaml          gkehub.cnrm.cloud.google.com/v1beta1        GKEHubMembership         membership-name                          platform-namespace
```

## Resource References

- [GKEHubFeatureMembership](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubfeaturemembership)
- [GKEHubFeature](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubfeature)
- [GKEHubMembership](https://cloud.google.com/config-connector/docs/reference/resource-docs/gkehub/gkehubmembership)
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

