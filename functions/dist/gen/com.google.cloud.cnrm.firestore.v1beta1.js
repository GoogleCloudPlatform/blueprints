"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirestoreIndexList = exports.FirestoreIndexList = void 0;
// FirestoreIndexList is a list of FirestoreIndex
class FirestoreIndexList {
    constructor(desc) {
        this.apiVersion = FirestoreIndexList.apiVersion;
        this.items = desc.items;
        this.kind = FirestoreIndexList.kind;
        this.metadata = desc.metadata;
    }
}
exports.FirestoreIndexList = FirestoreIndexList;
function isFirestoreIndexList(o) {
    return o && o.apiVersion === FirestoreIndexList.apiVersion && o.kind === FirestoreIndexList.kind;
}
exports.isFirestoreIndexList = isFirestoreIndexList;
(function (FirestoreIndexList) {
    FirestoreIndexList.apiVersion = "firestore.cnrm.cloud.google.com/v1beta1";
    FirestoreIndexList.group = "firestore.cnrm.cloud.google.com";
    FirestoreIndexList.version = "v1beta1";
    FirestoreIndexList.kind = "FirestoreIndexList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    FirestoreIndexList.Metadata = Metadata;
})(FirestoreIndexList = exports.FirestoreIndexList || (exports.FirestoreIndexList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.firestore.v1beta1.js.map