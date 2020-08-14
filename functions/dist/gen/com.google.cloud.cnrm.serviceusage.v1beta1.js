"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServiceList = exports.ServiceList = void 0;
// ServiceList is a list of Service
class ServiceList {
    constructor(desc) {
        this.apiVersion = ServiceList.apiVersion;
        this.items = desc.items;
        this.kind = ServiceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ServiceList = ServiceList;
function isServiceList(o) {
    return o && o.apiVersion === ServiceList.apiVersion && o.kind === ServiceList.kind;
}
exports.isServiceList = isServiceList;
(function (ServiceList) {
    ServiceList.apiVersion = "serviceusage.cnrm.cloud.google.com/v1beta1";
    ServiceList.group = "serviceusage.cnrm.cloud.google.com";
    ServiceList.version = "v1beta1";
    ServiceList.kind = "ServiceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ServiceList.Metadata = Metadata;
})(ServiceList = exports.ServiceList || (exports.ServiceList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.serviceusage.v1beta1.js.map