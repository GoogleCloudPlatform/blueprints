"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCloudBuildTriggerList = exports.CloudBuildTriggerList = void 0;
// CloudBuildTriggerList is a list of CloudBuildTrigger
class CloudBuildTriggerList {
    constructor(desc) {
        this.apiVersion = CloudBuildTriggerList.apiVersion;
        this.items = desc.items;
        this.kind = CloudBuildTriggerList.kind;
        this.metadata = desc.metadata;
    }
}
exports.CloudBuildTriggerList = CloudBuildTriggerList;
function isCloudBuildTriggerList(o) {
    return o && o.apiVersion === CloudBuildTriggerList.apiVersion && o.kind === CloudBuildTriggerList.kind;
}
exports.isCloudBuildTriggerList = isCloudBuildTriggerList;
(function (CloudBuildTriggerList) {
    CloudBuildTriggerList.apiVersion = "cloudbuild.cnrm.cloud.google.com/v1beta1";
    CloudBuildTriggerList.group = "cloudbuild.cnrm.cloud.google.com";
    CloudBuildTriggerList.version = "v1beta1";
    CloudBuildTriggerList.kind = "CloudBuildTriggerList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    CloudBuildTriggerList.Metadata = Metadata;
})(CloudBuildTriggerList = exports.CloudBuildTriggerList || (exports.CloudBuildTriggerList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.cloudbuild.v1beta1.js.map