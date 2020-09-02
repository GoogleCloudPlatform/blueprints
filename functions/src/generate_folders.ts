import {Configs, Result, KubernetesObject} from 'kpt-functions';
import {isResourceHierarchy, ResourceHierarchy} from './gen/dev.cft.v1alpha1';
import {FolderList} from './gen/com.google.cloud.cnrm.resourcemanager.v1beta1';
import {ObjectMeta} from 'kpt-functions/dist/src/gen/io.k8s.apimachinery.pkg.apis.meta.v1';

// Representation of a node in the hierarchy tree
interface HierarchyNode {
  children: HierarchyNode[];
  parent?: HierarchyNode;
  config?: KubernetesObject;
  name: string;
}

/**
 * Entrypoint for kpt function business logic. See `usage` field for more details.
 *
 * @param configs In-memory document store for Kubernetes objects
 */
export async function generateFolders(configs: Configs) {
  for (const hierarchy of configs.get(isResourceHierarchy)) {
    const layers: string[] = hierarchy.spec.layers;

    // Root node is the organization
    const root: HierarchyNode = {
      children: [],
      name: `${hierarchy.spec.organization}` // Annotation expects string type
    };

    // Represent results as a binary tree
    const errorResult = generateHierarchyTree(root, layers, 0, hierarchy, []);

    // Report any errors; create configs + delete ResourceHierarchy resource if
    // no errors reported.
    if (errorResult) {
      configs.addResults(errorResult);
    } else {
      insertConfigs(root, configs);

      // TODO(jcwc): We shouldn't need to delete the hierarchy config since it
      //   is tagged as a "local-config". Remove this line after Config Sync
      //   supports a mechanism for local config not synced to cluster.
      configs.delete(hierarchy);
    }
  }
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
function generateHierarchyTree(node: HierarchyNode, layers: string[], layerIndex: number,
  hierarchy: ResourceHierarchy, path: string[]): Result | null {

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

    const errorResult = generateHierarchyTree(child, layers, layerIndex + 1, hierarchy, [...path, folder]);

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
  const annotationName = parent.config == null ? 'cnrm.cloud.google.com/organization-id' : 'cnrm.cloud.google.com/folder-ref';
  // Parent name is the metadata name
  const parentName = path.length === 0 ? parent.name : path.join('-');

  const config = {
    apiVersion: FolderList.apiVersion,
    kind: "Folder",
    metadata: {
      // TODO(jcwc): This only works up to 253 char (k8s name limit). Figure out
      //   how to handle the edge cases beyond the character limit.
      name: [...path, name].join('-'),
      annotations: {
        [annotationName]: parentName
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


Declarative spec:

organization - The organization ID of your organization to generate folders in

layers - The in-order list of levels of your folder hierarchy. This will
         determine how many levels of folders there are in the hierarchy.

config - A map of layers to their respective list of folders. This will
         determine what folders are generated in which layers


Example configuration:

# hierarchy.yaml
# The config below will generate a folder structure of the following
#         [org: 123456789012]
#           [dev]    [prod]
# [retail, finance] [retail, finance]
apiVersion: cft.dev/v1alpha1
kind: ResourceHierarchy
metadata:
  annotations:
    config.k8s.io/function: |
      container:
        image: gcr.io/krm-blueprints/generate-folders:dev
    config.kubernetes.io/local-config: "true"
  name: root-hierarchy
spec:
  organization: 123456789012
  layers:
    - environments
    - teams
  config:
    environments:
    - dev
    - prod
    teams:
    - retail
    - finance
`;
