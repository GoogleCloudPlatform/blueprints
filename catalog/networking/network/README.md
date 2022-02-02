<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
# Network blueprint


<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:TITLE -->
<!-- BEGINNING OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
A private network with VPN and Cloud NAT.

**Requires a pre-existing secret!**

Via kubectl:

```shell
kubectl create secret generic vpn-shared-secret \
    --from-literal "vpn-shared-secret=${VPN_SECRET_VALUE}" \
    -n ${NETWORK_NAMESPACE}
```

Or Config Connector:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: vpn-shared-secret
  namespace: ${NETWORK_NAMESPACE}
stringData:
  vpn-shared-secret: ${VPN_SECRET_VALUE}
```

Replace the following:
-   `${NETWORK_NAMESPACE}`: the same namespace as the Network resource.
-   `${VPN_SECRET_VALUE}`: the
    [shared secret](https://cloud.google.com/network-connectivity/docs/vpn/how-to/generating-pre-shared-key)
    to use when authenticating with the VPN.

## Setters

|                Name                |             Value             | Type | Count |
|------------------------------------|-------------------------------|------|-------|
| ip-cidr-range                      | 10.2.0.0/16                   | str  |     1 |
| namespace                          | networking                    | str  |     8 |
| network-name                       | network-name                  | str  |    12 |
| prefix                             |                               | str  |     0 |
| project-id                         | project-id                    | str  |    10 |
| region                             | us-central1                   | str  |     6 |
| source-subnetwork-ip-ranges-to-nat | ALL_SUBNETWORKS_ALL_IP_RANGES | str  |     1 |
| vpn-secret-key                     | vpn-shared-secret             | str  |     2 |
| vpn-secret-name                    | vpn-shared-secret             | str  |     2 |
| vpn-tunnel-peer-ip-01              | 15.1.0.120                    | str  |     1 |
| vpn-tunnel-peer-ip-02              | 15.1.1.120                    | str  |     1 |

## Sub-packages

- [subnetwork](subnet)
- [vpc](vpc)

## Resources

|   File   |              APIVersion               |           Kind            |             Name             | Namespace  |
|----------|---------------------------------------|---------------------------|------------------------------|------------|
| vpn.yaml | compute.cnrm.cloud.google.com/v1beta1 | ComputeVPNGateway         | network-name-ha-vpn-gateway  | networking |
| vpn.yaml | compute.cnrm.cloud.google.com/v1beta1 | ComputeExternalVPNGateway | network-name-ext-vpn-gateway | networking |
| vpn.yaml | compute.cnrm.cloud.google.com/v1beta1 | ComputeVPNTunnel          | network-name-vpn-tunnel-01   | networking |
| vpn.yaml | compute.cnrm.cloud.google.com/v1beta1 | ComputeVPNTunnel          | network-name-vpn-tunnel-02   | networking |

## Resource References

- [ComputeExternalVPNGateway](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computeexternalvpngateway)
- [ComputeVPNGateway](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computevpngateway)
- [ComputeVPNTunnel](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computevpntunnel)

## Usage

1.  Clone the package:
    ```shell
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/network@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```shell
    cd "./network/"
    ```

1.  Edit the function config file(s):
    - setters.yaml

1.  Execute the function pipeline
    ```shell
    kpt fn render
    ```

1.  Initialize the resource inventory
    ```shell
    kpt live init --namespace ${NAMESPACE}"
    ```
    Replace `${NAMESPACE}` with the namespace in which to manage
    the inventory ResourceGroup (for example, `config-control`).

1.  Apply the package resources to your cluster
    ```shell
    kpt live apply
    ```

1.  Wait for the resources to be ready
    ```shell
    kpt live status --output table --poll-until current
    ```

<!-- END OF PRE-COMMIT-BLUEPRINT DOCS HOOK:BODY -->
