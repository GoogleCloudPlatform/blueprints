"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDataflowJobList = exports.DataflowJobList = void 0;
// DataflowJobList is a list of DataflowJob
class DataflowJobList {
    constructor(desc) {
        this.apiVersion = DataflowJobList.apiVersion;
        this.items = desc.items;
        this.kind = DataflowJobList.kind;
        this.metadata = desc.metadata;
    }
}
exports.DataflowJobList = DataflowJobList;
function isDataflowJobList(o) {
    return o && o.apiVersion === DataflowJobList.apiVersion && o.kind === DataflowJobList.kind;
}
exports.isDataflowJobList = isDataflowJobList;
(function (DataflowJobList) {
    DataflowJobList.apiVersion = "dataflow.cnrm.cloud.google.com/v1beta1";
    DataflowJobList.group = "dataflow.cnrm.cloud.google.com";
    DataflowJobList.version = "v1beta1";
    DataflowJobList.kind = "DataflowJobList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    DataflowJobList.Metadata = Metadata;
})(DataflowJobList = exports.DataflowJobList || (exports.DataflowJobList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.dataflow.v1beta1.js.map