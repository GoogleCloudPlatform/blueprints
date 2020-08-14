"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStorageVersionMigrationList = exports.StorageVersionMigrationList = exports.isStorageStateList = exports.StorageStateList = void 0;
// StorageStateList is a list of StorageState
class StorageStateList {
    constructor(desc) {
        this.apiVersion = StorageStateList.apiVersion;
        this.items = desc.items;
        this.kind = StorageStateList.kind;
        this.metadata = desc.metadata;
    }
}
exports.StorageStateList = StorageStateList;
function isStorageStateList(o) {
    return o && o.apiVersion === StorageStateList.apiVersion && o.kind === StorageStateList.kind;
}
exports.isStorageStateList = isStorageStateList;
(function (StorageStateList) {
    StorageStateList.apiVersion = "migration.k8s.io/v1alpha1";
    StorageStateList.group = "migration.k8s.io";
    StorageStateList.version = "v1alpha1";
    StorageStateList.kind = "StorageStateList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    StorageStateList.Metadata = Metadata;
})(StorageStateList = exports.StorageStateList || (exports.StorageStateList = {}));
// StorageVersionMigrationList is a list of StorageVersionMigration
class StorageVersionMigrationList {
    constructor(desc) {
        this.apiVersion = StorageVersionMigrationList.apiVersion;
        this.items = desc.items;
        this.kind = StorageVersionMigrationList.kind;
        this.metadata = desc.metadata;
    }
}
exports.StorageVersionMigrationList = StorageVersionMigrationList;
function isStorageVersionMigrationList(o) {
    return o && o.apiVersion === StorageVersionMigrationList.apiVersion && o.kind === StorageVersionMigrationList.kind;
}
exports.isStorageVersionMigrationList = isStorageVersionMigrationList;
(function (StorageVersionMigrationList) {
    StorageVersionMigrationList.apiVersion = "migration.k8s.io/v1alpha1";
    StorageVersionMigrationList.group = "migration.k8s.io";
    StorageVersionMigrationList.version = "v1alpha1";
    StorageVersionMigrationList.kind = "StorageVersionMigrationList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    StorageVersionMigrationList.Metadata = Metadata;
})(StorageVersionMigrationList = exports.StorageVersionMigrationList || (exports.StorageVersionMigrationList = {}));
//# sourceMappingURL=io.k8s.migration.v1alpha1.js.map