"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServiceMappingList = exports.ServiceMappingList = void 0;
// ServiceMappingList is a list of ServiceMapping
class ServiceMappingList {
    constructor(desc) {
        this.apiVersion = ServiceMappingList.apiVersion;
        this.items = desc.items;
        this.kind = ServiceMappingList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ServiceMappingList = ServiceMappingList;
function isServiceMappingList(o) {
    return o && o.apiVersion === ServiceMappingList.apiVersion && o.kind === ServiceMappingList.kind;
}
exports.isServiceMappingList = isServiceMappingList;
(function (ServiceMappingList) {
    ServiceMappingList.apiVersion = "core.cnrm.cloud.google.com/v1alpha1";
    ServiceMappingList.group = "core.cnrm.cloud.google.com";
    ServiceMappingList.version = "v1alpha1";
    ServiceMappingList.kind = "ServiceMappingList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ServiceMappingList.Metadata = Metadata;
})(ServiceMappingList = exports.ServiceMappingList || (exports.ServiceMappingList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.core.v1alpha1.js.map