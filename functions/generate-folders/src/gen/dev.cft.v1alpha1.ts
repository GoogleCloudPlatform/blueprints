import {KubernetesObject} from 'kpt-functions';
import * as apisMetaV1 from './io.k8s.apimachinery.pkg.apis.meta.v1';

export class ResourceHierarchy implements KubernetesObject {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
  public metadata: apisMetaV1.ObjectMeta;

  public spec: ResourceHierarchy.Spec;

  constructor(desc: ResourceHierarchy.Interface) {
    this.apiVersion = ResourceHierarchy.apiVersion;
    this.kind = ResourceHierarchy.kind;
    this.metadata = desc.metadata;
    this.spec = desc.spec;
  }
}

export function isResourceHierarchy(o: any): o is ResourceHierarchy {
  return o && o.apiVersion === ResourceHierarchy.apiVersion && o.kind === ResourceHierarchy.kind;
}

export namespace ResourceHierarchy {
  export const apiVersion = "cft.dev/v1alpha1";
  export const group = "cft.dev";
  export const version = "v1alpha1";
  export const kind = "ResourceHierarchy";

  export interface Interface {
    // Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
    metadata: apisMetaV1.ObjectMeta;

    spec: ResourceHierarchy.Spec;
  }
  export class Spec {
    public config: {[key: string]: string[]};

    public layers: string[];

    public organization: string;

    constructor(desc: ResourceHierarchy.Spec) {
      this.config = desc.config;
      this.layers = desc.layers;
      this.organization = desc.organization;
    }
  }
}

// ResourceHierarchyList is a list of ResourceHierarchy
export class ResourceHierarchyList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // List of resourcehierarchies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
  public items: ResourceHierarchy[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
  public metadata?: ResourceHierarchyList.Metadata;

  constructor(desc: ResourceHierarchyList) {
    this.apiVersion = ResourceHierarchyList.apiVersion;
    this.items = desc.items.map((i) => new ResourceHierarchy(i));
    this.kind = ResourceHierarchyList.kind;
    this.metadata = desc.metadata;
  }
}

export function isResourceHierarchyList(o: any): o is ResourceHierarchyList {
  return o && o.apiVersion === ResourceHierarchyList.apiVersion && o.kind === ResourceHierarchyList.kind;
}

export namespace ResourceHierarchyList {
  export const apiVersion = "cft.dev/v1alpha1";
  export const group = "cft.dev";
  export const version = "v1alpha1";
  export const kind = "ResourceHierarchyList";

  // ResourceHierarchyList is a list of ResourceHierarchy
  export interface Interface {
    // List of resourcehierarchies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ResourceHierarchy[];

    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    metadata?: ResourceHierarchyList.Metadata;
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
