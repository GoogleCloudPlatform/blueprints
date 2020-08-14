export type ContainerCluster = object;

// ContainerClusterList is a list of ContainerCluster
export class ContainerClusterList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of containerclusters. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ContainerCluster[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ContainerClusterList.Metadata;

  constructor(desc: ContainerClusterList) {
    this.apiVersion = ContainerClusterList.apiVersion;
    this.items = desc.items;
    this.kind = ContainerClusterList.kind;
    this.metadata = desc.metadata;
  }
}

export function isContainerClusterList(o: any): o is ContainerClusterList {
  return o && o.apiVersion === ContainerClusterList.apiVersion && o.kind === ContainerClusterList.kind;
}

export namespace ContainerClusterList {
  export const apiVersion = "container.cnrm.cloud.google.com/v1beta1";
  export const group = "container.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ContainerClusterList";

  // ContainerClusterList is a list of ContainerCluster
  export interface Interface {
    // List of containerclusters. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ContainerCluster[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ContainerClusterList.Metadata;
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

export type ContainerNodePool = object;

// ContainerNodePoolList is a list of ContainerNodePool
export class ContainerNodePoolList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of containernodepools. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ContainerNodePool[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ContainerNodePoolList.Metadata;

  constructor(desc: ContainerNodePoolList) {
    this.apiVersion = ContainerNodePoolList.apiVersion;
    this.items = desc.items;
    this.kind = ContainerNodePoolList.kind;
    this.metadata = desc.metadata;
  }
}

export function isContainerNodePoolList(o: any): o is ContainerNodePoolList {
  return o && o.apiVersion === ContainerNodePoolList.apiVersion && o.kind === ContainerNodePoolList.kind;
}

export namespace ContainerNodePoolList {
  export const apiVersion = "container.cnrm.cloud.google.com/v1beta1";
  export const group = "container.cnrm.cloud.google.com";
  export const version = "v1beta1";
  export const kind = "ContainerNodePoolList";

  // ContainerNodePoolList is a list of ContainerNodePool
  export interface Interface {
    // List of containernodepools. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ContainerNodePool[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ContainerNodePoolList.Metadata;
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