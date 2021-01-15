# Blueprints Testing

## Overview
These are E2E tests for blueprints

## Test strategy
https://g3doc.corp.google.com/cloud/config/yakima/g3doc/Landing-Zone/Tests.md

## Dependencies
- gcloud (alpha is needed as well)
- kubectl
- kpt
- go

## How to run tests
**Presubmits:**
```
./scripts/ci-test_presubmit --project ${PROJECT_ID}
```
  - Make sure your project is [whitelisted with ACP](https://g3doc.corp.google.com/cloud/config/yakima/g3doc/Landing-Zone/Allowlists.md?cl=head#acp-api-visibility)
  - If you don't specify a project, it will use the `yakima-eap-testing` project by default. This can cause conflicts with existing presubmit runs triggered by Gerrit. Avoid this unless you're purposefully trying to test on that particular project since it may cause presubmit race conditions with in-progress runs.

**E2E tests:**
```
./scripts/run_blueprints_test.sh ${GO_LANG_TEST_NAME} \
  -project=${PROJECT_ID} -org=${ORG_ID} -billing-account=${BILLING_ACCOUNT_ID}
```
  - Make sure your project is [whitelisted with ACP](https://g3doc.corp.google.com/cloud/config/yakima/g3doc/Landing-Zone/Allowlists.md?cl=head#acp-api-visibility)
  - `${GO_LANG_TEST_NAME}` is a regexp matching the function name of the test in `*_test.go` that you want to run.
    - To run all the tests, pass `Test.*` to `${GO_LANG_TEST_NAME}`
  - If you don't specify your own project ID, it uses the `blueprints-eap-testing` project in the `blueprints.integ.testing.joonix.net` organization with `Blueprints Platform` as the billing account. Avoid this unless you're purposefully trying to test on this particular config since it may cause race conditions w/ the periodic and release in-progress test runs.
  - You can create your own test org pretty quickly by following [this guide](https://g3doc.corp.google.com/company/teams/elysium/creating_a_test_organization.md?cl=head).

## Development
When making a change to tests, make sure to re-run the test files using your own dev environment if possible, otherwise changes could introduce breakages in our release pipelines. `scripts/ci-test_presubmit.sh` and `scripts/ci-build_presubmit.sh` will be run when you create a new code review in Gerrit, but the e2e test will not. For that reason, it's better to run the tests locally to confirm they work before submitting changes that could break those.

## Prow jobs
- `scripts/ci-test_presubmit.sh`: https://prow-gob.gcpnode.com/?job=blueprints-bootstrap-test
- `scripts/ci-build_presubmit.sh`: https://prow-gob.gcpnode.com/?job=blueprints-e2e-test-build
- `scripts/ci-test_release.sh`: https://prow-gob.gcpnode.com/?job=periodic-blueprints-git-release
- `scripts/ci-test_periodic.sh`: https://prow-gob.gcpnode.com/?job=periodic-blueprints-e2e-test

All tests run using in prow `yakima-eap-testing@yakima-eap.iam.gserviceaccount.com`
