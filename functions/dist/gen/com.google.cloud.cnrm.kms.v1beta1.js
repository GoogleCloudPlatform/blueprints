"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKMSKeyRingList = exports.KMSKeyRingList = exports.isKMSCryptoKeyList = exports.KMSCryptoKeyList = void 0;
// KMSCryptoKeyList is a list of KMSCryptoKey
class KMSCryptoKeyList {
    constructor(desc) {
        this.apiVersion = KMSCryptoKeyList.apiVersion;
        this.items = desc.items;
        this.kind = KMSCryptoKeyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.KMSCryptoKeyList = KMSCryptoKeyList;
function isKMSCryptoKeyList(o) {
    return o && o.apiVersion === KMSCryptoKeyList.apiVersion && o.kind === KMSCryptoKeyList.kind;
}
exports.isKMSCryptoKeyList = isKMSCryptoKeyList;
(function (KMSCryptoKeyList) {
    KMSCryptoKeyList.apiVersion = "kms.cnrm.cloud.google.com/v1beta1";
    KMSCryptoKeyList.group = "kms.cnrm.cloud.google.com";
    KMSCryptoKeyList.version = "v1beta1";
    KMSCryptoKeyList.kind = "KMSCryptoKeyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    KMSCryptoKeyList.Metadata = Metadata;
})(KMSCryptoKeyList = exports.KMSCryptoKeyList || (exports.KMSCryptoKeyList = {}));
// KMSKeyRingList is a list of KMSKeyRing
class KMSKeyRingList {
    constructor(desc) {
        this.apiVersion = KMSKeyRingList.apiVersion;
        this.items = desc.items;
        this.kind = KMSKeyRingList.kind;
        this.metadata = desc.metadata;
    }
}
exports.KMSKeyRingList = KMSKeyRingList;
function isKMSKeyRingList(o) {
    return o && o.apiVersion === KMSKeyRingList.apiVersion && o.kind === KMSKeyRingList.kind;
}
exports.isKMSKeyRingList = isKMSKeyRingList;
(function (KMSKeyRingList) {
    KMSKeyRingList.apiVersion = "kms.cnrm.cloud.google.com/v1beta1";
    KMSKeyRingList.group = "kms.cnrm.cloud.google.com";
    KMSKeyRingList.version = "v1beta1";
    KMSKeyRingList.kind = "KMSKeyRingList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    KMSKeyRingList.Metadata = Metadata;
})(KMSKeyRingList = exports.KMSKeyRingList || (exports.KMSKeyRingList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.kms.v1beta1.js.map