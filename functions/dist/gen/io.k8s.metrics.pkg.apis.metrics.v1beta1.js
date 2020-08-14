"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPodMetricsList = exports.PodMetricsList = exports.isPodMetrics = exports.PodMetrics = exports.isNodeMetricsList = exports.NodeMetricsList = exports.isNodeMetrics = exports.NodeMetrics = exports.ContainerMetrics = void 0;
// ContainerMetrics sets resource usage metrics of a container.
class ContainerMetrics {
    constructor(desc) {
        this.name = desc.name;
        this.usage = desc.usage;
    }
}
exports.ContainerMetrics = ContainerMetrics;
// NodeMetrics sets resource usage metrics of a node.
class NodeMetrics {
    constructor(desc) {
        this.apiVersion = NodeMetrics.apiVersion;
        this.kind = NodeMetrics.kind;
        this.metadata = desc.metadata;
        this.timestamp = desc.timestamp;
        this.usage = desc.usage;
        this.window = desc.window;
    }
}
exports.NodeMetrics = NodeMetrics;
function isNodeMetrics(o) {
    return o && o.apiVersion === NodeMetrics.apiVersion && o.kind === NodeMetrics.kind;
}
exports.isNodeMetrics = isNodeMetrics;
(function (NodeMetrics) {
    NodeMetrics.apiVersion = "metrics.k8s.io/v1beta1";
    NodeMetrics.group = "metrics.k8s.io";
    NodeMetrics.version = "v1beta1";
    NodeMetrics.kind = "NodeMetrics";
})(NodeMetrics = exports.NodeMetrics || (exports.NodeMetrics = {}));
// NodeMetricsList is a list of NodeMetrics.
class NodeMetricsList {
    constructor(desc) {
        this.apiVersion = NodeMetricsList.apiVersion;
        this.items = desc.items;
        this.kind = NodeMetricsList.kind;
        this.metadata = desc.metadata;
    }
}
exports.NodeMetricsList = NodeMetricsList;
function isNodeMetricsList(o) {
    return o && o.apiVersion === NodeMetricsList.apiVersion && o.kind === NodeMetricsList.kind;
}
exports.isNodeMetricsList = isNodeMetricsList;
(function (NodeMetricsList) {
    NodeMetricsList.apiVersion = "metrics.k8s.io/v1beta1";
    NodeMetricsList.group = "metrics.k8s.io";
    NodeMetricsList.version = "v1beta1";
    NodeMetricsList.kind = "NodeMetricsList";
})(NodeMetricsList = exports.NodeMetricsList || (exports.NodeMetricsList = {}));
// PodMetrics sets resource usage metrics of a pod.
class PodMetrics {
    constructor(desc) {
        this.apiVersion = PodMetrics.apiVersion;
        this.containers = desc.containers;
        this.kind = PodMetrics.kind;
        this.metadata = desc.metadata;
        this.timestamp = desc.timestamp;
        this.window = desc.window;
    }
}
exports.PodMetrics = PodMetrics;
function isPodMetrics(o) {
    return o && o.apiVersion === PodMetrics.apiVersion && o.kind === PodMetrics.kind;
}
exports.isPodMetrics = isPodMetrics;
(function (PodMetrics) {
    PodMetrics.apiVersion = "metrics.k8s.io/v1beta1";
    PodMetrics.group = "metrics.k8s.io";
    PodMetrics.version = "v1beta1";
    PodMetrics.kind = "PodMetrics";
})(PodMetrics = exports.PodMetrics || (exports.PodMetrics = {}));
// PodMetricsList is a list of PodMetrics.
class PodMetricsList {
    constructor(desc) {
        this.apiVersion = PodMetricsList.apiVersion;
        this.items = desc.items;
        this.kind = PodMetricsList.kind;
        this.metadata = desc.metadata;
    }
}
exports.PodMetricsList = PodMetricsList;
function isPodMetricsList(o) {
    return o && o.apiVersion === PodMetricsList.apiVersion && o.kind === PodMetricsList.kind;
}
exports.isPodMetricsList = isPodMetricsList;
(function (PodMetricsList) {
    PodMetricsList.apiVersion = "metrics.k8s.io/v1beta1";
    PodMetricsList.group = "metrics.k8s.io";
    PodMetricsList.version = "v1beta1";
    PodMetricsList.kind = "PodMetricsList";
})(PodMetricsList = exports.PodMetricsList || (exports.PodMetricsList = {}));
//# sourceMappingURL=io.k8s.metrics.pkg.apis.metrics.v1beta1.js.map