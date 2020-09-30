package main

import (
	"bytes"
	"fmt"
	"os"
	"text/template"

	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/kio/filters"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const operableVersion string = "iam.cnrm.cloud.google.com/v1beta1"

var (
	// This is the special cork field that doesn't actually exist on IAM Member CRD
	resourceRefPathGetter = yaml.Lookup("spec", "member", "resourceRef", "name")
	// These are the valid kinds for this function to operate on
	operableKindSet = map[string]bool{"IAMPolicyMember": true}
	// Template "constants"
	roleTemplateParsed     = template.Must(template.New("role-template").Parse(rbacRoleTemplate))
	bindingTemplateParsed  = template.Must(template.New("binding-template").Parse(rbacBindingTemplate))
	fieldRefTemplateParsed = template.Must(template.New("fieldref-obj").Parse(fieldRefTemplate))
	futureTemplateParsed   = template.Must(template.New("future-obj").Parse(futureObjecTemplate))
)

func isOperableKind(kind string) bool {
	_, ok := operableKindSet[kind]
	return ok
}

func main() {
	resourceList := &framework.ResourceList{}
	cmd := framework.Command(resourceList, func() error {
		var operableObjs []*yaml.RNode
		var inOperableObjs []*yaml.RNode
		var refObjs []*yaml.RNode
		var rbacObjs []*yaml.RNode
		namespaceSet := make(map[string]bool)
		nameKindMap := make(map[string]string)

		for i := range resourceList.Items {
			// Save name:kind for later type discovery
			m, err := resourceList.Items[i].GetMeta()
			if err != nil {
				continue
			}
			nameKindMap[m.Name] = m.Kind
			// 1. Should this object be manipulated by this function?
			if shouldRun(resourceList.Items[i]) {
				operableObjs = append(operableObjs, resourceList.Items[i])
				continue
			}
			inOperableObjs = append(inOperableObjs, resourceList.Items[i])
		}

		for i := range operableObjs {
			// 2A. If so, construct a FieldReference
			generatedRef, err := fieldReference(operableObjs[i], nameKindMap)
			if err != nil {
				return err
			}
			refObjs = append(refObjs, generatedRef)
			// 2B. Record namespace for RBAC generation at the end.
			namespaceSet[namespace(operableObjs[i])] = true

			// 2C. Replace the original object with a FutureObject
			future, err := futureObject(operableObjs[i])
			if err != nil {
				return err
			}
			operableObjs[i] = future
		}
		// Merge together filtered slices
		resourceList.Items = inOperableObjs
		resourceList.Items = append(resourceList.Items, operableObjs...)

		// 2A. Add generated FieldReferences to the output.
		resourceList.Items = append(resourceList.Items, refObjs...)

		// 2B. Add RBAC objects
		rbacObjs, err := rbacObjects(namespaceSet)
		if err != nil {
			return err
		}
		resourceList.Items = append(resourceList.Items, rbacObjs...)

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
		if err := roleTemplateParsed.Execute(buff, map[string]string{"namespace": ns}); err != nil {
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
		if err := bindingTemplateParsed.Execute(buff, map[string]string{"namespace": ns}); err != nil {
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
	if r == nil {
		return false
	}
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

	node, err := r.Pipe(resourceRefPathGetter)
	if err != nil {
		return false
	}
	return !yaml.IsEmpty(node)
}

// TODO: for now this means every child obj will create a field ref, even if they have parents in common. So there may be duplicate fieldrefs.
func fieldReference(r *yaml.RNode, kindMap map[string]string) (*yaml.RNode, error) {
	meta, err := r.GetMeta()
	if err != nil {
		return nil, err
	}
	ns := meta.ObjectMeta.Namespace
	sinkRef, err := r.Pipe(resourceRefPathGetter)
	if err != nil {
		return nil, err
	}
	sinkName := yaml.GetValue(sinkRef)

	kindStr, ok := kindMap[sinkName]
	if !ok {
		return nil, fmt.Errorf("Unknown kind for object named %v", sinkName)
	}

	buff := &bytes.Buffer{}
	if err := fieldRefTemplateParsed.Execute(buff, map[string]string{"namespace": ns, "sink": sinkName, "kind": kindStr}); err != nil {
		return nil, err
	}
	return yaml.Parse(buff.String())
}

func futureObject(r *yaml.RNode) (*yaml.RNode, error) {
	meta, err := r.GetMeta()
	if err != nil {
		return nil, fmt.Errorf("Unable to parse metadata: %v", err)
	}
	ns := meta.ObjectMeta.Namespace
	memberName := meta.ObjectMeta.Name

	sinkRef, err := r.Pipe(resourceRefPathGetter)
	if err != nil {
		return nil, err
	}

	// Replace spec.member value with key 'identity'
	// NOTE: this variable must match the name in the spec.variables of the template below
	err = r.PipeE(yaml.Lookup("spec"), yaml.SetField("member", yaml.NewScalarRNode("${identity}")))
	if err != nil {
		return nil, fmt.Errorf("Failed to set spec.member: %v", err)
	}

	templateContext := map[string]string{"memberName": memberName, "namespace": ns, "sink": yaml.GetValue(sinkRef)}
	buff := &bytes.Buffer{}
	if err := futureTemplateParsed.Execute(buff, templateContext); err != nil {
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

var futureObjecTemplate = `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FutureObject
metadata:
  name: {{ .memberName }}-future
  namespace: {{ .namespace }}
spec:
  object: {}
  configMapRef:
    name: {{ .sink }}-ref-cm
  variables:
  - name: identity
    type: string`

var fieldRefTemplate = `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FieldReference
metadata:
  name: {{ .sink }}-ref
  namespace: {{ .namespace }}
spec:
  configMapRef:
    name: {{ .sink }}-ref-cm
    key: identity
  jsonPath: "{$.status.writerIdentity}"
  mutators: []
  resourceRef:
    apiVersion: logging.cnrm.cloud.google.com/v1alpha1
    kind: {{ .kind }}
    name: {{ .sink }}
    namespace: {{ .namespace }}`

var rbacBindingTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: sink-policy-function-binding
  namespace: {{ .namespace }}
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: sink-policy-function-rw
subjects:
- kind: ServiceAccount
  name: default
  namespace: orchestrator-system`

var rbacRoleTemplate = `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: sink-policy-function-rw
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
  - update
- apiGroups:
  - logging.cnrm.cloud.google.com
  resources:
  - organizationlogsinks
  - folderlogsinks
  verbs:
  - get
  - list
  - watch`
