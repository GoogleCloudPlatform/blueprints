# Artifact Registry Image Repository Kpt Package

For more details, see the [Tenant Factory Blueprint User Guide](http://go/tenant-factory-blueprint-user-guide).

## Dependencies

- A namespace of the name `${platform-project-id}` must exist with Config Connector enabled.
- The `artifactregistry.googleapis.com` service mut be enabled in the `${platform-project-id}` project

## Image URL Format

```
${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/[${PATH}/]${IMAGE_NAME}:${IMAGE_TAG}
```
