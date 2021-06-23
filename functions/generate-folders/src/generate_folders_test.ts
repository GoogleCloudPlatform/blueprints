import { Configs, Result, TestRunner, KubernetesObject, isKubernetesObject } from 'kpt-functions';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import * as path from 'path';
import { isResourceHierarchy as isV3ResourceHierarchy } from './gen/com.google.cloud.blueprints.v1alpha3';
import { isResourceHierarchy as isV2ResourceHierarchy } from './gen/dev.cft.v1alpha2';
import { isResourceHierarchy as isV1ResourceHierarchy } from './gen/dev.cft.v1alpha1';
import { generateFolders, missingSubtreeErrorResult, badParentErrorResult, badParentKindErrorResult, oldHierarchyWarning, normalize, Annotations } from './generate_folders';
import { FolderList, Folder } from './gen/com.google.cloud.cnrm.resourcemanager.v1beta1';

const RUNNER = new TestRunner(generateFolders);

function readTestFile(name: string): KubernetesObject {
  const sourceDir = path.resolve(__dirname, '../examples');
  const sourceFile = path.join(sourceDir, `${name}.yaml`);

  const contents = load(readFileSync(sourceFile, 'utf8'));

  if (!isKubernetesObject(contents)) {
    throw new Error(`Failed to read file ${sourceFile}`);
  }

  return contents as KubernetesObject;
}

describe('normalize', () => {
  const tests = new Map([
    ['test', 'test'],
    ['test spaced', 'test-spaced'],
    ['test: spaced colon', 'test-spaced-colon'],
    ['test:colon', 'testcolon'],
    ['Environ Set.Environ.Team', 'environ-set.environ.team'],
  ]);
  for (const [original, normalized] of tests) {
    it(`converts ${original} to ${normalized}`, () => {
      expect(normalize(original)).toEqual(normalized);
    });
  }
});

interface HierarchyNode {
  length: 2;
  readonly 0: string;    // Name of the folder
  readonly 1: Hierarchy; // Nested folders
}
interface Hierarchy extends Array<string | HierarchyNode> { }

type ErrorFn = (hierarchy: KubernetesObject) => Result;

interface TestCase {
  file: string;
  expected: Hierarchy;
  parent?: { folder: string };
  annotations?: Annotations;
  errors?: ErrorFn[];
}

