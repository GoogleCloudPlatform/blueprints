export type IAMCustomRole = object;

// IAMCustomRoleList is a list of IAMCustomRole
export class IAMCustomRoleList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of iamcustomroles. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IAMCustomRole[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IAMCustomRoleList.Metadata;

  constructor(desc: IAMCustomRoleList) {
    this.apiVersion = IAMCustomRoleList.apiVersion;
    this.items = desc.items;
    this.kind = IAMCustomRoleList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIAMCustomRoleList(o: any): o is IAMCustomRoleList {
  return o && o.apiVersion === IAMCustomRoleList.apiVersion && o.kind === IAMCustomRoleList.kind;
}

export namespace IAMCustomRoleList {
  export const apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
  export const group = "iam.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "IAMCustomRoleList";

  // IAMCustomRoleList is a list of IAMCustomRole
  export interface Interface {
    // List of iamcustomroles. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IAMCustomRole[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IAMCustomRoleList.Metadata;
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

export type IAMPolicy = object;

// IAMPolicyList is a list of IAMPolicy
export class IAMPolicyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of iampolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IAMPolicy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IAMPolicyList.Metadata;

  constructor(desc: IAMPolicyList) {
    this.apiVersion = IAMPolicyList.apiVersion;
    this.items = desc.items;
    this.kind = IAMPolicyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIAMPolicyList(o: any): o is IAMPolicyList {
  return o && o.apiVersion === IAMPolicyList.apiVersion && o.kind === IAMPolicyList.kind;
}

export namespace IAMPolicyList {
  export const apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
  export const group = "iam.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "IAMPolicyList";

  // IAMPolicyList is a list of IAMPolicy
  export interface Interface {
    // List of iampolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IAMPolicy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IAMPolicyList.Metadata;
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

export type IAMPolicyMember = object;

// IAMPolicyMemberList is a list of IAMPolicyMember
export class IAMPolicyMemberList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of iampolicymembers. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IAMPolicyMember[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IAMPolicyMemberList.Metadata;

  constructor(desc: IAMPolicyMemberList) {
    this.apiVersion = IAMPolicyMemberList.apiVersion;
    this.items = desc.items;
    this.kind = IAMPolicyMemberList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIAMPolicyMemberList(o: any): o is IAMPolicyMemberList {
  return o && o.apiVersion === IAMPolicyMemberList.apiVersion && o.kind === IAMPolicyMemberList.kind;
}

export namespace IAMPolicyMemberList {
  export const apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
  export const group = "iam.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "IAMPolicyMemberList";

  // IAMPolicyMemberList is a list of IAMPolicyMember
  export interface Interface {
    // List of iampolicymembers. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IAMPolicyMember[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IAMPolicyMemberList.Metadata;
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

export type IAMServiceAccount = object;

export type IAMServiceAccountKey = object;

// IAMServiceAccountKeyList is a list of IAMServiceAccountKey
export class IAMServiceAccountKeyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of iamserviceaccountkeys. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IAMServiceAccountKey[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IAMServiceAccountKeyList.Metadata;

  constructor(desc: IAMServiceAccountKeyList) {
    this.apiVersion = IAMServiceAccountKeyList.apiVersion;
    this.items = desc.items;
    this.kind = IAMServiceAccountKeyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIAMServiceAccountKeyList(o: any): o is IAMServiceAccountKeyList {
  return o && o.apiVersion === IAMServiceAccountKeyList.apiVersion && o.kind === IAMServiceAccountKeyList.kind;
}

export namespace IAMServiceAccountKeyList {
  export const apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
  export const group = "iam.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "IAMServiceAccountKeyList";

  // IAMServiceAccountKeyList is a list of IAMServiceAccountKey
  export interface Interface {
    // List of iamserviceaccountkeys. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IAMServiceAccountKey[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IAMServiceAccountKeyList.Metadata;
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

// IAMServiceAccountList is a list of IAMServiceAccount
export class IAMServiceAccountList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of iamserviceaccounts. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IAMServiceAccount[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IAMServiceAccountList.Metadata;

  constructor(desc: IAMServiceAccountList) {
    this.apiVersion = IAMServiceAccountList.apiVersion;
    this.items = desc.items;
    this.kind = IAMServiceAccountList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIAMServiceAccountList(o: any): o is IAMServiceAccountList {
  return o && o.apiVersion === IAMServiceAccountList.apiVersion && o.kind === IAMServiceAccountList.kind;
}

export namespace IAMServiceAccountList {
  export const apiVersion = "iam.cnrm.cloud.google.com/v1beta1";
  export const group = "iam.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "IAMServiceAccountList";

  // IAMServiceAccountList is a list of IAMServiceAccount
  export interface Interface {
    // List of iamserviceaccounts. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IAMServiceAccount[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IAMServiceAccountList.Metadata;
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