output "url" {
  value = "https://gitlab.endpoints.${var.project_id}.cloud.goog"
  description = "The GitLab URL to access your GitLab instance at."
}

output "username" {
  value = "root"
  description = "The username to login with on the GitLab URL provided above."
}

output "password" {
  value = data.kubernetes_secret.gitlab_password.data.password
  description = "The password to login with on the GitLab URL provided above."
}

output "personal_access_token" {
  value = data.kubernetes_secret.gitlab_password.data.password
  description = <<EOF
    The personal access token provisioned to programmatically create GitLab
    resources. This token has API access to GitLab and will be needed by the
    git-ops-pipeline blueprint.
  EOF
}
