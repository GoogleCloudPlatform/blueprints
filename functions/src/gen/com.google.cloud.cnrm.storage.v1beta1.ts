export type StorageBucket = object;

export type StorageBucketAccessControl = object;

// StorageBucketAccessControlList is a list of StorageBucketAccessControl
export class StorageBucketAccessControlList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of storagebucketaccesscontrols. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: StorageBucketAccessControl[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: StorageBucketAccessControlList.Metadata;

  constructor(desc: StorageBucketAccessControlList) {
    this.apiVersion = StorageBucketAccessControlList.apiVersion;
    this.items = desc.items;
    this.kind = StorageBucketAccessControlList.kind;
    this.metadata = desc.metadata;
  }
}

export function isStorageBucketAccessControlList(o: any): o is StorageBucketAccessControlList {
  return o && o.apiVersion === StorageBucketAccessControlList.apiVersion && o.kind === StorageBucketAccessControlList.kind;
}

export namespace StorageBucketAccessControlList {
  export const apiVersion = "storage.cnrm.cloud.google.com/v1beta1";
  export const group = "storage.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "StorageBucketAccessControlList";

  // StorageBucketAccessControlList is a list of StorageBucketAccessControl
  export interface Interface {
    // List of storagebucketaccesscontrols. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: StorageBucketAccessControl[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: StorageBucketAccessControlList.Metadata;
  }
  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  export class Metadata {
    // continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
    public continue?: string;

    // remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
    public remainingItemCount?: number;

    // String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
    public resourceVersion?: string;

    // selfLink is a URL representing this object. Populated by the system. Read-only.
    // 
    // DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
    public selfLink?: string;
  }
}

// StorageBucketList is a list of StorageBucket
export class StorageBucketList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of storagebuckets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: StorageBucket[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: StorageBucketList.Metadata;

  constructor(desc: StorageBucketList) {
    this.apiVersion = StorageBucketList.apiVersion;
    this.items = desc.items;
    this.kind = StorageBucketList.kind;
    this.metadata = desc.metadata;
  }
}

export function isStorageBucketList(o: any): o is StorageBucketList {
  return o && o.apiVersion === StorageBucketList.apiVersion && o.kind === StorageBucketList.kind;
}

export namespace StorageBucketList {
  export const apiVersion = "storage.cnrm.cloud.google.com/v1beta1";
  export const group = "storage.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "StorageBucketList";

  // StorageBucketList is a list of StorageBucket
  export interface Interface {
    // List of storagebuckets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: StorageBucket[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: StorageBucketList.Metadata;
  }
  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  export class Metadata {
    // continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
    public continue?: string;

    // remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
    public remainingItemCount?: number;

    // String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
    public resourceVersion?: string;

    // selfLink is a URL representing this object. Populated by the system. Read-only.
    // 
    // DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
    public selfLink?: string;
  }
}

export type StorageDefaultObjectAccessControl = object;

// StorageDefaultObjectAccessControlList is a list of StorageDefaultObjectAccessControl
export class StorageDefaultObjectAccessControlList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of storagedefaultobjectaccesscontrols. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: StorageDefaultObjectAccessControl[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: StorageDefaultObjectAccessControlList.Metadata;

  constructor(desc: StorageDefaultObjectAccessControlList) {
    this.apiVersion = StorageDefaultObjectAccessControlList.apiVersion;
    this.items = desc.items;
    this.kind = StorageDefaultObjectAccessControlList.kind;
    this.metadata = desc.metadata;
  }
}

export function isStorageDefaultObjectAccessControlList(o: any): o is StorageDefaultObjectAccessControlList {
  return o && o.apiVersion === StorageDefaultObjectAccessControlList.apiVersion && o.kind === StorageDefaultObjectAccessControlList.kind;
}

export namespace StorageDefaultObjectAccessControlList {
  export const apiVersion = "storage.cnrm.cloud.google.com/v1beta1";
  export const group = "storage.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "StorageDefaultObjectAccessControlList";

  // StorageDefaultObjectAccessControlList is a list of StorageDefaultObjectAccessControl
  export interface Interface {
    // List of storagedefaultobjectaccesscontrols. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: StorageDefaultObjectAccessControl[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: StorageDefaultObjectAccessControlList.Metadata;
  }
  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  export class Metadata {
    // continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
    public continue?: string;

    // remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
    public remainingItemCount?: number;

    // String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
    public resourceVersion?: string;

    // selfLink is a URL representing this object. Populated by the system. Read-only.
    // 
    // DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
    public selfLink?: string;
  }
}

export type StorageNotification = object;

// StorageNotificationList is a list of StorageNotification
export class StorageNotificationList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of storagenotifications. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: StorageNotification[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: StorageNotificationList.Metadata;

  constructor(desc: StorageNotificationList) {
    this.apiVersion = StorageNotificationList.apiVersion;
    this.items = desc.items;
    this.kind = StorageNotificationList.kind;
    this.metadata = desc.metadata;
  }
}

export function isStorageNotificationList(o: any): o is StorageNotificationList {
  return o && o.apiVersion === StorageNotificationList.apiVersion && o.kind === StorageNotificationList.kind;
}

export namespace StorageNotificationList {
  export const apiVersion = "storage.cnrm.cloud.google.com/v1beta1";
  export const group = "storage.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "StorageNotificationList";

  // StorageNotificationList is a list of StorageNotification
  export interface Interface {
    // List of storagenotifications. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: StorageNotification[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: StorageNotificationList.Metadata;
  }
  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  export class Metadata {
    // continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
    public continue?: string;

    // remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
    public remainingItemCount?: number;

    // String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
    public resourceVersion?: string;

    // selfLink is a URL representing this object. Populated by the system. Read-only.
    // 
    // DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
    public selfLink?: string;
  }
}