package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
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
		namespaceSet := make(map[string]bool)
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
			namespaceSet[namespace(resourceList.Items[i])] = true

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

func namespace(r *yaml.RNode) string {
	meta, err := r.GetMeta()
	if err != nil {
		return ""
	}
	return meta.ObjectMeta.Namespace
}

func rbacObjects(namespaces map[string]bool) ([]*yaml.RNode, error) {
	var rbacObj []*yaml.RNode
	for ns := range namespaces {
		// Role
		buff := &bytes.Buffer{}
		if err := parsedRoleTemplate.Execute(buff, map[string]string{"namespace": ns}); err != nil {
			return nil, fmt.Errorf("Role template expansion error: %v", err)
		}
		s := buff.String()
		rbac, err := yaml.Parse(s)
		if err != nil {
			return nil, fmt.Errorf("Yaml parsing of template error: %v.\nHydrated: %v", err, s)
		}
		rbacObj = append(rbacObj, rbac)
		// Binding
		buff.Reset()
		if err := parsedBindingTemplate.Execute(buff, map[string]string{"namespace": ns}); err != nil {
			return nil, fmt.Errorf("RoleBinding template expansion error: %v", err)
		}
		s = buff.String()
		binding, err := yaml.Parse(s)
		if err != nil {
			return nil, fmt.Errorf("Yaml parsing of template error: %v.\nHydrated: %v", err, s)
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

// TODO: for now this means every child obj will create a field ref, even if they have parents in common. So there may be duplicate fieldrefs.
func fieldReference(r *yaml.RNode) (*yaml.RNode, error) {
	meta, err := r.GetMeta()
	if err != nil {
		return nil, err
	}
	workingNamespace := meta.ObjectMeta.Namespace
	ps, ok := meta.Annotations[annotation]
	if !ok {
		return nil, fmt.Errorf("Missing %v annotation: %v", annotation, meta.Annotations)
	}
	namespacedParent := parseAnnotation(ps)
	// Default to local working ns if one isn't specified in the annotation.
	if namespacedParent.Namespace == "" {
		namespacedParent.Namespace = workingNamespace
	}

	buff := &bytes.Buffer{}
	if err := parsedReferenceTemplate.Execute(buff, map[string]string{"namespace": workingNamespace, "parentN": namespacedParent.Name, "parentNS": namespacedParent.Namespace}); err != nil {
		return nil, err
	}
	return yaml.Parse(buff.String())
}

func wrapInCork(r *yaml.RNode) (*yaml.RNode, error) {
	meta, err := r.GetMeta()
	if err != nil {
		return nil, fmt.Errorf("Unable to parse metadata: %v", err)
	}
	ns := meta.ObjectMeta.Namespace
	folderName := meta.ObjectMeta.Name

	ps, ok := meta.Annotations[annotation]
	if !ok {
		return nil, fmt.Errorf("Missing %v annotation: %v", annotation, meta.Annotations)
	}
	namespacedParent := parseAnnotation(ps)

	// Set folder parent to cork var "${folder-name}"
	// NOTE: this variable must match the name in the spec.variables of the template below
	err = r.PipeE(yaml.Lookup("metadata", "annotations"), yaml.SetField("cnrm.cloud.google.com/folder-id", yaml.NewScalarRNode("${folder-name}")))
	if err != nil {
		return nil, fmt.Errorf("Failed to add folder-id annotation: %v", err)
	}

	templateContext := map[string]string{"name": folderName, "namespace": ns, "parent": namespacedParent.Name}
	buff := &bytes.Buffer{}

	if err := parsedFutureTemplate.Execute(buff, templateContext); err != nil {
		return nil, fmt.Errorf("Future template expansion error: %v", err)
	}
	s := buff.String()
	futureNode, err := yaml.Parse(s)
	if err != nil {
		return nil, fmt.Errorf("Yaml parsing of template error: %v.\nHydrated: %v", err, s)
	}

	// copy this Folder krm, r, to the future nested object
	err = futureNode.PipeE(
		yaml.LookupCreate(yaml.MappingNode, "spec"),
		yaml.SetField("object", r))

	if err != nil {
		return nil, fmt.Errorf("Nesting folder in future error: %v", err)
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

var futureObjecTemplate = `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FutureObject
metadata:
  name: {{ .name }}-future
  namespace: {{ .namespace }}
spec:
  object: {}
  configMapRef:
    name: {{ .parent }}-ref-cm
  variables:
  - name: folder-name
    type: string`

var fieldRefTemplate = `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FieldReference
metadata:
  name: {{ .parentN }}-{{ .parentNS }}-ref
  namespace: {{ .namespace }}
spec:
  configMapRef:
    name: {{ .parentN }}-ref-cm
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
  name: folder-ref-function-binding
  namespace: {{ .namespace }}
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: folder-ref-function-rw
subjects:
- kind: ServiceAccount
  name: default
  namespace: orchestrator-system`

var rbacRoleTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: folder-ref-function-rw
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
