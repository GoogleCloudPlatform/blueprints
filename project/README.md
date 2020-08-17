# Project package

This package creates a project and all required configuration needed in order to
manage this project with Yakima.

Contents:

*   `project.yaml` - contains project configuration.
*   `project-management.yaml` - contains configuration needed in order for
    Yakima to manage resources within that project:
    *   Google Service Account to use for editing resources in the project.
    *   Policy binding for permissions for this Google Service Account.
    *   Namespace within Yakima for resources in this project.
    *   Config Connector context to bind Config Connector controller for this
        manespace with the Google Service Account.
    *   Binding of the Google Service Account with the Kubernetes Service
        Account used by Config Connector controller.
