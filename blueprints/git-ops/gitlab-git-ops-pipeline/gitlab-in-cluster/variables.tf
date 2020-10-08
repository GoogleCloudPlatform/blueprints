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

variable "email" {
  type        = string
  description = <<EOF
    Email address to use for the cert manager issuer.
    You can use your GCP email address.
  EOF
}

variable "k8s_namespace" {
  type        = string
  default     = "gitlab"
  description = <<EOF
    Namespace to store the GitLab resources in the Yakima cluster.
    By default, this is 'gitlab'.
  EOF
}

variable "compute_address_name" {
  type        = string
  default     = "gitlab"
  description = <<EOF
    Name of the compute address to create (static IP address).
    By default, this is 'gitlab'.
  EOF
}

variable "cluster_name" {
  type        = string
  description = "Name of your Yakima cluster."
}
