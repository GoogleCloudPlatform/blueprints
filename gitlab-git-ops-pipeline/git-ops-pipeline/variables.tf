variable "gitlab_personal_access_token" {
  type        = string
  description = "Personal access token with API permissions to access GitLab."
}

variable "source_repo_name" {
  type        = string
  default     = "yakima-source-repo"
  description = "Name of the source repository for storing DRY configuration."
}

variable "deployment_repo_name" {
  type        = string
  default     = "yakima-deployment-repo"
  description = <<EOF
    Name of the deployment repository for generating and storing WET (hydrated)
    configuration. Your Yakima cluster will sync from this repository
    using Config Sync.
  EOF
}

variable "project_id" {
  type        = string
  description = "Project ID of your GCP project containing your Yakima cluster."
}

variable "region" {
  type        = string
  description = <<EOF
    The region to generate your GCP resources. This must be the same as the
    region of your Yakima cluster.
  EOF
}

variable "cluster_name" {
  type        = string
  description = "Name of your Yakima cluster."
}

variable "email" {
  type        = string
  description = <<EOF
    Email address to use for the cert manager issuer.
    You can use your GCP email address.
  EOF
}
