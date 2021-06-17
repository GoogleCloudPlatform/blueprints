# Project package

This package creates a project and all required configuration needed in order to
manage this project with Config Controller.

Contents:

- `project.yaml` - project config.
- `project-management.yaml` - config to allow Config Controller to manage project resources:
  - Google Service Account to use for editing resources in the project.
  - Policy binding for permissions for this Google Service Account.
  - Namespace within Config Controller for resources in this project.
  - Config Connector context to bind Config Connector controller for this
    manespace with the Google Service Account.
  - Binding of the Google Service Account with the Kubernetes Service
    Account used by Config Connector controller.
- `cnrm-cross-namespace.yaml` - config to allow Config Connector resources in the
   new namespace for this project to reference other resources in the
   networking and projects namespaces.
