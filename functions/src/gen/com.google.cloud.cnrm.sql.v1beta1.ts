export type SQLDatabase = object;

// SQLDatabaseList is a list of SQLDatabase
export class SQLDatabaseList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of sqldatabases. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: SQLDatabase[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: SQLDatabaseList.Metadata;

  constructor(desc: SQLDatabaseList) {
    this.apiVersion = SQLDatabaseList.apiVersion;
    this.items = desc.items;
    this.kind = SQLDatabaseList.kind;
    this.metadata = desc.metadata;
  }
}

export function isSQLDatabaseList(o: any): o is SQLDatabaseList {
  return o && o.apiVersion === SQLDatabaseList.apiVersion && o.kind === SQLDatabaseList.kind;
}

export namespace SQLDatabaseList {
  export const apiVersion = "sql.cnrm.cloud.google.com/v1beta1";
  export const group = "sql.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "SQLDatabaseList";

  // SQLDatabaseList is a list of SQLDatabase
  export interface Interface {
    // List of sqldatabases. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: SQLDatabase[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: SQLDatabaseList.Metadata;
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

export type SQLInstance = object;

// SQLInstanceList is a list of SQLInstance
export class SQLInstanceList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of sqlinstances. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: SQLInstance[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: SQLInstanceList.Metadata;

  constructor(desc: SQLInstanceList) {
    this.apiVersion = SQLInstanceList.apiVersion;
    this.items = desc.items;
    this.kind = SQLInstanceList.kind;
    this.metadata = desc.metadata;
  }
}

export function isSQLInstanceList(o: any): o is SQLInstanceList {
  return o && o.apiVersion === SQLInstanceList.apiVersion && o.kind === SQLInstanceList.kind;
}

export namespace SQLInstanceList {
  export const apiVersion = "sql.cnrm.cloud.google.com/v1beta1";
  export const group = "sql.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "SQLInstanceList";

  // SQLInstanceList is a list of SQLInstance
  export interface Interface {
    // List of sqlinstances. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: SQLInstance[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: SQLInstanceList.Metadata;
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

export type SQLSSLCert = object;

// SQLSSLCertList is a list of SQLSSLCert
export class SQLSSLCertList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of sqlsslcerts. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: SQLSSLCert[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: SQLSSLCertList.Metadata;

  constructor(desc: SQLSSLCertList) {
    this.apiVersion = SQLSSLCertList.apiVersion;
    this.items = desc.items;
    this.kind = SQLSSLCertList.kind;
    this.metadata = desc.metadata;
  }
}

export function isSQLSSLCertList(o: any): o is SQLSSLCertList {
  return o && o.apiVersion === SQLSSLCertList.apiVersion && o.kind === SQLSSLCertList.kind;
}

export namespace SQLSSLCertList {
  export const apiVersion = "sql.cnrm.cloud.google.com/v1beta1";
  export const group = "sql.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "SQLSSLCertList";

  // SQLSSLCertList is a list of SQLSSLCert
  export interface Interface {
    // List of sqlsslcerts. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: SQLSSLCert[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: SQLSSLCertList.Metadata;
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

export type SQLUser = object;

// SQLUserList is a list of SQLUser
export class SQLUserList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of sqlusers. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: SQLUser[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: SQLUserList.Metadata;

  constructor(desc: SQLUserList) {
    this.apiVersion = SQLUserList.apiVersion;
    this.items = desc.items;
    this.kind = SQLUserList.kind;
    this.metadata = desc.metadata;
  }
}

export function isSQLUserList(o: any): o is SQLUserList {
  return o && o.apiVersion === SQLUserList.apiVersion && o.kind === SQLUserList.kind;
}

export namespace SQLUserList {
  export const apiVersion = "sql.cnrm.cloud.google.com/v1beta1";
  export const group = "sql.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "SQLUserList";

  // SQLUserList is a list of SQLUser
  export interface Interface {
    // List of sqlusers. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: SQLUser[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: SQLUserList.Metadata;
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