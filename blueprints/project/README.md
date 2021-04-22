# Project package

This package creates a project and all required configuration needed in order to
manage this project with Yakima.

Contents:

- `project.yaml` - project config.
- `project-management.yaml` - config to allow Yakima to manage project resources:
  - Google Service Account to use for editing resources in the project.
  - Policy binding for permissions for this Google Service Account.
  - Namespace within Yakima for resources in this project.
  - Config Connector context to bind Config Connector controller for this
    manespace with the Google Service Account.
  - Binding of the Google Service Account with the Kubernetes Service
    Account used by Config Connector controller.
- `cnrm-cross-namespace.yaml` - config to allow Config Connector resources in the
   new Yakima namespace for this project to reference other resources in the
   networking and projects namespaces.

## Installation

This setup will be repeated once for every project.
Each project will create a different clone for the kpt package.

1. This must be done within your DRY (aka "source") repository.

   ```sh
   cd ${SOURCE_REPO?}
   ```

2. Make a copy of the kpt package and find the setters. This project ID will be
   the project to be created, **Not** the Yakima hosting cluster.

   ```sh
   kpt pkg get sso://cnrm/blueprints.git/project@master ${NEW_PROJECT_ID?}
   kpt cfg list-setters ${NEW_PROJECT_ID?}
   ```

3. Specify the managing project. Note that this is the project which hosts the
   yakima cluster.

   ```sh
   kpt cfg set ${NEW_PROJECT_ID?} projects-namespace ${YAKIMA_PROJECT_ID?}
   kpt cfg set ${NEW_PROJECT_ID?} iam-namespace ${YAKIMA_PROJECT_ID?}
   kpt cfg set ${NEW_PROJECT_ID?} iam-project-id ${YAKIMA_PROJECT_ID?}
   ```

4. Set the rest of the project fields and commit!

   ```sh
   kpt cfg set ${NEW_PROJECT_ID?} billing-account-id ${BILLING_ACCOUNT_ID?}
   kpt cfg set ${NEW_PROJECT_ID?} project-id ${NEW_PROJECT_ID?}
   kpt cfg set ${NEW_PROJECT_ID?} project-id ${PARENT_FOLDER_ID?}

   git add . && git commit -m "create project ${NEW_PROJECT_ID?}" && git push

   # Verify project creation
   kubectl -n ${YAKIMA_PROJECT_ID?} get projects \
     -o custom-columns=NAME:.metadata.name,COND:.status.conditions[*].reason,READY:.status.conditions[*].status
   ```

## Verification

```sh
# YAKIMA_PROJECT_ID is the project that hosts the Yakima cluster
kubectl -n ${YAKIMA_PROJECT_ID?} get projects \
  -o custom-columns=NAME:.metadata.name,COND:.status.conditions[*].reason,READY:.status.conditions[*].status,MSG:.status.conditions[*].message \
  -w
```
