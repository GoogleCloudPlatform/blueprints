# Cloud DNS Managed Zone Peering blueprint

A private Cloud DNS managed zone with peering config

## Setters

```
Setter               Usages
domain               1
managed-zone-name    1
namespace            3
network-name         1
peered-network-name  1
project-id           3
```

## Sub-packages

This package has no sub-packages.

## Resources

```
File           APIVersion                                  Kind            Name                   Namespace
dns.yaml       dns.cnrm.cloud.google.com/v1beta1           DNSManagedZone  dnsmanagedzone-sample  networking
services.yaml  serviceusage.cnrm.cloud.google.com/v1beta1  Service         project-id-dns         projects
```

## Resource References

- [DNSManagedZone](https://cloud.google.com/config-connector/docs/reference/resource-docs/dns/dnsmanagedzone)
- [Service](https://cloud.google.com/config-connector/docs/reference/resource-docs/serviceusage/service)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/dns/managedzone-peering@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./managedzone-peering/"
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

