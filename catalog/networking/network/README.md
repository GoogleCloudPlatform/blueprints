# Network blueprint

A private network with VPN and Cloud NAT.

**Requires a pre-existing secret!**

Via kubectl:

```shell
kubectl create secret generic vpn-shared-secret \
    --from-literal "vpn-shared-secret=${VPN_SECRET_VALUE}" \
    -n ${NETWORK_NAMESPACE}
```

Or declaratively:

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

```
Setter                              Usages
ip-cidr-range                       1
namespace                           10
network-name                        21
prefix                              4
project-id                          12
region                              9
source-subnetwork-ip-ranges-to-nat  1
vpn-secret-key                      1
vpn-secret-name                     1
```

## Sub-packages

- [subnet](/catalog/networking/network/subnet)
- [vpc](/catalog/networking/network/vpc)

## Resources

```
File      APIVersion                             Kind                     Name                         Namespace
vpn.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeAddress           network-name-vpn-address     networking
vpn.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeForwardingRule    acme-vpc-dev-vpn-udp4500-fr  networking
vpn.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeForwardingRule    acme-vpc-dev-vpn-udp500-fr   networking
vpn.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeForwardingRule    network-name-vpn-esp-fr      networking
vpn.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeTargetVPNGateway  network-name-vpn-gateway     networking
vpn.yaml  compute.cnrm.cloud.google.com/v1beta1  ComputeVPNTunnel         network-name-vpn-tunnel      networking
```

## Resource References

- [ComputeAddress](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computeaddress)
- [ComputeForwardingRule](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computeforwardingrule)
- [ComputeTargetVPNGateway](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computetargetvpngateway)
- [ComputeVPNTunnel](https://cloud.google.com/config-connector/docs/reference/resource-docs/compute/computevpntunnel)

## Usage

1.  Clone the package:
    ```
    kpt pkg get https://github.com/GoogleCloudPlatform/blueprints.git/catalog/networking/network@${VERSION}
    ```
    Replace `${VERSION}` with the desired repo branch or tag
    (for example, `main`).

1.  Move into the local package:
    ```
    cd "./network/"
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

