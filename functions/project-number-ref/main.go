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

const annotation string = "cnrm.cloud.google.com/project-number-ref"
const operableVersion string = "iam.cnrm.cloud.google.com/v1beta1"

var (
	operableKindSet              = map[string]bool{"IAMPolicyMember": true}
	parsedProjectRoleTemplate    = template.Must(template.New("project-role-template").Parse(projectRoleTemplate))
	parsedProjectBindingTemplate = template.Must(template.New("project-binding-template").Parse(projectBindingTemplate))
	parsedPolicyRoleTemplate     = template.Must(template.New("policy-role-template").Parse(policyRoleTemplate))
	parsedPolicyBindingTemplate  = template.Must(template.New("policy-binding-template").Parse(policyBindingTemplate))
	parsedFutureTemplate         = template.Must(template.New("future-obj").Parse(futureObjectTemplate))
	parsedReferenceTemplate      = template.Must(template.New("fieldref-obj").Parse(fieldRefTemplate))
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
	processor := framework.ResourceListProcessorFunc(func(resourceList *framework.ResourceList) error {
		var fieldRefList []*yaml.RNode
		// IAMPolicyMember: List(Operable Object Names)
		iamPolicyMemberSet := make(map[string][]string)
		// Project: List(Operable Object Names)
		projectSet := make(map[string][]string)
		for i, item := range resourceList.Items {
			if !shouldRun(item) {
				continue
			}

			policyMeta := mustMeta(item)
			if policyMeta.Name == "" {
				// explicit name is required for all KRM resources
				return fmt.Errorf("missing Resource name: %v", policyMeta)
			}
			if policyMeta.Namespace == "" {
				// explicit namespace is required for RBAC and fingerprinting
				return fmt.Errorf("missing Resource namespace: %v", policyMeta)
			}

			// Append the IAMPolicyMember's name to the list of IAMPolicyMembers in the IAMPolicyMember's namespace.
			iamPolicyMemberSet[policyMeta.Namespace] = append(iamPolicyMemberSet[policyMeta.Namespace], policyMeta.Name)

			// Skip duplicate Projects
			projectRef := mustParseAnnotation(item)
			if !containsString(projectSet[projectRef.Namespace], projectRef.Name) {
				// Append the Project's name to the list of Projects in the Project's namespace.
				projectSet[projectRef.Namespace] = append(projectSet[projectRef.Namespace], projectRef.Name)

				// Build new FieldReference
				fieldRef, err := fieldReference(item)
				if err != nil {
					return err
				}
				// Cache to add later, to avoid breaking policy replacement by index
				fieldRefList = append(fieldRefList, fieldRef)
			}

			// Replace IAMPolicyMember with FutureObject
			future, err := futureObject(item)
			if err != nil {
				return err
			}
			resourceList.Items[i] = future
		}
		// Add generated FieldReferences
		resourceList.Items = append(resourceList.Items, fieldRefList...)

		// Add Project read RBAC
		rbacList, err := rbacObjects(projectSet, parsedProjectRoleTemplate, parsedProjectBindingTemplate)
		if err != nil {
			return err
		}
		resourceList.Items = append(resourceList.Items, rbacList...)

		// Add IAMPolicyMember read/write RBAC
		rbacList, err = rbacObjects(iamPolicyMemberSet, parsedPolicyRoleTemplate, parsedPolicyBindingTemplate)
		if err != nil {
			return err
		}
		resourceList.Items = append(resourceList.Items, rbacList...)

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

	if err := framework.Execute(&processor, nil); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}

func containsString(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

// mustMeta will panic if the provided r doesn't have a metadata field.
// This assumes the object is already validated by shouldRun.
func mustMeta(r *yaml.RNode) yaml.ResourceMeta {
	meta, err := r.GetMeta()
	if err != nil {
		panic(err)
	}
	return meta
}

// mustParseAnnotation will panic if the provided r doesn't have the expected annotation in a parsable format.
// This assumes the object is already validated by shouldRun.
func mustParseAnnotation(r *yaml.RNode) namespacedName {
	meta := mustMeta(r)
	ps, ok := meta.Annotations[annotation]
	if !ok {
		panic(fmt.Errorf("missing %v annotation: %v", annotation, meta.Annotations))
	}
	projectRef := parseAnnotation(ps)
	// Default to the current item's namespace if one isn't specified in the annotation.
	if projectRef.Namespace == "" {
		projectRef.Namespace = meta.ObjectMeta.Namespace
	}
	return projectRef
}

// rbacObjects generates Roles and RoleBindings using the provided templates.
// Both templates must have "namespace" and "fingerprint" fields.
func rbacObjects(namespaces map[string][]string, roleTemplate, bindingTemplate *template.Template) ([]*yaml.RNode, error) {
	var rbacObj []*yaml.RNode
	for ns := range namespaces {
		fingerprint, err := unorderedFingerprint(namespaces[ns])
		if err != nil {
			return nil, fmt.Errorf("failed to hash object names in ns %v.\n%v", ns, err)
		}
		templateContext := map[string]string{
			"fingerprint": fingerprint,
			"namespace":   ns,
		}

		// Role
		buff := &bytes.Buffer{}
		if err := roleTemplate.Execute(buff, templateContext); err != nil {
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
		if err := bindingTemplate.Execute(buff, templateContext); err != nil {
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
	return !yaml.IsEmptyMap(parent)
}

func fieldReference(r *yaml.RNode) (*yaml.RNode, error) {
	meta := mustMeta(r)
	projectRef := mustParseAnnotation(r)

	// Generate a unique name from the names and namespaces of the project
	// This is necessary to prevent otherwise same-named objects from colliding in k8s.
	// This also allows policies to share project field references.
	uniqueRefName, err := orderedFingerprint([]string{projectRef.Name, projectRef.Namespace})
	if err != nil {
		return nil, err
	}

	buff := &bytes.Buffer{}
	err = parsedReferenceTemplate.Execute(buff, map[string]string{
		"fingerprint":      uniqueRefName,
		"namespace":        meta.Namespace,
		"projectName":      projectRef.Name,
		"projectNamespace": projectRef.Namespace,
	})
	if err != nil {
		return nil, err
	}
	return yaml.Parse(buff.String())
}

func futureObject(r *yaml.RNode) (*yaml.RNode, error) {
	meta := mustMeta(r)
	projectRef := mustParseAnnotation(r)

	// Generate a unique name from the names and namespaces of the project
	// This is necessary to prevent otherwise same-named objects from colliding in k8s.
	// This also allows policies to share project field references.
	projectFingerprint, err := orderedFingerprint([]string{projectRef.Name, projectRef.Namespace})
	if err != nil {
		return nil, err
	}

	// Generate a unique name from the names and namespaces of the policy and project
	// This is necessary to prevent otherwise same-named objects from colliding in k8s.
	policyFingerprint, err := orderedFingerprint([]string{meta.ObjectMeta.Name, meta.ObjectMeta.Namespace, projectRef.Name, projectRef.Namespace})
	if err != nil {
		return nil, err
	}

	buff := &bytes.Buffer{}
	err = parsedFutureTemplate.Execute(buff, map[string]string{
		"policyFingerprint":  policyFingerprint,
		"projectFingerprint": projectFingerprint,
		"namespace":          meta.Namespace,
	})
	if err != nil {
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
		// Assume unparseable annotations are just a name
		return namespacedName{Name: annotation}
	}
	return ref
}

// unorderedFingerprint returns a consistent hash for a list of strings, input will be sorted, so order doesn't matter.
func unorderedFingerprint(nameList []string) (string, error) {
	sort.Strings(nameList)
	return orderedFingerprint(nameList)
}

// orderedFingerprint returns a consistent hash for a list of strings, order matters.
func orderedFingerprint(nameList []string) (string, error) {
	h := fnv.New32a()
	_, e := h.Write([]byte(strings.Join(nameList, "_")))
	if e != nil {
		return "", e
	}
	i := h.Sum32()
	s := strconv.FormatInt(int64(i), 36)
	return s, nil
}

var futureObjectTemplate = `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FutureObject
metadata:
  name: project-number-ref-{{ .policyFingerprint }}
  namespace: {{ .namespace }}
spec:
  object: {}
  configMapRef:
    name: project-number-ref-{{ .projectFingerprint }}`

var fieldRefTemplate = `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FieldReference
metadata:
  name: project-number-ref-{{ .fingerprint }}
  namespace: {{ .namespace }}
spec:
  configMapRef:
    name: project-number-ref-{{ .fingerprint }}
    key: project-number
  jsonPath: "{$.status.number}"
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Project
    name: {{ .projectName }}
    namespace: {{ .projectNamespace }}`

var projectBindingTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: project-number-ref-project-binding-{{ .fingerprint }}
  namespace: {{ .namespace }}
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: project-number-ref-project-role-{{ .fingerprint }}
subjects:
- kind: ServiceAccount
  name: default
  namespace: orchestrator-system`

var projectRoleTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: project-number-ref-project-role-{{ .fingerprint }}
  namespace: {{ .namespace }}
rules:
- apiGroups:
  - resourcemanager.cnrm.cloud.google.com
  resources:
  - projects
  verbs:
  - get
  - list
  - watch`

var policyBindingTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: project-number-ref-policy-binding-{{ .fingerprint }}
  namespace: {{ .namespace }}
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: project-number-ref-policy-role-{{ .fingerprint }}
subjects:
- kind: ServiceAccount
  name: default
  namespace: orchestrator-system`

var policyRoleTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: project-number-ref-policy-role-{{ .fingerprint }}
  namespace: {{ .namespace }}
rules:
- apiGroups:
  - iam.cnrm.cloud.google.com
  resources:
  - iampolicymembers
  verbs:
  - get
  - list
  - watch
  - create
  - update`
