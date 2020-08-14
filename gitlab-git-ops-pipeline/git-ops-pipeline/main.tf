# Providers
provider "gitlab" {
  token = var.gitlab_personal_access_token
  base_url = "https://gitlab.endpoints.${var.project_id}.cloud.goog"
}

provider "google" {
  project = var.project_id
}

provider "kubernetes" {
  config_context = "gke_${var.project_id}_${var.region}_${var.cluster_name}"
}

# 1. Create projects (repos)
resource "gitlab_project" "source_repo" {
  name = var.source_repo_name
  description = "Repo containing DRY config to be validated and hydrated"

  default_branch = "master"
  visibility_level = "private"
}

resource "gitlab_project" "deployment_repo" {
  name = var.deployment_repo_name
  description = "Repo containing WET (hydrated) config for Yakima to use"

  default_branch = "master"
  visibility_level = "private"
}

# 2. Configure Config Sync
data "google_container_cluster" "yakima_cluster" {
  name = var.cluster_name
  region = var.region
}

module "config_sync" {
  source           = "terraform-google-modules/kubernetes-engine/google//modules/config-sync"

  project_id       = var.project_id
  cluster_name     = var.cluster_name
  location         = var.region
  cluster_endpoint = data.google_container_cluster.yakima_cluster.endpoint

  sync_repo        = gitlab_project.deployment_repo.ssh_url_to_repo
  sync_branch      = "master"
  policy_dir       = "config"
  secret_type      = "ssh"
  # TODO(jcwc): Add a field to the terraform module for sourceFormat: unstructured
}

# 3. Create deploy key for GitLab (for Config Sync to access)
resource "gitlab_deploy_key" "deployment_repo_read_access" {
  project = gitlab_project.deployment_repo.id
  title = "Yakima Deploy Key (Config Sync Read Access)"
  key = module.config_sync.git_creds_public[0]
}
