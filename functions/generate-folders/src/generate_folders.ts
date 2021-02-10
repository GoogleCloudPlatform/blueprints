import {Configs, Result, KubernetesObject, kubernetesObjectResult} from 'kpt-functions';
import {isResourceHierarchy, ResourceHierarchy} from './gen/dev.cft.v1alpha2';
import {isResourceHierarchy as isV1ResourceHierarchy, ResourceHierarchy as V1ResourceHierarchy} from './gen/dev.cft.v1alpha1';
import {FolderList} from './gen/com.google.cloud.cnrm.resourcemanager.v1beta1';
import {ObjectMeta} from 'kpt-functions/dist/src/gen/io.k8s.apimachinery.pkg.apis.meta.v1';

// Representation of a node in the hierarchy tree
interface HierarchyNode {
  children: HierarchyNode[];
  parent?: HierarchyNode;
  config?: KubernetesObject;
  kind?: string;
  name: string;
}

/**
 * Entrypoint for kpt function business logic. See `usage` field for more details.
 *
 * @param configs In-memory document store for Kubernetes objects
 */
export async function generateFolders(configs: Configs) {
  configs.get(isV1ResourceHierarchy).forEach((hierarchy) => {
    const layers: string[] = hierarchy.spec.layers;

    // Root node is the organization
    const root: HierarchyNode = {
      children: [],
      kind: "Organization",
      name: `${hierarchy.spec.organization}` // Annotation expects string type
    };

    // Represent results as a binary tree
    const errorResult = generateV1HierarchyTree(root, layers, 0, hierarchy, []);

    // Report any errors; create configs + delete ResourceHierarchy resource if
    // no errors reported.
    if (errorResult) {
      configs.addResults(errorResult);
    } else {
      insertConfigs(root, configs);
    }
  });
  configs.get(isResourceHierarchy).forEach((hierarchy) => {
    if (hierarchy.spec.parentRef === undefined || hierarchy.spec.parentRef.external === undefined) {
      configs.addResults(badParentErrorResult(hierarchy));
      return;
    }
    try {
      generateV2HierarchyTree(hierarchy, configs);
    } catch(e) {
      if (e instanceof MissingSubteeError) {
        configs.addResults(missingSubtreeErrorResult(e.message, hierarchy));
      } else{
        throw e;
      }
    }
  });
}

/**
 * Generate an error for a hierarchy with an undefined parentRef
 * @param hierarchy The hierarchy to yield an error for
 */
export function badParentErrorResult(hierarchy: KubernetesObject): Result {
  return kubernetesObjectResult(
    `ResourceHierarchy ${hierarchy.metadata.name} has an undefined parentRef`,
    hierarchy,
    undefined,
    "error"
  );
}

/**
 * Generate an error for a hierarchy with a missing subtree
 * @param hierarchy The hierarchy to yield a missing subtree
 */
export function missingSubtreeErrorResult(subtree: string, hierarchy: KubernetesObject): Result {
  return kubernetesObjectResult(
    `ResourceHierarchy ${hierarchy.metadata.name} references non-existent subtree "${subtree}"`,
    hierarchy,
    undefined,
    "error"
  );
}

class MissingSubteeError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = MissingSubteeError.name;
    }
}

/**
 * Creates a representation of the resulting folder hierarchy from the
 * ResourceHierarchy object in a tree data structure. Each node contains the
 * corresponding config to generate.
 *
 * @param hierarchy The ResourceHierarchy to generate configs for
 * @param configs The Config list to insert folders into
 */
function generateV2HierarchyTree(hierarchy: ResourceHierarchy, configs: Configs): Result | null {
  const root: HierarchyNode = {
    children: [],
    kind: "Organization",
    name: `${hierarchy.spec.parentRef.external}` // Annotation expects string type
  };
  const namespace = hierarchy.metadata.namespace;

  var subtrees : { [key:string]:HierarchyNode; } = {};

  if (hierarchy.spec.subtrees !== undefined) {
    for (const name in hierarchy.spec.subtrees) {
      const node: HierarchyNode = {
        children: [],
        kind: "Subtree",
        name: name
      };
      const children = hierarchy.spec.subtrees[name];
      const subtree = generateTree(node, <any[]>children, subtrees);
      node.children = subtree.children;
      subtrees[name] = node;
    }
  }

  const tree = generateTree(root, hierarchy.spec.config, subtrees);

  const generateConfigs = (node: HierarchyNode, path: Array<string>) => {
    for (const child of node.children) {
      configs.insert(generateManifest(child.name, path, node, namespace));
      generateConfigs(child, [...path, child.name]);
    }
  }

  generateConfigs(tree, []);
  return null;
}

/**
 * Add a child into the parent
 *
 * @param parent The parent node to attach the child to
 * @param child The child to append
 * @param subtrees A map of subtrees which can be referenced
 */
