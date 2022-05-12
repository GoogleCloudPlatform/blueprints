<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Org IAMAuditConfig example


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
An example showing how to configure IAMAuditConfig for an organization.

## Setters

|   Name    |  Value  | Type | Count |
|-----------|---------|------|-------|
| namespace | logging | str  |     1 |
| org-id    |     123 | str  |     2 |

## Sub-packages

This package has no sub-packages.

## Resources

|    File    |            APIVersion             |      Kind      |        Name        | Namespace |
|------------|-----------------------------------|----------------|--------------------|-----------|
| audit.yaml | iam.cnrm.cloud.google.com/v1beta1 | IAMAuditConfig | 123-iamauditconfig | logging   |

## Resource References

- [IAMAuditConfig](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iamauditconfig)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/examples/iam-audit-configiam-audit-config@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./iam-audit-config/"
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
