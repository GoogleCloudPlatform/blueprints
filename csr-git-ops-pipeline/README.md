# CSR Git Ops Pipeline
## Author:
jcwc@

## Description:
This blueprint describes a Yakima Cloud Source Repositories enabled Git Ops pipeline.
It uses CSR + Cloudbuild to enable a full CI/CD pipeline; accepting kpt functions
in the source repo to perform hydration and validation. This package uses [kpt](https://googlecontainertools.github.io/kpt/guides/)
to configure its fields. Run ```kpt cfg list-setters csr-git-ops-pipeline/``` to
see the list of configurable fields and corresponding descriptions.

**To apply the blueprint:**
```
kubectl apply -f csr-git-ops-pipeline/

# This is needed for Config Sync to properly sync from the CSR repo. We're looking
# for a workaround for this to be able to apply this blueprint without any additional
# steps.
kubectl annotate serviceaccount -n config-management-system importer \
        "iam.gke.io/gcp-service-account=${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
```

## Prerequisites:
- Yakima-enabled cluster
