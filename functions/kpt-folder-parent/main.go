package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"hash/fnv"
	"os"
	"sort"
	"strconv"
	"strings"
	"text/template"

	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/kio/filters"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const annotation string = "cnrm.cloud.google.com/folder-ref"
const operableVersion string = "resourcemanager.cnrm.cloud.google.com/v1beta1"

var (
	operableKindSet         = map[string]bool{"Folder": true, "Project": true}
	parsedRoleTemplate      = template.Must(template.New("role-template").Parse(rbacRoleTemplate))
	parsedBindingTemplate   = template.Must(template.New("binding-template").Parse(rbacBindingTemplate))
	parsedFutureTemplate    = template.Must(template.New("future-obj").Parse(futureObjecTemplate))
	parsedReferenceTemplate = template.Must(template.New("fieldref-obj").Parse(fieldRefTemplate))
)

// TODO: update kyaml and use yaml.NameMeta
type namespacedName struct {
	Namespace string
	Name      string
}

func isOperableKind(kind string) bool {
	_, ok := operableKindSet[kind]
	return ok
}

func main() {
	resourceList := &framework.ResourceList{}
	cmd := framework.Command(resourceList, func() error {
		var refObjs []*yaml.RNode
		var rbacObjs []*yaml.RNode
		// Namespace: List(Operable Object Names)
		namespaceSet := make(map[string][]string)
		for i := range resourceList.Items {
			if !shouldRun(resourceList.Items[i]) {
				continue
			}

			// Build new fieldref
			generatedRef, err := fieldReference(resourceList.Items[i])
			if err != nil {
				return err
			}
			refObjs = append(refObjs, generatedRef)
			// Append this operable object's name to the namespace's list of objects.
			referentNamespace := mustNamespace(resourceList.Items[i])
			targetReference := mustParseAnnotation(resourceList.Items[i])
			if targetReference.Namespace != "" && targetReference.Namespace != referentNamespace {
				namespaceSet[targetReference.Namespace] = append(namespaceSet[targetReference.Namespace], targetReference.Name)
			}
			namespaceSet[referentNamespace] = append(namespaceSet[referentNamespace], mustName(resourceList.Items[i]))

			// Replace with a future
			future, err := wrapInCork(resourceList.Items[i])
			if err != nil {
				return err
			}
			resourceList.Items[i] = future
		}
		// add generated fieldrefs
		resourceList.Items = append(resourceList.Items, refObjs...)

		// Add RBAC objects
		rbacObjs, err := rbacObjects(namespaceSet)
		if err != nil {
			return err
		}
		resourceList.Items = append(resourceList.Items, rbacObjs...)

		// merge the new copies with the old copies of each resource
		resourceList.Items, err = filters.MergeFilter{}.Filter(resourceList.Items)
		if err != nil {
			return err
		}

		// apply formatting
		resourceList.Items, err = filters.FormatFilter{}.Filter(resourceList.Items)
		if err != nil {
			return err
		}

		return nil
	})

	if err := cmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}

// mustName will panic if the provided r doesn't have a metadata.name field. This assumes the object is already validated by shouldRun
func mustName(r *yaml.RNode) string {
	meta, err := r.GetMeta()
	if err != nil {
		panic(err)
	}
	return meta.Name
}

func mustNamespace(r *yaml.RNode) string {
	meta, err := r.GetMeta()
	if err != nil {
		panic(err)
	}
	return meta.ObjectMeta.Namespace
}

// mustParseAnnotation will panic if the provided r doesn't have the expected annotation in a parsable format
func mustParseAnnotation(r *yaml.RNode) namespacedName {
	meta, err := r.GetMeta()
	if err != nil {
		panic(err)
	}
	ps, ok := meta.Annotations[annotation]
	if !ok {
		panic(fmt.Errorf("missing %v annotation: %v", annotation, meta.Annotations))
	}
	return parseAnnotation(ps)
}

func rbacObjects(namespaces map[string][]string) ([]*yaml.RNode, error) {
	var rbacObj []*yaml.RNode
	for ns := range namespaces {
		fingerprint, err := uniqueFingerprint(namespaces[ns])
		if err != nil {
			return nil, fmt.Errorf("failed to hash object names in ns %v.\n%v", ns, err)
		}
		// Role
		buff := &bytes.Buffer{}
		if err := parsedRoleTemplate.Execute(buff, map[string]string{"namespace": ns, "fingerprint": fingerprint}); err != nil {
			return nil, fmt.Errorf("role template expansion error: %v", err)
		}
		s := buff.String()
		rbac, err := yaml.Parse(s)
		if err != nil {
			return nil, fmt.Errorf("yaml parsing of template error: %v.\nHydrated: %v", err, s)
		}
		rbacObj = append(rbacObj, rbac)
		// Binding
		buff.Reset()
		if err := parsedBindingTemplate.Execute(buff, map[string]string{"namespace": ns, "fingerprint": fingerprint}); err != nil {
			return nil, fmt.Errorf("roleBinding template expansion error: %v", err)
		}
		s = buff.String()
		binding, err := yaml.Parse(s)
		if err != nil {
			return nil, fmt.Errorf("yaml parsing of template error: %v.\nHydrated: %v", err, s)
		}
		rbacObj = append(rbacObj, binding)
	}
	return rbacObj, nil
}

// This generator should run IFF it's an operable kind & version with the right annotation.
func shouldRun(r *yaml.RNode) bool {
	meta, err := r.GetMeta()
	if err != nil {
		return false
	}
	if meta.APIVersion != operableVersion {
		return false
	}
	if !isOperableKind(meta.Kind) {
		return false
	}

	parent, err := r.Pipe(yaml.GetAnnotation(annotation))
	if err != nil {
		return false
	}
	return !yaml.IsEmpty(parent)
}

