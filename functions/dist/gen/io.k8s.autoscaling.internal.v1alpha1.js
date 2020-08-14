"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCapacityRequestList = exports.CapacityRequestList = void 0;
// CapacityRequestList is a list of CapacityRequest
class CapacityRequestList {
    constructor(desc) {
        this.apiVersion = CapacityRequestList.apiVersion;
        this.items = desc.items;
        this.kind = CapacityRequestList.kind;
        this.metadata = desc.metadata;
    }
}
exports.CapacityRequestList = CapacityRequestList;
function isCapacityRequestList(o) {
    return o && o.apiVersion === CapacityRequestList.apiVersion && o.kind === CapacityRequestList.kind;
}
exports.isCapacityRequestList = isCapacityRequestList;
(function (CapacityRequestList) {
    CapacityRequestList.apiVersion = "internal.autoscaling.k8s.io/v1alpha1";
    CapacityRequestList.group = "internal.autoscaling.k8s.io";
    CapacityRequestList.version = "v1alpha1";
    CapacityRequestList.kind = "CapacityRequestList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    CapacityRequestList.Metadata = Metadata;
})(CapacityRequestList = exports.CapacityRequestList || (exports.CapacityRequestList = {}));
//# sourceMappingURL=io.k8s.autoscaling.internal.v1alpha1.js.map