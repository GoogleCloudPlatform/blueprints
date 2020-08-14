"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSourceRepoRepositoryList = exports.SourceRepoRepositoryList = void 0;
// SourceRepoRepositoryList is a list of SourceRepoRepository
class SourceRepoRepositoryList {
    constructor(desc) {
        this.apiVersion = SourceRepoRepositoryList.apiVersion;
        this.items = desc.items;
        this.kind = SourceRepoRepositoryList.kind;
        this.metadata = desc.metadata;
    }
}
exports.SourceRepoRepositoryList = SourceRepoRepositoryList;
function isSourceRepoRepositoryList(o) {
    return o && o.apiVersion === SourceRepoRepositoryList.apiVersion && o.kind === SourceRepoRepositoryList.kind;
}
exports.isSourceRepoRepositoryList = isSourceRepoRepositoryList;
(function (SourceRepoRepositoryList) {
    SourceRepoRepositoryList.apiVersion = "sourcerepo.cnrm.cloud.google.com/v1beta1";
    SourceRepoRepositoryList.group = "sourcerepo.cnrm.cloud.google.com";
    SourceRepoRepositoryList.version = "v1beta1";
    SourceRepoRepositoryList.kind = "SourceRepoRepositoryList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    SourceRepoRepositoryList.Metadata = Metadata;
})(SourceRepoRepositoryList = exports.SourceRepoRepositoryList || (exports.SourceRepoRepositoryList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.sourcerepo.v1beta1.js.map