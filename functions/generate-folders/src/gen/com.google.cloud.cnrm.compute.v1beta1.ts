export type ComputeAddress = object;

// ComputeAddressList is a list of ComputeAddress
export class ComputeAddressList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeaddresses. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeAddress[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeAddressList.Metadata;

  constructor(desc: ComputeAddressList) {
    this.apiVersion = ComputeAddressList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeAddressList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeAddressList(o: any): o is ComputeAddressList {
  return o && o.apiVersion === ComputeAddressList.apiVersion && o.kind === ComputeAddressList.kind;
}

export namespace ComputeAddressList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeAddressList";

  // ComputeAddressList is a list of ComputeAddress
  export interface Interface {
    // List of computeaddresses. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeAddress[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeAddressList.Metadata;
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

export type ComputeBackendBucket = object;

// ComputeBackendBucketList is a list of ComputeBackendBucket
export class ComputeBackendBucketList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computebackendbuckets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeBackendBucket[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeBackendBucketList.Metadata;

  constructor(desc: ComputeBackendBucketList) {
    this.apiVersion = ComputeBackendBucketList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeBackendBucketList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeBackendBucketList(o: any): o is ComputeBackendBucketList {
  return o && o.apiVersion === ComputeBackendBucketList.apiVersion && o.kind === ComputeBackendBucketList.kind;
}

export namespace ComputeBackendBucketList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeBackendBucketList";

  // ComputeBackendBucketList is a list of ComputeBackendBucket
  export interface Interface {
    // List of computebackendbuckets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeBackendBucket[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeBackendBucketList.Metadata;
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

export type ComputeBackendService = object;

// ComputeBackendServiceList is a list of ComputeBackendService
export class ComputeBackendServiceList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computebackendservices. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeBackendService[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeBackendServiceList.Metadata;

  constructor(desc: ComputeBackendServiceList) {
    this.apiVersion = ComputeBackendServiceList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeBackendServiceList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeBackendServiceList(o: any): o is ComputeBackendServiceList {
  return o && o.apiVersion === ComputeBackendServiceList.apiVersion && o.kind === ComputeBackendServiceList.kind;
}

export namespace ComputeBackendServiceList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeBackendServiceList";

  // ComputeBackendServiceList is a list of ComputeBackendService
  export interface Interface {
    // List of computebackendservices. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeBackendService[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeBackendServiceList.Metadata;
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

export type ComputeDisk = object;

// ComputeDiskList is a list of ComputeDisk
export class ComputeDiskList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computedisks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeDisk[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeDiskList.Metadata;

  constructor(desc: ComputeDiskList) {
    this.apiVersion = ComputeDiskList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeDiskList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeDiskList(o: any): o is ComputeDiskList {
  return o && o.apiVersion === ComputeDiskList.apiVersion && o.kind === ComputeDiskList.kind;
}

export namespace ComputeDiskList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeDiskList";

  // ComputeDiskList is a list of ComputeDisk
  export interface Interface {
    // List of computedisks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeDisk[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeDiskList.Metadata;
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

export type ComputeExternalVPNGateway = object;

// ComputeExternalVPNGatewayList is a list of ComputeExternalVPNGateway
export class ComputeExternalVPNGatewayList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeexternalvpngateways. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeExternalVPNGateway[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeExternalVPNGatewayList.Metadata;

  constructor(desc: ComputeExternalVPNGatewayList) {
    this.apiVersion = ComputeExternalVPNGatewayList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeExternalVPNGatewayList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeExternalVPNGatewayList(o: any): o is ComputeExternalVPNGatewayList {
  return o && o.apiVersion === ComputeExternalVPNGatewayList.apiVersion && o.kind === ComputeExternalVPNGatewayList.kind;
}

export namespace ComputeExternalVPNGatewayList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeExternalVPNGatewayList";

  // ComputeExternalVPNGatewayList is a list of ComputeExternalVPNGateway
  export interface Interface {
    // List of computeexternalvpngateways. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeExternalVPNGateway[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeExternalVPNGatewayList.Metadata;
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

export type ComputeFirewall = object;

// ComputeFirewallList is a list of ComputeFirewall
export class ComputeFirewallList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computefirewalls. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeFirewall[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeFirewallList.Metadata;

  constructor(desc: ComputeFirewallList) {
    this.apiVersion = ComputeFirewallList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeFirewallList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeFirewallList(o: any): o is ComputeFirewallList {
  return o && o.apiVersion === ComputeFirewallList.apiVersion && o.kind === ComputeFirewallList.kind;
}

export namespace ComputeFirewallList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeFirewallList";

  // ComputeFirewallList is a list of ComputeFirewall
  export interface Interface {
    // List of computefirewalls. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeFirewall[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeFirewallList.Metadata;
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

export type ComputeForwardingRule = object;

// ComputeForwardingRuleList is a list of ComputeForwardingRule
export class ComputeForwardingRuleList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeforwardingrules. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeForwardingRule[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeForwardingRuleList.Metadata;

  constructor(desc: ComputeForwardingRuleList) {
    this.apiVersion = ComputeForwardingRuleList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeForwardingRuleList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeForwardingRuleList(o: any): o is ComputeForwardingRuleList {
  return o && o.apiVersion === ComputeForwardingRuleList.apiVersion && o.kind === ComputeForwardingRuleList.kind;
}

export namespace ComputeForwardingRuleList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeForwardingRuleList";

  // ComputeForwardingRuleList is a list of ComputeForwardingRule
  export interface Interface {
    // List of computeforwardingrules. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeForwardingRule[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeForwardingRuleList.Metadata;
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

export type ComputeHTTPHealthCheck = object;

// ComputeHTTPHealthCheckList is a list of ComputeHTTPHealthCheck
export class ComputeHTTPHealthCheckList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computehttphealthchecks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeHTTPHealthCheck[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeHTTPHealthCheckList.Metadata;

  constructor(desc: ComputeHTTPHealthCheckList) {
    this.apiVersion = ComputeHTTPHealthCheckList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeHTTPHealthCheckList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeHTTPHealthCheckList(o: any): o is ComputeHTTPHealthCheckList {
  return o && o.apiVersion === ComputeHTTPHealthCheckList.apiVersion && o.kind === ComputeHTTPHealthCheckList.kind;
}

export namespace ComputeHTTPHealthCheckList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeHTTPHealthCheckList";

  // ComputeHTTPHealthCheckList is a list of ComputeHTTPHealthCheck
  export interface Interface {
    // List of computehttphealthchecks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeHTTPHealthCheck[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeHTTPHealthCheckList.Metadata;
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

export type ComputeHTTPSHealthCheck = object;

// ComputeHTTPSHealthCheckList is a list of ComputeHTTPSHealthCheck
export class ComputeHTTPSHealthCheckList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computehttpshealthchecks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeHTTPSHealthCheck[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeHTTPSHealthCheckList.Metadata;

  constructor(desc: ComputeHTTPSHealthCheckList) {
    this.apiVersion = ComputeHTTPSHealthCheckList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeHTTPSHealthCheckList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeHTTPSHealthCheckList(o: any): o is ComputeHTTPSHealthCheckList {
  return o && o.apiVersion === ComputeHTTPSHealthCheckList.apiVersion && o.kind === ComputeHTTPSHealthCheckList.kind;
}

export namespace ComputeHTTPSHealthCheckList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeHTTPSHealthCheckList";

  // ComputeHTTPSHealthCheckList is a list of ComputeHTTPSHealthCheck
  export interface Interface {
    // List of computehttpshealthchecks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeHTTPSHealthCheck[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeHTTPSHealthCheckList.Metadata;
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

export type ComputeHealthCheck = object;

// ComputeHealthCheckList is a list of ComputeHealthCheck
export class ComputeHealthCheckList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computehealthchecks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeHealthCheck[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeHealthCheckList.Metadata;

  constructor(desc: ComputeHealthCheckList) {
    this.apiVersion = ComputeHealthCheckList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeHealthCheckList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeHealthCheckList(o: any): o is ComputeHealthCheckList {
  return o && o.apiVersion === ComputeHealthCheckList.apiVersion && o.kind === ComputeHealthCheckList.kind;
}

export namespace ComputeHealthCheckList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeHealthCheckList";

  // ComputeHealthCheckList is a list of ComputeHealthCheck
  export interface Interface {
    // List of computehealthchecks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeHealthCheck[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeHealthCheckList.Metadata;
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

export type ComputeImage = object;

// ComputeImageList is a list of ComputeImage
export class ComputeImageList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeimages. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeImage[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeImageList.Metadata;

  constructor(desc: ComputeImageList) {
    this.apiVersion = ComputeImageList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeImageList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeImageList(o: any): o is ComputeImageList {
  return o && o.apiVersion === ComputeImageList.apiVersion && o.kind === ComputeImageList.kind;
}

export namespace ComputeImageList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeImageList";

  // ComputeImageList is a list of ComputeImage
  export interface Interface {
    // List of computeimages. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeImage[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeImageList.Metadata;
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

export type ComputeInstance = object;

export type ComputeInstanceGroup = object;

// ComputeInstanceGroupList is a list of ComputeInstanceGroup
export class ComputeInstanceGroupList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeinstancegroups. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeInstanceGroup[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeInstanceGroupList.Metadata;

  constructor(desc: ComputeInstanceGroupList) {
    this.apiVersion = ComputeInstanceGroupList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeInstanceGroupList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeInstanceGroupList(o: any): o is ComputeInstanceGroupList {
  return o && o.apiVersion === ComputeInstanceGroupList.apiVersion && o.kind === ComputeInstanceGroupList.kind;
}

export namespace ComputeInstanceGroupList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeInstanceGroupList";

  // ComputeInstanceGroupList is a list of ComputeInstanceGroup
  export interface Interface {
    // List of computeinstancegroups. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeInstanceGroup[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeInstanceGroupList.Metadata;
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

// ComputeInstanceList is a list of ComputeInstance
export class ComputeInstanceList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeinstances. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeInstance[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeInstanceList.Metadata;

  constructor(desc: ComputeInstanceList) {
    this.apiVersion = ComputeInstanceList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeInstanceList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeInstanceList(o: any): o is ComputeInstanceList {
  return o && o.apiVersion === ComputeInstanceList.apiVersion && o.kind === ComputeInstanceList.kind;
}

export namespace ComputeInstanceList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeInstanceList";

  // ComputeInstanceList is a list of ComputeInstance
  export interface Interface {
    // List of computeinstances. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeInstance[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeInstanceList.Metadata;
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

export type ComputeInstanceTemplate = object;

// ComputeInstanceTemplateList is a list of ComputeInstanceTemplate
export class ComputeInstanceTemplateList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeinstancetemplates. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeInstanceTemplate[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeInstanceTemplateList.Metadata;

  constructor(desc: ComputeInstanceTemplateList) {
    this.apiVersion = ComputeInstanceTemplateList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeInstanceTemplateList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeInstanceTemplateList(o: any): o is ComputeInstanceTemplateList {
  return o && o.apiVersion === ComputeInstanceTemplateList.apiVersion && o.kind === ComputeInstanceTemplateList.kind;
}

export namespace ComputeInstanceTemplateList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeInstanceTemplateList";

  // ComputeInstanceTemplateList is a list of ComputeInstanceTemplate
  export interface Interface {
    // List of computeinstancetemplates. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeInstanceTemplate[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeInstanceTemplateList.Metadata;
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

export type ComputeInterconnectAttachment = object;

// ComputeInterconnectAttachmentList is a list of ComputeInterconnectAttachment
export class ComputeInterconnectAttachmentList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeinterconnectattachments. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeInterconnectAttachment[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeInterconnectAttachmentList.Metadata;

  constructor(desc: ComputeInterconnectAttachmentList) {
    this.apiVersion = ComputeInterconnectAttachmentList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeInterconnectAttachmentList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeInterconnectAttachmentList(o: any): o is ComputeInterconnectAttachmentList {
  return o && o.apiVersion === ComputeInterconnectAttachmentList.apiVersion && o.kind === ComputeInterconnectAttachmentList.kind;
}

export namespace ComputeInterconnectAttachmentList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeInterconnectAttachmentList";

  // ComputeInterconnectAttachmentList is a list of ComputeInterconnectAttachment
  export interface Interface {
    // List of computeinterconnectattachments. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeInterconnectAttachment[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeInterconnectAttachmentList.Metadata;
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

export type ComputeNetwork = object;

export type ComputeNetworkEndpointGroup = object;

// ComputeNetworkEndpointGroupList is a list of ComputeNetworkEndpointGroup
export class ComputeNetworkEndpointGroupList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computenetworkendpointgroups. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeNetworkEndpointGroup[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeNetworkEndpointGroupList.Metadata;

  constructor(desc: ComputeNetworkEndpointGroupList) {
    this.apiVersion = ComputeNetworkEndpointGroupList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeNetworkEndpointGroupList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeNetworkEndpointGroupList(o: any): o is ComputeNetworkEndpointGroupList {
  return o && o.apiVersion === ComputeNetworkEndpointGroupList.apiVersion && o.kind === ComputeNetworkEndpointGroupList.kind;
}

export namespace ComputeNetworkEndpointGroupList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeNetworkEndpointGroupList";

  // ComputeNetworkEndpointGroupList is a list of ComputeNetworkEndpointGroup
  export interface Interface {
    // List of computenetworkendpointgroups. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeNetworkEndpointGroup[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeNetworkEndpointGroupList.Metadata;
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

// ComputeNetworkList is a list of ComputeNetwork
export class ComputeNetworkList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computenetworks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeNetwork[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeNetworkList.Metadata;

  constructor(desc: ComputeNetworkList) {
    this.apiVersion = ComputeNetworkList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeNetworkList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeNetworkList(o: any): o is ComputeNetworkList {
  return o && o.apiVersion === ComputeNetworkList.apiVersion && o.kind === ComputeNetworkList.kind;
}

export namespace ComputeNetworkList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeNetworkList";

  // ComputeNetworkList is a list of ComputeNetwork
  export interface Interface {
    // List of computenetworks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeNetwork[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeNetworkList.Metadata;
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

export type ComputeNetworkPeering = object;

// ComputeNetworkPeeringList is a list of ComputeNetworkPeering
export class ComputeNetworkPeeringList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computenetworkpeerings. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeNetworkPeering[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeNetworkPeeringList.Metadata;

  constructor(desc: ComputeNetworkPeeringList) {
    this.apiVersion = ComputeNetworkPeeringList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeNetworkPeeringList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeNetworkPeeringList(o: any): o is ComputeNetworkPeeringList {
  return o && o.apiVersion === ComputeNetworkPeeringList.apiVersion && o.kind === ComputeNetworkPeeringList.kind;
}

export namespace ComputeNetworkPeeringList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeNetworkPeeringList";

  // ComputeNetworkPeeringList is a list of ComputeNetworkPeering
  export interface Interface {
    // List of computenetworkpeerings. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeNetworkPeering[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeNetworkPeeringList.Metadata;
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

export type ComputeNodeGroup = object;

// ComputeNodeGroupList is a list of ComputeNodeGroup
export class ComputeNodeGroupList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computenodegroups. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeNodeGroup[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeNodeGroupList.Metadata;

  constructor(desc: ComputeNodeGroupList) {
    this.apiVersion = ComputeNodeGroupList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeNodeGroupList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeNodeGroupList(o: any): o is ComputeNodeGroupList {
  return o && o.apiVersion === ComputeNodeGroupList.apiVersion && o.kind === ComputeNodeGroupList.kind;
}

export namespace ComputeNodeGroupList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeNodeGroupList";

  // ComputeNodeGroupList is a list of ComputeNodeGroup
  export interface Interface {
    // List of computenodegroups. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeNodeGroup[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeNodeGroupList.Metadata;
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

export type ComputeNodeTemplate = object;

// ComputeNodeTemplateList is a list of ComputeNodeTemplate
export class ComputeNodeTemplateList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computenodetemplates. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeNodeTemplate[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeNodeTemplateList.Metadata;

  constructor(desc: ComputeNodeTemplateList) {
    this.apiVersion = ComputeNodeTemplateList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeNodeTemplateList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeNodeTemplateList(o: any): o is ComputeNodeTemplateList {
  return o && o.apiVersion === ComputeNodeTemplateList.apiVersion && o.kind === ComputeNodeTemplateList.kind;
}

export namespace ComputeNodeTemplateList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeNodeTemplateList";

  // ComputeNodeTemplateList is a list of ComputeNodeTemplate
  export interface Interface {
    // List of computenodetemplates. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeNodeTemplate[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeNodeTemplateList.Metadata;
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

export type ComputeReservation = object;

// ComputeReservationList is a list of ComputeReservation
export class ComputeReservationList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computereservations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeReservation[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeReservationList.Metadata;

  constructor(desc: ComputeReservationList) {
    this.apiVersion = ComputeReservationList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeReservationList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeReservationList(o: any): o is ComputeReservationList {
  return o && o.apiVersion === ComputeReservationList.apiVersion && o.kind === ComputeReservationList.kind;
}

export namespace ComputeReservationList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeReservationList";

  // ComputeReservationList is a list of ComputeReservation
  export interface Interface {
    // List of computereservations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeReservation[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeReservationList.Metadata;
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

export type ComputeResourcePolicy = object;

// ComputeResourcePolicyList is a list of ComputeResourcePolicy
export class ComputeResourcePolicyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeresourcepolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeResourcePolicy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeResourcePolicyList.Metadata;

  constructor(desc: ComputeResourcePolicyList) {
    this.apiVersion = ComputeResourcePolicyList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeResourcePolicyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeResourcePolicyList(o: any): o is ComputeResourcePolicyList {
  return o && o.apiVersion === ComputeResourcePolicyList.apiVersion && o.kind === ComputeResourcePolicyList.kind;
}

export namespace ComputeResourcePolicyList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeResourcePolicyList";

  // ComputeResourcePolicyList is a list of ComputeResourcePolicy
  export interface Interface {
    // List of computeresourcepolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeResourcePolicy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeResourcePolicyList.Metadata;
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

export type ComputeRoute = object;

// ComputeRouteList is a list of ComputeRoute
export class ComputeRouteList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeroutes. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeRoute[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeRouteList.Metadata;

  constructor(desc: ComputeRouteList) {
    this.apiVersion = ComputeRouteList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeRouteList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeRouteList(o: any): o is ComputeRouteList {
  return o && o.apiVersion === ComputeRouteList.apiVersion && o.kind === ComputeRouteList.kind;
}

export namespace ComputeRouteList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeRouteList";

  // ComputeRouteList is a list of ComputeRoute
  export interface Interface {
    // List of computeroutes. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeRoute[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeRouteList.Metadata;
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

export type ComputeRouter = object;

export type ComputeRouterInterface = object;

// ComputeRouterInterfaceList is a list of ComputeRouterInterface
export class ComputeRouterInterfaceList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computerouterinterfaces. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeRouterInterface[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeRouterInterfaceList.Metadata;

  constructor(desc: ComputeRouterInterfaceList) {
    this.apiVersion = ComputeRouterInterfaceList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeRouterInterfaceList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeRouterInterfaceList(o: any): o is ComputeRouterInterfaceList {
  return o && o.apiVersion === ComputeRouterInterfaceList.apiVersion && o.kind === ComputeRouterInterfaceList.kind;
}

export namespace ComputeRouterInterfaceList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeRouterInterfaceList";

  // ComputeRouterInterfaceList is a list of ComputeRouterInterface
  export interface Interface {
    // List of computerouterinterfaces. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeRouterInterface[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeRouterInterfaceList.Metadata;
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

// ComputeRouterList is a list of ComputeRouter
export class ComputeRouterList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computerouters. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeRouter[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeRouterList.Metadata;

  constructor(desc: ComputeRouterList) {
    this.apiVersion = ComputeRouterList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeRouterList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeRouterList(o: any): o is ComputeRouterList {
  return o && o.apiVersion === ComputeRouterList.apiVersion && o.kind === ComputeRouterList.kind;
}

export namespace ComputeRouterList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeRouterList";

  // ComputeRouterList is a list of ComputeRouter
  export interface Interface {
    // List of computerouters. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeRouter[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeRouterList.Metadata;
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

export type ComputeRouterNAT = object;

// ComputeRouterNATList is a list of ComputeRouterNAT
export class ComputeRouterNATList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computerouternats. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeRouterNAT[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeRouterNATList.Metadata;

  constructor(desc: ComputeRouterNATList) {
    this.apiVersion = ComputeRouterNATList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeRouterNATList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeRouterNATList(o: any): o is ComputeRouterNATList {
  return o && o.apiVersion === ComputeRouterNATList.apiVersion && o.kind === ComputeRouterNATList.kind;
}

export namespace ComputeRouterNATList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeRouterNATList";

  // ComputeRouterNATList is a list of ComputeRouterNAT
  export interface Interface {
    // List of computerouternats. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeRouterNAT[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeRouterNATList.Metadata;
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

export type ComputeRouterPeer = object;

// ComputeRouterPeerList is a list of ComputeRouterPeer
export class ComputeRouterPeerList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computerouterpeers. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeRouterPeer[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeRouterPeerList.Metadata;

  constructor(desc: ComputeRouterPeerList) {
    this.apiVersion = ComputeRouterPeerList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeRouterPeerList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeRouterPeerList(o: any): o is ComputeRouterPeerList {
  return o && o.apiVersion === ComputeRouterPeerList.apiVersion && o.kind === ComputeRouterPeerList.kind;
}

export namespace ComputeRouterPeerList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeRouterPeerList";

  // ComputeRouterPeerList is a list of ComputeRouterPeer
  export interface Interface {
    // List of computerouterpeers. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeRouterPeer[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeRouterPeerList.Metadata;
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

export type ComputeSSLCertificate = object;

// ComputeSSLCertificateList is a list of ComputeSSLCertificate
export class ComputeSSLCertificateList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computesslcertificates. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeSSLCertificate[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeSSLCertificateList.Metadata;

  constructor(desc: ComputeSSLCertificateList) {
    this.apiVersion = ComputeSSLCertificateList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeSSLCertificateList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeSSLCertificateList(o: any): o is ComputeSSLCertificateList {
  return o && o.apiVersion === ComputeSSLCertificateList.apiVersion && o.kind === ComputeSSLCertificateList.kind;
}

export namespace ComputeSSLCertificateList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeSSLCertificateList";

  // ComputeSSLCertificateList is a list of ComputeSSLCertificate
  export interface Interface {
    // List of computesslcertificates. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeSSLCertificate[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeSSLCertificateList.Metadata;
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

export type ComputeSSLPolicy = object;

// ComputeSSLPolicyList is a list of ComputeSSLPolicy
export class ComputeSSLPolicyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computesslpolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeSSLPolicy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeSSLPolicyList.Metadata;

  constructor(desc: ComputeSSLPolicyList) {
    this.apiVersion = ComputeSSLPolicyList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeSSLPolicyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeSSLPolicyList(o: any): o is ComputeSSLPolicyList {
  return o && o.apiVersion === ComputeSSLPolicyList.apiVersion && o.kind === ComputeSSLPolicyList.kind;
}

export namespace ComputeSSLPolicyList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeSSLPolicyList";

  // ComputeSSLPolicyList is a list of ComputeSSLPolicy
  export interface Interface {
    // List of computesslpolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeSSLPolicy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeSSLPolicyList.Metadata;
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

export type ComputeSecurityPolicy = object;

// ComputeSecurityPolicyList is a list of ComputeSecurityPolicy
export class ComputeSecurityPolicyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computesecuritypolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeSecurityPolicy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeSecurityPolicyList.Metadata;

  constructor(desc: ComputeSecurityPolicyList) {
    this.apiVersion = ComputeSecurityPolicyList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeSecurityPolicyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeSecurityPolicyList(o: any): o is ComputeSecurityPolicyList {
  return o && o.apiVersion === ComputeSecurityPolicyList.apiVersion && o.kind === ComputeSecurityPolicyList.kind;
}

export namespace ComputeSecurityPolicyList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeSecurityPolicyList";

  // ComputeSecurityPolicyList is a list of ComputeSecurityPolicy
  export interface Interface {
    // List of computesecuritypolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeSecurityPolicy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeSecurityPolicyList.Metadata;
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

export type ComputeSharedVPCHostProject = object;

// ComputeSharedVPCHostProjectList is a list of ComputeSharedVPCHostProject
export class ComputeSharedVPCHostProjectList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computesharedvpchostprojects. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeSharedVPCHostProject[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeSharedVPCHostProjectList.Metadata;

  constructor(desc: ComputeSharedVPCHostProjectList) {
    this.apiVersion = ComputeSharedVPCHostProjectList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeSharedVPCHostProjectList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeSharedVPCHostProjectList(o: any): o is ComputeSharedVPCHostProjectList {
  return o && o.apiVersion === ComputeSharedVPCHostProjectList.apiVersion && o.kind === ComputeSharedVPCHostProjectList.kind;
}

export namespace ComputeSharedVPCHostProjectList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeSharedVPCHostProjectList";

  // ComputeSharedVPCHostProjectList is a list of ComputeSharedVPCHostProject
  export interface Interface {
    // List of computesharedvpchostprojects. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeSharedVPCHostProject[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeSharedVPCHostProjectList.Metadata;
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

export type ComputeSharedVPCServiceProject = object;

// ComputeSharedVPCServiceProjectList is a list of ComputeSharedVPCServiceProject
export class ComputeSharedVPCServiceProjectList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computesharedvpcserviceprojects. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeSharedVPCServiceProject[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeSharedVPCServiceProjectList.Metadata;

  constructor(desc: ComputeSharedVPCServiceProjectList) {
    this.apiVersion = ComputeSharedVPCServiceProjectList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeSharedVPCServiceProjectList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeSharedVPCServiceProjectList(o: any): o is ComputeSharedVPCServiceProjectList {
  return o && o.apiVersion === ComputeSharedVPCServiceProjectList.apiVersion && o.kind === ComputeSharedVPCServiceProjectList.kind;
}

export namespace ComputeSharedVPCServiceProjectList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeSharedVPCServiceProjectList";

  // ComputeSharedVPCServiceProjectList is a list of ComputeSharedVPCServiceProject
  export interface Interface {
    // List of computesharedvpcserviceprojects. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeSharedVPCServiceProject[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeSharedVPCServiceProjectList.Metadata;
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

export type ComputeSnapshot = object;

// ComputeSnapshotList is a list of ComputeSnapshot
export class ComputeSnapshotList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computesnapshots. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeSnapshot[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeSnapshotList.Metadata;

  constructor(desc: ComputeSnapshotList) {
    this.apiVersion = ComputeSnapshotList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeSnapshotList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeSnapshotList(o: any): o is ComputeSnapshotList {
  return o && o.apiVersion === ComputeSnapshotList.apiVersion && o.kind === ComputeSnapshotList.kind;
}

export namespace ComputeSnapshotList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeSnapshotList";

  // ComputeSnapshotList is a list of ComputeSnapshot
  export interface Interface {
    // List of computesnapshots. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeSnapshot[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeSnapshotList.Metadata;
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

export type ComputeSubnetwork = object;

// ComputeSubnetworkList is a list of ComputeSubnetwork
export class ComputeSubnetworkList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computesubnetworks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeSubnetwork[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeSubnetworkList.Metadata;

  constructor(desc: ComputeSubnetworkList) {
    this.apiVersion = ComputeSubnetworkList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeSubnetworkList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeSubnetworkList(o: any): o is ComputeSubnetworkList {
  return o && o.apiVersion === ComputeSubnetworkList.apiVersion && o.kind === ComputeSubnetworkList.kind;
}

export namespace ComputeSubnetworkList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeSubnetworkList";

  // ComputeSubnetworkList is a list of ComputeSubnetwork
  export interface Interface {
    // List of computesubnetworks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeSubnetwork[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeSubnetworkList.Metadata;
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

export type ComputeTargetHTTPProxy = object;

// ComputeTargetHTTPProxyList is a list of ComputeTargetHTTPProxy
export class ComputeTargetHTTPProxyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computetargethttpproxies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeTargetHTTPProxy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeTargetHTTPProxyList.Metadata;

  constructor(desc: ComputeTargetHTTPProxyList) {
    this.apiVersion = ComputeTargetHTTPProxyList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeTargetHTTPProxyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeTargetHTTPProxyList(o: any): o is ComputeTargetHTTPProxyList {
  return o && o.apiVersion === ComputeTargetHTTPProxyList.apiVersion && o.kind === ComputeTargetHTTPProxyList.kind;
}

export namespace ComputeTargetHTTPProxyList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeTargetHTTPProxyList";

  // ComputeTargetHTTPProxyList is a list of ComputeTargetHTTPProxy
  export interface Interface {
    // List of computetargethttpproxies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeTargetHTTPProxy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeTargetHTTPProxyList.Metadata;
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

export type ComputeTargetHTTPSProxy = object;

// ComputeTargetHTTPSProxyList is a list of ComputeTargetHTTPSProxy
export class ComputeTargetHTTPSProxyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computetargethttpsproxies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeTargetHTTPSProxy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeTargetHTTPSProxyList.Metadata;

  constructor(desc: ComputeTargetHTTPSProxyList) {
    this.apiVersion = ComputeTargetHTTPSProxyList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeTargetHTTPSProxyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeTargetHTTPSProxyList(o: any): o is ComputeTargetHTTPSProxyList {
  return o && o.apiVersion === ComputeTargetHTTPSProxyList.apiVersion && o.kind === ComputeTargetHTTPSProxyList.kind;
}

export namespace ComputeTargetHTTPSProxyList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeTargetHTTPSProxyList";

  // ComputeTargetHTTPSProxyList is a list of ComputeTargetHTTPSProxy
  export interface Interface {
    // List of computetargethttpsproxies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeTargetHTTPSProxy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeTargetHTTPSProxyList.Metadata;
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

export type ComputeTargetInstance = object;

// ComputeTargetInstanceList is a list of ComputeTargetInstance
export class ComputeTargetInstanceList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computetargetinstances. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeTargetInstance[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeTargetInstanceList.Metadata;

  constructor(desc: ComputeTargetInstanceList) {
    this.apiVersion = ComputeTargetInstanceList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeTargetInstanceList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeTargetInstanceList(o: any): o is ComputeTargetInstanceList {
  return o && o.apiVersion === ComputeTargetInstanceList.apiVersion && o.kind === ComputeTargetInstanceList.kind;
}

export namespace ComputeTargetInstanceList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeTargetInstanceList";

  // ComputeTargetInstanceList is a list of ComputeTargetInstance
  export interface Interface {
    // List of computetargetinstances. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeTargetInstance[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeTargetInstanceList.Metadata;
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

export type ComputeTargetPool = object;

// ComputeTargetPoolList is a list of ComputeTargetPool
export class ComputeTargetPoolList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computetargetpools. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeTargetPool[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeTargetPoolList.Metadata;

  constructor(desc: ComputeTargetPoolList) {
    this.apiVersion = ComputeTargetPoolList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeTargetPoolList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeTargetPoolList(o: any): o is ComputeTargetPoolList {
  return o && o.apiVersion === ComputeTargetPoolList.apiVersion && o.kind === ComputeTargetPoolList.kind;
}

export namespace ComputeTargetPoolList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeTargetPoolList";

  // ComputeTargetPoolList is a list of ComputeTargetPool
  export interface Interface {
    // List of computetargetpools. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeTargetPool[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeTargetPoolList.Metadata;
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

export type ComputeTargetSSLProxy = object;

// ComputeTargetSSLProxyList is a list of ComputeTargetSSLProxy
export class ComputeTargetSSLProxyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computetargetsslproxies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeTargetSSLProxy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeTargetSSLProxyList.Metadata;

  constructor(desc: ComputeTargetSSLProxyList) {
    this.apiVersion = ComputeTargetSSLProxyList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeTargetSSLProxyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeTargetSSLProxyList(o: any): o is ComputeTargetSSLProxyList {
  return o && o.apiVersion === ComputeTargetSSLProxyList.apiVersion && o.kind === ComputeTargetSSLProxyList.kind;
}

export namespace ComputeTargetSSLProxyList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeTargetSSLProxyList";

  // ComputeTargetSSLProxyList is a list of ComputeTargetSSLProxy
  export interface Interface {
    // List of computetargetsslproxies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeTargetSSLProxy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeTargetSSLProxyList.Metadata;
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

export type ComputeTargetTCPProxy = object;

// ComputeTargetTCPProxyList is a list of ComputeTargetTCPProxy
export class ComputeTargetTCPProxyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computetargettcpproxies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeTargetTCPProxy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeTargetTCPProxyList.Metadata;

  constructor(desc: ComputeTargetTCPProxyList) {
    this.apiVersion = ComputeTargetTCPProxyList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeTargetTCPProxyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeTargetTCPProxyList(o: any): o is ComputeTargetTCPProxyList {
  return o && o.apiVersion === ComputeTargetTCPProxyList.apiVersion && o.kind === ComputeTargetTCPProxyList.kind;
}

export namespace ComputeTargetTCPProxyList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeTargetTCPProxyList";

  // ComputeTargetTCPProxyList is a list of ComputeTargetTCPProxy
  export interface Interface {
    // List of computetargettcpproxies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeTargetTCPProxy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeTargetTCPProxyList.Metadata;
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

export type ComputeTargetVPNGateway = object;

// ComputeTargetVPNGatewayList is a list of ComputeTargetVPNGateway
export class ComputeTargetVPNGatewayList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computetargetvpngateways. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeTargetVPNGateway[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeTargetVPNGatewayList.Metadata;

  constructor(desc: ComputeTargetVPNGatewayList) {
    this.apiVersion = ComputeTargetVPNGatewayList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeTargetVPNGatewayList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeTargetVPNGatewayList(o: any): o is ComputeTargetVPNGatewayList {
  return o && o.apiVersion === ComputeTargetVPNGatewayList.apiVersion && o.kind === ComputeTargetVPNGatewayList.kind;
}

export namespace ComputeTargetVPNGatewayList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeTargetVPNGatewayList";

  // ComputeTargetVPNGatewayList is a list of ComputeTargetVPNGateway
  export interface Interface {
    // List of computetargetvpngateways. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeTargetVPNGateway[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeTargetVPNGatewayList.Metadata;
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

export type ComputeURLMap = object;

// ComputeURLMapList is a list of ComputeURLMap
export class ComputeURLMapList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computeurlmaps. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeURLMap[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeURLMapList.Metadata;

  constructor(desc: ComputeURLMapList) {
    this.apiVersion = ComputeURLMapList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeURLMapList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeURLMapList(o: any): o is ComputeURLMapList {
  return o && o.apiVersion === ComputeURLMapList.apiVersion && o.kind === ComputeURLMapList.kind;
}

export namespace ComputeURLMapList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeURLMapList";

  // ComputeURLMapList is a list of ComputeURLMap
  export interface Interface {
    // List of computeurlmaps. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeURLMap[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeURLMapList.Metadata;
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

export type ComputeVPNGateway = object;

// ComputeVPNGatewayList is a list of ComputeVPNGateway
export class ComputeVPNGatewayList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computevpngateways. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeVPNGateway[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeVPNGatewayList.Metadata;

  constructor(desc: ComputeVPNGatewayList) {
    this.apiVersion = ComputeVPNGatewayList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeVPNGatewayList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeVPNGatewayList(o: any): o is ComputeVPNGatewayList {
  return o && o.apiVersion === ComputeVPNGatewayList.apiVersion && o.kind === ComputeVPNGatewayList.kind;
}

export namespace ComputeVPNGatewayList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeVPNGatewayList";

  // ComputeVPNGatewayList is a list of ComputeVPNGateway
  export interface Interface {
    // List of computevpngateways. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeVPNGateway[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeVPNGatewayList.Metadata;
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

export type ComputeVPNTunnel = object;

// ComputeVPNTunnelList is a list of ComputeVPNTunnel
export class ComputeVPNTunnelList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of computevpntunnels. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ComputeVPNTunnel[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ComputeVPNTunnelList.Metadata;

  constructor(desc: ComputeVPNTunnelList) {
    this.apiVersion = ComputeVPNTunnelList.apiVersion;
    this.items = desc.items;
    this.kind = ComputeVPNTunnelList.kind;
    this.metadata = desc.metadata;
  }
}

export function isComputeVPNTunnelList(o: any): o is ComputeVPNTunnelList {
  return o && o.apiVersion === ComputeVPNTunnelList.apiVersion && o.kind === ComputeVPNTunnelList.kind;
}

export namespace ComputeVPNTunnelList {
  export const apiVersion = "compute.cnrm.cloud.google.com/v1beta1";
  export const group = "compute.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ComputeVPNTunnelList";

  // ComputeVPNTunnelList is a list of ComputeVPNTunnel
  export interface Interface {
    // List of computevpntunnels. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ComputeVPNTunnel[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ComputeVPNTunnelList.Metadata;
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