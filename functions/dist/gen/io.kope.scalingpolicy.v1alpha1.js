"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScalingPolicyList = exports.ScalingPolicyList = void 0;
// ScalingPolicyList is a list of ScalingPolicy
class ScalingPolicyList {
    constructor(desc) {
        this.apiVersion = ScalingPolicyList.apiVersion;
        this.items = desc.items;
        this.kind = ScalingPolicyList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ScalingPolicyList = ScalingPolicyList;
function isScalingPolicyList(o) {
    return o && o.apiVersion === ScalingPolicyList.apiVersion && o.kind === ScalingPolicyList.kind;
}
exports.isScalingPolicyList = isScalingPolicyList;
(function (ScalingPolicyList) {
    ScalingPolicyList.apiVersion = "scalingpolicy.kope.io/v1alpha1";
    ScalingPolicyList.group = "scalingpolicy.kope.io";
    ScalingPolicyList.version = "v1alpha1";
    ScalingPolicyList.kind = "ScalingPolicyList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ScalingPolicyList.Metadata = Metadata;
})(ScalingPolicyList = exports.ScalingPolicyList || (exports.ScalingPolicyList = {}));
//# sourceMappingURL=io.kope.scalingpolicy.v1alpha1.js.map