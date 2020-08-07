# CSR Git Ops Pipeline
## Author:
jcwc@

## Description:
This blueprint describes a Yakima Cloud Source Repositories enabled Git Ops pipeline.
It uses CSR + Cloudbuild to enable a full CI/CD pipeline; accepting kpt functions
in the source repo to perform hydration and validation. This package uses [kpt](https://googlecontainertools.github.io/kpt/guides/)
to configure its fields. Run ```kpt cfg list-setters csr-git-ops-pipeline/``` to
see the list of configurable fields and corresponding descriptions.

## Prerequisites:
- Valid GCP project
- Yakima-enabled cluster
