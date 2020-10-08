export type KMSCryptoKey = object;

// KMSCryptoKeyList is a list of KMSCryptoKey
export class KMSCryptoKeyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of kmscryptokeys. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: KMSCryptoKey[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: KMSCryptoKeyList.Metadata;

  constructor(desc: KMSCryptoKeyList) {
    this.apiVersion = KMSCryptoKeyList.apiVersion;
    this.items = desc.items;
    this.kind = KMSCryptoKeyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isKMSCryptoKeyList(o: any): o is KMSCryptoKeyList {
  return o && o.apiVersion === KMSCryptoKeyList.apiVersion && o.kind === KMSCryptoKeyList.kind;
}

export namespace KMSCryptoKeyList {
  export const apiVersion = "kms.cnrm.cloud.google.com/v1beta1";
  export const group = "kms.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "KMSCryptoKeyList";

  // KMSCryptoKeyList is a list of KMSCryptoKey
  export interface Interface {
    // List of kmscryptokeys. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: KMSCryptoKey[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: KMSCryptoKeyList.Metadata;
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

export type KMSKeyRing = object;

// KMSKeyRingList is a list of KMSKeyRing
export class KMSKeyRingList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of kmskeyrings. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: KMSKeyRing[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: KMSKeyRingList.Metadata;

  constructor(desc: KMSKeyRingList) {
    this.apiVersion = KMSKeyRingList.apiVersion;
    this.items = desc.items;
    this.kind = KMSKeyRingList.kind;
    this.metadata = desc.metadata;
  }
}

export function isKMSKeyRingList(o: any): o is KMSKeyRingList {
  return o && o.apiVersion === KMSKeyRingList.apiVersion && o.kind === KMSKeyRingList.kind;
}

export namespace KMSKeyRingList {
  export const apiVersion = "kms.cnrm.cloud.google.com/v1beta1";
  export const group = "kms.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "KMSKeyRingList";

  // KMSKeyRingList is a list of KMSKeyRing
  export interface Interface {
    // List of kmskeyrings. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: KMSKeyRing[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: KMSKeyRingList.Metadata;
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