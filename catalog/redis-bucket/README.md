# redis-bucket package

Redis instance and storage bucket

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

- [ConfigMap](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#configmap-v1-core)
- [RedisInstance](https://cloud.google.com/config-connector/docs/reference/resource-docs/redis/redisinstance)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)
- [StorageBucket](https://cloud.google.com/config-connector/docs/reference/resource-docs/storage/storagebucket)

