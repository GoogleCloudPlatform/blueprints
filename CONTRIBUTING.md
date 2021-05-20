# Contributing

This document provides guidelines for contributing to the blueprint.

## Dependencies

The following dependencies must be installed on the development system:

- [Docker Engine][docker-engine]
- [Google Cloud SDK][google-cloud-sdk]
- [make]

## Integration Testing

Integration tests are used to verify the behaviour of the blueprint.
Additions, changes, and fixes should be accompanied with tests.

The integration tests are run using the Go testing framework. These
tools are packaged within a Docker image for convenience.

The general strategy for these tests is to verify the behaviour of the
[blueprints](./blueprints/), thus ensuring that the blueprints are all functionally correct.


### Test Environment
The easiest way to test a blueprint is in an isolated test project using an ACP cluster.
The setup for such a project is defined in [create_test_project](./scripts/create_test_project.sh) script.
Bootstraping is automated via [create_bootstrap](./scripts/create_bootstrap.sh) script

To use this setup, you need Project Creator access on a folder.

Generate application default credentials like so:

```
gcloud auth application-default login
```

You will also need to set a few environment variables:
```
export ORG_ID="your_org_id"
export FOLDER_ID="your_folder_id"
export BILLING_ACCOUNT="your_billing_account_id"
```

With these settings in place, you can prepare a test project using Docker:
```
make docker_test_project_prepare
```

After creating export the project id which will be used in other stages.

```
export PROJECT_ID=ci-blueprints-****
```

After exporting PROJECT_ID, to setup an ACP cluster run:

```
make docker_test_bootstrap_prepare
```

### Interactive Execution

1. Run `make docker_run` to start the testing Docker container in
   interactive mode.

1. Run `source scripts/test_helpers.sh && bptest_init` to initialize the test helpers, generate ACP credentials etc

1. Run `bptest_list` to see available tests

1. Run `bptest_run TestName` to run a single test

1. Run `bptest_run_all` to run all available tests

[docker-engine]: https://www.docker.com/products/docker-engine
[google-cloud-sdk]: https://cloud.google.com/sdk/install
[make]: https://en.wikipedia.org/wiki/Make_(software)