<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Shared VPC Host Project blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
Configures a project as the Host project for a Shared VPC.

Creation of a Shared VPC requires **compute.organizations.enableXpnHost**
permission on the org. This permission can only be granted by an org admin.

## Setters

|    Name    |   Value    | Type | Count |
|------------|------------|------|-------|
| namespace  | networking | str  |     1 |
| project-id | project-id | str  |     2 |

## Sub-packages

This package has no sub-packages.

## Resources

|      File      |              APIVersion               |            Kind             |         Name         | Namespace  |
|----------------|---------------------------------------|-----------------------------|----------------------|------------|
| sharedVPC.yaml | compute.cnrm.cloud.google.com/v1beta1 | ComputeSharedVPCHostProject | project-id-sharedvpc | networking |

## Resource References

- [ComputeSharedVPCHostProject](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computesharedvpchostproject)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/shared-vpc@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./shared-vpc/"
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
