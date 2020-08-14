"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStorageNotificationList = exports.StorageNotificationList = exports.isStorageDefaultObjectAccessControlList = exports.StorageDefaultObjectAccessControlList = exports.isStorageBucketList = exports.StorageBucketList = exports.isStorageBucketAccessControlList = exports.StorageBucketAccessControlList = void 0;
// StorageBucketAccessControlList is a list of StorageBucketAccessControl
class StorageBucketAccessControlList {
    constructor(desc) {
        this.apiVersion = StorageBucketAccessControlList.apiVersion;
        this.items = desc.items;
        this.kind = StorageBucketAccessControlList.kind;
        this.metadata = desc.metadata;
    }
}
exports.StorageBucketAccessControlList = StorageBucketAccessControlList;
function isStorageBucketAccessControlList(o) {
    return o && o.apiVersion === StorageBucketAccessControlList.apiVersion && o.kind === StorageBucketAccessControlList.kind;
}
exports.isStorageBucketAccessControlList = isStorageBucketAccessControlList;
(function (StorageBucketAccessControlList) {
    StorageBucketAccessControlList.apiVersion = "storage.cnrm.cloud.google.com/v1beta1";
    StorageBucketAccessControlList.group = "storage.cnrm.cloud.google.com";
    StorageBucketAccessControlList.version = "v1beta1";
    StorageBucketAccessControlList.kind = "StorageBucketAccessControlList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    StorageBucketAccessControlList.Metadata = Metadata;
})(StorageBucketAccessControlList = exports.StorageBucketAccessControlList || (exports.StorageBucketAccessControlList = {}));
// StorageBucketList is a list of StorageBucket
class StorageBucketList {
    constructor(desc) {
        this.apiVersion = StorageBucketList.apiVersion;
        this.items = desc.items;
        this.kind = StorageBucketList.kind;
        this.metadata = desc.metadata;
    }
}
exports.StorageBucketList = StorageBucketList;
function isStorageBucketList(o) {
    return o && o.apiVersion === StorageBucketList.apiVersion && o.kind === StorageBucketList.kind;
}
exports.isStorageBucketList = isStorageBucketList;
(function (StorageBucketList) {
    StorageBucketList.apiVersion = "storage.cnrm.cloud.google.com/v1beta1";
    StorageBucketList.group = "storage.cnrm.cloud.google.com";
    StorageBucketList.version = "v1beta1";
    StorageBucketList.kind = "StorageBucketList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    StorageBucketList.Metadata = Metadata;
})(StorageBucketList = exports.StorageBucketList || (exports.StorageBucketList = {}));
// StorageDefaultObjectAccessControlList is a list of StorageDefaultObjectAccessControl
class StorageDefaultObjectAccessControlList {
    constructor(desc) {
        this.apiVersion = StorageDefaultObjectAccessControlList.apiVersion;
        this.items = desc.items;
        this.kind = StorageDefaultObjectAccessControlList.kind;
        this.metadata = desc.metadata;
    }
}
exports.StorageDefaultObjectAccessControlList = StorageDefaultObjectAccessControlList;
function isStorageDefaultObjectAccessControlList(o) {
    return o && o.apiVersion === StorageDefaultObjectAccessControlList.apiVersion && o.kind === StorageDefaultObjectAccessControlList.kind;
}
exports.isStorageDefaultObjectAccessControlList = isStorageDefaultObjectAccessControlList;
(function (StorageDefaultObjectAccessControlList) {
    StorageDefaultObjectAccessControlList.apiVersion = "storage.cnrm.cloud.google.com/v1beta1";
    StorageDefaultObjectAccessControlList.group = "storage.cnrm.cloud.google.com";
    StorageDefaultObjectAccessControlList.version = "v1beta1";
    StorageDefaultObjectAccessControlList.kind = "StorageDefaultObjectAccessControlList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    StorageDefaultObjectAccessControlList.Metadata = Metadata;
})(StorageDefaultObjectAccessControlList = exports.StorageDefaultObjectAccessControlList || (exports.StorageDefaultObjectAccessControlList = {}));
// StorageNotificationList is a list of StorageNotification
class StorageNotificationList {
    constructor(desc) {
        this.apiVersion = StorageNotificationList.apiVersion;
        this.items = desc.items;
        this.kind = StorageNotificationList.kind;
        this.metadata = desc.metadata;
    }
}
exports.StorageNotificationList = StorageNotificationList;
function isStorageNotificationList(o) {
    return o && o.apiVersion === StorageNotificationList.apiVersion && o.kind === StorageNotificationList.kind;
}
exports.isStorageNotificationList = isStorageNotificationList;
(function (StorageNotificationList) {
    StorageNotificationList.apiVersion = "storage.cnrm.cloud.google.com/v1beta1";
    StorageNotificationList.group = "storage.cnrm.cloud.google.com";
    StorageNotificationList.version = "v1beta1";
    StorageNotificationList.kind = "StorageNotificationList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    StorageNotificationList.Metadata = Metadata;
})(StorageNotificationList = exports.StorageNotificationList || (exports.StorageNotificationList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.storage.v1beta1.js.map