# Google Cloud Storage and Memorystore for Redis blueprint

Google Cloud Storage (GCS) bucket and Memorystore for Redis instance.

This blueprint demonstrates multiple unrelated resources sharing a package.

## Setters

```
Setter         Usages
name           4
namespace      3
network        1
project-id     8
region         1
storage-class  1
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File         APIVersion                                  Kind           Name                             Namespace
bucket.yaml  storage.cnrm.cloud.google.com/v1beta1       StorageBucket  blueprints-project-redis-bucket  config-control
redis.yaml   redis.cnrm.cloud.google.com/v1beta1         RedisInstance  blueprints-project-redis-bucket  config-controller-system
redis.yaml   serviceusage.cnrm.cloud.google.com/v1beta1  Service        blueprints-project-redis-bucket  config-control
```

## Resource References

- [RedisInstance](https://cloud.google.com/config-connector/docs/reference/resource-docs/redis/redisinstance)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)
- [StorageBucket](https://cloud.google.com/config-connector/docs/reference/resource-docs/storage/storagebucket)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/redis-bucket@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./redis-bucket/"
    ```

1.  Edit the function config file(s):
    - setters.yaml

1.  Execute the function pipeline
    ```
    kpt fn render
    ```

1.  Initialize the resource inventory
    ```
    kpt live init --namespace ${NAMESPACE}"
    ```
    Replace `${NAMESPACE}` with the namespace in which to manage
    the inventory ResourceGroup (for example, `config-control`).

1.  Apply the package resources to your cluster
    ```
    kpt live apply
    ```

1.  Wait for the resources to be ready
    ```
    kpt live status --output table --poll-until current
    ```

