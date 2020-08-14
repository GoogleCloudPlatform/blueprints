"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComputeVPNTunnelList = exports.ComputeVPNTunnelList = exports.isComputeVPNGatewayList = exports.ComputeVPNGatewayList = exports.isComputeURLMapList = exports.ComputeURLMapList = exports.isComputeTargetVPNGatewayList = exports.ComputeTargetVPNGatewayList = exports.isComputeTargetTCPProxyList = exports.ComputeTargetTCPProxyList = exports.isComputeTargetSSLProxyList = exports.ComputeTargetSSLProxyList = exports.isComputeTargetPoolList = exports.ComputeTargetPoolList = exports.isComputeTargetInstanceList = exports.ComputeTargetInstanceList = exports.isComputeTargetHTTPSProxyList = exports.ComputeTargetHTTPSProxyList = exports.isComputeTargetHTTPProxyList = exports.ComputeTargetHTTPProxyList = exports.isComputeSubnetworkList = exports.ComputeSubnetworkList = exports.isComputeSnapshotList = exports.ComputeSnapshotList = exports.isComputeSharedVPCServiceProjectList = exports.ComputeSharedVPCServiceProjectList = exports.isComputeSharedVPCHostProjectList = exports.ComputeSharedVPCHostProjectList = exports.isComputeSecurityPolicyList = exports.ComputeSecurityPolicyList = exports.isComputeSSLPolicyList = exports.ComputeSSLPolicyList = exports.isComputeSSLCertificateList = exports.ComputeSSLCertificateList = exports.isComputeRouterPeerList = exports.ComputeRouterPeerList = exports.isComputeRouterNATList = exports.ComputeRouterNATList = exports.isComputeRouterList = exports.ComputeRouterList = exports.isComputeRouterInterfaceList = exports.ComputeRouterInterfaceList = exports.isComputeRouteList = exports.ComputeRouteList = exports.isComputeResourcePolicyList = exports.ComputeResourcePolicyList = exports.isComputeReservationList = exports.ComputeReservationList = exports.isComputeNodeTemplateList = exports.ComputeNodeTemplateList = exports.isComputeNodeGroupList = exports.ComputeNodeGroupList = exports.isComputeNetworkPeeringList = exports.ComputeNetworkPeeringList = exports.isComputeNetworkList = exports.ComputeNetworkList = exports.isComputeNetworkEndpointGroupList = exports.ComputeNetworkEndpointGroupList = exports.isComputeInterconnectAttachmentList = exports.ComputeInterconnectAttachmentList = exports.isComputeInstanceTemplateList = exports.ComputeInstanceTemplateList = exports.isComputeInstanceList = exports.ComputeInstanceList = exports.isComputeInstanceGroupList = exports.ComputeInstanceGroupList = exports.isComputeImageList = exports.ComputeImageList = exports.isComputeHealthCheckList = exports.ComputeHealthCheckList = exports.isComputeHTTPSHealthCheckList = exports.ComputeHTTPSHealthCheckList = exports.isComputeHTTPHealthCheckList = exports.ComputeHTTPHealthCheckList = exports.isComputeForwardingRuleList = exports.ComputeForwardingRuleList = exports.isComputeFirewallList = exports.ComputeFirewallList = exports.isComputeExternalVPNGatewayList = exports.ComputeExternalVPNGatewayList = exports.isComputeDiskList = exports.ComputeDiskList = exports.isComputeBackendServiceList = exports.ComputeBackendServiceList = exports.isComputeBackendBucketList = exports.ComputeBackendBucketList = exports.isComputeAddressList = exports.ComputeAddressList = void 0;
// ComputeAddressList is a list of ComputeAddress
class ComputeAddressList {
    constructor(desc) {
        this.apiVersion = ComputeAddressList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeAddressList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeAddressList = ComputeAddressList;
function isComputeAddressList(o) {
    return o && o.apiVersion === ComputeAddressList.apiVersion && o.kind === ComputeAddressList.kind;
}
exports.isComputeAddressList = isComputeAddressList;
(function (ComputeAddressList) {
    ComputeAddressList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeAddressList.group = "compute.cnrm.cloud.google.com";
    ComputeAddressList.version = "v1beta1";
    ComputeAddressList.kind = "ComputeAddressList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeAddressList.Metadata = Metadata;
})(ComputeAddressList = exports.ComputeAddressList || (exports.ComputeAddressList = {}));
// ComputeBackendBucketList is a list of ComputeBackendBucket
class ComputeBackendBucketList {
    constructor(desc) {
        this.apiVersion = ComputeBackendBucketList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeBackendBucketList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeBackendBucketList = ComputeBackendBucketList;
function isComputeBackendBucketList(o) {
    return o && o.apiVersion === ComputeBackendBucketList.apiVersion && o.kind === ComputeBackendBucketList.kind;
}
exports.isComputeBackendBucketList = isComputeBackendBucketList;
(function (ComputeBackendBucketList) {
    ComputeBackendBucketList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeBackendBucketList.group = "compute.cnrm.cloud.google.com";
    ComputeBackendBucketList.version = "v1beta1";
    ComputeBackendBucketList.kind = "ComputeBackendBucketList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeBackendBucketList.Metadata = Metadata;
})(ComputeBackendBucketList = exports.ComputeBackendBucketList || (exports.ComputeBackendBucketList = {}));
// ComputeBackendServiceList is a list of ComputeBackendService
class ComputeBackendServiceList {
    constructor(desc) {
        this.apiVersion = ComputeBackendServiceList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeBackendServiceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeBackendServiceList = ComputeBackendServiceList;
function isComputeBackendServiceList(o) {
    return o && o.apiVersion === ComputeBackendServiceList.apiVersion && o.kind === ComputeBackendServiceList.kind;
}
exports.isComputeBackendServiceList = isComputeBackendServiceList;
(function (ComputeBackendServiceList) {
    ComputeBackendServiceList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeBackendServiceList.group = "compute.cnrm.cloud.google.com";
    ComputeBackendServiceList.version = "v1beta1";
    ComputeBackendServiceList.kind = "ComputeBackendServiceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeBackendServiceList.Metadata = Metadata;
})(ComputeBackendServiceList = exports.ComputeBackendServiceList || (exports.ComputeBackendServiceList = {}));
// ComputeDiskList is a list of ComputeDisk
class ComputeDiskList {
    constructor(desc) {
        this.apiVersion = ComputeDiskList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeDiskList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeDiskList = ComputeDiskList;
function isComputeDiskList(o) {
    return o && o.apiVersion === ComputeDiskList.apiVersion && o.kind === ComputeDiskList.kind;
}
exports.isComputeDiskList = isComputeDiskList;
(function (ComputeDiskList) {
    ComputeDiskList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeDiskList.group = "compute.cnrm.cloud.google.com";
    ComputeDiskList.version = "v1beta1";
    ComputeDiskList.kind = "ComputeDiskList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeDiskList.Metadata = Metadata;
})(ComputeDiskList = exports.ComputeDiskList || (exports.ComputeDiskList = {}));
// ComputeExternalVPNGatewayList is a list of ComputeExternalVPNGateway
class ComputeExternalVPNGatewayList {
    constructor(desc) {
        this.apiVersion = ComputeExternalVPNGatewayList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeExternalVPNGatewayList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeExternalVPNGatewayList = ComputeExternalVPNGatewayList;
function isComputeExternalVPNGatewayList(o) {
    return o && o.apiVersion === ComputeExternalVPNGatewayList.apiVersion && o.kind === ComputeExternalVPNGatewayList.kind;
}
exports.isComputeExternalVPNGatewayList = isComputeExternalVPNGatewayList;
(function (ComputeExternalVPNGatewayList) {
    ComputeExternalVPNGatewayList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeExternalVPNGatewayList.group = "compute.cnrm.cloud.google.com";
    ComputeExternalVPNGatewayList.version = "v1beta1";
    ComputeExternalVPNGatewayList.kind = "ComputeExternalVPNGatewayList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeExternalVPNGatewayList.Metadata = Metadata;
})(ComputeExternalVPNGatewayList = exports.ComputeExternalVPNGatewayList || (exports.ComputeExternalVPNGatewayList = {}));
// ComputeFirewallList is a list of ComputeFirewall
class ComputeFirewallList {
    constructor(desc) {
        this.apiVersion = ComputeFirewallList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeFirewallList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeFirewallList = ComputeFirewallList;
function isComputeFirewallList(o) {
    return o && o.apiVersion === ComputeFirewallList.apiVersion && o.kind === ComputeFirewallList.kind;
}
exports.isComputeFirewallList = isComputeFirewallList;
(function (ComputeFirewallList) {
    ComputeFirewallList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeFirewallList.group = "compute.cnrm.cloud.google.com";
    ComputeFirewallList.version = "v1beta1";
    ComputeFirewallList.kind = "ComputeFirewallList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeFirewallList.Metadata = Metadata;
})(ComputeFirewallList = exports.ComputeFirewallList || (exports.ComputeFirewallList = {}));
// ComputeForwardingRuleList is a list of ComputeForwardingRule
class ComputeForwardingRuleList {
    constructor(desc) {
        this.apiVersion = ComputeForwardingRuleList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeForwardingRuleList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeForwardingRuleList = ComputeForwardingRuleList;
function isComputeForwardingRuleList(o) {
    return o && o.apiVersion === ComputeForwardingRuleList.apiVersion && o.kind === ComputeForwardingRuleList.kind;
}
exports.isComputeForwardingRuleList = isComputeForwardingRuleList;
(function (ComputeForwardingRuleList) {
    ComputeForwardingRuleList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeForwardingRuleList.group = "compute.cnrm.cloud.google.com";
    ComputeForwardingRuleList.version = "v1beta1";
    ComputeForwardingRuleList.kind = "ComputeForwardingRuleList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeForwardingRuleList.Metadata = Metadata;
})(ComputeForwardingRuleList = exports.ComputeForwardingRuleList || (exports.ComputeForwardingRuleList = {}));
// ComputeHTTPHealthCheckList is a list of ComputeHTTPHealthCheck
class ComputeHTTPHealthCheckList {
    constructor(desc) {
        this.apiVersion = ComputeHTTPHealthCheckList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeHTTPHealthCheckList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeHTTPHealthCheckList = ComputeHTTPHealthCheckList;
function isComputeHTTPHealthCheckList(o) {
    return o && o.apiVersion === ComputeHTTPHealthCheckList.apiVersion && o.kind === ComputeHTTPHealthCheckList.kind;
}
exports.isComputeHTTPHealthCheckList = isComputeHTTPHealthCheckList;
(function (ComputeHTTPHealthCheckList) {
    ComputeHTTPHealthCheckList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeHTTPHealthCheckList.group = "compute.cnrm.cloud.google.com";
    ComputeHTTPHealthCheckList.version = "v1beta1";
    ComputeHTTPHealthCheckList.kind = "ComputeHTTPHealthCheckList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeHTTPHealthCheckList.Metadata = Metadata;
})(ComputeHTTPHealthCheckList = exports.ComputeHTTPHealthCheckList || (exports.ComputeHTTPHealthCheckList = {}));
// ComputeHTTPSHealthCheckList is a list of ComputeHTTPSHealthCheck
class ComputeHTTPSHealthCheckList {
    constructor(desc) {
        this.apiVersion = ComputeHTTPSHealthCheckList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeHTTPSHealthCheckList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeHTTPSHealthCheckList = ComputeHTTPSHealthCheckList;
function isComputeHTTPSHealthCheckList(o) {
    return o && o.apiVersion === ComputeHTTPSHealthCheckList.apiVersion && o.kind === ComputeHTTPSHealthCheckList.kind;
}
exports.isComputeHTTPSHealthCheckList = isComputeHTTPSHealthCheckList;
(function (ComputeHTTPSHealthCheckList) {
    ComputeHTTPSHealthCheckList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeHTTPSHealthCheckList.group = "compute.cnrm.cloud.google.com";
    ComputeHTTPSHealthCheckList.version = "v1beta1";
    ComputeHTTPSHealthCheckList.kind = "ComputeHTTPSHealthCheckList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeHTTPSHealthCheckList.Metadata = Metadata;
})(ComputeHTTPSHealthCheckList = exports.ComputeHTTPSHealthCheckList || (exports.ComputeHTTPSHealthCheckList = {}));
// ComputeHealthCheckList is a list of ComputeHealthCheck
class ComputeHealthCheckList {
    constructor(desc) {
        this.apiVersion = ComputeHealthCheckList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeHealthCheckList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeHealthCheckList = ComputeHealthCheckList;
function isComputeHealthCheckList(o) {
    return o && o.apiVersion === ComputeHealthCheckList.apiVersion && o.kind === ComputeHealthCheckList.kind;
}
exports.isComputeHealthCheckList = isComputeHealthCheckList;
(function (ComputeHealthCheckList) {
    ComputeHealthCheckList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeHealthCheckList.group = "compute.cnrm.cloud.google.com";
    ComputeHealthCheckList.version = "v1beta1";
    ComputeHealthCheckList.kind = "ComputeHealthCheckList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeHealthCheckList.Metadata = Metadata;
})(ComputeHealthCheckList = exports.ComputeHealthCheckList || (exports.ComputeHealthCheckList = {}));
// ComputeImageList is a list of ComputeImage
class ComputeImageList {
    constructor(desc) {
        this.apiVersion = ComputeImageList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeImageList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeImageList = ComputeImageList;
function isComputeImageList(o) {
    return o && o.apiVersion === ComputeImageList.apiVersion && o.kind === ComputeImageList.kind;
}
exports.isComputeImageList = isComputeImageList;
(function (ComputeImageList) {
    ComputeImageList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeImageList.group = "compute.cnrm.cloud.google.com";
    ComputeImageList.version = "v1beta1";
    ComputeImageList.kind = "ComputeImageList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeImageList.Metadata = Metadata;
})(ComputeImageList = exports.ComputeImageList || (exports.ComputeImageList = {}));
// ComputeInstanceGroupList is a list of ComputeInstanceGroup
class ComputeInstanceGroupList {
    constructor(desc) {
        this.apiVersion = ComputeInstanceGroupList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeInstanceGroupList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeInstanceGroupList = ComputeInstanceGroupList;
function isComputeInstanceGroupList(o) {
    return o && o.apiVersion === ComputeInstanceGroupList.apiVersion && o.kind === ComputeInstanceGroupList.kind;
}
exports.isComputeInstanceGroupList = isComputeInstanceGroupList;
(function (ComputeInstanceGroupList) {
    ComputeInstanceGroupList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeInstanceGroupList.group = "compute.cnrm.cloud.google.com";
    ComputeInstanceGroupList.version = "v1beta1";
    ComputeInstanceGroupList.kind = "ComputeInstanceGroupList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeInstanceGroupList.Metadata = Metadata;
})(ComputeInstanceGroupList = exports.ComputeInstanceGroupList || (exports.ComputeInstanceGroupList = {}));
// ComputeInstanceList is a list of ComputeInstance
class ComputeInstanceList {
    constructor(desc) {
        this.apiVersion = ComputeInstanceList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeInstanceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeInstanceList = ComputeInstanceList;
function isComputeInstanceList(o) {
    return o && o.apiVersion === ComputeInstanceList.apiVersion && o.kind === ComputeInstanceList.kind;
}
exports.isComputeInstanceList = isComputeInstanceList;
(function (ComputeInstanceList) {
    ComputeInstanceList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeInstanceList.group = "compute.cnrm.cloud.google.com";
    ComputeInstanceList.version = "v1beta1";
    ComputeInstanceList.kind = "ComputeInstanceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeInstanceList.Metadata = Metadata;
})(ComputeInstanceList = exports.ComputeInstanceList || (exports.ComputeInstanceList = {}));
// ComputeInstanceTemplateList is a list of ComputeInstanceTemplate
class ComputeInstanceTemplateList {
    constructor(desc) {
        this.apiVersion = ComputeInstanceTemplateList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeInstanceTemplateList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeInstanceTemplateList = ComputeInstanceTemplateList;
function isComputeInstanceTemplateList(o) {
    return o && o.apiVersion === ComputeInstanceTemplateList.apiVersion && o.kind === ComputeInstanceTemplateList.kind;
}
exports.isComputeInstanceTemplateList = isComputeInstanceTemplateList;
(function (ComputeInstanceTemplateList) {
    ComputeInstanceTemplateList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeInstanceTemplateList.group = "compute.cnrm.cloud.google.com";
    ComputeInstanceTemplateList.version = "v1beta1";
    ComputeInstanceTemplateList.kind = "ComputeInstanceTemplateList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeInstanceTemplateList.Metadata = Metadata;
})(ComputeInstanceTemplateList = exports.ComputeInstanceTemplateList || (exports.ComputeInstanceTemplateList = {}));
// ComputeInterconnectAttachmentList is a list of ComputeInterconnectAttachment
class ComputeInterconnectAttachmentList {
    constructor(desc) {
        this.apiVersion = ComputeInterconnectAttachmentList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeInterconnectAttachmentList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeInterconnectAttachmentList = ComputeInterconnectAttachmentList;
function isComputeInterconnectAttachmentList(o) {
    return o && o.apiVersion === ComputeInterconnectAttachmentList.apiVersion && o.kind === ComputeInterconnectAttachmentList.kind;
}
exports.isComputeInterconnectAttachmentList = isComputeInterconnectAttachmentList;
(function (ComputeInterconnectAttachmentList) {
    ComputeInterconnectAttachmentList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeInterconnectAttachmentList.group = "compute.cnrm.cloud.google.com";
    ComputeInterconnectAttachmentList.version = "v1beta1";
    ComputeInterconnectAttachmentList.kind = "ComputeInterconnectAttachmentList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeInterconnectAttachmentList.Metadata = Metadata;
})(ComputeInterconnectAttachmentList = exports.ComputeInterconnectAttachmentList || (exports.ComputeInterconnectAttachmentList = {}));
// ComputeNetworkEndpointGroupList is a list of ComputeNetworkEndpointGroup
class ComputeNetworkEndpointGroupList {
    constructor(desc) {
        this.apiVersion = ComputeNetworkEndpointGroupList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeNetworkEndpointGroupList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeNetworkEndpointGroupList = ComputeNetworkEndpointGroupList;
function isComputeNetworkEndpointGroupList(o) {
    return o && o.apiVersion === ComputeNetworkEndpointGroupList.apiVersion && o.kind === ComputeNetworkEndpointGroupList.kind;
}
exports.isComputeNetworkEndpointGroupList = isComputeNetworkEndpointGroupList;
(function (ComputeNetworkEndpointGroupList) {
    ComputeNetworkEndpointGroupList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeNetworkEndpointGroupList.group = "compute.cnrm.cloud.google.com";
    ComputeNetworkEndpointGroupList.version = "v1beta1";
    ComputeNetworkEndpointGroupList.kind = "ComputeNetworkEndpointGroupList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeNetworkEndpointGroupList.Metadata = Metadata;
})(ComputeNetworkEndpointGroupList = exports.ComputeNetworkEndpointGroupList || (exports.ComputeNetworkEndpointGroupList = {}));
// ComputeNetworkList is a list of ComputeNetwork
class ComputeNetworkList {
    constructor(desc) {
        this.apiVersion = ComputeNetworkList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeNetworkList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeNetworkList = ComputeNetworkList;
function isComputeNetworkList(o) {
    return o && o.apiVersion === ComputeNetworkList.apiVersion && o.kind === ComputeNetworkList.kind;
}
exports.isComputeNetworkList = isComputeNetworkList;
(function (ComputeNetworkList) {
    ComputeNetworkList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeNetworkList.group = "compute.cnrm.cloud.google.com";
    ComputeNetworkList.version = "v1beta1";
    ComputeNetworkList.kind = "ComputeNetworkList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeNetworkList.Metadata = Metadata;
})(ComputeNetworkList = exports.ComputeNetworkList || (exports.ComputeNetworkList = {}));
// ComputeNetworkPeeringList is a list of ComputeNetworkPeering
class ComputeNetworkPeeringList {
    constructor(desc) {
        this.apiVersion = ComputeNetworkPeeringList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeNetworkPeeringList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeNetworkPeeringList = ComputeNetworkPeeringList;
function isComputeNetworkPeeringList(o) {
    return o && o.apiVersion === ComputeNetworkPeeringList.apiVersion && o.kind === ComputeNetworkPeeringList.kind;
}
exports.isComputeNetworkPeeringList = isComputeNetworkPeeringList;
(function (ComputeNetworkPeeringList) {
    ComputeNetworkPeeringList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeNetworkPeeringList.group = "compute.cnrm.cloud.google.com";
    ComputeNetworkPeeringList.version = "v1beta1";
    ComputeNetworkPeeringList.kind = "ComputeNetworkPeeringList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeNetworkPeeringList.Metadata = Metadata;
})(ComputeNetworkPeeringList = exports.ComputeNetworkPeeringList || (exports.ComputeNetworkPeeringList = {}));
// ComputeNodeGroupList is a list of ComputeNodeGroup
class ComputeNodeGroupList {
    constructor(desc) {
        this.apiVersion = ComputeNodeGroupList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeNodeGroupList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeNodeGroupList = ComputeNodeGroupList;
function isComputeNodeGroupList(o) {
    return o && o.apiVersion === ComputeNodeGroupList.apiVersion && o.kind === ComputeNodeGroupList.kind;
}
exports.isComputeNodeGroupList = isComputeNodeGroupList;
(function (ComputeNodeGroupList) {
    ComputeNodeGroupList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeNodeGroupList.group = "compute.cnrm.cloud.google.com";
    ComputeNodeGroupList.version = "v1beta1";
    ComputeNodeGroupList.kind = "ComputeNodeGroupList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeNodeGroupList.Metadata = Metadata;
})(ComputeNodeGroupList = exports.ComputeNodeGroupList || (exports.ComputeNodeGroupList = {}));
// ComputeNodeTemplateList is a list of ComputeNodeTemplate
class ComputeNodeTemplateList {
    constructor(desc) {
        this.apiVersion = ComputeNodeTemplateList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeNodeTemplateList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeNodeTemplateList = ComputeNodeTemplateList;
function isComputeNodeTemplateList(o) {
    return o && o.apiVersion === ComputeNodeTemplateList.apiVersion && o.kind === ComputeNodeTemplateList.kind;
}
exports.isComputeNodeTemplateList = isComputeNodeTemplateList;
(function (ComputeNodeTemplateList) {
    ComputeNodeTemplateList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeNodeTemplateList.group = "compute.cnrm.cloud.google.com";
    ComputeNodeTemplateList.version = "v1beta1";
    ComputeNodeTemplateList.kind = "ComputeNodeTemplateList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeNodeTemplateList.Metadata = Metadata;
})(ComputeNodeTemplateList = exports.ComputeNodeTemplateList || (exports.ComputeNodeTemplateList = {}));
// ComputeReservationList is a list of ComputeReservation
class ComputeReservationList {
    constructor(desc) {
        this.apiVersion = ComputeReservationList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeReservationList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeReservationList = ComputeReservationList;
function isComputeReservationList(o) {
    return o && o.apiVersion === ComputeReservationList.apiVersion && o.kind === ComputeReservationList.kind;
}
exports.isComputeReservationList = isComputeReservationList;
(function (ComputeReservationList) {
    ComputeReservationList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeReservationList.group = "compute.cnrm.cloud.google.com";
    ComputeReservationList.version = "v1beta1";
    ComputeReservationList.kind = "ComputeReservationList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeReservationList.Metadata = Metadata;
})(ComputeReservationList = exports.ComputeReservationList || (exports.ComputeReservationList = {}));
// ComputeResourcePolicyList is a list of ComputeResourcePolicy
class ComputeResourcePolicyList {
    constructor(desc) {
        this.apiVersion = ComputeResourcePolicyList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeResourcePolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeResourcePolicyList = ComputeResourcePolicyList;
function isComputeResourcePolicyList(o) {
    return o && o.apiVersion === ComputeResourcePolicyList.apiVersion && o.kind === ComputeResourcePolicyList.kind;
}
exports.isComputeResourcePolicyList = isComputeResourcePolicyList;
(function (ComputeResourcePolicyList) {
    ComputeResourcePolicyList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeResourcePolicyList.group = "compute.cnrm.cloud.google.com";
    ComputeResourcePolicyList.version = "v1beta1";
    ComputeResourcePolicyList.kind = "ComputeResourcePolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeResourcePolicyList.Metadata = Metadata;
})(ComputeResourcePolicyList = exports.ComputeResourcePolicyList || (exports.ComputeResourcePolicyList = {}));
// ComputeRouteList is a list of ComputeRoute
class ComputeRouteList {
    constructor(desc) {
        this.apiVersion = ComputeRouteList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeRouteList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeRouteList = ComputeRouteList;
function isComputeRouteList(o) {
    return o && o.apiVersion === ComputeRouteList.apiVersion && o.kind === ComputeRouteList.kind;
}
exports.isComputeRouteList = isComputeRouteList;
(function (ComputeRouteList) {
    ComputeRouteList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeRouteList.group = "compute.cnrm.cloud.google.com";
    ComputeRouteList.version = "v1beta1";
    ComputeRouteList.kind = "ComputeRouteList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeRouteList.Metadata = Metadata;
})(ComputeRouteList = exports.ComputeRouteList || (exports.ComputeRouteList = {}));
// ComputeRouterInterfaceList is a list of ComputeRouterInterface
class ComputeRouterInterfaceList {
    constructor(desc) {
        this.apiVersion = ComputeRouterInterfaceList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeRouterInterfaceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeRouterInterfaceList = ComputeRouterInterfaceList;
function isComputeRouterInterfaceList(o) {
    return o && o.apiVersion === ComputeRouterInterfaceList.apiVersion && o.kind === ComputeRouterInterfaceList.kind;
}
exports.isComputeRouterInterfaceList = isComputeRouterInterfaceList;
(function (ComputeRouterInterfaceList) {
    ComputeRouterInterfaceList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeRouterInterfaceList.group = "compute.cnrm.cloud.google.com";
    ComputeRouterInterfaceList.version = "v1beta1";
    ComputeRouterInterfaceList.kind = "ComputeRouterInterfaceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeRouterInterfaceList.Metadata = Metadata;
})(ComputeRouterInterfaceList = exports.ComputeRouterInterfaceList || (exports.ComputeRouterInterfaceList = {}));
// ComputeRouterList is a list of ComputeRouter
class ComputeRouterList {
    constructor(desc) {
        this.apiVersion = ComputeRouterList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeRouterList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeRouterList = ComputeRouterList;
function isComputeRouterList(o) {
    return o && o.apiVersion === ComputeRouterList.apiVersion && o.kind === ComputeRouterList.kind;
}
exports.isComputeRouterList = isComputeRouterList;
(function (ComputeRouterList) {
    ComputeRouterList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeRouterList.group = "compute.cnrm.cloud.google.com";
    ComputeRouterList.version = "v1beta1";
    ComputeRouterList.kind = "ComputeRouterList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeRouterList.Metadata = Metadata;
})(ComputeRouterList = exports.ComputeRouterList || (exports.ComputeRouterList = {}));
// ComputeRouterNATList is a list of ComputeRouterNAT
class ComputeRouterNATList {
    constructor(desc) {
        this.apiVersion = ComputeRouterNATList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeRouterNATList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeRouterNATList = ComputeRouterNATList;
function isComputeRouterNATList(o) {
    return o && o.apiVersion === ComputeRouterNATList.apiVersion && o.kind === ComputeRouterNATList.kind;
}
exports.isComputeRouterNATList = isComputeRouterNATList;
(function (ComputeRouterNATList) {
    ComputeRouterNATList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeRouterNATList.group = "compute.cnrm.cloud.google.com";
    ComputeRouterNATList.version = "v1beta1";
    ComputeRouterNATList.kind = "ComputeRouterNATList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeRouterNATList.Metadata = Metadata;
})(ComputeRouterNATList = exports.ComputeRouterNATList || (exports.ComputeRouterNATList = {}));
// ComputeRouterPeerList is a list of ComputeRouterPeer
class ComputeRouterPeerList {
    constructor(desc) {
        this.apiVersion = ComputeRouterPeerList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeRouterPeerList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeRouterPeerList = ComputeRouterPeerList;
function isComputeRouterPeerList(o) {
    return o && o.apiVersion === ComputeRouterPeerList.apiVersion && o.kind === ComputeRouterPeerList.kind;
}
exports.isComputeRouterPeerList = isComputeRouterPeerList;
(function (ComputeRouterPeerList) {
    ComputeRouterPeerList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeRouterPeerList.group = "compute.cnrm.cloud.google.com";
    ComputeRouterPeerList.version = "v1beta1";
    ComputeRouterPeerList.kind = "ComputeRouterPeerList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeRouterPeerList.Metadata = Metadata;
})(ComputeRouterPeerList = exports.ComputeRouterPeerList || (exports.ComputeRouterPeerList = {}));
// ComputeSSLCertificateList is a list of ComputeSSLCertificate
class ComputeSSLCertificateList {
    constructor(desc) {
        this.apiVersion = ComputeSSLCertificateList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeSSLCertificateList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeSSLCertificateList = ComputeSSLCertificateList;
function isComputeSSLCertificateList(o) {
    return o && o.apiVersion === ComputeSSLCertificateList.apiVersion && o.kind === ComputeSSLCertificateList.kind;
}
exports.isComputeSSLCertificateList = isComputeSSLCertificateList;
(function (ComputeSSLCertificateList) {
    ComputeSSLCertificateList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeSSLCertificateList.group = "compute.cnrm.cloud.google.com";
    ComputeSSLCertificateList.version = "v1beta1";
    ComputeSSLCertificateList.kind = "ComputeSSLCertificateList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeSSLCertificateList.Metadata = Metadata;
})(ComputeSSLCertificateList = exports.ComputeSSLCertificateList || (exports.ComputeSSLCertificateList = {}));
// ComputeSSLPolicyList is a list of ComputeSSLPolicy
class ComputeSSLPolicyList {
    constructor(desc) {
        this.apiVersion = ComputeSSLPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeSSLPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeSSLPolicyList = ComputeSSLPolicyList;
function isComputeSSLPolicyList(o) {
    return o && o.apiVersion === ComputeSSLPolicyList.apiVersion && o.kind === ComputeSSLPolicyList.kind;
}
exports.isComputeSSLPolicyList = isComputeSSLPolicyList;
(function (ComputeSSLPolicyList) {
    ComputeSSLPolicyList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeSSLPolicyList.group = "compute.cnrm.cloud.google.com";
    ComputeSSLPolicyList.version = "v1beta1";
    ComputeSSLPolicyList.kind = "ComputeSSLPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeSSLPolicyList.Metadata = Metadata;
})(ComputeSSLPolicyList = exports.ComputeSSLPolicyList || (exports.ComputeSSLPolicyList = {}));
// ComputeSecurityPolicyList is a list of ComputeSecurityPolicy
class ComputeSecurityPolicyList {
    constructor(desc) {
        this.apiVersion = ComputeSecurityPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeSecurityPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeSecurityPolicyList = ComputeSecurityPolicyList;
function isComputeSecurityPolicyList(o) {
    return o && o.apiVersion === ComputeSecurityPolicyList.apiVersion && o.kind === ComputeSecurityPolicyList.kind;
}
exports.isComputeSecurityPolicyList = isComputeSecurityPolicyList;
(function (ComputeSecurityPolicyList) {
    ComputeSecurityPolicyList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeSecurityPolicyList.group = "compute.cnrm.cloud.google.com";
    ComputeSecurityPolicyList.version = "v1beta1";
    ComputeSecurityPolicyList.kind = "ComputeSecurityPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeSecurityPolicyList.Metadata = Metadata;
})(ComputeSecurityPolicyList = exports.ComputeSecurityPolicyList || (exports.ComputeSecurityPolicyList = {}));
// ComputeSharedVPCHostProjectList is a list of ComputeSharedVPCHostProject
class ComputeSharedVPCHostProjectList {
    constructor(desc) {
        this.apiVersion = ComputeSharedVPCHostProjectList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeSharedVPCHostProjectList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeSharedVPCHostProjectList = ComputeSharedVPCHostProjectList;
function isComputeSharedVPCHostProjectList(o) {
    return o && o.apiVersion === ComputeSharedVPCHostProjectList.apiVersion && o.kind === ComputeSharedVPCHostProjectList.kind;
}
exports.isComputeSharedVPCHostProjectList = isComputeSharedVPCHostProjectList;
(function (ComputeSharedVPCHostProjectList) {
    ComputeSharedVPCHostProjectList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeSharedVPCHostProjectList.group = "compute.cnrm.cloud.google.com";
    ComputeSharedVPCHostProjectList.version = "v1beta1";
    ComputeSharedVPCHostProjectList.kind = "ComputeSharedVPCHostProjectList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeSharedVPCHostProjectList.Metadata = Metadata;
})(ComputeSharedVPCHostProjectList = exports.ComputeSharedVPCHostProjectList || (exports.ComputeSharedVPCHostProjectList = {}));
// ComputeSharedVPCServiceProjectList is a list of ComputeSharedVPCServiceProject
class ComputeSharedVPCServiceProjectList {
    constructor(desc) {
        this.apiVersion = ComputeSharedVPCServiceProjectList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeSharedVPCServiceProjectList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeSharedVPCServiceProjectList = ComputeSharedVPCServiceProjectList;
function isComputeSharedVPCServiceProjectList(o) {
    return o && o.apiVersion === ComputeSharedVPCServiceProjectList.apiVersion && o.kind === ComputeSharedVPCServiceProjectList.kind;
}
exports.isComputeSharedVPCServiceProjectList = isComputeSharedVPCServiceProjectList;
(function (ComputeSharedVPCServiceProjectList) {
    ComputeSharedVPCServiceProjectList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeSharedVPCServiceProjectList.group = "compute.cnrm.cloud.google.com";
    ComputeSharedVPCServiceProjectList.version = "v1beta1";
    ComputeSharedVPCServiceProjectList.kind = "ComputeSharedVPCServiceProjectList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeSharedVPCServiceProjectList.Metadata = Metadata;
})(ComputeSharedVPCServiceProjectList = exports.ComputeSharedVPCServiceProjectList || (exports.ComputeSharedVPCServiceProjectList = {}));
// ComputeSnapshotList is a list of ComputeSnapshot
class ComputeSnapshotList {
    constructor(desc) {
        this.apiVersion = ComputeSnapshotList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeSnapshotList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeSnapshotList = ComputeSnapshotList;
function isComputeSnapshotList(o) {
    return o && o.apiVersion === ComputeSnapshotList.apiVersion && o.kind === ComputeSnapshotList.kind;
}
exports.isComputeSnapshotList = isComputeSnapshotList;
(function (ComputeSnapshotList) {
    ComputeSnapshotList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeSnapshotList.group = "compute.cnrm.cloud.google.com";
    ComputeSnapshotList.version = "v1beta1";
    ComputeSnapshotList.kind = "ComputeSnapshotList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeSnapshotList.Metadata = Metadata;
})(ComputeSnapshotList = exports.ComputeSnapshotList || (exports.ComputeSnapshotList = {}));
// ComputeSubnetworkList is a list of ComputeSubnetwork
class ComputeSubnetworkList {
    constructor(desc) {
        this.apiVersion = ComputeSubnetworkList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeSubnetworkList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeSubnetworkList = ComputeSubnetworkList;
function isComputeSubnetworkList(o) {
    return o && o.apiVersion === ComputeSubnetworkList.apiVersion && o.kind === ComputeSubnetworkList.kind;
}
exports.isComputeSubnetworkList = isComputeSubnetworkList;
(function (ComputeSubnetworkList) {
    ComputeSubnetworkList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeSubnetworkList.group = "compute.cnrm.cloud.google.com";
    ComputeSubnetworkList.version = "v1beta1";
    ComputeSubnetworkList.kind = "ComputeSubnetworkList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeSubnetworkList.Metadata = Metadata;
})(ComputeSubnetworkList = exports.ComputeSubnetworkList || (exports.ComputeSubnetworkList = {}));
// ComputeTargetHTTPProxyList is a list of ComputeTargetHTTPProxy
class ComputeTargetHTTPProxyList {
    constructor(desc) {
        this.apiVersion = ComputeTargetHTTPProxyList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeTargetHTTPProxyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeTargetHTTPProxyList = ComputeTargetHTTPProxyList;
function isComputeTargetHTTPProxyList(o) {
    return o && o.apiVersion === ComputeTargetHTTPProxyList.apiVersion && o.kind === ComputeTargetHTTPProxyList.kind;
}
exports.isComputeTargetHTTPProxyList = isComputeTargetHTTPProxyList;
(function (ComputeTargetHTTPProxyList) {
    ComputeTargetHTTPProxyList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeTargetHTTPProxyList.group = "compute.cnrm.cloud.google.com";
    ComputeTargetHTTPProxyList.version = "v1beta1";
    ComputeTargetHTTPProxyList.kind = "ComputeTargetHTTPProxyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeTargetHTTPProxyList.Metadata = Metadata;
})(ComputeTargetHTTPProxyList = exports.ComputeTargetHTTPProxyList || (exports.ComputeTargetHTTPProxyList = {}));
// ComputeTargetHTTPSProxyList is a list of ComputeTargetHTTPSProxy
class ComputeTargetHTTPSProxyList {
    constructor(desc) {
        this.apiVersion = ComputeTargetHTTPSProxyList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeTargetHTTPSProxyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeTargetHTTPSProxyList = ComputeTargetHTTPSProxyList;
function isComputeTargetHTTPSProxyList(o) {
    return o && o.apiVersion === ComputeTargetHTTPSProxyList.apiVersion && o.kind === ComputeTargetHTTPSProxyList.kind;
}
exports.isComputeTargetHTTPSProxyList = isComputeTargetHTTPSProxyList;
(function (ComputeTargetHTTPSProxyList) {
    ComputeTargetHTTPSProxyList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeTargetHTTPSProxyList.group = "compute.cnrm.cloud.google.com";
    ComputeTargetHTTPSProxyList.version = "v1beta1";
    ComputeTargetHTTPSProxyList.kind = "ComputeTargetHTTPSProxyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeTargetHTTPSProxyList.Metadata = Metadata;
})(ComputeTargetHTTPSProxyList = exports.ComputeTargetHTTPSProxyList || (exports.ComputeTargetHTTPSProxyList = {}));
// ComputeTargetInstanceList is a list of ComputeTargetInstance
class ComputeTargetInstanceList {
    constructor(desc) {
        this.apiVersion = ComputeTargetInstanceList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeTargetInstanceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeTargetInstanceList = ComputeTargetInstanceList;
function isComputeTargetInstanceList(o) {
    return o && o.apiVersion === ComputeTargetInstanceList.apiVersion && o.kind === ComputeTargetInstanceList.kind;
}
exports.isComputeTargetInstanceList = isComputeTargetInstanceList;
(function (ComputeTargetInstanceList) {
    ComputeTargetInstanceList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeTargetInstanceList.group = "compute.cnrm.cloud.google.com";
    ComputeTargetInstanceList.version = "v1beta1";
    ComputeTargetInstanceList.kind = "ComputeTargetInstanceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeTargetInstanceList.Metadata = Metadata;
})(ComputeTargetInstanceList = exports.ComputeTargetInstanceList || (exports.ComputeTargetInstanceList = {}));
// ComputeTargetPoolList is a list of ComputeTargetPool
class ComputeTargetPoolList {
    constructor(desc) {
        this.apiVersion = ComputeTargetPoolList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeTargetPoolList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeTargetPoolList = ComputeTargetPoolList;
function isComputeTargetPoolList(o) {
    return o && o.apiVersion === ComputeTargetPoolList.apiVersion && o.kind === ComputeTargetPoolList.kind;
}
exports.isComputeTargetPoolList = isComputeTargetPoolList;
(function (ComputeTargetPoolList) {
    ComputeTargetPoolList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeTargetPoolList.group = "compute.cnrm.cloud.google.com";
    ComputeTargetPoolList.version = "v1beta1";
    ComputeTargetPoolList.kind = "ComputeTargetPoolList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeTargetPoolList.Metadata = Metadata;
})(ComputeTargetPoolList = exports.ComputeTargetPoolList || (exports.ComputeTargetPoolList = {}));
// ComputeTargetSSLProxyList is a list of ComputeTargetSSLProxy
class ComputeTargetSSLProxyList {
    constructor(desc) {
        this.apiVersion = ComputeTargetSSLProxyList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeTargetSSLProxyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeTargetSSLProxyList = ComputeTargetSSLProxyList;
function isComputeTargetSSLProxyList(o) {
    return o && o.apiVersion === ComputeTargetSSLProxyList.apiVersion && o.kind === ComputeTargetSSLProxyList.kind;
}
exports.isComputeTargetSSLProxyList = isComputeTargetSSLProxyList;
(function (ComputeTargetSSLProxyList) {
    ComputeTargetSSLProxyList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeTargetSSLProxyList.group = "compute.cnrm.cloud.google.com";
    ComputeTargetSSLProxyList.version = "v1beta1";
    ComputeTargetSSLProxyList.kind = "ComputeTargetSSLProxyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeTargetSSLProxyList.Metadata = Metadata;
})(ComputeTargetSSLProxyList = exports.ComputeTargetSSLProxyList || (exports.ComputeTargetSSLProxyList = {}));
// ComputeTargetTCPProxyList is a list of ComputeTargetTCPProxy
class ComputeTargetTCPProxyList {
    constructor(desc) {
        this.apiVersion = ComputeTargetTCPProxyList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeTargetTCPProxyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeTargetTCPProxyList = ComputeTargetTCPProxyList;
function isComputeTargetTCPProxyList(o) {
    return o && o.apiVersion === ComputeTargetTCPProxyList.apiVersion && o.kind === ComputeTargetTCPProxyList.kind;
}
exports.isComputeTargetTCPProxyList = isComputeTargetTCPProxyList;
(function (ComputeTargetTCPProxyList) {
    ComputeTargetTCPProxyList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeTargetTCPProxyList.group = "compute.cnrm.cloud.google.com";
    ComputeTargetTCPProxyList.version = "v1beta1";
    ComputeTargetTCPProxyList.kind = "ComputeTargetTCPProxyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeTargetTCPProxyList.Metadata = Metadata;
})(ComputeTargetTCPProxyList = exports.ComputeTargetTCPProxyList || (exports.ComputeTargetTCPProxyList = {}));
// ComputeTargetVPNGatewayList is a list of ComputeTargetVPNGateway
class ComputeTargetVPNGatewayList {
    constructor(desc) {
        this.apiVersion = ComputeTargetVPNGatewayList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeTargetVPNGatewayList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeTargetVPNGatewayList = ComputeTargetVPNGatewayList;
function isComputeTargetVPNGatewayList(o) {
    return o && o.apiVersion === ComputeTargetVPNGatewayList.apiVersion && o.kind === ComputeTargetVPNGatewayList.kind;
}
exports.isComputeTargetVPNGatewayList = isComputeTargetVPNGatewayList;
(function (ComputeTargetVPNGatewayList) {
    ComputeTargetVPNGatewayList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeTargetVPNGatewayList.group = "compute.cnrm.cloud.google.com";
    ComputeTargetVPNGatewayList.version = "v1beta1";
    ComputeTargetVPNGatewayList.kind = "ComputeTargetVPNGatewayList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeTargetVPNGatewayList.Metadata = Metadata;
})(ComputeTargetVPNGatewayList = exports.ComputeTargetVPNGatewayList || (exports.ComputeTargetVPNGatewayList = {}));
// ComputeURLMapList is a list of ComputeURLMap
class ComputeURLMapList {
    constructor(desc) {
        this.apiVersion = ComputeURLMapList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeURLMapList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeURLMapList = ComputeURLMapList;
function isComputeURLMapList(o) {
    return o && o.apiVersion === ComputeURLMapList.apiVersion && o.kind === ComputeURLMapList.kind;
}
exports.isComputeURLMapList = isComputeURLMapList;
(function (ComputeURLMapList) {
    ComputeURLMapList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeURLMapList.group = "compute.cnrm.cloud.google.com";
    ComputeURLMapList.version = "v1beta1";
    ComputeURLMapList.kind = "ComputeURLMapList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeURLMapList.Metadata = Metadata;
})(ComputeURLMapList = exports.ComputeURLMapList || (exports.ComputeURLMapList = {}));
// ComputeVPNGatewayList is a list of ComputeVPNGateway
class ComputeVPNGatewayList {
    constructor(desc) {
        this.apiVersion = ComputeVPNGatewayList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeVPNGatewayList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeVPNGatewayList = ComputeVPNGatewayList;
function isComputeVPNGatewayList(o) {
    return o && o.apiVersion === ComputeVPNGatewayList.apiVersion && o.kind === ComputeVPNGatewayList.kind;
}
exports.isComputeVPNGatewayList = isComputeVPNGatewayList;
(function (ComputeVPNGatewayList) {
    ComputeVPNGatewayList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeVPNGatewayList.group = "compute.cnrm.cloud.google.com";
    ComputeVPNGatewayList.version = "v1beta1";
    ComputeVPNGatewayList.kind = "ComputeVPNGatewayList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeVPNGatewayList.Metadata = Metadata;
})(ComputeVPNGatewayList = exports.ComputeVPNGatewayList || (exports.ComputeVPNGatewayList = {}));
// ComputeVPNTunnelList is a list of ComputeVPNTunnel
class ComputeVPNTunnelList {
    constructor(desc) {
        this.apiVersion = ComputeVPNTunnelList.apiVersion;
        this.items = desc.items;
        this.kind = ComputeVPNTunnelList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ComputeVPNTunnelList = ComputeVPNTunnelList;
function isComputeVPNTunnelList(o) {
    return o && o.apiVersion === ComputeVPNTunnelList.apiVersion && o.kind === ComputeVPNTunnelList.kind;
}
exports.isComputeVPNTunnelList = isComputeVPNTunnelList;
(function (ComputeVPNTunnelList) {
    ComputeVPNTunnelList.apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
    ComputeVPNTunnelList.group = "compute.cnrm.cloud.google.com";
    ComputeVPNTunnelList.version = "v1beta1";
    ComputeVPNTunnelList.kind = "ComputeVPNTunnelList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ComputeVPNTunnelList.Metadata = Metadata;
})(ComputeVPNTunnelList = exports.ComputeVPNTunnelList || (exports.ComputeVPNTunnelList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.compute.v1beta1.js.map