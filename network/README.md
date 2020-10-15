# Network blueprint

This package creates a network with VPN and NAT configuration.

Contents:

-   network.yaml - contains network configuration.
-   nat.yaml - contains cloud NAT configuraiton.
-   vpn.yaml - contains cloud VPN configuration.

## Applying the blueprint

NOTE: Replace all environment variables in the example below with the
appropriate values.

Before applying this blueprint you need to create a Kubernetes secret object
with the VPN key.

This could be done either via a command line:

```shell
kubectl create secret generic vpn-shared-secret --from-literal=vpn-shared-secret=${VPN_SECRET_VALUE} -n ${NETWORK_NAMESPACE}
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

`${NETWORK_NAMESPACE}` is the same namespace as the network itself.
