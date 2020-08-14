"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTeamList = exports.TeamList = exports.isHierarchy = exports.Hierarchy = void 0;
class Hierarchy {
    constructor(desc) {
        this.apiVersion = Hierarchy.apiVersion;
        this.kind = Hierarchy.kind;
        this.metadata = desc.metadata;
        this.spec = desc.spec;
    }
}
exports.Hierarchy = Hierarchy;
function isHierarchy(o) {
    return o && o.apiVersion === Hierarchy.apiVersion && o.kind === Team.kind;
}
exports.isHierarchy = isHierarchy;
(function (Hierarchy) {
    Hierarchy.apiVersion = 'bp.cft.dev/v1alpha1';
    Hierarchy.group = 'bp.cft.dev';
    Hierarchy.version = 'v1alpha1';
    Hierarchy.kind = 'Hierarchy';
    class Spec {
    }
    Hierarchy.Spec = Spec;
    (function (Spec) {
        class Item {
            constructor(desc) {
                this.groups = desc.groups;
                this.role = desc.role;
                this.users = desc.users;
            }
        }
        Spec.Item = Item;
    })(Spec = Hierarchy.Spec || (Hierarchy.Spec = {}));
})(Hierarchy = exports.Hierarchy || (exports.Hierarchy = {}));
// TeamList is a list of Team
class TeamList {
    constructor(desc) {
        this.apiVersion = TeamList.apiVersion;
        this.items = desc.items.map((i) => new Team(i));
        this.kind = TeamList.kind;
        this.metadata = desc.metadata;
    }
}
exports.TeamList = TeamList;
function isTeamList(o) {
    return o && o.apiVersion === TeamList.apiVersion && o.kind === TeamList.kind;
}
exports.isTeamList = isTeamList;
(function (TeamList) {
    TeamList.apiVersion = 'anthos.cft.dev/v1alpha1';
    TeamList.group = 'anthos.cft.dev';
    TeamList.version = 'v1alpha1';
    TeamList.kind = 'TeamList';
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    TeamList.Metadata = Metadata;
})(TeamList = exports.TeamList || (exports.TeamList = {}));
//# sourceMappingURL=dev.cft.bp.v1alpha1.js.map