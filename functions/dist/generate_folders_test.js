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
const kpt_functions_1 = require("kpt-functions");
const generate_folders_1 = require("./generate_folders");
const dev_cft_v1alpha1_1 = require("./gen/dev.cft.v1alpha1");
const com_google_cloud_cnrm_resourcemanager_v1beta1_1 = require("./gen/com.google.cloud.cnrm.resourcemanager.v1beta1");
const RUNNER = new kpt_functions_1.TestRunner(generate_folders_1.generateFolders);
describe('generateFolders', () => {
    it('generates folders from a single hierarchy', () => __awaiter(void 0, void 0, void 0, function* () {
        const hierarchy = new dev_cft_v1alpha1_1.ResourceHierarchy({
            metadata: {
                name: "test-hierarchy"
            },
            spec: {
                environments: ['dev', 'prod'],
                teams: ['team1', 'team2']
            }
        });
        const input = new kpt_functions_1.Configs([hierarchy]);
        const expectedOutput = new kpt_functions_1.Configs([
            hierarchy,
            testFolder("dev-team1"),
            testFolder("dev-team2"),
            testFolder("prod-team1"),
            testFolder("prod-team2"),
        ]);
        yield RUNNER.assert(input, expectedOutput);
    }));
});
function testFolder(name) {
    return {
        apiVersion: com_google_cloud_cnrm_resourcemanager_v1beta1_1.FolderList.apiVersion,
        kind: "Folder",
        metadata: {
            name
        }
    };
}
//# sourceMappingURL=generate_folders_test.js.map