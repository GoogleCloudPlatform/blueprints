"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResourceHierarchyList = exports.ResourceHierarchyList = exports.isResourceHierarchy = exports.ResourceHierarchy = void 0;
class ResourceHierarchy {
    constructor(desc) {
        this.apiVersion = ResourceHierarchy.apiVersion;
        this.kind = ResourceHierarchy.kind;
        this.metadata = desc.metadata;
        this.spec = desc.spec;
    }
}
exports.ResourceHierarchy = ResourceHierarchy;
function isResourceHierarchy(o) {
    return o && o.apiVersion === ResourceHierarchy.apiVersion && o.kind === ResourceHierarchy.kind;
}
exports.isResourceHierarchy = isResourceHierarchy;
(function (ResourceHierarchy) {
    ResourceHierarchy.apiVersion = "cft.dev/v1alpha1";
    ResourceHierarchy.group = "cft.dev";
    ResourceHierarchy.version = "v1alpha1";
    ResourceHierarchy.kind = "ResourceHierarchy";
    class Spec {
        constructor(desc) {
            this.environments = desc.environments;
            this.teams = desc.teams;
        }
    }
    ResourceHierarchy.Spec = Spec;
})(ResourceHierarchy = exports.ResourceHierarchy || (exports.ResourceHierarchy = {}));
// ResourceHierarchyList is a list of ResourceHierarchy
class ResourceHierarchyList {
    constructor(desc) {
        this.apiVersion = ResourceHierarchyList.apiVersion;
        this.items = desc.items.map((i) => new ResourceHierarchy(i));
        this.kind = ResourceHierarchyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ResourceHierarchyList = ResourceHierarchyList;
function isResourceHierarchyList(o) {
    return o && o.apiVersion === ResourceHierarchyList.apiVersion && o.kind === ResourceHierarchyList.kind;
}
exports.isResourceHierarchyList = isResourceHierarchyList;
(function (ResourceHierarchyList) {
    ResourceHierarchyList.apiVersion = "cft.dev/v1alpha1";
    ResourceHierarchyList.group = "cft.dev";
    ResourceHierarchyList.version = "v1alpha1";
    ResourceHierarchyList.kind = "ResourceHierarchyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ResourceHierarchyList.Metadata = Metadata;
})(ResourceHierarchyList = exports.ResourceHierarchyList || (exports.ResourceHierarchyList = {}));
//# sourceMappingURL=dev.cft.v1alpha1.js.map