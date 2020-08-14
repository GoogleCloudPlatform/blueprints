"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNetworkSetList = exports.NetworkSetList = exports.isNetworkPolicyList = exports.NetworkPolicyList = exports.isIPPoolList = exports.IPPoolList = exports.isIPAMHandleList = exports.IPAMHandleList = exports.isIPAMConfigList = exports.IPAMConfigList = exports.isIPAMBlockList = exports.IPAMBlockList = exports.isHostEndpointList = exports.HostEndpointList = exports.isGlobalNetworkSetList = exports.GlobalNetworkSetList = exports.isGlobalNetworkPolicyList = exports.GlobalNetworkPolicyList = exports.isGlobalFelixConfigList = exports.GlobalFelixConfigList = exports.isGlobalBGPConfigList = exports.GlobalBGPConfigList = exports.isFelixConfigurationList = exports.FelixConfigurationList = exports.isClusterInformationList = exports.ClusterInformationList = exports.isBlockAffinityList = exports.BlockAffinityList = exports.isBGPPeerList = exports.BGPPeerList = exports.isBGPConfigurationList = exports.BGPConfigurationList = void 0;
// BGPConfigurationList is a list of BGPConfiguration
class BGPConfigurationList {
    constructor(desc) {
        this.apiVersion = BGPConfigurationList.apiVersion;
        this.items = desc.items;
        this.kind = BGPConfigurationList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BGPConfigurationList = BGPConfigurationList;
function isBGPConfigurationList(o) {
    return o && o.apiVersion === BGPConfigurationList.apiVersion && o.kind === BGPConfigurationList.kind;
}
exports.isBGPConfigurationList = isBGPConfigurationList;
(function (BGPConfigurationList) {
    BGPConfigurationList.apiVersion = "crd.projectcalico.org/v1";
    BGPConfigurationList.group = "crd.projectcalico.org";
    BGPConfigurationList.version = "v1";
    BGPConfigurationList.kind = "BGPConfigurationList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BGPConfigurationList.Metadata = Metadata;
})(BGPConfigurationList = exports.BGPConfigurationList || (exports.BGPConfigurationList = {}));
// BGPPeerList is a list of BGPPeer
class BGPPeerList {
    constructor(desc) {
        this.apiVersion = BGPPeerList.apiVersion;
        this.items = desc.items;
        this.kind = BGPPeerList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BGPPeerList = BGPPeerList;
function isBGPPeerList(o) {
    return o && o.apiVersion === BGPPeerList.apiVersion && o.kind === BGPPeerList.kind;
}
exports.isBGPPeerList = isBGPPeerList;
(function (BGPPeerList) {
    BGPPeerList.apiVersion = "crd.projectcalico.org/v1";
    BGPPeerList.group = "crd.projectcalico.org";
    BGPPeerList.version = "v1";
    BGPPeerList.kind = "BGPPeerList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BGPPeerList.Metadata = Metadata;
})(BGPPeerList = exports.BGPPeerList || (exports.BGPPeerList = {}));
// BlockAffinityList is a list of BlockAffinity
class BlockAffinityList {
    constructor(desc) {
        this.apiVersion = BlockAffinityList.apiVersion;
        this.items = desc.items;
        this.kind = BlockAffinityList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BlockAffinityList = BlockAffinityList;
function isBlockAffinityList(o) {
    return o && o.apiVersion === BlockAffinityList.apiVersion && o.kind === BlockAffinityList.kind;
}
exports.isBlockAffinityList = isBlockAffinityList;
(function (BlockAffinityList) {
    BlockAffinityList.apiVersion = "crd.projectcalico.org/v1";
    BlockAffinityList.group = "crd.projectcalico.org";
    BlockAffinityList.version = "v1";
    BlockAffinityList.kind = "BlockAffinityList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BlockAffinityList.Metadata = Metadata;
})(BlockAffinityList = exports.BlockAffinityList || (exports.BlockAffinityList = {}));
// ClusterInformationList is a list of ClusterInformation
class ClusterInformationList {
    constructor(desc) {
        this.apiVersion = ClusterInformationList.apiVersion;
        this.items = desc.items;
        this.kind = ClusterInformationList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ClusterInformationList = ClusterInformationList;
function isClusterInformationList(o) {
    return o && o.apiVersion === ClusterInformationList.apiVersion && o.kind === ClusterInformationList.kind;
}
exports.isClusterInformationList = isClusterInformationList;
(function (ClusterInformationList) {
    ClusterInformationList.apiVersion = "crd.projectcalico.org/v1";
    ClusterInformationList.group = "crd.projectcalico.org";
    ClusterInformationList.version = "v1";
    ClusterInformationList.kind = "ClusterInformationList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ClusterInformationList.Metadata = Metadata;
})(ClusterInformationList = exports.ClusterInformationList || (exports.ClusterInformationList = {}));
// FelixConfigurationList is a list of FelixConfiguration
class FelixConfigurationList {
    constructor(desc) {
        this.apiVersion = FelixConfigurationList.apiVersion;
        this.items = desc.items;
        this.kind = FelixConfigurationList.kind;
        this.metadata = desc.metadata;
    }
}
exports.FelixConfigurationList = FelixConfigurationList;
function isFelixConfigurationList(o) {
    return o && o.apiVersion === FelixConfigurationList.apiVersion && o.kind === FelixConfigurationList.kind;
}
exports.isFelixConfigurationList = isFelixConfigurationList;
(function (FelixConfigurationList) {
    FelixConfigurationList.apiVersion = "crd.projectcalico.org/v1";
    FelixConfigurationList.group = "crd.projectcalico.org";
    FelixConfigurationList.version = "v1";
    FelixConfigurationList.kind = "FelixConfigurationList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    FelixConfigurationList.Metadata = Metadata;
})(FelixConfigurationList = exports.FelixConfigurationList || (exports.FelixConfigurationList = {}));
// GlobalBGPConfigList is a list of GlobalBGPConfig
class GlobalBGPConfigList {
    constructor(desc) {
        this.apiVersion = GlobalBGPConfigList.apiVersion;
        this.items = desc.items;
        this.kind = GlobalBGPConfigList.kind;
        this.metadata = desc.metadata;
    }
}
exports.GlobalBGPConfigList = GlobalBGPConfigList;
function isGlobalBGPConfigList(o) {
    return o && o.apiVersion === GlobalBGPConfigList.apiVersion && o.kind === GlobalBGPConfigList.kind;
}
exports.isGlobalBGPConfigList = isGlobalBGPConfigList;
(function (GlobalBGPConfigList) {
    GlobalBGPConfigList.apiVersion = "crd.projectcalico.org/v1";
    GlobalBGPConfigList.group = "crd.projectcalico.org";
    GlobalBGPConfigList.version = "v1";
    GlobalBGPConfigList.kind = "GlobalBGPConfigList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    GlobalBGPConfigList.Metadata = Metadata;
})(GlobalBGPConfigList = exports.GlobalBGPConfigList || (exports.GlobalBGPConfigList = {}));
// GlobalFelixConfigList is a list of GlobalFelixConfig
class GlobalFelixConfigList {
    constructor(desc) {
        this.apiVersion = GlobalFelixConfigList.apiVersion;
        this.items = desc.items;
        this.kind = GlobalFelixConfigList.kind;
        this.metadata = desc.metadata;
    }
}
exports.GlobalFelixConfigList = GlobalFelixConfigList;
function isGlobalFelixConfigList(o) {
    return o && o.apiVersion === GlobalFelixConfigList.apiVersion && o.kind === GlobalFelixConfigList.kind;
}
exports.isGlobalFelixConfigList = isGlobalFelixConfigList;
(function (GlobalFelixConfigList) {
    GlobalFelixConfigList.apiVersion = "crd.projectcalico.org/v1";
    GlobalFelixConfigList.group = "crd.projectcalico.org";
    GlobalFelixConfigList.version = "v1";
    GlobalFelixConfigList.kind = "GlobalFelixConfigList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    GlobalFelixConfigList.Metadata = Metadata;
})(GlobalFelixConfigList = exports.GlobalFelixConfigList || (exports.GlobalFelixConfigList = {}));
// GlobalNetworkPolicyList is a list of GlobalNetworkPolicy
class GlobalNetworkPolicyList {
    constructor(desc) {
        this.apiVersion = GlobalNetworkPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = GlobalNetworkPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.GlobalNetworkPolicyList = GlobalNetworkPolicyList;
function isGlobalNetworkPolicyList(o) {
    return o && o.apiVersion === GlobalNetworkPolicyList.apiVersion && o.kind === GlobalNetworkPolicyList.kind;
}
exports.isGlobalNetworkPolicyList = isGlobalNetworkPolicyList;
(function (GlobalNetworkPolicyList) {
    GlobalNetworkPolicyList.apiVersion = "crd.projectcalico.org/v1";
    GlobalNetworkPolicyList.group = "crd.projectcalico.org";
    GlobalNetworkPolicyList.version = "v1";
    GlobalNetworkPolicyList.kind = "GlobalNetworkPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    GlobalNetworkPolicyList.Metadata = Metadata;
})(GlobalNetworkPolicyList = exports.GlobalNetworkPolicyList || (exports.GlobalNetworkPolicyList = {}));
// GlobalNetworkSetList is a list of GlobalNetworkSet
class GlobalNetworkSetList {
    constructor(desc) {
        this.apiVersion = GlobalNetworkSetList.apiVersion;
        this.items = desc.items;
        this.kind = GlobalNetworkSetList.kind;
        this.metadata = desc.metadata;
    }
}
exports.GlobalNetworkSetList = GlobalNetworkSetList;
function isGlobalNetworkSetList(o) {
    return o && o.apiVersion === GlobalNetworkSetList.apiVersion && o.kind === GlobalNetworkSetList.kind;
}
exports.isGlobalNetworkSetList = isGlobalNetworkSetList;
(function (GlobalNetworkSetList) {
    GlobalNetworkSetList.apiVersion = "crd.projectcalico.org/v1";
    GlobalNetworkSetList.group = "crd.projectcalico.org";
    GlobalNetworkSetList.version = "v1";
    GlobalNetworkSetList.kind = "GlobalNetworkSetList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    GlobalNetworkSetList.Metadata = Metadata;
})(GlobalNetworkSetList = exports.GlobalNetworkSetList || (exports.GlobalNetworkSetList = {}));
// HostEndpointList is a list of HostEndpoint
class HostEndpointList {
    constructor(desc) {
        this.apiVersion = HostEndpointList.apiVersion;
        this.items = desc.items;
        this.kind = HostEndpointList.kind;
        this.metadata = desc.metadata;
    }
}
exports.HostEndpointList = HostEndpointList;
function isHostEndpointList(o) {
    return o && o.apiVersion === HostEndpointList.apiVersion && o.kind === HostEndpointList.kind;
}
exports.isHostEndpointList = isHostEndpointList;
(function (HostEndpointList) {
    HostEndpointList.apiVersion = "crd.projectcalico.org/v1";
    HostEndpointList.group = "crd.projectcalico.org";
    HostEndpointList.version = "v1";
    HostEndpointList.kind = "HostEndpointList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    HostEndpointList.Metadata = Metadata;
})(HostEndpointList = exports.HostEndpointList || (exports.HostEndpointList = {}));
// IPAMBlockList is a list of IPAMBlock
class IPAMBlockList {
    constructor(desc) {
        this.apiVersion = IPAMBlockList.apiVersion;
        this.items = desc.items;
        this.kind = IPAMBlockList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IPAMBlockList = IPAMBlockList;
function isIPAMBlockList(o) {
    return o && o.apiVersion === IPAMBlockList.apiVersion && o.kind === IPAMBlockList.kind;
}
exports.isIPAMBlockList = isIPAMBlockList;
(function (IPAMBlockList) {
    IPAMBlockList.apiVersion = "crd.projectcalico.org/v1";
    IPAMBlockList.group = "crd.projectcalico.org";
    IPAMBlockList.version = "v1";
    IPAMBlockList.kind = "IPAMBlockList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IPAMBlockList.Metadata = Metadata;
})(IPAMBlockList = exports.IPAMBlockList || (exports.IPAMBlockList = {}));
// IPAMConfigList is a list of IPAMConfig
class IPAMConfigList {
    constructor(desc) {
        this.apiVersion = IPAMConfigList.apiVersion;
        this.items = desc.items;
        this.kind = IPAMConfigList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IPAMConfigList = IPAMConfigList;
function isIPAMConfigList(o) {
    return o && o.apiVersion === IPAMConfigList.apiVersion && o.kind === IPAMConfigList.kind;
}
exports.isIPAMConfigList = isIPAMConfigList;
(function (IPAMConfigList) {
    IPAMConfigList.apiVersion = "crd.projectcalico.org/v1";
    IPAMConfigList.group = "crd.projectcalico.org";
    IPAMConfigList.version = "v1";
    IPAMConfigList.kind = "IPAMConfigList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IPAMConfigList.Metadata = Metadata;
})(IPAMConfigList = exports.IPAMConfigList || (exports.IPAMConfigList = {}));
// IPAMHandleList is a list of IPAMHandle
class IPAMHandleList {
    constructor(desc) {
        this.apiVersion = IPAMHandleList.apiVersion;
        this.items = desc.items;
        this.kind = IPAMHandleList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IPAMHandleList = IPAMHandleList;
function isIPAMHandleList(o) {
    return o && o.apiVersion === IPAMHandleList.apiVersion && o.kind === IPAMHandleList.kind;
}
exports.isIPAMHandleList = isIPAMHandleList;
(function (IPAMHandleList) {
    IPAMHandleList.apiVersion = "crd.projectcalico.org/v1";
    IPAMHandleList.group = "crd.projectcalico.org";
    IPAMHandleList.version = "v1";
    IPAMHandleList.kind = "IPAMHandleList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IPAMHandleList.Metadata = Metadata;
})(IPAMHandleList = exports.IPAMHandleList || (exports.IPAMHandleList = {}));
// IPPoolList is a list of IPPool
class IPPoolList {
    constructor(desc) {
        this.apiVersion = IPPoolList.apiVersion;
        this.items = desc.items;
        this.kind = IPPoolList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IPPoolList = IPPoolList;
function isIPPoolList(o) {
    return o && o.apiVersion === IPPoolList.apiVersion && o.kind === IPPoolList.kind;
}
exports.isIPPoolList = isIPPoolList;
(function (IPPoolList) {
    IPPoolList.apiVersion = "crd.projectcalico.org/v1";
    IPPoolList.group = "crd.projectcalico.org";
    IPPoolList.version = "v1";
    IPPoolList.kind = "IPPoolList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IPPoolList.Metadata = Metadata;
})(IPPoolList = exports.IPPoolList || (exports.IPPoolList = {}));
// NetworkPolicyList is a list of NetworkPolicy
class NetworkPolicyList {
    constructor(desc) {
        this.apiVersion = NetworkPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = NetworkPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.NetworkPolicyList = NetworkPolicyList;
function isNetworkPolicyList(o) {
    return o && o.apiVersion === NetworkPolicyList.apiVersion && o.kind === NetworkPolicyList.kind;
}
exports.isNetworkPolicyList = isNetworkPolicyList;
(function (NetworkPolicyList) {
    NetworkPolicyList.apiVersion = "crd.projectcalico.org/v1";
    NetworkPolicyList.group = "crd.projectcalico.org";
    NetworkPolicyList.version = "v1";
    NetworkPolicyList.kind = "NetworkPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    NetworkPolicyList.Metadata = Metadata;
})(NetworkPolicyList = exports.NetworkPolicyList || (exports.NetworkPolicyList = {}));
// NetworkSetList is a list of NetworkSet
class NetworkSetList {
    constructor(desc) {
        this.apiVersion = NetworkSetList.apiVersion;
        this.items = desc.items;
        this.kind = NetworkSetList.kind;
        this.metadata = desc.metadata;
    }
}
exports.NetworkSetList = NetworkSetList;
function isNetworkSetList(o) {
    return o && o.apiVersion === NetworkSetList.apiVersion && o.kind === NetworkSetList.kind;
}
exports.isNetworkSetList = isNetworkSetList;
(function (NetworkSetList) {
    NetworkSetList.apiVersion = "crd.projectcalico.org/v1";
    NetworkSetList.group = "crd.projectcalico.org";
    NetworkSetList.version = "v1";
    NetworkSetList.kind = "NetworkSetList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    NetworkSetList.Metadata = Metadata;
})(NetworkSetList = exports.NetworkSetList || (exports.NetworkSetList = {}));
//# sourceMappingURL=org.projectcalico.crd.v1.js.map