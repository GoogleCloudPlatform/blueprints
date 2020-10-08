output "gitlab_url" {
  value       = "https://gitlab.endpoints.${var.project_id}.cloud.goog"
  description = "The GitLab URL to access your GitLab instance at."
}

output "source_repo_clone_url" {
  value       = "https://oauth2:${var.gitlab_personal_access_token}@gitlab.endpoints.${var.project_id}.cloud.goog/root/${var.source_repo_name}.git"
  description = <<EOF
    The GitLab URL to clone your source repo using
    (i.e. git clone <source_repo_clone_url>)
  EOF
}

output "ci_pipeline_url" {
  value       = "https://gitlab.endpoints.${var.project_id}.cloud.goog/root/${var.source_repo_name}/-/pipelines"
  description = <<EOF
    URL where you can monitor, debug, and retry your CI jobs.
    These are run automatically when a commit is pushed to 'master'
    or 'staging' on the deployment repo.
  EOF
}
