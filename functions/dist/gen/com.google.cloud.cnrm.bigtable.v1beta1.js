"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBigtableInstanceList = exports.BigtableInstanceList = void 0;
// BigtableInstanceList is a list of BigtableInstance
class BigtableInstanceList {
    constructor(desc) {
        this.apiVersion = BigtableInstanceList.apiVersion;
        this.items = desc.items;
        this.kind = BigtableInstanceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BigtableInstanceList = BigtableInstanceList;
function isBigtableInstanceList(o) {
    return o && o.apiVersion === BigtableInstanceList.apiVersion && o.kind === BigtableInstanceList.kind;
}
exports.isBigtableInstanceList = isBigtableInstanceList;
(function (BigtableInstanceList) {
    BigtableInstanceList.apiVersion = "bigtable.cnrm.cloud.google.com/v1beta1";
    BigtableInstanceList.group = "bigtable.cnrm.cloud.google.com";
    BigtableInstanceList.version = "v1beta1";
    BigtableInstanceList.kind = "BigtableInstanceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BigtableInstanceList.Metadata = Metadata;
})(BigtableInstanceList = exports.BigtableInstanceList || (exports.BigtableInstanceList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.bigtable.v1beta1.js.map