"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBigQueryTableList = exports.BigQueryTableList = exports.isBigQueryJobList = exports.BigQueryJobList = exports.isBigQueryDatasetList = exports.BigQueryDatasetList = void 0;
// BigQueryDatasetList is a list of BigQueryDataset
class BigQueryDatasetList {
    constructor(desc) {
        this.apiVersion = BigQueryDatasetList.apiVersion;
        this.items = desc.items;
        this.kind = BigQueryDatasetList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BigQueryDatasetList = BigQueryDatasetList;
function isBigQueryDatasetList(o) {
    return o && o.apiVersion === BigQueryDatasetList.apiVersion && o.kind === BigQueryDatasetList.kind;
}
exports.isBigQueryDatasetList = isBigQueryDatasetList;
(function (BigQueryDatasetList) {
    BigQueryDatasetList.apiVersion = "bigquery.cnrm.cloud.google.com/v1beta1";
    BigQueryDatasetList.group = "bigquery.cnrm.cloud.google.com";
    BigQueryDatasetList.version = "v1beta1";
    BigQueryDatasetList.kind = "BigQueryDatasetList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BigQueryDatasetList.Metadata = Metadata;
})(BigQueryDatasetList = exports.BigQueryDatasetList || (exports.BigQueryDatasetList = {}));
// BigQueryJobList is a list of BigQueryJob
class BigQueryJobList {
    constructor(desc) {
        this.apiVersion = BigQueryJobList.apiVersion;
        this.items = desc.items;
        this.kind = BigQueryJobList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BigQueryJobList = BigQueryJobList;
function isBigQueryJobList(o) {
    return o && o.apiVersion === BigQueryJobList.apiVersion && o.kind === BigQueryJobList.kind;
}
exports.isBigQueryJobList = isBigQueryJobList;
(function (BigQueryJobList) {
    BigQueryJobList.apiVersion = "bigquery.cnrm.cloud.google.com/v1beta1";
    BigQueryJobList.group = "bigquery.cnrm.cloud.google.com";
    BigQueryJobList.version = "v1beta1";
    BigQueryJobList.kind = "BigQueryJobList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BigQueryJobList.Metadata = Metadata;
})(BigQueryJobList = exports.BigQueryJobList || (exports.BigQueryJobList = {}));
// BigQueryTableList is a list of BigQueryTable
class BigQueryTableList {
    constructor(desc) {
        this.apiVersion = BigQueryTableList.apiVersion;
        this.items = desc.items;
        this.kind = BigQueryTableList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BigQueryTableList = BigQueryTableList;
function isBigQueryTableList(o) {
    return o && o.apiVersion === BigQueryTableList.apiVersion && o.kind === BigQueryTableList.kind;
}
exports.isBigQueryTableList = isBigQueryTableList;
(function (BigQueryTableList) {
    BigQueryTableList.apiVersion = "bigquery.cnrm.cloud.google.com/v1beta1";
    BigQueryTableList.group = "bigquery.cnrm.cloud.google.com";
    BigQueryTableList.version = "v1beta1";
    BigQueryTableList.kind = "BigQueryTableList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BigQueryTableList.Metadata = Metadata;
})(BigQueryTableList = exports.BigQueryTableList || (exports.BigQueryTableList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.bigquery.v1beta1.js.map