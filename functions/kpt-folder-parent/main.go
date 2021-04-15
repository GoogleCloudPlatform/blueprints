package main

import (
	"encoding/json"
	"fmt"
	"os"

	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/kio/filters"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const annotation string = "cnrm.cloud.google.com/folder-ref"
const operableVersion string = "resourcemanager.cnrm.cloud.google.com/v1beta1"

var operableKindSet = map[string]bool{"Folder": true, "Project": true}

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
	p := framework.ResourceListProcessorFunc(func(resourceList *framework.ResourceList) error {
		// Namespace: List(Operable Object Names)
		for i := range resourceList.Items {
			if !shouldRun(resourceList.Items[i]) {
				continue
			}
			// Replace with new reference style
			newRef, err := newReference(resourceList.Items[i])
			if err != nil {
				return err
			}
			resourceList.Items[i] = newRef
		}

		var err error
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

		// add fn deprecation warning
		deprecationNotice := &framework.Result{
			Name: "Deprecation Notice",
			Items: []framework.ResultItem{{
				Message:  "folder-parent fn has been deprecated in favor of native references. For more infomation visit https://cloud.google.com/config-connector/docs/reference/resource-docs/resourcemanager/folder#schema",
				Severity: framework.Warning,
			}},
		}
		resourceList.Result = deprecationNotice

		return nil
	})

	if err := framework.Execute(&p, nil); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
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

func parseAnnotation(annotation string) namespacedName {
	var ref namespacedName
	e := json.Unmarshal([]byte(annotation), &ref)
	if e != nil {
		// For backwards compat, assume any non-parseable annotations are simply a name alone
		return namespacedName{Name: annotation}
	}
	return ref
}

// newReference injects native folderRef into an RNode spec
func newReference(r *yaml.RNode) (*yaml.RNode, error) {
	meta, err := r.GetMeta()
	if err != nil {
		return nil, err
	}
	workingNamespace := meta.ObjectMeta.Namespace
	namespacedParent := mustParseAnnotation(r)
	// Default to local working ns if one isn't specified in the annotation.
	if namespacedParent.Namespace == "" {
		namespacedParent.Namespace = workingNamespace
	}
	folderRefNode := yaml.NewMapRNode(
		&map[string]string{
			"name":      namespacedParent.Name,
			"namespace": namespacedParent.Namespace,
		})
	err = r.PipeE(
		yaml.LookupCreate(yaml.MappingNode, "spec"),
		yaml.SetField("folderRef", folderRefNode),
	)
	if err != nil {
		return nil, err
	}
	return r, nil
}