describe('generateFolders', () => {
  const tests: TestCase[] = [
    {
      file: 'simple_v1',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
      ],
    },
    {
      file: 'simple_v2',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        ['Foo', ['bar']],
      ],
    },
    {
      file: 'simple_v3',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        ['Foo', ['bar']],
      ],
    },
    {
      file: 'simple_v2_folder_parent',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        ['Foo', ['bar']],
      ],
      parent: { folder: '123' },
    },
    {
      file: 'simple_v3_folder_parent',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        ['Foo', ['bar']],
      ],
      parent: { folder: '123' },
    },
    {
      file: 'nested_v2',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        'shallow',
        ['nested', [['very', ['nested']]]],
      ],
    }, {
      file: 'nested_v3',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        'shallow',
        ['nested', [['very', ['nested']]]],
      ],
    },
    {
      file: 'subtree_v2',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        ['services', [['core', ['apps', 'networking']], ['extra', ['devops']]]],
      ],
    },
    {
      file: 'subtree_v3',
      expected: [
        ['Dev', ['Team "One"', 'Team_2']],
        ['Prod', ['Team "One"', 'Team_2']],
        ['services', [['core', ['apps', 'networking']], ['extra', ['devops']]]],
      ],
    },
    {
      file: 'deep_subtree_v2',
      expected: [
        ['prod', [['subtree', [['nested', ['very']]]]]],
        ['dev', [['subtree', [['nested', ['very']]]]]],
      ],
    },
    {
      file: 'deep_subtree_v3',
      expected: [
        ['prod', [['subtree', [['nested', ['very']]]]]],
        ['dev', [['subtree', [['nested', ['very']]]]]],
      ],
    },
    {
      file: 'deep_subtree_v2_no_kind',
      expected: [
        ['prod', [['subtree', [['nested', ['very']]]]]],
        ['dev', [['subtree', [['nested', ['very']]]]]],
      ],
    },
    {
      file: 'deep_subtree_v3_no_kind',
      expected: [
        ['prod', [['subtree', [['nested', ['very']]]]]],
        ['dev', [['subtree', [['nested', ['very']]]]]],
      ],
    },
    {
      file: 'missing_org',
      expected: [],
      errors: [badParentErrorResult],
    },
    {
      file: 'missing_subtree',
      expected: [],
      errors: [(o: KubernetesObject) => missingSubtreeErrorResult("taems", o)],
    },
    {
      file: 'wrong_parent_kind',
      expected: [],
      errors: [badParentKindErrorResult],
    },
    {
      file: 'annotations_v1',
      expected: [
        ['Dev', ['One', 'Two']],
      ],
    },
    {
      file: 'annotations_v2',
      expected: ['Dev', 'Prod', 'Test'],
      annotations: {
        'cnrm.cloud.google.com/deletion-policy': 'abandon',
      },
    },
    {
      file: 'annotations_v3',
      expected: ['Dev', 'Prod', 'Test'],
      annotations: {
        'cnrm.cloud.google.com/deletion-policy': 'abandon',
      },
    },
    {
      file: 'annotations_v3_none',
      expected: ['Dev', 'Prod'],
      annotations: {},
    },
    {
      file: 'annotations_v3_inherit_all',
      expected: ['Dev', 'Prod'],
      annotations: {
        'another-annotation': 'will-be-inherited',
        'cnrm.cloud.google.com/deletion-policy': 'abandon',
        'one-more-annotation': 'folders-will-inherit-too',
      },
    },
    {
      file: 'annotations_v3_internal',
      expected: ['Dev', 'Prod'],
      annotations: {},
    },
  ];

  for (const test of tests) {
    it((test.errors !== undefined && test.errors.length > 0) ?
      `yields errors from ${test.file}` :
      `generates folders from ${test.file}`, async () => {
        const hierarchy = readTestFile(test.file);
        const input = new Configs([hierarchy]);
        const expectedStructure = test.expected;

        const errorResults = (test.errors || []).map((errorFunction) => errorFunction(hierarchy));

        const warnings = isV2ResourceHierarchy(hierarchy) || isV1ResourceHierarchy(hierarchy) ? [oldHierarchyWarning(hierarchy)] : [];

        const parentType = test.parent?.folder ? "Folder" : "Organization";
        const parentRef = test.parent?.folder ? test.parent.folder : "test-organization";
        const annotations: Annotations = test.annotations || {};

        const expectedOutput = new Configs([
          hierarchy,
          ...getHierarchyConfig(expectedStructure, [], parentRef, parentType, annotations, isV3ResourceHierarchy(hierarchy)),
        ], undefined, [...warnings, ...errorResults]);
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
function getHierarchyConfig(children: Hierarchy, parents: string[], rootRef: string, rootType: string, annotations: Annotations, nativeRef = false): KubernetesObject[] {
  let res: Folder[] = [];
  for (const child of children) {
    if (Array.isArray(child)) {
      const name = child[0];
      res.push(makeFolder(name, parents, rootRef, rootType, annotations, nativeRef));
      const childTree = getHierarchyConfig(child[1], [...parents, name], rootRef, rootType, annotations, nativeRef);
      res = res.concat(childTree);
    } else if (typeof child === 'string') {
      res.push(makeFolder(child, parents, rootRef, rootType, annotations, nativeRef));
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
function makeFolder(name: string, path: string[], rootRef: string, rootType: string, annotations: Annotations, nativeRef = false): Folder {
  const isRoot = path.length === 0;
  let annotationRef: Annotations = {};
  // Parent Ref
  let ref = {};
  if (nativeRef) {
    const parent = isRoot ? rootRef : normalize(path.join('.'));
    // root node has no parent and both org/folder ref is external
    if (isRoot) {
      ref = rootType === "Organization" ? { organizationRef: { external: parent } } : { folderRef: { external: parent } };
    }
    else {
      ref = { folderRef: { name: parent } };
    }
  } else {
    const annotationName = isRoot && rootType === "Organization" ? 'cnrm.cloud.google.com/organization-id' : 'cnrm.cloud.google.com/folder-ref';
    annotationRef = { [annotationName]: isRoot ? rootRef : normalize(path.join('.')) };
  }

  let combinedAnnotations = {};
  if (Object.keys(annotations).length > 0 || Object.keys(annotationRef).length > 0) {
    combinedAnnotations = { annotations: { ...annotations, ...annotationRef } };
  }

  return {
    apiVersion: FolderList.apiVersion,
    kind: "Folder",
    metadata: {
      name: normalize([...path, name].join('.')),
      ...combinedAnnotations,
    },
    spec: {
      displayName: name,
      ...ref,
    },
  };
}
