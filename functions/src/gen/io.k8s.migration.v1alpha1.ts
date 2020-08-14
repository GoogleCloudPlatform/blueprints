export type StorageState = object;

// StorageStateList is a list of StorageState
export class StorageStateList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of storagestates. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: StorageState[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: StorageStateList.Metadata;

  constructor(desc: StorageStateList) {
    this.apiVersion = StorageStateList.apiVersion;
    this.items = desc.items;
    this.kind = StorageStateList.kind;
    this.metadata = desc.metadata;
  }
}

export function isStorageStateList(o: any): o is StorageStateList {
  return o && o.apiVersion === StorageStateList.apiVersion && o.kind === StorageStateList.kind;
}

export namespace StorageStateList {
  export const apiVersion = "migration.k8s.io/v1alpha1";
  export const group = "migration.k8s.io";
  export const version = "v1alpha1";
  export const kind = "StorageStateList";

  // StorageStateList is a list of StorageState
  export interface Interface {
    // List of storagestates. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: StorageState[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: StorageStateList.Metadata;
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

export type StorageVersionMigration = object;

// StorageVersionMigrationList is a list of StorageVersionMigration
export class StorageVersionMigrationList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of storageversionmigrations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: StorageVersionMigration[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: StorageVersionMigrationList.Metadata;

  constructor(desc: StorageVersionMigrationList) {
    this.apiVersion = StorageVersionMigrationList.apiVersion;
    this.items = desc.items;
    this.kind = StorageVersionMigrationList.kind;
    this.metadata = desc.metadata;
  }
}

export function isStorageVersionMigrationList(o: any): o is StorageVersionMigrationList {
  return o && o.apiVersion === StorageVersionMigrationList.apiVersion && o.kind === StorageVersionMigrationList.kind;
}

export namespace StorageVersionMigrationList {
  export const apiVersion = "migration.k8s.io/v1alpha1";
  export const group = "migration.k8s.io";
  export const version = "v1alpha1";
  export const kind = "StorageVersionMigrationList";

  // StorageVersionMigrationList is a list of StorageVersionMigration
  export interface Interface {
    // List of storageversionmigrations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: StorageVersionMigration[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: StorageVersionMigrationList.Metadata;
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