<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Organizational Foundational IAM


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
This blueprint sets up recommended IAM roles for an enterprise organization in Google Cloud.

## Setters

|         Name          |                Value                | Type | Count |
|-----------------------|-------------------------------------|------|-------|
| group-devops          | gcp-devops@example.com              | str  |     1 |
| group-network-admins  | gcp-network-admins@example.com      | str  |     4 |
| group-org-admins      | gcp-organization-admins@example.com | str  |     1 |
| group-security-admins | gcp-security-admins@example.com     | str  |    10 |
| org-id                |                        123456789012 | str  |    16 |

## Sub-packages

This package has no sub-packages.

## Resources

|      File       |            APIVersion             |      Kind       |               Name                |   Namespace    |
|-----------------|-----------------------------------|-----------------|-----------------------------------|----------------|
| devops.yaml     | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | foundation-devops-folders         | config-control |
| networking.yaml | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | network-admins-compute            | config-control |
| networking.yaml | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | network-admins-shared-vpc         | config-control |
| networking.yaml | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | network-admins-security           | config-control |
| networking.yaml | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | network-admins-folders            | config-control |
| org.yaml        | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | foundation-org-admin              | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-org-policy        | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-security-reviewer | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-custom-roles      | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-scc               | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-folder-iam        | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-private-logs      | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-log-config        | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-gke               | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-gce               | config-control |
| security.yaml   | iam.cnrm.cloud.google.com/v1beta1 | IAMPolicyMember | security-admins-bq                | config-control |

## Resource References

- [IAMPolicyMember](https://cloud.google.com/config-connector/docs/reference/resource-docs/iam/iampolicymember)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/iam-foundation@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./iam-foundation/"
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
