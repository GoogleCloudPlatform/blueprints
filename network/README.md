# Network blueprint
This package creates a network and all required configuration needed in order to manage this network with Yakima.

Contents:

- network.yaml - contains network configuration.
- sharedVPC.yaml - turns project in namespace into shared VPC host project
- nat.yaml - contains cloud NAT configuraiton.
- vpn.yaml - contains cloud VPN configuration.
- network-management.yaml - contains configuration needed in order for Yakima to manage resources within that network:

    - Config Connector context to bind - Config Connector controller for this manespace with the Google Service Account.

Owner: [akumanov](http://who/akumanov@google.com)