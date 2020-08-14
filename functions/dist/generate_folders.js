"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFolders = void 0;
const dev_cft_v1alpha1_1 = require("./gen/dev.cft.v1alpha1");
const com_google_cloud_cnrm_resourcemanager_v1beta1_1 = require("./gen/com.google.cloud.cnrm.resourcemanager.v1beta1");
function generateFolders(configs) {
    return __awaiter(this, void 0, void 0, function* () {
        configs.get(dev_cft_v1alpha1_1.isResourceHierarchy).forEach((hierarchy) => {
            hierarchy.spec.environments.forEach((env) => {
                hierarchy.spec.teams.forEach((team) => {
                    // TODO: use Function type once CNRM types are generated properly.
                    configs.insert({
                        apiVersion: com_google_cloud_cnrm_resourcemanager_v1beta1_1.FolderList.apiVersion,
                        kind: "Folder",
                        metadata: {
                            name: `${env}-${team}`
                        }
                    });
                });
            });
        });
    });
}
exports.generateFolders = generateFolders;
generateFolders.usage = `
TODO: Describe what the function does.

TODO: Describe how to configure the function.

TODO: Provide an example configuration.
`;
//# sourceMappingURL=generate_folders.js.map