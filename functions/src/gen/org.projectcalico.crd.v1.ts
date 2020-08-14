export type BGPConfiguration = object;

// BGPConfigurationList is a list of BGPConfiguration
export class BGPConfigurationList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of bgpconfigurations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: BGPConfiguration[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: BGPConfigurationList.Metadata;

  constructor(desc: BGPConfigurationList) {
    this.apiVersion = BGPConfigurationList.apiVersion;
    this.items = desc.items;
    this.kind = BGPConfigurationList.kind;
    this.metadata = desc.metadata;
  }
}

export function isBGPConfigurationList(o: any): o is BGPConfigurationList {
  return o && o.apiVersion === BGPConfigurationList.apiVersion && o.kind === BGPConfigurationList.kind;
}

export namespace BGPConfigurationList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "BGPConfigurationList";

  // BGPConfigurationList is a list of BGPConfiguration
  export interface Interface {
    // List of bgpconfigurations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: BGPConfiguration[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: BGPConfigurationList.Metadata;
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

export type BGPPeer = object;

// BGPPeerList is a list of BGPPeer
export class BGPPeerList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of bgppeers. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: BGPPeer[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: BGPPeerList.Metadata;

  constructor(desc: BGPPeerList) {
    this.apiVersion = BGPPeerList.apiVersion;
    this.items = desc.items;
    this.kind = BGPPeerList.kind;
    this.metadata = desc.metadata;
  }
}

export function isBGPPeerList(o: any): o is BGPPeerList {
  return o && o.apiVersion === BGPPeerList.apiVersion && o.kind === BGPPeerList.kind;
}

export namespace BGPPeerList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "BGPPeerList";

  // BGPPeerList is a list of BGPPeer
  export interface Interface {
    // List of bgppeers. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: BGPPeer[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: BGPPeerList.Metadata;
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

export type BlockAffinity = object;

// BlockAffinityList is a list of BlockAffinity
export class BlockAffinityList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of blockaffinities. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: BlockAffinity[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: BlockAffinityList.Metadata;

  constructor(desc: BlockAffinityList) {
    this.apiVersion = BlockAffinityList.apiVersion;
    this.items = desc.items;
    this.kind = BlockAffinityList.kind;
    this.metadata = desc.metadata;
  }
}

export function isBlockAffinityList(o: any): o is BlockAffinityList {
  return o && o.apiVersion === BlockAffinityList.apiVersion && o.kind === BlockAffinityList.kind;
}

export namespace BlockAffinityList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "BlockAffinityList";

  // BlockAffinityList is a list of BlockAffinity
  export interface Interface {
    // List of blockaffinities. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: BlockAffinity[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: BlockAffinityList.Metadata;
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

export type ClusterInformation = object;

// ClusterInformationList is a list of ClusterInformation
export class ClusterInformationList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of clusterinformations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ClusterInformation[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ClusterInformationList.Metadata;

  constructor(desc: ClusterInformationList) {
    this.apiVersion = ClusterInformationList.apiVersion;
    this.items = desc.items;
    this.kind = ClusterInformationList.kind;
    this.metadata = desc.metadata;
  }
}

export function isClusterInformationList(o: any): o is ClusterInformationList {
  return o && o.apiVersion === ClusterInformationList.apiVersion && o.kind === ClusterInformationList.kind;
}

export namespace ClusterInformationList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "ClusterInformationList";

  // ClusterInformationList is a list of ClusterInformation
  export interface Interface {
    // List of clusterinformations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ClusterInformation[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ClusterInformationList.Metadata;
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

export type FelixConfiguration = object;

// FelixConfigurationList is a list of FelixConfiguration
export class FelixConfigurationList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of felixconfigurations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: FelixConfiguration[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: FelixConfigurationList.Metadata;

  constructor(desc: FelixConfigurationList) {
    this.apiVersion = FelixConfigurationList.apiVersion;
    this.items = desc.items;
    this.kind = FelixConfigurationList.kind;
    this.metadata = desc.metadata;
  }
}

export function isFelixConfigurationList(o: any): o is FelixConfigurationList {
  return o && o.apiVersion === FelixConfigurationList.apiVersion && o.kind === FelixConfigurationList.kind;
}

export namespace FelixConfigurationList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "FelixConfigurationList";

  // FelixConfigurationList is a list of FelixConfiguration
  export interface Interface {
    // List of felixconfigurations. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: FelixConfiguration[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: FelixConfigurationList.Metadata;
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

export type GlobalBGPConfig = object;

// GlobalBGPConfigList is a list of GlobalBGPConfig
export class GlobalBGPConfigList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of globalbgpconfigs. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: GlobalBGPConfig[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: GlobalBGPConfigList.Metadata;

  constructor(desc: GlobalBGPConfigList) {
    this.apiVersion = GlobalBGPConfigList.apiVersion;
    this.items = desc.items;
    this.kind = GlobalBGPConfigList.kind;
    this.metadata = desc.metadata;
  }
}

export function isGlobalBGPConfigList(o: any): o is GlobalBGPConfigList {
  return o && o.apiVersion === GlobalBGPConfigList.apiVersion && o.kind === GlobalBGPConfigList.kind;
}

export namespace GlobalBGPConfigList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "GlobalBGPConfigList";

  // GlobalBGPConfigList is a list of GlobalBGPConfig
  export interface Interface {
    // List of globalbgpconfigs. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: GlobalBGPConfig[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: GlobalBGPConfigList.Metadata;
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

export type GlobalFelixConfig = object;

// GlobalFelixConfigList is a list of GlobalFelixConfig
export class GlobalFelixConfigList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of globalfelixconfigs. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: GlobalFelixConfig[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: GlobalFelixConfigList.Metadata;

  constructor(desc: GlobalFelixConfigList) {
    this.apiVersion = GlobalFelixConfigList.apiVersion;
    this.items = desc.items;
    this.kind = GlobalFelixConfigList.kind;
    this.metadata = desc.metadata;
  }
}

export function isGlobalFelixConfigList(o: any): o is GlobalFelixConfigList {
  return o && o.apiVersion === GlobalFelixConfigList.apiVersion && o.kind === GlobalFelixConfigList.kind;
}

export namespace GlobalFelixConfigList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "GlobalFelixConfigList";

  // GlobalFelixConfigList is a list of GlobalFelixConfig
  export interface Interface {
    // List of globalfelixconfigs. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: GlobalFelixConfig[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: GlobalFelixConfigList.Metadata;
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

export type GlobalNetworkPolicy = object;

// GlobalNetworkPolicyList is a list of GlobalNetworkPolicy
export class GlobalNetworkPolicyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of globalnetworkpolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: GlobalNetworkPolicy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: GlobalNetworkPolicyList.Metadata;

  constructor(desc: GlobalNetworkPolicyList) {
    this.apiVersion = GlobalNetworkPolicyList.apiVersion;
    this.items = desc.items;
    this.kind = GlobalNetworkPolicyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isGlobalNetworkPolicyList(o: any): o is GlobalNetworkPolicyList {
  return o && o.apiVersion === GlobalNetworkPolicyList.apiVersion && o.kind === GlobalNetworkPolicyList.kind;
}

export namespace GlobalNetworkPolicyList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "GlobalNetworkPolicyList";

  // GlobalNetworkPolicyList is a list of GlobalNetworkPolicy
  export interface Interface {
    // List of globalnetworkpolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: GlobalNetworkPolicy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: GlobalNetworkPolicyList.Metadata;
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

export type GlobalNetworkSet = object;

// GlobalNetworkSetList is a list of GlobalNetworkSet
export class GlobalNetworkSetList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of globalnetworksets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: GlobalNetworkSet[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: GlobalNetworkSetList.Metadata;

  constructor(desc: GlobalNetworkSetList) {
    this.apiVersion = GlobalNetworkSetList.apiVersion;
    this.items = desc.items;
    this.kind = GlobalNetworkSetList.kind;
    this.metadata = desc.metadata;
  }
}

export function isGlobalNetworkSetList(o: any): o is GlobalNetworkSetList {
  return o && o.apiVersion === GlobalNetworkSetList.apiVersion && o.kind === GlobalNetworkSetList.kind;
}

export namespace GlobalNetworkSetList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "GlobalNetworkSetList";

  // GlobalNetworkSetList is a list of GlobalNetworkSet
  export interface Interface {
    // List of globalnetworksets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: GlobalNetworkSet[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: GlobalNetworkSetList.Metadata;
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

export type HostEndpoint = object;

// HostEndpointList is a list of HostEndpoint
export class HostEndpointList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of hostendpoints. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: HostEndpoint[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: HostEndpointList.Metadata;

  constructor(desc: HostEndpointList) {
    this.apiVersion = HostEndpointList.apiVersion;
    this.items = desc.items;
    this.kind = HostEndpointList.kind;
    this.metadata = desc.metadata;
  }
}

export function isHostEndpointList(o: any): o is HostEndpointList {
  return o && o.apiVersion === HostEndpointList.apiVersion && o.kind === HostEndpointList.kind;
}

export namespace HostEndpointList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "HostEndpointList";

  // HostEndpointList is a list of HostEndpoint
  export interface Interface {
    // List of hostendpoints. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: HostEndpoint[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: HostEndpointList.Metadata;
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

export type IPAMBlock = object;

// IPAMBlockList is a list of IPAMBlock
export class IPAMBlockList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of ipamblocks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IPAMBlock[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IPAMBlockList.Metadata;

  constructor(desc: IPAMBlockList) {
    this.apiVersion = IPAMBlockList.apiVersion;
    this.items = desc.items;
    this.kind = IPAMBlockList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIPAMBlockList(o: any): o is IPAMBlockList {
  return o && o.apiVersion === IPAMBlockList.apiVersion && o.kind === IPAMBlockList.kind;
}

export namespace IPAMBlockList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "IPAMBlockList";

  // IPAMBlockList is a list of IPAMBlock
  export interface Interface {
    // List of ipamblocks. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IPAMBlock[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IPAMBlockList.Metadata;
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

export type IPAMConfig = object;

// IPAMConfigList is a list of IPAMConfig
export class IPAMConfigList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of ipamconfigs. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IPAMConfig[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IPAMConfigList.Metadata;

  constructor(desc: IPAMConfigList) {
    this.apiVersion = IPAMConfigList.apiVersion;
    this.items = desc.items;
    this.kind = IPAMConfigList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIPAMConfigList(o: any): o is IPAMConfigList {
  return o && o.apiVersion === IPAMConfigList.apiVersion && o.kind === IPAMConfigList.kind;
}

export namespace IPAMConfigList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "IPAMConfigList";

  // IPAMConfigList is a list of IPAMConfig
  export interface Interface {
    // List of ipamconfigs. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IPAMConfig[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IPAMConfigList.Metadata;
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

export type IPAMHandle = object;

// IPAMHandleList is a list of IPAMHandle
export class IPAMHandleList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of ipamhandles. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IPAMHandle[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IPAMHandleList.Metadata;

  constructor(desc: IPAMHandleList) {
    this.apiVersion = IPAMHandleList.apiVersion;
    this.items = desc.items;
    this.kind = IPAMHandleList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIPAMHandleList(o: any): o is IPAMHandleList {
  return o && o.apiVersion === IPAMHandleList.apiVersion && o.kind === IPAMHandleList.kind;
}

export namespace IPAMHandleList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "IPAMHandleList";

  // IPAMHandleList is a list of IPAMHandle
  export interface Interface {
    // List of ipamhandles. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IPAMHandle[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IPAMHandleList.Metadata;
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

export type IPPool = object;

// IPPoolList is a list of IPPool
export class IPPoolList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of ippools. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: IPPool[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: IPPoolList.Metadata;

  constructor(desc: IPPoolList) {
    this.apiVersion = IPPoolList.apiVersion;
    this.items = desc.items;
    this.kind = IPPoolList.kind;
    this.metadata = desc.metadata;
  }
}

export function isIPPoolList(o: any): o is IPPoolList {
  return o && o.apiVersion === IPPoolList.apiVersion && o.kind === IPPoolList.kind;
}

export namespace IPPoolList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "IPPoolList";

  // IPPoolList is a list of IPPool
  export interface Interface {
    // List of ippools. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: IPPool[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: IPPoolList.Metadata;
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

export type NetworkPolicy = object;

// NetworkPolicyList is a list of NetworkPolicy
export class NetworkPolicyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of networkpolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: NetworkPolicy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: NetworkPolicyList.Metadata;

  constructor(desc: NetworkPolicyList) {
    this.apiVersion = NetworkPolicyList.apiVersion;
    this.items = desc.items;
    this.kind = NetworkPolicyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isNetworkPolicyList(o: any): o is NetworkPolicyList {
  return o && o.apiVersion === NetworkPolicyList.apiVersion && o.kind === NetworkPolicyList.kind;
}

export namespace NetworkPolicyList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "NetworkPolicyList";

  // NetworkPolicyList is a list of NetworkPolicy
  export interface Interface {
    // List of networkpolicies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: NetworkPolicy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: NetworkPolicyList.Metadata;
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

export type NetworkSet = object;

// NetworkSetList is a list of NetworkSet
export class NetworkSetList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of networksets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: NetworkSet[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: NetworkSetList.Metadata;

  constructor(desc: NetworkSetList) {
    this.apiVersion = NetworkSetList.apiVersion;
    this.items = desc.items;
    this.kind = NetworkSetList.kind;
    this.metadata = desc.metadata;
  }
}

export function isNetworkSetList(o: any): o is NetworkSetList {
  return o && o.apiVersion === NetworkSetList.apiVersion && o.kind === NetworkSetList.kind;
}

export namespace NetworkSetList {
  export const apiVersion = "crd.projectcalico.org/v1";
  export const group = "crd.projectcalico.org";
  export const version = "v1";
  export const kind = "NetworkSetList";

  // NetworkSetList is a list of NetworkSet
  export interface Interface {
    // List of networksets. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: NetworkSet[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: NetworkSetList.Metadata;
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