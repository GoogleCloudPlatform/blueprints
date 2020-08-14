"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSQLUserList = exports.SQLUserList = exports.isSQLSSLCertList = exports.SQLSSLCertList = exports.isSQLInstanceList = exports.SQLInstanceList = exports.isSQLDatabaseList = exports.SQLDatabaseList = void 0;
// SQLDatabaseList is a list of SQLDatabase
class SQLDatabaseList {
    constructor(desc) {
        this.apiVersion = SQLDatabaseList.apiVersion;
        this.items = desc.items;
        this.kind = SQLDatabaseList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SQLDatabaseList = SQLDatabaseList;
function isSQLDatabaseList(o) {
    return o && o.apiVersion === SQLDatabaseList.apiVersion && o.kind === SQLDatabaseList.kind;
}
exports.isSQLDatabaseList = isSQLDatabaseList;
(function (SQLDatabaseList) {
    SQLDatabaseList.apiVersion = "sql.cnrm.cloud.google.com/v1beta1";
    SQLDatabaseList.group = "sql.cnrm.cloud.google.com";
    SQLDatabaseList.version = "v1beta1";
    SQLDatabaseList.kind = "SQLDatabaseList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SQLDatabaseList.Metadata = Metadata;
})(SQLDatabaseList = exports.SQLDatabaseList || (exports.SQLDatabaseList = {}));
// SQLInstanceList is a list of SQLInstance
class SQLInstanceList {
    constructor(desc) {
        this.apiVersion = SQLInstanceList.apiVersion;
        this.items = desc.items;
        this.kind = SQLInstanceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SQLInstanceList = SQLInstanceList;
function isSQLInstanceList(o) {
    return o && o.apiVersion === SQLInstanceList.apiVersion && o.kind === SQLInstanceList.kind;
}
exports.isSQLInstanceList = isSQLInstanceList;
(function (SQLInstanceList) {
    SQLInstanceList.apiVersion = "sql.cnrm.cloud.google.com/v1beta1";
    SQLInstanceList.group = "sql.cnrm.cloud.google.com";
    SQLInstanceList.version = "v1beta1";
    SQLInstanceList.kind = "SQLInstanceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SQLInstanceList.Metadata = Metadata;
})(SQLInstanceList = exports.SQLInstanceList || (exports.SQLInstanceList = {}));
// SQLSSLCertList is a list of SQLSSLCert
class SQLSSLCertList {
    constructor(desc) {
        this.apiVersion = SQLSSLCertList.apiVersion;
        this.items = desc.items;
        this.kind = SQLSSLCertList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SQLSSLCertList = SQLSSLCertList;
function isSQLSSLCertList(o) {
    return o && o.apiVersion === SQLSSLCertList.apiVersion && o.kind === SQLSSLCertList.kind;
}
exports.isSQLSSLCertList = isSQLSSLCertList;
(function (SQLSSLCertList) {
    SQLSSLCertList.apiVersion = "sql.cnrm.cloud.google.com/v1beta1";
    SQLSSLCertList.group = "sql.cnrm.cloud.google.com";
    SQLSSLCertList.version = "v1beta1";
    SQLSSLCertList.kind = "SQLSSLCertList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SQLSSLCertList.Metadata = Metadata;
})(SQLSSLCertList = exports.SQLSSLCertList || (exports.SQLSSLCertList = {}));
// SQLUserList is a list of SQLUser
class SQLUserList {
    constructor(desc) {
        this.apiVersion = SQLUserList.apiVersion;
        this.items = desc.items;
        this.kind = SQLUserList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SQLUserList = SQLUserList;
function isSQLUserList(o) {
    return o && o.apiVersion === SQLUserList.apiVersion && o.kind === SQLUserList.kind;
}
exports.isSQLUserList = isSQLUserList;
(function (SQLUserList) {
    SQLUserList.apiVersion = "sql.cnrm.cloud.google.com/v1beta1";
    SQLUserList.group = "sql.cnrm.cloud.google.com";
    SQLUserList.version = "v1beta1";
    SQLUserList.kind = "SQLUserList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SQLUserList.Metadata = Metadata;
})(SQLUserList = exports.SQLUserList || (exports.SQLUserList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.sql.v1beta1.js.map