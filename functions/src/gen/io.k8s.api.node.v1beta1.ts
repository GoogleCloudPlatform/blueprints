import { KubernetesObject } from 'kpt-functions';
import * as apiCoreV1 from './io.k8s.api.core.v1';
import * as pkgApiResource from './io.k8s.apimachinery.pkg.api.resource';
import * as apisMetaV1 from './io.k8s.apimachinery.pkg.apis.meta.v1';

// Overhead structure represents the resource overhead associated with running a pod.
export class Overhead {
  // PodFixed represents the fixed resource overhead associated with running a pod.
  public podFixed?: {[key: string]: pkgApiResource.Quantity};
}

// RuntimeClass defines a class of container runtime supported in the cluster. The RuntimeClass is used to determine which container runtime is used to run all containers in a pod. RuntimeClasses are (currently) manually defined by a user or cluster provisioner, and referenced in the PodSpec. The Kubelet is responsible for resolving the RuntimeClassName reference before running the pod.  For more details, see https://git.k8s.io/enhancements/keps/sig-node/runtime-class.md
export class RuntimeClass implements KubernetesObject {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // Handler specifies the underlying runtime and configuration that the CRI implementation will use to handle pods of this class. The possible values are specific to the node & CRI configuration.  It is assumed that all handlers are available on every node, and handlers of the same name are equivalent on every node. For example, a handler called "runc" might specify that the runc OCI runtime (using native Linux containers) will be used to run the containers in a pod. The Handler must conform to the DNS Label (RFC 1123) requirements, and is immutable.
  public handler: string;

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
  public metadata: apisMetaV1.ObjectMeta;

  // Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. For more details, see https://git.k8s.io/enhancements/keps/sig-node/20190226-pod-overhead.md This field is alpha-level as of Kubernetes v1.15, and is only honored by servers that enable the PodOverhead feature.
  public overhead?: Overhead;

  // Scheduling holds the scheduling constraints to ensure that pods running with this RuntimeClass are scheduled to nodes that support it. If scheduling is nil, this RuntimeClass is assumed to be supported by all nodes.
  public scheduling?: Scheduling;

  constructor(desc: RuntimeClass.Interface) {
    this.apiVersion = RuntimeClass.apiVersion;
    this.handler = desc.handler;
    this.kind = RuntimeClass.kind;
    this.metadata = desc.metadata;
    this.overhead = desc.overhead;
    this.scheduling = desc.scheduling;
  }
}

export function isRuntimeClass(o: any): o is RuntimeClass {
  return o && o.apiVersion === RuntimeClass.apiVersion && o.kind === RuntimeClass.kind;
}

export namespace RuntimeClass {
  export const apiVersion = "node.k8s.io/v1beta1";
  export const group = "node.k8s.io";
  export const version = "v1beta1";
  export const kind = "RuntimeClass";

  // RuntimeClass defines a class of container runtime supported in the cluster. The RuntimeClass is used to determine which container runtime is used to run all containers in a pod. RuntimeClasses are (currently) manually defined by a user or cluster provisioner, and referenced in the PodSpec. The Kubelet is responsible for resolving the RuntimeClassName reference before running the pod.  For more details, see https://git.k8s.io/enhancements/keps/sig-node/runtime-class.md
  export interface Interface {
    // Handler specifies the underlying runtime and configuration that the CRI implementation will use to handle pods of this class. The possible values are specific to the node & CRI configuration.  It is assumed that all handlers are available on every node, and handlers of the same name are equivalent on every node. For example, a handler called "runc" might specify that the runc OCI runtime (using native Linux containers) will be used to run the containers in a pod. The Handler must conform to the DNS Label (RFC 1123) requirements, and is immutable.
    handler: string;

    // More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
    metadata: apisMetaV1.ObjectMeta;

    // Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. For more details, see https://git.k8s.io/enhancements/keps/sig-node/20190226-pod-overhead.md This field is alpha-level as of Kubernetes v1.15, and is only honored by servers that enable the PodOverhead feature.
    overhead?: Overhead;

    // Scheduling holds the scheduling constraints to ensure that pods running with this RuntimeClass are scheduled to nodes that support it. If scheduling is nil, this RuntimeClass is assumed to be supported by all nodes.
    scheduling?: Scheduling;
  }
}

// RuntimeClassList is a list of RuntimeClass objects.
export class RuntimeClassList {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // Items is a list of schema objects.
  public items: RuntimeClass[];

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  // Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
  public metadata?: apisMetaV1.ListMeta;

  constructor(desc: RuntimeClassList) {
    this.apiVersion = RuntimeClassList.apiVersion;
    this.items = desc.items.map((i) => new RuntimeClass(i));
    this.kind = RuntimeClassList.kind;
    this.metadata = desc.metadata;
  }
}

export function isRuntimeClassList(o: any): o is RuntimeClassList {
  return o && o.apiVersion === RuntimeClassList.apiVersion && o.kind === RuntimeClassList.kind;
}

export namespace RuntimeClassList {
  export const apiVersion = "node.k8s.io/v1beta1";
  export const group = "node.k8s.io";
  export const version = "v1beta1";
  export const kind = "RuntimeClassList";

  // RuntimeClassList is a list of RuntimeClass objects.
  export interface Interface {
    // Items is a list of schema objects.
    items: RuntimeClass[];

    // Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
    metadata?: apisMetaV1.ListMeta;
  }
}

// Scheduling specifies the scheduling constraints for nodes supporting a RuntimeClass.
export class Scheduling {
  // nodeSelector lists labels that must be present on nodes that support this RuntimeClass. Pods using this RuntimeClass can only be scheduled to a node matched by this selector. The RuntimeClass nodeSelector is merged with a pod's existing nodeSelector. Any conflicts will cause the pod to be rejected in admission.
  public nodeSelector?: {[key: string]: string};

  // tolerations are appended (excluding duplicates) to pods running with this RuntimeClass during admission, effectively unioning the set of nodes tolerated by the pod and the RuntimeClass.
  public tolerations?: apiCoreV1.Toleration[];
}