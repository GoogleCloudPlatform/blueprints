import {Configs, TestRunner, KubernetesObject} from 'kpt-functions';
import {generateFolders} from './generate_folders';
import {ResourceHierarchy} from './gen/dev.cft.v1alpha1';
import {FolderList, Folder} from './gen/com.google.cloud.cnrm.resourcemanager.v1beta1';

const RUNNER = new TestRunner(generateFolders);

describe('generateFolders', () => {
  it('generates folders from a single hierarchy', async () => {
    const hierarchy = new ResourceHierarchy({
      metadata: {
        name: "test-hierarchy"
      },
      spec: {
        organization: "test-organization",
        layers: ['environments', 'teams'],
        config: {
          environments: ['Dev', 'Prod'],
          teams: ['Team "One"', 'Team_2']
        }
      }
    });

    const input = new Configs([hierarchy]);
    const expectedStructure = [
      ['Dev', 'Prod'],
      ['Team "One"', 'Team_2', 'Team "One"', 'Team_2']
    ];

    const expectedOutput = new Configs([
      hierarchy,
      ...getHierarchyConfig(expectedStructure, 0, [], 'test-organization')
    ]);

    await RUNNER.assert(input, expectedOutput);
  });

  // TODO(jcwc): Add more test coverage
});

/**
 * Generates the corresponding config array of the expected output given a 2D array representation
 *
 * @param folders 2D array containing a representation of the folder structure
 * @param index The index of the first dimension of the folders 2D array. Used for recursion.
 * @param path The name of folders preceeding the current layer. Used to generate the expected name of the k8s resource.
 * @param organization The name of the expected organization
 */
function getHierarchyConfig(folders: string[][], index: number, path: string[], organization: string): KubernetesObject[] {
  if (index >= folders.length) {
    return [];
  }

  let res: Folder[] = [];
  const annotationName = index === 0 ? 'cnrm.cloud.google.com/organization-id' : 'cnrm.cloud.google.com/folder-ref';

  for (const folder of folders[index]) {
    res.push({
      apiVersion: FolderList.apiVersion,
      kind: "Folder",
      metadata: {
        name: normalize([...path, folder].join('.')),
        annotations: {
          [annotationName]: index === 0 ? organization : path.join('.')
        }
      },
      spec: {
        displayName: folder
      }
    });

    res = [
      ...res,
      ...getHierarchyConfig(folders, index + 1, [...path, folder], organization),
    ];
  }

  return res as KubernetesObject[];
}

/**
 * Normalizes name to fit the K8s DNS subdomain naming requirements
 *
 * @param name Non-normalized name
 */
function normalize(name: string) {
  name = name.replace(/['"]/g, "");
  name = name.replace(/[_ ]/g, "-");
  name = name.toLowerCase();
  return name;
}
