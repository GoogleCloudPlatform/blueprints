# GitLab Git Ops Pipeline
## Author:
jcwc@

## Description:
TODO(jcwc): Add description

**To apply the blueprint:**
TODO(jcwc): See if we can consolidate to one single blueprint. Currently blocked by the fact that providers are created before resources and there's
no "depends_on" primitive in Terraform across modules/ providers. GitLab Provider needs Personal Access Token generated from the helm chart + provisioner.

```
# Apply GitLab in cluster blueprint first
cd gitlab-in-cluster
terraform init
terraform plan
terraform apply

# Apply Git Ops pipeline blueprint after
cd ../git-ops-pipeline
terraform init
terraform plan
terraform apply
```

## Prerequisites:
- Terraform installed
- gcloud installed
- kubectl installed with Yakima cluster context
- Yakima cluster
