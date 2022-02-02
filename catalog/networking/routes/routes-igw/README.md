<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Internet Gateway Compute Route blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
An egress route to the default internet gateway

## Setters

|       Name        |     Value     | Type | Count |
|-------------------|---------------|------|-------|
| destination-range | 0.0.0.0/0     | str  |     1 |
| namespace         | networking    | str  |     2 |
| network-name      | network-name  | str  |     1 |
| project-id        | project-id    | str  |     1 |
| route-name        | route-example | str  |     1 |

## Sub-packages

This package has no sub-packages.

## Resources

|    File    |              APIVersion               |     Kind     |     Name      | Namespace  |
|------------|---------------------------------------|--------------|---------------|------------|
| route.yaml | compute.cnrm.cloud.google.com/v1beta1 | ComputeRoute | route-example | networking |

## Resource References

- [ComputeRoute](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computeroute)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/routes/routes-igw@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./routes-igw/"
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
