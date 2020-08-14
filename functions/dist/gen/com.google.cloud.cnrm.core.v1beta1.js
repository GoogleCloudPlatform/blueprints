"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConfigConnectorList = exports.ConfigConnectorList = exports.isConfigConnectorContextList = exports.ConfigConnectorContextList = void 0;
// ConfigConnectorContextList is a list of ConfigConnectorContext
class ConfigConnectorContextList {
    constructor(desc) {
        this.apiVersion = ConfigConnectorContextList.apiVersion;
        this.items = desc.items;
        this.kind = ConfigConnectorContextList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ConfigConnectorContextList = ConfigConnectorContextList;
function isConfigConnectorContextList(o) {
    return o && o.apiVersion === ConfigConnectorContextList.apiVersion && o.kind === ConfigConnectorContextList.kind;
}
exports.isConfigConnectorContextList = isConfigConnectorContextList;
(function (ConfigConnectorContextList) {
    ConfigConnectorContextList.apiVersion = "core.cnrm.cloud.google.com/v1beta1";
    ConfigConnectorContextList.group = "core.cnrm.cloud.google.com";
    ConfigConnectorContextList.version = "v1beta1";
    ConfigConnectorContextList.kind = "ConfigConnectorContextList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ConfigConnectorContextList.Metadata = Metadata;
})(ConfigConnectorContextList = exports.ConfigConnectorContextList || (exports.ConfigConnectorContextList = {}));
// ConfigConnectorList is a list of ConfigConnector
class ConfigConnectorList {
    constructor(desc) {
        this.apiVersion = ConfigConnectorList.apiVersion;
        this.items = desc.items;
        this.kind = ConfigConnectorList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ConfigConnectorList = ConfigConnectorList;
function isConfigConnectorList(o) {
    return o && o.apiVersion === ConfigConnectorList.apiVersion && o.kind === ConfigConnectorList.kind;
}
exports.isConfigConnectorList = isConfigConnectorList;
(function (ConfigConnectorList) {
    ConfigConnectorList.apiVersion = "core.cnrm.cloud.google.com/v1beta1";
    ConfigConnectorList.group = "core.cnrm.cloud.google.com";
    ConfigConnectorList.version = "v1beta1";
    ConfigConnectorList.kind = "ConfigConnectorList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ConfigConnectorList.Metadata = Metadata;
})(ConfigConnectorList = exports.ConfigConnectorList || (exports.ConfigConnectorList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.core.v1beta1.js.map