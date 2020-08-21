# Providers
provider "gitlab" {
  token    = var.gitlab_personal_access_token
  base_url = "https://gitlab.endpoints.${var.project_id}.cloud.goog"
}

provider "google" {
  project = var.project_id
}

provider "kubernetes" {
  config_context = "gke_${var.project_id}_${var.region}_${var.cluster_name}"
}

# 1. Create projects (repos) and an env variable for CI runner gitlab access
resource "gitlab_project" "source_repo" {
  name        = var.source_repo_name
  description = "Repo containing DRY config to be validated and hydrated"

  default_branch         = "master"
  visibility_level       = "private"
  shared_runners_enabled = true

  provisioner "local-exec" {
    command = <<EOF
      ${path.module}/scripts/initialize-source-repo.sh \
        ${var.gitlab_personal_access_token} \
        ${var.project_id} \
        ${var.source_repo_name}
    EOF
  }
}

resource "gitlab_project" "deployment_repo" {
  name        = var.deployment_repo_name
  description = "Repo containing WET (hydrated) config for Yakima to use"

  default_branch   = "master"
  visibility_level = "private"
}

resource "gitlab_project_variable" "gitlab_ci_access_token" {
  project           = gitlab_project.source_repo.id
  key               = "GITLAB_CI_ACCESS_TOKEN"
  value             = var.gitlab_personal_access_token
  environment_scope = "*"
}

resource "gitlab_project_variable" "project_id" {
  project           = gitlab_project.source_repo.id
  key               = "PROJECT_ID"
  value             = var.project_id
  environment_scope = "*"
}

resource "gitlab_project_variable" "source_repo" {
  project           = gitlab_project.source_repo.id
  key               = "SOURCE_REPO"
  value             = var.source_repo_name
  environment_scope = "*"
}

resource "gitlab_project_variable" "deployment_repo" {
  project           = gitlab_project.source_repo.id
  key               = "DEPLOYMENT_REPO"
  value             = var.deployment_repo_name
  environment_scope = "*"
}

resource "gitlab_project_variable" "email" {
  project           = gitlab_project.source_repo.id
  key               = "EMAIL"
  value             = var.email
  environment_scope = "*"
}

# 2. Configure Config Sync
data "google_container_cluster" "yakima_cluster" {
  name   = var.cluster_name
  region = var.region
}

module "config_sync" {
  # TODO(jcwc): Modify this to use the contents of the registry for more stable versioning. This is only to temporarily test.
  source = "github.com/terraform-google-modules/terraform-google-kubernetes-engine.git/modules/config-sync"

  project_id       = var.project_id
  cluster_name     = var.cluster_name
  location         = var.region
  cluster_endpoint = data.google_container_cluster.yakima_cluster.endpoint

  sync_repo     = gitlab_project.deployment_repo.ssh_url_to_repo
  sync_branch   = "master"
  policy_dir    = "config"
  secret_type   = "ssh"
  source_format = "unstructured"
}

# 3. Create deploy key for GitLab (for Config Sync to access)
resource "gitlab_deploy_key" "deployment_repo_read_access" {
  project = gitlab_project.deployment_repo.id
  title   = "Yakima Deploy Key (Config Sync Read Access)"
  key     = module.config_sync.git_creds_public[0]
}
