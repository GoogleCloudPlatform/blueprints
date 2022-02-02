<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Cloud DNS Policy blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A Cloud DNS policy with logging and forwarding

## Setters

|      Name       |       Value        | Type | Count |
|-----------------|--------------------|------|-------|
| dns-policy-name | default-dns-policy | str  |     1 |
| namespace       | networking         | str  |     2 |
| network-name    | example-network    | str  |     1 |
| project-id      | project-id         | str  |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|    File     |            APIVersion             |   Kind    |        Name        | Namespace  |
|-------------|-----------------------------------|-----------|--------------------|------------|
| policy.yaml | dns.cnrm.cloud.google.com/v1beta1 | DNSPolicy | default-dns-policy | networking |

## Resource References

- [DNSPolicy](https://cloud.google.com/config-connector/docs/reference/resource-docs/dns/dnspolicy)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/dns/policy@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./policy/"
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
