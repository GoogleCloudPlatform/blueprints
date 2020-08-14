"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProjectList = exports.ProjectList = exports.isFolderList = exports.FolderList = void 0;
// FolderList is a list of Folder
class FolderList {
    constructor(desc) {
        this.apiVersion = FolderList.apiVersion;
        this.items = desc.items;
        this.kind = FolderList.kind;
        this.metadata = desc.metadata;
    }
}
exports.FolderList = FolderList;
function isFolderList(o) {
    return o && o.apiVersion === FolderList.apiVersion && o.kind === FolderList.kind;
}
exports.isFolderList = isFolderList;
(function (FolderList) {
    FolderList.apiVersion = "resourcemanager.cnrm.cloud.google.com/v1beta1";
    FolderList.group = "resourcemanager.cnrm.cloud.google.com";
    FolderList.version = "v1beta1";
    FolderList.kind = "FolderList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    FolderList.Metadata = Metadata;
})(FolderList = exports.FolderList || (exports.FolderList = {}));
// ProjectList is a list of Project
class ProjectList {
    constructor(desc) {
        this.apiVersion = ProjectList.apiVersion;
        this.items = desc.items;
        this.kind = ProjectList.kind;
        this.metadata = desc.metadata;
    }
}
exports.ProjectList = ProjectList;
function isProjectList(o) {
    return o && o.apiVersion === ProjectList.apiVersion && o.kind === ProjectList.kind;
}
exports.isProjectList = isProjectList;
(function (ProjectList) {
    ProjectList.apiVersion = "resourcemanager.cnrm.cloud.google.com/v1beta1";
    ProjectList.group = "resourcemanager.cnrm.cloud.google.com";
    ProjectList.version = "v1beta1";
    ProjectList.kind = "ProjectList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    ProjectList.Metadata = Metadata;
})(ProjectList = exports.ProjectList || (exports.ProjectList = {}));
//# sourceMappingURL=com.google.cloud.cnrm.resourcemanager.v1beta1.js.map