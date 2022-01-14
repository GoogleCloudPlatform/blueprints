<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Subnetwork blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A regional subnet with Cloud NAT for public egress

## Setters

|                Name                |             Value             | Type | Count |
|------------------------------------|-------------------------------|------|-------|
| ip-cidr-range                      | 10.2.0.0/16                   | str  |     1 |
| namespace                          | networking                    | str  |     3 |
| network-name                       | network-name                  | str  |     2 |
| project-id                         | project-id                    | str  |     3 |
| region                             | us-central1                   | str  |     3 |
| source-subnetwork-ip-ranges-to-nat | ALL_SUBNETWORKS_ALL_IP_RANGES | str  |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|    File     |              APIVersion               |       Kind        |          Name           | Namespace  |
|-------------|---------------------------------------|-------------------|-------------------------|------------|
| nat.yaml    | compute.cnrm.cloud.google.com/v1beta1 | ComputeRouterNAT  | network-name-router-nat | networking |
| nat.yaml    | compute.cnrm.cloud.google.com/v1beta1 | ComputeRouter     | network-name-router     | networking |
| subnet.yaml | compute.cnrm.cloud.google.com/v1beta1 | ComputeSubnetwork | network-name-subnetwork | networking |

## Resource References

- [ComputeRouterNAT](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computerouternat)
- [ComputeRouter](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computerouter)
- [ComputeSubnetwork](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computesubnetwork)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/network/subnet@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./subnet/"
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
