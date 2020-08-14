"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIAMServiceAccountList = exports.IAMServiceAccountList = exports.isIAMServiceAccountKeyList = exports.IAMServiceAccountKeyList = exports.isIAMPolicyMemberList = exports.IAMPolicyMemberList = exports.isIAMPolicyList = exports.IAMPolicyList = exports.isIAMCustomRoleList = exports.IAMCustomRoleList = void 0;
// IAMCustomRoleList is a list of IAMCustomRole
class IAMCustomRoleList {
    constructor(desc) {
        this.apiVersion = IAMCustomRoleList.apiVersion;
        this.items = desc.items;
        this.kind = IAMCustomRoleList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IAMCustomRoleList = IAMCustomRoleList;
function isIAMCustomRoleList(o) {
    return o && o.apiVersion === IAMCustomRoleList.apiVersion && o.kind === IAMCustomRoleList.kind;
}
exports.isIAMCustomRoleList = isIAMCustomRoleList;
(function (IAMCustomRoleList) {
    IAMCustomRoleList.apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
    IAMCustomRoleList.group = "iam.cnrm.cloud.google.com";
    IAMCustomRoleList.version = "v1beta1";
    IAMCustomRoleList.kind = "IAMCustomRoleList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IAMCustomRoleList.Metadata = Metadata;
})(IAMCustomRoleList = exports.IAMCustomRoleList || (exports.IAMCustomRoleList = {}));
// IAMPolicyList is a list of IAMPolicy
class IAMPolicyList {
    constructor(desc) {
        this.apiVersion = IAMPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = IAMPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IAMPolicyList = IAMPolicyList;
function isIAMPolicyList(o) {
    return o && o.apiVersion === IAMPolicyList.apiVersion && o.kind === IAMPolicyList.kind;
}
exports.isIAMPolicyList = isIAMPolicyList;
(function (IAMPolicyList) {
    IAMPolicyList.apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
    IAMPolicyList.group = "iam.cnrm.cloud.google.com";
    IAMPolicyList.version = "v1beta1";
    IAMPolicyList.kind = "IAMPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IAMPolicyList.Metadata = Metadata;
})(IAMPolicyList = exports.IAMPolicyList || (exports.IAMPolicyList = {}));
// IAMPolicyMemberList is a list of IAMPolicyMember
class IAMPolicyMemberList {
    constructor(desc) {
        this.apiVersion = IAMPolicyMemberList.apiVersion;
        this.items = desc.items;
        this.kind = IAMPolicyMemberList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IAMPolicyMemberList = IAMPolicyMemberList;
function isIAMPolicyMemberList(o) {
    return o && o.apiVersion === IAMPolicyMemberList.apiVersion && o.kind === IAMPolicyMemberList.kind;
}
exports.isIAMPolicyMemberList = isIAMPolicyMemberList;
(function (IAMPolicyMemberList) {
    IAMPolicyMemberList.apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
    IAMPolicyMemberList.group = "iam.cnrm.cloud.google.com";
    IAMPolicyMemberList.version = "v1beta1";
    IAMPolicyMemberList.kind = "IAMPolicyMemberList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IAMPolicyMemberList.Metadata = Metadata;
})(IAMPolicyMemberList = exports.IAMPolicyMemberList || (exports.IAMPolicyMemberList = {}));
// IAMServiceAccountKeyList is a list of IAMServiceAccountKey
class IAMServiceAccountKeyList {
    constructor(desc) {
        this.apiVersion = IAMServiceAccountKeyList.apiVersion;
        this.items = desc.items;
        this.kind = IAMServiceAccountKeyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IAMServiceAccountKeyList = IAMServiceAccountKeyList;
function isIAMServiceAccountKeyList(o) {
    return o && o.apiVersion === IAMServiceAccountKeyList.apiVersion && o.kind === IAMServiceAccountKeyList.kind;
}
exports.isIAMServiceAccountKeyList = isIAMServiceAccountKeyList;
(function (IAMServiceAccountKeyList) {
    IAMServiceAccountKeyList.apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
    IAMServiceAccountKeyList.group = "iam.cnrm.cloud.google.com";
    IAMServiceAccountKeyList.version = "v1beta1";
    IAMServiceAccountKeyList.kind = "IAMServiceAccountKeyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IAMServiceAccountKeyList.Metadata = Metadata;
})(IAMServiceAccountKeyList = exports.IAMServiceAccountKeyList || (exports.IAMServiceAccountKeyList = {}));
// IAMServiceAccountList is a list of IAMServiceAccount
class IAMServiceAccountList {
    constructor(desc) {
        this.apiVersion = IAMServiceAccountList.apiVersion;
        this.items = desc.items;
        this.kind = IAMServiceAccountList.kind;
        this.metadata = desc.metadata;
    }
}
exports.IAMServiceAccountList = IAMServiceAccountList;
function isIAMServiceAccountList(o) {
    return o && o.apiVersion === IAMServiceAccountList.apiVersion && o.kind === IAMServiceAccountList.kind;
}
exports.isIAMServiceAccountList = isIAMServiceAccountList;
(function (IAMServiceAccountList) {
    IAMServiceAccountList.apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
    IAMServiceAccountList.group = "iam.cnrm.cloud.google.com";
    IAMServiceAccountList.version = "v1beta1";
    IAMServiceAccountList.kind = "IAMServiceAccountList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    IAMServiceAccountList.Metadata = Metadata;
})(IAMServiceAccountList = exports.IAMServiceAccountList || (exports.IAMServiceAccountList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.iam.v1beta1.js.map