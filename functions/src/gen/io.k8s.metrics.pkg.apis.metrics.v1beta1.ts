import * as pkgApiResource from './io.k8s.apimachinery.pkg.api.resource';
import * as apisMetaV1 from './io.k8s.apimachinery.pkg.apis.meta.v1';

// ContainerMetrics sets resource usage metrics of a container.
export class ContainerMetrics {
  // Container name corresponding to the one from pod.spec.containers.
  public name: string;

  // The memory usage is the memory working set.
  public usage: {[key: string]: pkgApiResource.Quantity_v2};

  constructor(desc: ContainerMetrics) {
    this.name = desc.name;
    this.usage = desc.usage;
  }
}

// NodeMetrics sets resource usage metrics of a node.
export class NodeMetrics {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
  public apiVersion: string;

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
  public kind: string;

  public metadata?: apisMetaV1.ObjectMeta_v2;

  // The following fields define time interval from which metrics were collected from the interval [Timestamp-Window, Timestamp].
  public timestamp: apisMetaV1.Time;

  // The memory usage is the memory working set.
  public usage: {[key: string]: pkgApiResource.Quantity_v2};

  public window: apisMetaV1.Duration;

  constructor(desc: NodeMetrics) {
    this.apiVersion = NodeMetrics.apiVersion;
    this.kind = NodeMetrics.kind;
    this.metadata = desc.metadata;
    this.timestamp = desc.timestamp;
    this.usage = desc.usage;
    this.window = desc.window;
  }
}

export function isNodeMetrics(o: any): o is NodeMetrics {
  return o && o.apiVersion === NodeMetrics.apiVersion && o.kind === NodeMetrics.kind;
}

export namespace NodeMetrics {
  export const apiVersion = "metrics.k8s.io/v1beta1";
  export const group = "metrics.k8s.io";
  export const version = "v1beta1";
  export const kind = "NodeMetrics";

  // NodeMetrics sets resource usage metrics of a node.
  export interface Interface {
    metadata?: apisMetaV1.ObjectMeta_v2;

    // The following fields define time interval from which metrics were collected from the interval [Timestamp-Window, Timestamp].
    timestamp: apisMetaV1.Time;

    // The memory usage is the memory working set.
    usage: {[key: string]: pkgApiResource.Quantity_v2};

    window: apisMetaV1.Duration;
  }
}

// NodeMetricsList is a list of NodeMetrics.
export class NodeMetricsList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
  public apiVersion: string;

  // List of node metrics.
  public items: NodeMetrics[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
  public kind: string;

  // Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
  public metadata?: apisMetaV1.ListMeta_v2;

  constructor(desc: NodeMetricsList) {
    this.apiVersion = NodeMetricsList.apiVersion;
    this.items = desc.items;
    this.kind = NodeMetricsList.kind;
    this.metadata = desc.metadata;
  }
}

export function isNodeMetricsList(o: any): o is NodeMetricsList {
  return o && o.apiVersion === NodeMetricsList.apiVersion && o.kind === NodeMetricsList.kind;
}

export namespace NodeMetricsList {
  export const apiVersion = "metrics.k8s.io/v1beta1";
  export const group = "metrics.k8s.io";
  export const version = "v1beta1";
  export const kind = "NodeMetricsList";

  // NodeMetricsList is a list of NodeMetrics.
  export interface Interface {
    // List of node metrics.
    items: NodeMetrics[];

    // Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
    metadata?: apisMetaV1.ListMeta_v2;
  }
}

// PodMetrics sets resource usage metrics of a pod.
export class PodMetrics {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
  public apiVersion: string;

  // Metrics for all containers are collected within the same time window.
  public containers: ContainerMetrics[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
  public kind: string;

  public metadata?: apisMetaV1.ObjectMeta_v2;

  // The following fields define time interval from which metrics were collected from the interval [Timestamp-Window, Timestamp].
  public timestamp: apisMetaV1.Time;

  public window: apisMetaV1.Duration;

  constructor(desc: PodMetrics) {
    this.apiVersion = PodMetrics.apiVersion;
    this.containers = desc.containers;
    this.kind = PodMetrics.kind;
    this.metadata = desc.metadata;
    this.timestamp = desc.timestamp;
    this.window = desc.window;
  }
}

export function isPodMetrics(o: any): o is PodMetrics {
  return o && o.apiVersion === PodMetrics.apiVersion && o.kind === PodMetrics.kind;
}

export namespace PodMetrics {
  export const apiVersion = "metrics.k8s.io/v1beta1";
  export const group = "metrics.k8s.io";
  export const version = "v1beta1";
  export const kind = "PodMetrics";

  // PodMetrics sets resource usage metrics of a pod.
  export interface Interface {
    // Metrics for all containers are collected within the same time window.
    containers: ContainerMetrics[];

    metadata?: apisMetaV1.ObjectMeta_v2;

    // The following fields define time interval from which metrics were collected from the interval [Timestamp-Window, Timestamp].
    timestamp: apisMetaV1.Time;

    window: apisMetaV1.Duration;
  }
}

// PodMetricsList is a list of PodMetrics.
export class PodMetricsList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
  public apiVersion: string;

  // List of pod metrics.
  public items: PodMetrics[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
  public kind: string;

  // Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
  public metadata?: apisMetaV1.ListMeta_v2;

  constructor(desc: PodMetricsList) {
    this.apiVersion = PodMetricsList.apiVersion;
    this.items = desc.items;
    this.kind = PodMetricsList.kind;
    this.metadata = desc.metadata;
  }
}

export function isPodMetricsList(o: any): o is PodMetricsList {
  return o && o.apiVersion === PodMetricsList.apiVersion && o.kind === PodMetricsList.kind;
}

export namespace PodMetricsList {
  export const apiVersion = "metrics.k8s.io/v1beta1";
  export const group = "metrics.k8s.io";
  export const version = "v1beta1";
  export const kind = "PodMetricsList";

  // PodMetricsList is a list of PodMetrics.
  export interface Interface {
    // List of pod metrics.
    items: PodMetrics[];

    // Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
    metadata?: apisMetaV1.ListMeta_v2;
  }
}