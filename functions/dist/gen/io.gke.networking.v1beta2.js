"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isManagedCertificateList = exports.ManagedCertificateList = void 0;
// ManagedCertificateList is a list of ManagedCertificate
class ManagedCertificateList {
    constructor(desc) {
        this.apiVersion = ManagedCertificateList.apiVersion;
        this.items = desc.items;
        this.kind = ManagedCertificateList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ManagedCertificateList = ManagedCertificateList;
function isManagedCertificateList(o) {
    return o && o.apiVersion === ManagedCertificateList.apiVersion && o.kind === ManagedCertificateList.kind;
}
exports.isManagedCertificateList = isManagedCertificateList;
(function (ManagedCertificateList) {
    ManagedCertificateList.apiVersion = "networking.gke.io/v1beta2";
    ManagedCertificateList.group = "networking.gke.io";
    ManagedCertificateList.version = "v1beta2";
    ManagedCertificateList.kind = "ManagedCertificateList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ManagedCertificateList.Metadata = Metadata;
})(ManagedCertificateList = exports.ManagedCertificateList || (exports.ManagedCertificateList = {}));
//# sourceMappingURL=io.gke.networking.v1beta2.js.map