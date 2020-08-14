"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpannerInstanceList = exports.SpannerInstanceList = exports.isSpannerDatabaseList = exports.SpannerDatabaseList = void 0;
// SpannerDatabaseList is a list of SpannerDatabase
class SpannerDatabaseList {
    constructor(desc) {
        this.apiVersion = SpannerDatabaseList.apiVersion;
        this.items = desc.items;
        this.kind = SpannerDatabaseList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SpannerDatabaseList = SpannerDatabaseList;
function isSpannerDatabaseList(o) {
    return o && o.apiVersion === SpannerDatabaseList.apiVersion && o.kind === SpannerDatabaseList.kind;
}
exports.isSpannerDatabaseList = isSpannerDatabaseList;
(function (SpannerDatabaseList) {
    SpannerDatabaseList.apiVersion = "spanner.cnrm.cloud.google.com/v1beta1";
    SpannerDatabaseList.group = "spanner.cnrm.cloud.google.com";
    SpannerDatabaseList.version = "v1beta1";
    SpannerDatabaseList.kind = "SpannerDatabaseList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SpannerDatabaseList.Metadata = Metadata;
})(SpannerDatabaseList = exports.SpannerDatabaseList || (exports.SpannerDatabaseList = {}));
// SpannerInstanceList is a list of SpannerInstance
class SpannerInstanceList {
    constructor(desc) {
        this.apiVersion = SpannerInstanceList.apiVersion;
        this.items = desc.items;
        this.kind = SpannerInstanceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SpannerInstanceList = SpannerInstanceList;
function isSpannerInstanceList(o) {
    return o && o.apiVersion === SpannerInstanceList.apiVersion && o.kind === SpannerInstanceList.kind;
}
exports.isSpannerInstanceList = isSpannerInstanceList;
(function (SpannerInstanceList) {
    SpannerInstanceList.apiVersion = "spanner.cnrm.cloud.google.com/v1beta1";
    SpannerInstanceList.group = "spanner.cnrm.cloud.google.com";
    SpannerInstanceList.version = "v1beta1";
    SpannerInstanceList.kind = "SpannerInstanceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SpannerInstanceList.Metadata = Metadata;
})(SpannerInstanceList = exports.SpannerInstanceList || (exports.SpannerInstanceList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.spanner.v1beta1.js.map