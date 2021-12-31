<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Cloud DNS Managed Zone Peering blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A private Cloud DNS managed zone with peering config

## Setters

|        Name         |         Value          | Type | Count |
|---------------------|------------------------|------|-------|
| domain              | example.com.           | str  |     1 |
| managed-zone-name   | private-managed-zone   | str  |     1 |
| namespace           | networking             | str  |     3 |
| network-name        | example-network        | str  |     1 |
| peered-network-name | example-peered-network | str  |     1 |
| project-id          | project-id             | str  |     3 |

## Sub-packages

This package has no sub-packages.

## Resources

|     File      |                 APIVersion                 |      Kind      |         Name          | Namespace  |
|---------------|--------------------------------------------|----------------|-----------------------|------------|
| dns.yaml      | dns.cnrm.cloud.google.com/v1beta1          | DNSManagedZone | dnsmanagedzone-sample | networking |
| services.yaml | serviceusage.cnrm.cloud.google.com/v1beta1 | Service        | project-id-dns        | projects   |

## Resource References

- [DNSManagedZone](https://cloud.google.com/config-connector/docs/reference/resource-docs/dns/dnsmanagedzone)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/dns/managedzone-peering@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./managedzone-peering/"
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
