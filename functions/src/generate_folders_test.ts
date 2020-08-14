import { Configs, TestRunner, KubernetesObject } from 'kpt-functions';
import { generateFolders } from './generate_folders';
import { ResourceHierarchy } from './gen/dev.cft.v1alpha1';
import { FolderList } from './gen/com.google.cloud.cnrm.resourcemanager.v1beta1';

const RUNNER = new TestRunner(generateFolders);

describe('generateFolders', () => {
  it('generates folders from a single hierarchy', async () => {
    const hierarchy = new ResourceHierarchy({
      metadata: {
        name: "test-hierarchy"
      },
      spec: {
        environments: ['dev', 'prod'],
        teams: ['team1', 'team2']
      }
    });
    const input = new Configs([hierarchy]);

    const expectedOutput = new Configs([
      hierarchy,
      testFolder("dev-team1"),
      testFolder("dev-team2"),
      testFolder("prod-team1"),
      testFolder("prod-team2"),
    ]);

    await RUNNER.assert(input, expectedOutput);
  });
});

function testFolder(name: string): KubernetesObject {
  return {
    apiVersion: FolderList.apiVersion,
    kind: "Folder",
    metadata: {
      name
    }
  }
}