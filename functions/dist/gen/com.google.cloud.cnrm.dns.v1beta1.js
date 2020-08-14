"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDNSRecordSetList = exports.DNSRecordSetList = exports.isDNSPolicyList = exports.DNSPolicyList = exports.isDNSManagedZoneList = exports.DNSManagedZoneList = void 0;
// DNSManagedZoneList is a list of DNSManagedZone
class DNSManagedZoneList {
    constructor(desc) {
        this.apiVersion = DNSManagedZoneList.apiVersion;
        this.items = desc.items;
        this.kind = DNSManagedZoneList.kind;
        this.metadata = desc.metadata;
    }
}
exports.DNSManagedZoneList = DNSManagedZoneList;
function isDNSManagedZoneList(o) {
    return o && o.apiVersion === DNSManagedZoneList.apiVersion && o.kind === DNSManagedZoneList.kind;
}
exports.isDNSManagedZoneList = isDNSManagedZoneList;
(function (DNSManagedZoneList) {
    DNSManagedZoneList.apiVersion = "dns.cnrm.cloud.google.com/v1beta1";
    DNSManagedZoneList.group = "dns.cnrm.cloud.google.com";
    DNSManagedZoneList.version = "v1beta1";
    DNSManagedZoneList.kind = "DNSManagedZoneList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    DNSManagedZoneList.Metadata = Metadata;
})(DNSManagedZoneList = exports.DNSManagedZoneList || (exports.DNSManagedZoneList = {}));
// DNSPolicyList is a list of DNSPolicy
class DNSPolicyList {
    constructor(desc) {
        this.apiVersion = DNSPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = DNSPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.DNSPolicyList = DNSPolicyList;
function isDNSPolicyList(o) {
    return o && o.apiVersion === DNSPolicyList.apiVersion && o.kind === DNSPolicyList.kind;
}
exports.isDNSPolicyList = isDNSPolicyList;
(function (DNSPolicyList) {
    DNSPolicyList.apiVersion = "dns.cnrm.cloud.google.com/v1beta1";
    DNSPolicyList.group = "dns.cnrm.cloud.google.com";
    DNSPolicyList.version = "v1beta1";
    DNSPolicyList.kind = "DNSPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    DNSPolicyList.Metadata = Metadata;
})(DNSPolicyList = exports.DNSPolicyList || (exports.DNSPolicyList = {}));
// DNSRecordSetList is a list of DNSRecordSet
class DNSRecordSetList {
    constructor(desc) {
        this.apiVersion = DNSRecordSetList.apiVersion;
        this.items = desc.items;
        this.kind = DNSRecordSetList.kind;
        this.metadata = desc.metadata;
    }
}
exports.DNSRecordSetList = DNSRecordSetList;
function isDNSRecordSetList(o) {
    return o && o.apiVersion === DNSRecordSetList.apiVersion && o.kind === DNSRecordSetList.kind;
}
exports.isDNSRecordSetList = isDNSRecordSetList;
(function (DNSRecordSetList) {
    DNSRecordSetList.apiVersion = "dns.cnrm.cloud.google.com/v1beta1";
    DNSRecordSetList.group = "dns.cnrm.cloud.google.com";
    DNSRecordSetList.version = "v1beta1";
    DNSRecordSetList.kind = "DNSRecordSetList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    DNSRecordSetList.Metadata = Metadata;
})(DNSRecordSetList = exports.DNSRecordSetList || (exports.DNSRecordSetList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.dns.v1beta1.js.map