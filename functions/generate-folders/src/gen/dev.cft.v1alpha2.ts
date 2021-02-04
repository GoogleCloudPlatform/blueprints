import { KubernetesObject } from 'kpt-functions';
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
  export const apiVersion = "cft.dev/v1alpha2";
  export const group = "cft.dev";
  export const version = "v1alpha2";
  export const kind = "ResourceHierarchy";

  export interface Interface {
    // Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
    metadata: apisMetaV1.ObjectMeta;

    spec: ResourceHierarchy.Spec;
  }
  export class Spec {
    public config: {[key: string]: object}[];

    public parentRef: ResourceHierarchy.Spec.ParentRef;

    public subtrees?: {[key: string]: object};

    constructor(desc: ResourceHierarchy.Spec) {
      this.config = desc.config;
      this.parentRef = desc.parentRef;
      this.subtrees = desc.subtrees;
    }
  }

  export namespace Spec {
    export class ParentRef {
      public external: string;

      public kind?: string;

      constructor(desc: ResourceHierarchy.Spec.ParentRef) {
        this.external = desc.external;
        this.kind = desc.kind;
      }
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

  // Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public metadata?: apisMetaV1.ListMeta;

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
  export const apiVersion = "cft.dev/v1alpha2";
  export const group = "cft.dev";
  export const version = "v1alpha2";
  export const kind = "ResourceHierarchyList";

  // ResourceHierarchyList is a list of ResourceHierarchy
  export interface Interface {
    // List of resourcehierarchies. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
    items: ResourceHierarchy[];

    // Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
    metadata?: apisMetaV1.ListMeta;
  }
}