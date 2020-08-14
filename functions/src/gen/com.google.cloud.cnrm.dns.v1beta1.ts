export type DNSManagedZone = object;

// DNSManagedZoneList is a list of DNSManagedZone
export class DNSManagedZoneList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of dnsmanagedzones. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: DNSManagedZone[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: DNSManagedZoneList.Metadata;

  constructor(desc: DNSManagedZoneList) {
    this.apiVersion = DNSManagedZoneList.apiVersion;
    this.items = desc.items;
    this.kind = DNSManagedZoneList.kind;
    this.metadata = desc.metadata;
  }
}

export function isDNSManagedZoneList(o: any): o is DNSManagedZoneList {
  return o && o.apiVersion === DNSManagedZoneList.apiVersion && o.kind === DNSManagedZoneList.kind;
}

export namespace DNSManagedZoneList {
  export const apiVersion = "dns.cnrm.cloud.google.com/v1beta1";
  export const group = "dns.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "DNSManagedZoneList";

  // DNSManagedZoneList is a list of DNSManagedZone
  export interface Interface {
    // List of dnsmanagedzones. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: DNSManagedZone[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: DNSManagedZoneList.Metadata;
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

export type DNSPolicy = object;

// DNSPolicyList is a list of DNSPolicy
export class DNSPolicyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of dnspolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: DNSPolicy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: DNSPolicyList.Metadata;

  constructor(desc: DNSPolicyList) {
    this.apiVersion = DNSPolicyList.apiVersion;
    this.items = desc.items;
    this.kind = DNSPolicyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isDNSPolicyList(o: any): o is DNSPolicyList {
  return o && o.apiVersion === DNSPolicyList.apiVersion && o.kind === DNSPolicyList.kind;
}

export namespace DNSPolicyList {
  export const apiVersion = "dns.cnrm.cloud.google.com/v1beta1";
  export const group = "dns.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "DNSPolicyList";

  // DNSPolicyList is a list of DNSPolicy
  export interface Interface {
    // List of dnspolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: DNSPolicy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: DNSPolicyList.Metadata;
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

export type DNSRecordSet = object;

// DNSRecordSetList is a list of DNSRecordSet
export class DNSRecordSetList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of dnsrecordsets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: DNSRecordSet[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: DNSRecordSetList.Metadata;

  constructor(desc: DNSRecordSetList) {
    this.apiVersion = DNSRecordSetList.apiVersion;
    this.items = desc.items;
    this.kind = DNSRecordSetList.kind;
    this.metadata = desc.metadata;
  }
}

export function isDNSRecordSetList(o: any): o is DNSRecordSetList {
  return o && o.apiVersion === DNSRecordSetList.apiVersion && o.kind === DNSRecordSetList.kind;
}

export namespace DNSRecordSetList {
  export const apiVersion = "dns.cnrm.cloud.google.com/v1beta1";
  export const group = "dns.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "DNSRecordSetList";

  // DNSRecordSetList is a list of DNSRecordSet
  export interface Interface {
    // List of dnsrecordsets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: DNSRecordSet[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: DNSRecordSetList.Metadata;
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