"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServiceNetworkingConnectionList = exports.ServiceNetworkingConnectionList = void 0;
// ServiceNetworkingConnectionList is a list of ServiceNetworkingConnection
class ServiceNetworkingConnectionList {
    constructor(desc) {
        this.apiVersion = ServiceNetworkingConnectionList.apiVersion;
        this.items = desc.items;
        this.kind = ServiceNetworkingConnectionList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ServiceNetworkingConnectionList = ServiceNetworkingConnectionList;
function isServiceNetworkingConnectionList(o) {
    return o && o.apiVersion === ServiceNetworkingConnectionList.apiVersion && o.kind === ServiceNetworkingConnectionList.kind;
}
exports.isServiceNetworkingConnectionList = isServiceNetworkingConnectionList;
(function (ServiceNetworkingConnectionList) {
    ServiceNetworkingConnectionList.apiVersion = "servicenetworking.cnrm.cloud.google.com/v1beta1";
    ServiceNetworkingConnectionList.group = "servicenetworking.cnrm.cloud.google.com";
    ServiceNetworkingConnectionList.version = "v1beta1";
    ServiceNetworkingConnectionList.kind = "ServiceNetworkingConnectionList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ServiceNetworkingConnectionList.Metadata = Metadata;
})(ServiceNetworkingConnectionList = exports.ServiceNetworkingConnectionList || (exports.ServiceNetworkingConnectionList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.servicenetworking.v1beta1.js.map