func fieldReference(r *yaml.RNode) (*yaml.RNode, error) {
	meta, err := r.GetMeta()
	if err != nil {
		return nil, err
	}
	workingNamespace := meta.ObjectMeta.Namespace
	referrerName := meta.ObjectMeta.Name
	namespacedParent := mustParseAnnotation(r)
	// Default to local working ns if one isn't specified in the annotation.
	if namespacedParent.Namespace == "" {
		namespacedParent.Namespace = workingNamespace
	}

	// Generate a unique name from referrer namespaced name and parent namespaced name
	// This is necessary to prevent otherwise same-named objects from colliding in k8s.
	uniqueRefName, err := referenceNamer(referrerName, workingNamespace, namespacedParent.Name, namespacedParent.Namespace)
	if err != nil {
		return nil, err
	}

	buff := &bytes.Buffer{}
	if err := parsedReferenceTemplate.Execute(buff, map[string]string{"hashName": uniqueRefName, "namespace": workingNamespace, "parentN": namespacedParent.Name, "parentNS": namespacedParent.Namespace}); err != nil {
		return nil, err
	}
	return yaml.Parse(buff.String())
}

func wrapInCork(r *yaml.RNode) (*yaml.RNode, error) {
	meta, err := r.GetMeta()
	if err != nil {
		return nil, fmt.Errorf("unable to parse metadata: %v", err)
	}
	ns := meta.ObjectMeta.Namespace
	folderName := meta.ObjectMeta.Name

	namespacedParent := mustParseAnnotation(r)
	// Default to ns of referring child object if one isn't specified in the annotation.
	if namespacedParent.Namespace == "" {
		namespacedParent.Namespace = ns
	}

	// Set folder parent to cork var "${folder-name}"
	// NOTE: this variable must match the name in the spec.variables of the template below
	err = r.PipeE(yaml.Lookup("metadata", "annotations"), yaml.SetField("cnrm.cloud.google.com/folder-id", yaml.NewScalarRNode("${folder-name}")))
	if err != nil {
		return nil, fmt.Errorf("failed to add folder-id annotation: %v", err)
	}

	// Generate a unique name from referrer namespaced name and parent namespaced name
	uniqueRefName, err := referenceNamer(folderName, ns, namespacedParent.Name, namespacedParent.Namespace)
	if err != nil {
		return nil, err
	}

	templateContext := map[string]string{"name": folderName, "namespace": ns, "hashName": uniqueRefName}
	buff := &bytes.Buffer{}

	if err := parsedFutureTemplate.Execute(buff, templateContext); err != nil {
		return nil, fmt.Errorf("future template expansion error: %v", err)
	}
	s := buff.String()
	futureNode, err := yaml.Parse(s)
	if err != nil {
		return nil, fmt.Errorf("yaml parsing of template error: %v.\nHydrated: %v", err, s)
	}

	// copy this Folder krm, r, to the future nested object
	err = futureNode.PipeE(
		yaml.LookupCreate(yaml.MappingNode, "spec"),
		yaml.SetField("object", r))

	if err != nil {
		return nil, fmt.Errorf("nesting folder in future error: %v", err)
	}

	return futureNode, nil
}

func parseAnnotation(annotation string) namespacedName {
	var ref namespacedName
	e := json.Unmarshal([]byte(annotation), &ref)
	if e != nil {
		// For backwards compat, assume any non-parseable annotations are simply a name alone
		return namespacedName{Name: annotation}
	}
	return ref
}

// referenceNamer makes a deterministic unique (hopefully) hash from parent/child namespaced names
func referenceNamer(childName string, childNS string, parentName string, parentNS string) (string, error) {
	return uniqueFingerprint([]string{strings.Join([]string{childName, childNS, parentName, parentNS}, "_")})
}

// uniqueFingerprint hashes an unordered list of names to return a deterministic base36 value.
func uniqueFingerprint(nameList []string) (string, error) {
	sort.Strings(nameList)
	h := fnv.New32a()
	_, e := h.Write([]byte(strings.Join(nameList, "_")))
	if e != nil {
		return "", e
	}
	i := h.Sum32()
	s := strconv.FormatInt(int64(i), 36)
	return s, nil
}

var futureObjecTemplate = `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FutureObject
metadata:
  name: {{ .name }}-future
  namespace: {{ .namespace }}
spec:
  object: {}
  configMapRef:
    name: {{ .hashName }}-ref-cm
  variables:
  - name: folder-name
    type: string`

var fieldRefTemplate = `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FieldReference
metadata:
  name: {{ .hashName }}-ref
  namespace: {{ .namespace }}
spec:
  configMapRef:
    name: {{ .hashName }}-ref-cm
    key: folder-name
  jsonPath: "{$.status.name}"
  mutators:
  - name: substring
    settings:
      start: "8" # trim the 'folders/' prefix.
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Folder
    name: {{ .parentN }}
    namespace: {{ .parentNS }}`

var rbacBindingTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: folder-ref-binding-{{ .fingerprint }}
  namespace: {{ .namespace }}
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: folder-ref-role-{{ .fingerprint }}
subjects:
- kind: ServiceAccount
  name: default
  namespace: orchestrator-system`

var rbacRoleTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: folder-ref-role-{{ .fingerprint }}
  namespace: {{ .namespace }}
rules:
- apiGroups:
  - resourcemanager.cnrm.cloud.google.com
  resources:
  - folders
  - projects
  verbs:
  - get
  - list
  - watch
  - create
  - update`
