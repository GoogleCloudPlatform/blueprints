# Project blueprint

A project and a project namespace in which to manage project resources with
Config Connector.

## Setters

```
Setter                 Usages
billing-account-id     1
folder-name            1
folder-namespace       1
management-namespace   2
management-project-id  6
networking-namespace   1
project-id             18
projects-namespace     3
```

## Sub-packages

- [kcc-namespace](/catalog/project/kcc-namespace)

## Resources

```
File          APIVersion                                     Kind     Name        Namespace
project.yaml  resourcemanager.cnrm.cloud.google.com/v1beta1  Project  project-id  projects
```

## Resource References

- [Project](https://cloud.google.com/config-connector/docs/reference/resource-docs/resourcemanager/project)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/project@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./project/"
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

