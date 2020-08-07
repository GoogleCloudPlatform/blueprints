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

const annotation string = "cnrm.cloud.google.com/folder-ref"

func main() {
	resourceList := &framework.ResourceList{}
	cmd := framework.Command(resourceList, func() error {
		var refObjs []*yaml.RNode
		for i := range resourceList.Items {
			meta, err := resourceList.Items[i].GetMeta()
			if err != nil {
				return err
			}
			if meta.APIVersion != "resourcemanager.cnrm.cloud.google.com/v1beta1" || meta.Kind != "Folder" || !shouldRun(resourceList.Items[i]) {
				continue
			}

			// Build new fieldref
			generatedRef, err := genFieldRef(resourceList.Items[i])
			if err != nil {
				return err
			}
			refObjs = append(refObjs, generatedRef)

			// Replace with a future
			future, err := wrapInCork(resourceList.Items[i])
			if err != nil {
				return err
			}
			resourceList.Items[i] = future
		}
		// add generated fieldrefs
		resourceList.Items = append(resourceList.Items, refObjs...)

		// merge the new copies with the old copies of each resource
		var err error
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

func shouldRun(r *yaml.RNode) bool {
	parent, err := r.Pipe(yaml.GetAnnotation(annotation))
	if err != nil {
		return false
	}
	return !yaml.IsEmpty(parent)
}

func genFieldRef(r *yaml.RNode) (*yaml.RNode, error) {
	meta, err := r.GetMeta()
	if err != nil {
		return nil, err
	}
	ns := meta.ObjectMeta.Namespace
	ps, ok := meta.Annotations[annotation]
	if !ok {
		return nil, fmt.Errorf("Missing %v annotation: %v", annotation, meta.Annotations)
	}

	buff := &bytes.Buffer{}
	t := template.Must(template.New("fieldref-obj").Parse(fieldRefTemplate))
	if err := t.Execute(buff, map[string]string{"namespace": ns, "parent": ps}); err != nil {
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

	// Set folder parent to cork var "${folder-name}"
	// NOTE: this variable must match the name in the spec.variables of the template below
	err = r.PipeE(yaml.Lookup("metadata", "annotations"), yaml.SetField("cnrm.cloud.google.com/folder-id", yaml.NewScalarRNode("${folder-name}")))
	if err != nil {
		return nil, fmt.Errorf("Failed to add folder-id annotation: %v", err)
	}

	templateContext := map[string]string{"name": folderName, "namespace": ns, "parent": ps}
	buff := &bytes.Buffer{}
	t := template.Must(template.New("future-obj").Parse(futureObjecTemplate))
	if err := t.Execute(buff, templateContext); err != nil {
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
  name: {{ .parent }}-ref
  namespace: {{ .namespace }}
spec:
  configMapRef:
    name: {{ .parent }}-ref-cm
    key: folder-name
  jsonPath: "{$.status.name}"
  mutators:
  - name: substring
    settings:
      start: "8" # trim the 'folders/' prefix.
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Folder
    name: {{ .parent }}
    namespace: {{ .namespace }}`
