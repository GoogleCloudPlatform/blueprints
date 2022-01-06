<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Spanner blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
Spanner database and instance with deletion policy

## Setters

|     Name      |          Value          | Type | Count |
|---------------|-------------------------|------|-------|
| config-region | regional-us-central1    | str  |     1 |
| database-name | spanner-sample-database | str  |     1 |
| instance-name | spanner-sample-instance | str  |     3 |
| namespace     | my-namespace            | str  |     2 |
| num-nodes     |                       1 | int  |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|                       File                        |              APIVersion               |           Kind           |                        Name                         |  Namespace   |
|---------------------------------------------------|---------------------------------------|--------------------------|-----------------------------------------------------|--------------|
| policies/deletion-policy-required-constraint.yaml | constraints.gatekeeper.sh/v1beta1     | GCPRequireDeletionPolicy | enforce-deletion-policy-annotation-spanner-instance |              |
| spanner.yaml                                      | spanner.cnrm.cloud.google.com/v1beta1 | SpannerDatabase          | spanner-sample-database                             | my-namespace |
| spanner.yaml                                      | spanner.cnrm.cloud.google.com/v1beta1 | SpannerInstance          | spanner-sample-instance                             | my-namespace |

## Resource References

- GCPRequireDeletionPolicy
- [SpannerDatabase](https://cloud.google.com/config-connector/docs/reference/resource-docs/spanner/spannerdatabase)
- [SpannerInstance](https://cloud.google.com/config-connector/docs/reference/resource-docs/spanner/spannerinstance)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/spanner@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./spanner/"
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
