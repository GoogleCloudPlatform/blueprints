<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Cloud SQL Auth Proxy blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
Launch a Cloud SQL Auth proxy instance as a DaemonSet in Kubernetes

## Setters

|        Name        |              Value               | Type | Count |
|--------------------|----------------------------------|------|-------|
| CONNECTION_NAME    | example-connection               | str  |     1 |
| containerName      | gce-proxy                        | str  |     1 |
| daemonsetName      | cloud-sql-auth-proxy             | str  |     4 |
| image              | gcr.io/cloudsql-docker/gce-proxy | str  |     1 |
| namespace          | default                          | str  |     3 |
| serviceAccountName | cloud-sql-proxy-sa               | str  |     1 |
| serviceName        | cloud-sql-auth-proxy             | str  |     5 |
| servieAccountName  | cloud-sql-auth-proxy             | str  |     1 |
| tag                | 1.30.0                           | str  |     4 |

## Sub-packages

This package has no sub-packages.

## Resources

|        File        | APIVersion |      Kind      |         Name         | Namespace |
|--------------------|------------|----------------|----------------------|-----------|
| daemonset.yml      | apps/v1    | DaemonSet      | cloud-sql-auth-proxy | default   |
| service.yml        | v1         | Service        | cloud-sql-auth-proxy | default   |
| serviceAccount.yml | v1         | ServiceAccount | cloud-sql-auth-proxy | default   |

## Resource References

- DaemonSet
- [ServiceAccount](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#serviceaccount-v1-core)
- [Service](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#service-v1-core)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/cloud-sql-auth-proxy@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./cloud-sql-auth-proxy/"
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
