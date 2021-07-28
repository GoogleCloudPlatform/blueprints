# Firewall Common Rules blueprint

Common firewall rules for projects with a private network.

Included rules:

- allow common ports between private IP ranges
- allow common ports from GCP load balancer ranges
- allow ssh and rdp from GCP IAP ranges

Contents:
-   egress
    -   allow-google-apis.yaml - creates a firewall rule that allows traffic
        to private.googleapis.com IP range
    -   allow-windows-kms.yaml - creates a firewall rule that allows traffic
        to kms.windows.googlecloud.com IP range
    -   deny-all.yaml - creates a firewall rule that denys all egress traffic
        on TCP/UDP. It is recommended that if this rule is enabled, to also
        enable the "allow-google-apis" rule.
-   ingress
    -   allow-gcp-lb.yaml - creates a firewall rule that allows traffic from
        GCP load balancer ranges for health check and proxy traffic on ports
        80, 443, and 8080
    -   allow-iap-rdp.yaml - creates a firewall rule that allow traffic from
        IAP forwarding ranges for RDP
    -   allow-iap-ssh.yaml - creates a firewall rule that allow traffic from
        IAP forwarding ranges for SSH
    -   allow-internal-common.yaml - creates a firewall rule that allows SSH,
        SSL, HTTP (8080), and ICMP traffic on all RFC1918 ranges

## Setters

```
Setter                  Usages
allow-default-egress    1
dont-allow-google-apis  1
dont-allow-windows-kms  1
enable-logging          7
firewall-project-id     0
firewalls-namespace     7
google-api-cidr         1
network-name            14
priority                4
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File                                APIVersion                             Kind             Name                                   Namespace
egress/allow-google-apis.yaml       compute.cnrm.cloud.google.com/v1beta1  ComputeFirewall  network-name-fw-allow-google-apis      firewalls-namespace
egress/allow-windows-kms.yaml       compute.cnrm.cloud.google.com/v1beta1  ComputeFirewall  network-name-fw-allow-windows-kms      firewalls-namespace
egress/deny-all.yaml                compute.cnrm.cloud.google.com/v1beta1  ComputeFirewall  network-name-fw-deny-all-egress        firewalls-namespace
ingress/allow-gcp-lb.yaml           compute.cnrm.cloud.google.com/v1beta1  ComputeFirewall  network-name-fw-allow-gcp-lb           firewalls-namespace
ingress/allow-iap-rdp.yaml          compute.cnrm.cloud.google.com/v1beta1  ComputeFirewall  network-name-fw-allow-iap-rdp          firewalls-namespace
ingress/allow-iap-ssh.yaml          compute.cnrm.cloud.google.com/v1beta1  ComputeFirewall  network-name-fw-allow-iap-ssh          firewalls-namespace
ingress/allow-internal-common.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeFirewall  network-name-fw-allow-internal-common  firewalls-namespace
```

## Resource References

- [ComputeFirewall](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computefirewall)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/firewall/common-rules@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./common-rules/"
    ```

1.  Edit the function config file(s):
    - setters.yaml

1.  Execute the function pipeline
    ```
    kpt fn render
    ```

1.  Initialize the resource inventory
    ```
    kpt live init --namespace ${NAMESPACE}"
    ```
    Replace `${NAMESPACE}` with the namespace in which to manage
    the inventory ResourceGroup (for example, `config-control`).

1.  Apply the package resources to your cluster
    ```
    kpt live apply
    ```

1.  Wait for the resources to be ready
    ```
    kpt live status --output table --poll-until current
    ```

