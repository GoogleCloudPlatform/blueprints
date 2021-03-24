# project-number-ref kpt function

The project-number-ref kpt function allows for IAMPolicyMember resources to apply to GCP Managed ServiceAccounts that have names which include a Project number.

The Project number will be extracted from the Project at runtime using a FieldReference. The FieldReference will create a ConfigMap that contains the project number. And the IAMPolicyMember will be wrapped in a FutureObject that reads the ConfigMap and delays creation of the IAMPolicyMember until the Project number is available and can be substituted into the ServiceAccount email in the IAMPolicyMember's `member` field, indicated by the `${project-number}` substring.

To allow Cork to read Project resources and read/write IAMPolicyMember resources, the appropriate Roles and RoleBindings will be generated, as needed.

## Input

This function modifies [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember) resources with the `cnrm.cloud.google.com/project-number-ref` annotation.

## Output

Executing the project-number-ref function will:
- Wrap IAMPolicyMember resources with Cork FutureObject
- Add Cork ResourceReference to read the project number from the referenced Project
- Add Role and RoleBinding to allow Cork to read from the referenced Project
- Add Role and RoleBinding to allow Cork to write the modified IAMPolicyMember

## Requirements

To apply the output of this function, Cork must be installed in the `orchestrator-system` namespace, using the `default` service account.

## Usage

1. Create an [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember) resource in a yaml file.
2. Template the ServiceAccount name in the `member` field with the `${project-number}`.
    Example:
    ```
    member: "serviceAccount:service-${project-number}@container-engine-robot.iam.gserviceaccount.com"
    ```
3. Add a `project-number-ref` annotation to identify which project the project-number should come from.
    Example:
    ```
    annotations:
      cnrm.cloud.google.com/project-number-ref: service-project-id
    ```
4. Add a `function` annotation to configure this resource as input to a containerized kpt function.
    Example:
    ```
    annotations:
      config.kubernetes.io/function: |
        container:
          image: gcr.io/yakima-eap/project-number-ref:latest
    ```
5. Run [kpt fn run](https://googlecontainertools.github.io/kpt/guides/consumer/function/#declarative-run) on the directory containing the IAMPolicyMember yaml file.
    Example:
    ```
    kpt fn run .
    ```

## Input Example

```
apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: service-project-id-container-network-user
  namespace: projects
  annotations:
    cnrm.cloud.google.com/project-id: host-project-id
    cnrm.cloud.google.com/project-number-ref: service-project-id
    config.kubernetes.io/function: |
      container:
        image: gcr.io/yakima-eap/project-number-ref:latest
spec:
  member: "serviceAccount:service-${project-number}@container-engine-robot.iam.gserviceaccount.com"
  role: roles/compute.networkUser
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Project
    name: host-project-id
    namespace: projects
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Further Reading

- https://googlecontainertools.github.io/kpt/guides/consumer/function/
