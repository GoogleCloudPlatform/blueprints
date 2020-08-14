"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContainerNodePoolList = exports.ContainerNodePoolList = exports.isContainerClusterList = exports.ContainerClusterList = void 0;
// ContainerClusterList is a list of ContainerCluster
class ContainerClusterList {
    constructor(desc) {
        this.apiVersion = ContainerClusterList.apiVersion;
        this.items = desc.items;
        this.kind = ContainerClusterList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ContainerClusterList = ContainerClusterList;
function isContainerClusterList(o) {
    return o && o.apiVersion === ContainerClusterList.apiVersion && o.kind === ContainerClusterList.kind;
}
exports.isContainerClusterList = isContainerClusterList;
(function (ContainerClusterList) {
    ContainerClusterList.apiVersion = "container.cnrm.cloud.google.com/v1beta1";
    ContainerClusterList.group = "container.cnrm.cloud.google.com";
    ContainerClusterList.version = "v1beta1";
    ContainerClusterList.kind = "ContainerClusterList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ContainerClusterList.Metadata = Metadata;
})(ContainerClusterList = exports.ContainerClusterList || (exports.ContainerClusterList = {}));
// ContainerNodePoolList is a list of ContainerNodePool
class ContainerNodePoolList {
    constructor(desc) {
        this.apiVersion = ContainerNodePoolList.apiVersion;
        this.items = desc.items;
        this.kind = ContainerNodePoolList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ContainerNodePoolList = ContainerNodePoolList;
function isContainerNodePoolList(o) {
    return o && o.apiVersion === ContainerNodePoolList.apiVersion && o.kind === ContainerNodePoolList.kind;
}
exports.isContainerNodePoolList = isContainerNodePoolList;
(function (ContainerNodePoolList) {
    ContainerNodePoolList.apiVersion = "container.cnrm.cloud.google.com/v1beta1";
    ContainerNodePoolList.group = "container.cnrm.cloud.google.com";
    ContainerNodePoolList.version = "v1beta1";
    ContainerNodePoolList.kind = "ContainerNodePoolList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ContainerNodePoolList.Metadata = Metadata;
})(ContainerNodePoolList = exports.ContainerNodePoolList || (exports.ContainerNodePoolList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.container.v1beta1.js.map