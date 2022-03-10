<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Cloud DNS Record Set blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A Cloud DNS record set for a managed zone

## Setters

|       Name        |       Value        | Type  | Count |
|-------------------|--------------------|-------|-------|
| domain            | example.com.       | str   |     0 |
| managed-zone-name | foo                | str   |     1 |
| name              |                    | str   |     0 |
| namespace         | networking         | str   |     2 |
| project-id        | project-id         | str   |     1 |
| record-set-name   | record-set-example | str   |     1 |
| records           | [0.0.0.0]          | array |     1 |
| ttl               |                300 | int   |     1 |
| type              | A                  | str   |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|      File      |            APIVersion             |     Kind     |         Name          | Namespace  |
|----------------|-----------------------------------|--------------|-----------------------|------------|
| recordset.yaml | dns.cnrm.cloud.google.com/v1beta1 | DNSRecordSet | dnsrecordset-sample-a | networking |

## Resource References

- [DNSRecordSet](https://cloud.google.com/config-connector/docs/reference/resource-docs/dns/dnsrecordset)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/dns/recordset@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./recordset/"
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
