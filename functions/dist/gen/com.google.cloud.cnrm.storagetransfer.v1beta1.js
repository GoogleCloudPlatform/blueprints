"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStorageTransferJobList = exports.StorageTransferJobList = void 0;
// StorageTransferJobList is a list of StorageTransferJob
class StorageTransferJobList {
    constructor(desc) {
        this.apiVersion = StorageTransferJobList.apiVersion;
        this.items = desc.items;
        this.kind = StorageTransferJobList.kind;
        this.metadata = desc.metadata;
    }
}
exports.StorageTransferJobList = StorageTransferJobList;
function isStorageTransferJobList(o) {
    return o && o.apiVersion === StorageTransferJobList.apiVersion && o.kind === StorageTransferJobList.kind;
}
exports.isStorageTransferJobList = isStorageTransferJobList;
(function (StorageTransferJobList) {
    StorageTransferJobList.apiVersion = "storagetransfer.cnrm.cloud.google.com/v1beta1";
    StorageTransferJobList.group = "storagetransfer.cnrm.cloud.google.com";
    StorageTransferJobList.version = "v1beta1";
    StorageTransferJobList.kind = "StorageTransferJobList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    StorageTransferJobList.Metadata = Metadata;
})(StorageTransferJobList = exports.StorageTransferJobList || (exports.StorageTransferJobList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.storagetransfer.v1beta1.js.map