function addChild(parent: HierarchyNode, child: any, subtrees: { [key:string]:HierarchyNode; }) {
  if (child === null) {
    return
  }
  if (typeof child === 'string') {
    parent.children.push({
      name: child,
      children: []
    });
    return;
  }
  if (typeof child === 'object') {
    const name = Object.keys(child)[0];
    const node: HierarchyNode = {
      name: name,
      children: []
    };
    const children = child[name];
    if (Array.isArray(children)) {
      generateTree(node, children, subtrees);
    } else if (typeof children === 'object') {
      const subtree = children["$subtree"];
      if (subtrees[subtree] === undefined) {
        throw new MissingSubteeError(subtree);
      }
      node.children = subtrees[subtree].children;
    }
    parent.children.push(node);
  }
}

/**
 * Generate a folder tree
 *
 * @param root The root node to build the tree from
 * @param children Top-level children to attach on the root
 * @param subtrees A map of subtrees which can be referenced
 */
function generateTree(root: HierarchyNode, children: Array<any>, subtrees: { [key:string]:HierarchyNode; }): HierarchyNode {
  for (const child of children) {
    addChild(root, child, subtrees);
  }
  return root;
}

/**
 * Creates a representation of the resulting folder hierarchy from the
 * ResourceHierarchy object in a tree data structure. Each node contains the
 * corresponding config to generate.
 *
 * @param node The root node of the tree to generate. This is the organization.
 * @param layers The list of names of layers to create (levels of the tree).
 * @param layerIndex The index of which layer to process. Used for recursion.
 * @param hierarchy The object representing the ResourceHierarchy custom resource.
 * @param path The name of folders preceeding the current layer. Used to
 *  generate the unique name of the k8s resource.
 */
function generateV1HierarchyTree(node: HierarchyNode, layers: string[], layerIndex: number,
  hierarchy: V1ResourceHierarchy, path: string[]): Result | null {

  if (layerIndex >= layers.length) {
    return null;
  }

  const layer = layers[layerIndex];
  const folders = hierarchy.spec.config[layer];

  // No layer config entry
  if (folders == null) {
    return {
      severity: 'error',
      message: `Layer "${layer}" has no corresponding entry config entry. Either
      add to spec.config.${layer} or remove it from spec.layers
      `,
    };
  }

  for (const folder of folders) {
    const child = {
      name: folder,
      children: [],
      parent: node,
      config: generateManifest(folder, path, node, hierarchy.metadata.namespace)
    };

    const errorResult = generateV1HierarchyTree(child, layers, layerIndex + 1, hierarchy, [...path, folder]);

    if (errorResult) {
      return errorResult;
    }

    node.children.push(child);
  }

  return null;
}

/**
 * Crafts a k8s manifest based on the input data and node info.
 *
 * @param name The name of the folder
 * @param path A list of names of the ancestors of the current folder. Used to
 *             generate k8s resource name.
 * @param parent The parent node of the current folder.
 * @param namespace Namespace to generate the resource in.
 */
function generateManifest(name: string, path: string[], parent: HierarchyNode, namespace?: string): KubernetesObject {
  const annotationName = parent.kind == "Organization" ? 'cnrm.cloud.google.com/organization-id' : 'cnrm.cloud.google.com/folder-ref';
  // Parent name is the metadata name
  const parentName = path.join('.') || parent.name;

  const config = {
    apiVersion: FolderList.apiVersion,
    kind: "Folder",
    metadata: {
      // TODO(jcwc): This only works up to 253 char (k8s name limit). Figure out
      //   how to handle the edge cases beyond the character limit.
      name: normalize([...path, name].join('.')),
      annotations: {
        [annotationName]: normalize(parentName)
      },
    } as ObjectMeta,
    spec: {
      displayName: name
    }
  };

  // Add namespace if provided
  if (namespace != null) {
    config.metadata.namespace = namespace;
  }

  return config;
}

/**
 * Normalizes name to fit the K8s DNS subdomain naming requirements
 *
 * @param name Non-normalized name
 */
export function normalize(name: string) {
  name = name.replace(/['"]/g, "");
  name = name.replace(/[_ ]/g, "-");
  name = name.replace(/[^a-z0-9 -]/g, '')
  name = name.toLowerCase();
  return name;
}

/**
 * Iterates through the tree of configs and inserts them into the output config
 * result.
 *
 * @param root The root node of the tree
 * @param configs In-memory document store for Kubernetes objects
 */
function insertConfigs(root: HierarchyNode, configs: Configs): void {
  if (root == null) return;

  if (root.config != null) {
    configs.insert(root.config);
  }

  for (const child of root.children) {
    insertConfigs(child, configs);
  }
}

generateFolders.usage = `
This function translates the "ResourceHierarchy" custom resource and transforms
it to the resulting "Folder" custom resources constituting the hierarchy. Post
translation, it'll be necessary to use the "kpt-folder-parent" function to
translate the results into Cork configs.

Example configuration:

# hierarchy.yaml
# The config below will generate a folder structure of the following
#         [org: 123456789012]
#           [dev]    [prod]
# [retail, finance] [retail, finance]
apiVersion: cft.dev/v1alpha2
kind: ResourceHierarchy
metadata:
  annotations:
    config.k8s.io/function: |
      container:
        image: gcr.io/krm-blueprints/generate-folders:dev
    config.kubernetes.io/local-config: "true"
  name: root-hierarchy
spec:
  parentRef:
    type: Organization
    external: 123456789012
  config:
    - dev:
      - retail
      - finance
    - prod:
      - retail
      - finance
`;
