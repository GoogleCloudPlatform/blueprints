import {Configs, TestRunner, KubernetesObject, isKubernetesObject} from 'kpt-functions';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import * as path from 'path';
import {generateFolders, missingSubtreeErrorResult, badParentErrorResult} from './generate_folders';
import {FolderList, Folder} from './gen/com.google.cloud.cnrm.resourcemanager.v1beta1';

const RUNNER = new TestRunner(generateFolders);

function readTestFile(name: string): KubernetesObject {
  const sourceDir = path.resolve(__dirname, '../examples');
  const sourceFile = path.join(sourceDir, `${name}.yaml`);

  const contents = load(readFileSync(sourceFile, 'utf8'));

  if (!isKubernetesObject(contents)) {
    throw new Error(`Failed to read file ${sourceFile}`);
  }

  return <KubernetesObject>contents;
}

describe('generateFolders', () => {
  const tests =[
    {
      file: 'simple_v1',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']]
      ]
    },
    {
      file: 'simple_v2',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        ['Foo', ['bar']] 
      ]
    },
    {
      file: 'nested_v2',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        'shallow',
        ['nested', [['very', ['nested']]]]
      ]
    },
    {
      file: 'subtree_v2',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        ['services', [['core', ['apps', 'networking']], ['extra', ['devops']]]]
      ]
    },
    {
      file: 'deep_subtree_v2',
      expected: [
        ['prod', [['subtree', [['nested', ['very']]]]]],
        ['dev', [['subtree', [['nested', ['very']]]]]]
      ]
    },
    {
      file: 'missing_org',
      expected: [],
      errors: [badParentErrorResult]
    },
    {
      file: 'missing_subtree',
      expected: [],
      errors: [(o: KubernetesObject) => missingSubtreeErrorResult("taems", o)]
    },
  ];

  for (const test of tests) {
    it((test.errors != undefined && test.errors.length > 0) ?
      `yields errors from ${test.file}` :
      `generates folders from ${test.file}`, async () => {
      const hierarchy = readTestFile(test.file);
      const input = new Configs([hierarchy]);
      const expectedStructure = test.expected;

      const errorResults = (test.errors || []).map((errorFunction) => errorFunction(hierarchy));

      const expectedOutput = new Configs([
        hierarchy,
        ...getHierarchyConfig(expectedStructure, [], 'test-organization')
      ], undefined, errorResults);

      await RUNNER.assert(input, expectedOutput);
    });
  }
});

/**
 * Generates the corresponding config array of the expected output given an array representation
 *
 * @param children array containing a representation of the folder structure
 * @param organization The name of the expected organization
 */
function getHierarchyConfig(children: any[], parents: string[], organization: string): KubernetesObject[] {
  let res: Folder[] = [];
  for (const child of children) {
    if (Array.isArray(child)) {
      const name = child[0];
      res.push(makeFolder(name, parents, organization));
      const childTree = getHierarchyConfig(child[1], [...parents, name], organization);
      res = res.concat(childTree);
    } else if (typeof child == 'string') {
      res.push(makeFolder(child, parents, organization));
    }
  }
  return res as KubernetesObject[];
}

/**
 * Generates a Folder object given a name and ancestry
 *
 * @param name The display name for the expected folder
 * @param path The ancestry path of folders above this folder
 * @param organization The name of the expected organization
 */
function makeFolder(name: string, path: string[], organization: string): Folder {
  const isRoot = path.length === 0;
  const annotationName = isRoot ? 'cnrm.cloud.google.com/organization-id' : 'cnrm.cloud.google.com/folder-ref';

  return {
    apiVersion: FolderList.apiVersion,
    kind: "Folder",
    metadata: {
      name: normalize([...path, name].join('.')),
      annotations: {
        [annotationName]: isRoot ? organization : normalize(path.join('.'))
      }
    },
    spec: {
      displayName: name
    }
  };
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
