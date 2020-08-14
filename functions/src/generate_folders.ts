import { Configs } from 'kpt-functions';
import { isResourceHierarchy } from './gen/dev.cft.v1alpha1';
import { FolderList } from './gen/com.google.cloud.cnrm.resourcemanager.v1beta1';

export async function generateFolders(configs: Configs) {
  configs.get(isResourceHierarchy).forEach((hierarchy) => {
    hierarchy.spec.environments.forEach((env) => {
      hierarchy.spec.teams.forEach((team) => {
        // TODO: use Function type once CNRM types are generated properly.
        configs.insert({
          apiVersion: FolderList.apiVersion,
          kind: "Folder",
          metadata: {
            name: `${env}-${team}`
          }
        });
      })
    });
  });
}

generateFolders.usage = `
TODO: Describe what the function does.

TODO: Describe how to configure the function.

TODO: Provide an example configuration.
`;
