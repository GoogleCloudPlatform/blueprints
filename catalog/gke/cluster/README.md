<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# GKE Cluster blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A GKE cluster with public masters and private nodes

## Setters

|        Name         |                             Value                              | Type | Count |
|---------------------|----------------------------------------------------------------|------|-------|
| cluster-name        | example-us-west4                                               | str  |     2 |
| location            | us-east4                                                       | str  |     1 |
| master-ip-range     | 10.254.0.0/28                                                  | str  |     1 |
| network-ref         | projects/network-project-id/global/networks/default            | str  |     1 |
| pods-range-name     | pods                                                           | str  |     1 |
| project-id          | project-id                                                     | str  |     4 |
| security-group      | gke-security-groups@example.com                                | str  |     1 |
| services-range-name | services                                                       | str  |     1 |
| subnet-ref          | projects/network-project-id/regions/region/subnetworks/default | str  |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|        File        |                 APIVersion                 |       Kind       |               Name                |   Namespace    |
|--------------------|--------------------------------------------|------------------|-----------------------------------|----------------|
| cluster.yaml       | container.cnrm.cloud.google.com/v1beta1    | ContainerCluster | example-us-east4                  | config-control |
| container-api.yaml | serviceusage.cnrm.cloud.google.com/v1beta1 | Service          | project-id-cluster-name-container | config-control |

## Resource References

- [ContainerCluster](https://cloud.google.com/config-connector/docs/reference/resource-docs/container/containercluster)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/gke/cluster@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./cluster/"
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
