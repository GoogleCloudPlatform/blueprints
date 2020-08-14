"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRedisInstanceList = exports.RedisInstanceList = void 0;
// RedisInstanceList is a list of RedisInstance
class RedisInstanceList {
    constructor(desc) {
        this.apiVersion = RedisInstanceList.apiVersion;
        this.items = desc.items;
        this.kind = RedisInstanceList.kind;
        this.metadata = desc.metadata;
    }
}
exports.RedisInstanceList = RedisInstanceList;
function isRedisInstanceList(o) {
    return o && o.apiVersion === RedisInstanceList.apiVersion && o.kind === RedisInstanceList.kind;
}
exports.isRedisInstanceList = isRedisInstanceList;
(function (RedisInstanceList) {
    RedisInstanceList.apiVersion = "redis.cnrm.cloud.google.com/v1beta1";
    RedisInstanceList.group = "redis.cnrm.cloud.google.com";
    RedisInstanceList.version = "v1beta1";
    RedisInstanceList.kind = "RedisInstanceList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    RedisInstanceList.Metadata = Metadata;
})(RedisInstanceList = exports.RedisInstanceList || (exports.RedisInstanceList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.redis.v1beta1.js.map