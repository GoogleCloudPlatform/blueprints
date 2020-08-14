"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPubSubTopicList = exports.PubSubTopicList = exports.isPubSubSubscriptionList = exports.PubSubSubscriptionList = void 0;
// PubSubSubscriptionList is a list of PubSubSubscription
class PubSubSubscriptionList {
    constructor(desc) {
        this.apiVersion = PubSubSubscriptionList.apiVersion;
        this.items = desc.items;
        this.kind = PubSubSubscriptionList.kind;
        this.metadata = desc.metadata;
    }
}
exports.PubSubSubscriptionList = PubSubSubscriptionList;
function isPubSubSubscriptionList(o) {
    return o && o.apiVersion === PubSubSubscriptionList.apiVersion && o.kind === PubSubSubscriptionList.kind;
}
exports.isPubSubSubscriptionList = isPubSubSubscriptionList;
(function (PubSubSubscriptionList) {
    PubSubSubscriptionList.apiVersion = "pubsub.cnrm.cloud.google.com/v1beta1";
    PubSubSubscriptionList.group = "pubsub.cnrm.cloud.google.com";
    PubSubSubscriptionList.version = "v1beta1";
    PubSubSubscriptionList.kind = "PubSubSubscriptionList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    PubSubSubscriptionList.Metadata = Metadata;
})(PubSubSubscriptionList = exports.PubSubSubscriptionList || (exports.PubSubSubscriptionList = {}));
// PubSubTopicList is a list of PubSubTopic
class PubSubTopicList {
    constructor(desc) {
        this.apiVersion = PubSubTopicList.apiVersion;
        this.items = desc.items;
        this.kind = PubSubTopicList.kind;
        this.metadata = desc.metadata;
    }
}
exports.PubSubTopicList = PubSubTopicList;
function isPubSubTopicList(o) {
    return o && o.apiVersion === PubSubTopicList.apiVersion && o.kind === PubSubTopicList.kind;
}
exports.isPubSubTopicList = isPubSubTopicList;
(function (PubSubTopicList) {
    PubSubTopicList.apiVersion = "pubsub.cnrm.cloud.google.com/v1beta1";
    PubSubTopicList.group = "pubsub.cnrm.cloud.google.com";
    PubSubTopicList.version = "v1beta1";
    PubSubTopicList.kind = "PubSubTopicList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    PubSubTopicList.Metadata = Metadata;
})(PubSubTopicList = exports.PubSubTopicList || (exports.PubSubTopicList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.pubsub.v1beta1.js.map