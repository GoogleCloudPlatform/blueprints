"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUpdateInfoList = exports.UpdateInfoList = void 0;
// UpdateInfoList is a list of UpdateInfo
class UpdateInfoList {
    constructor(desc) {
        this.apiVersion = UpdateInfoList.apiVersion;
        this.items = desc.items;
        this.kind = UpdateInfoList.kind;
        this.metadata = desc.metadata;
    }
}
exports.UpdateInfoList = UpdateInfoList;
function isUpdateInfoList(o) {
    return o && o.apiVersion === UpdateInfoList.apiVersion && o.kind === UpdateInfoList.kind;
}
exports.isUpdateInfoList = isUpdateInfoList;
(function (UpdateInfoList) {
    UpdateInfoList.apiVersion = "nodemanagement.gke.io/v1alpha1";
    UpdateInfoList.group = "nodemanagement.gke.io";
    UpdateInfoList.version = "v1alpha1";
    UpdateInfoList.kind = "UpdateInfoList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    UpdateInfoList.Metadata = Metadata;
})(UpdateInfoList = exports.UpdateInfoList || (exports.UpdateInfoList = {}));
//# sourceMappingURL=io.gke.nodemanagement.v1alpha1.js.map