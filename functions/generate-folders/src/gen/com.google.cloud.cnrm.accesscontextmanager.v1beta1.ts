export type AccessContextManagerAccessLevel = object;

// AccessContextManagerAccessLevelList is a list of AccessContextManagerAccessLevel
export class AccessContextManagerAccessLevelList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of accesscontextmanageraccesslevels. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: AccessContextManagerAccessLevel[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: AccessContextManagerAccessLevelList.Metadata;

  constructor(desc: AccessContextManagerAccessLevelList) {
    this.apiVersion = AccessContextManagerAccessLevelList.apiVersion;
    this.items = desc.items;
    this.kind = AccessContextManagerAccessLevelList.kind;
    this.metadata = desc.metadata;
  }
}

export function isAccessContextManagerAccessLevelList(o: any): o is AccessContextManagerAccessLevelList {
  return o && o.apiVersion === AccessContextManagerAccessLevelList.apiVersion && o.kind === AccessContextManagerAccessLevelList.kind;
}

export namespace AccessContextManagerAccessLevelList {
  export const apiVersion = "accesscontextmanager.cnrm.cloud.google.com/v1beta1";
  export const group = "accesscontextmanager.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "AccessContextManagerAccessLevelList";

  // AccessContextManagerAccessLevelList is a list of AccessContextManagerAccessLevel
  export interface Interface {
    // List of accesscontextmanageraccesslevels. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: AccessContextManagerAccessLevel[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: AccessContextManagerAccessLevelList.Metadata;
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

export type AccessContextManagerAccessPolicy = object;

// AccessContextManagerAccessPolicyList is a list of AccessContextManagerAccessPolicy
export class AccessContextManagerAccessPolicyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of accesscontextmanageraccesspolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: AccessContextManagerAccessPolicy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: AccessContextManagerAccessPolicyList.Metadata;

  constructor(desc: AccessContextManagerAccessPolicyList) {
    this.apiVersion = AccessContextManagerAccessPolicyList.apiVersion;
    this.items = desc.items;
    this.kind = AccessContextManagerAccessPolicyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isAccessContextManagerAccessPolicyList(o: any): o is AccessContextManagerAccessPolicyList {
  return o && o.apiVersion === AccessContextManagerAccessPolicyList.apiVersion && o.kind === AccessContextManagerAccessPolicyList.kind;
}

export namespace AccessContextManagerAccessPolicyList {
  export const apiVersion = "accesscontextmanager.cnrm.cloud.google.com/v1beta1";
  export const group = "accesscontextmanager.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "AccessContextManagerAccessPolicyList";

  // AccessContextManagerAccessPolicyList is a list of AccessContextManagerAccessPolicy
  export interface Interface {
    // List of accesscontextmanageraccesspolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: AccessContextManagerAccessPolicy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: AccessContextManagerAccessPolicyList.Metadata;
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