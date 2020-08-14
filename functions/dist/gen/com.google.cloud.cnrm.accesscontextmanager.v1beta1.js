"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccessContextManagerAccessPolicyList = exports.AccessContextManagerAccessPolicyList = exports.isAccessContextManagerAccessLevelList = exports.AccessContextManagerAccessLevelList = void 0;
// AccessContextManagerAccessLevelList is a list of AccessContextManagerAccessLevel
class AccessContextManagerAccessLevelList {
    constructor(desc) {
        this.apiVersion = AccessContextManagerAccessLevelList.apiVersion;
        this.items = desc.items;
        this.kind = AccessContextManagerAccessLevelList.kind;
        this.metadata = desc.metadata;
    }
}
exports.AccessContextManagerAccessLevelList = AccessContextManagerAccessLevelList;
function isAccessContextManagerAccessLevelList(o) {
    return o && o.apiVersion === AccessContextManagerAccessLevelList.apiVersion && o.kind === AccessContextManagerAccessLevelList.kind;
}
exports.isAccessContextManagerAccessLevelList = isAccessContextManagerAccessLevelList;
(function (AccessContextManagerAccessLevelList) {
    AccessContextManagerAccessLevelList.apiVersion = "accesscontextmanager.cnrm.cloud.google.com/v1beta1";
    AccessContextManagerAccessLevelList.group = "accesscontextmanager.cnrm.cloud.google.com";
    AccessContextManagerAccessLevelList.version = "v1beta1";
    AccessContextManagerAccessLevelList.kind = "AccessContextManagerAccessLevelList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    AccessContextManagerAccessLevelList.Metadata = Metadata;
})(AccessContextManagerAccessLevelList = exports.AccessContextManagerAccessLevelList || (exports.AccessContextManagerAccessLevelList = {}));
// AccessContextManagerAccessPolicyList is a list of AccessContextManagerAccessPolicy
class AccessContextManagerAccessPolicyList {
    constructor(desc) {
        this.apiVersion = AccessContextManagerAccessPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = AccessContextManagerAccessPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.AccessContextManagerAccessPolicyList = AccessContextManagerAccessPolicyList;
function isAccessContextManagerAccessPolicyList(o) {
    return o && o.apiVersion === AccessContextManagerAccessPolicyList.apiVersion && o.kind === AccessContextManagerAccessPolicyList.kind;
}
exports.isAccessContextManagerAccessPolicyList = isAccessContextManagerAccessPolicyList;
(function (AccessContextManagerAccessPolicyList) {
    AccessContextManagerAccessPolicyList.apiVersion = "accesscontextmanager.cnrm.cloud.google.com/v1beta1";
    AccessContextManagerAccessPolicyList.group = "accesscontextmanager.cnrm.cloud.google.com";
    AccessContextManagerAccessPolicyList.version = "v1beta1";
    AccessContextManagerAccessPolicyList.kind = "AccessContextManagerAccessPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    AccessContextManagerAccessPolicyList.Metadata = Metadata;
})(AccessContextManagerAccessPolicyList = exports.AccessContextManagerAccessPolicyList || (exports.AccessContextManagerAccessPolicyList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.accesscontextmanager.v1beta1.js.map