# Providers:
provider "helm" {
  kubernetes {}
}

provider "kubernetes" {}

# 1. Reserve a compute address
resource "google_compute_address" "gitlab" {
  project = var.project_id
  region  = var.region
  name    = var.compute_address_name
}

# 2. Setup endpoints
module "cloud-endpoints-dns-gitlab" {
  source  = "terraform-google-modules/endpoints-dns/google"
  version = "~> 2.0.1"

  project     = var.project_id
  name        = "gitlab"
  external_ip = google_compute_address.gitlab.address
}

module "cloud-endpoints-dns-registry" {
  source  = "terraform-google-modules/endpoints-dns/google"
  version = "~> 2.0.1"

  project     = var.project_id
  name        = "registry"
  external_ip = google_compute_address.gitlab.address
}

# 3. Setup GitLab using endpoints
resource "helm_release" "gitlab" {
  name = "gitlab"
  repository = "http://charts.gitlab.io"
  chart = "gitlab"
  namespace = kubernetes_namespace.gitlab.metadata[0].name
  atomic = true
  create_namespace = true

  set {
    name = "global.hosts.domain"
    value = trimprefix(module.cloud-endpoints-dns-gitlab.endpoint_computed, "gitlab.")
  }

  set {
    name = "global.hosts.externalIP"
    value = google_compute_address.gitlab.address
  }

  set {
    name = "certmanager-issuer.email"
    value = var.email
  }

  # Needed for DinD which kpt fn relies on:
  # https://googlecontainertools.github.io/kpt/guides/consumer/function/export/gitlab-ci/
  set {
    name = "gitlab-runner.runners.privileged"
    value = true
  }

  provisioner "local-exec" {
    command = "${path.module}/scripts/create-personal-access-token.sh ${var.k8s_namespace}"
  }
}

# 4. Expose GitLab password as an output
data "kubernetes_secret" "gitlab_password" {
  metadata {
    name = "gitlab-gitlab-initial-root-password"
    namespace = var.k8s_namespace
  }

  depends_on = [helm_release.gitlab]
}
