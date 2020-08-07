package main

import (
	"os"

	cork "cnrm.googlesource.com/cork/pkg/api/v1alpha1"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/kio/filters"
	"sigs.k8s.io/kustomize/kyaml/yaml"
	yaml2 "sigs.k8s.io/yaml"
)

// TODO: all of this
func main() {
	resourceList := &framework.ResourceList{}
	cmd := framework.Command(resourceList, func() error {
		// cmd.Execute() will parse the ResourceList.functionConfig into cmd.Flags from
		// the ResourceList.functionConfig.data field.
		var refObjs []*yaml.RNode
		for i := range resourceList.Items {
			meta, err := resourceList.Items[i].GetMeta()
			if err != nil {
				return err
			}
			if meta.APIVersion != "resourcemanager.cnrm.cloud.google.com/v1beta1" || meta.Kind != "Folder" || !shouldRun(resourceList.Items[i]) {
				continue
			}

			err = wrapInCork(resourceList.Items[i])
			if err != nil {
				return err
			}

			// Build new fieldref
			generatedRef, err := genFieldRef(resourceList.Items[i])
			if err != nil {
				return err
			}
			refObjs = append(refObjs, generatedRef)
		}
		// TODO: replace child folders with future(childfolder)s

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
	// cmd.Flags().StringVar(&namespace, "namespace", "", "the namespace value")
	if err := cmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func shouldRun(r *yaml.RNode) bool {
	parent, err := r.Pipe(yaml.Lookup("metadata", "annotations", "cnrm.cloud.google.com/folder-parent"))
	if err != nil {
		return false
	}
	return !yaml.IsEmpty(parent)
}

func genFieldRef(r *yaml.RNode) (*yaml.RNode, error) {
	parent, err := r.Pipe(yaml.Lookup("metadata", "annotations", "cnrm.cloud.google.com/folder-parent"))
	if err != nil {
		return nil, err
	}
	p, err := parent.String()
	if err != nil {
		return nil, err
	}
	meta, err := r.GetMeta()
	if err != nil {
		return nil, err
	}
	ns := meta.ObjectMeta.Namespace

	fr := cork.FieldReference{
		TypeMeta: metav1.TypeMeta{
			APIVersion: "orchestration.cnrm.cloud.google.com/v1alpha1",
			Kind:       "FieldReference",
		},
		ObjectMeta: metav1.ObjectMeta{
			Namespace: ns,
			Name:      p + "-nameref",
		},
		Spec: cork.FieldReferenceSpec{JSONPath: "{$.status.name}",
			ConfigMapRef: &cork.ConfigMapDataReference{Name: p + "-nameref-cm", Key: "folder"},
			ResourceRef:  &cork.NamespacedResource{Kind: "Folder"},
			Mutators: []cork.Mutator{
				{
					// Default mutator, trim "folder/" from status field
					Name: "substring", Settings: map[string]string{"start": "8"},
				},
			},
		},
	}
	data, err := yaml2.Marshal(fr)
	if err != nil {
		return nil, err
	}
	return yaml.Parse(string(data))
}

func wrapInCork(r *yaml.RNode) error {
	// get
	meta, err := r.GetMeta()
	if err != nil {
		return err
	}
	ns := meta.ObjectMeta.Namespace
	folderName := meta.ObjectMeta.Name

	parent, err := r.Pipe(yaml.Lookup("metadata", "annotations", "cnrm.cloud.google.com/folder-parent"))
	if err != nil {
		return err
	}
	ps, err := parent.String()
	if err != nil {
		return err
	}

	futureTemplate := cork.FutureObject{TypeMeta: metav1.TypeMeta{
		APIVersion: "orchestration.cnrm.cloud.google.com/v1alpha1",
		Kind:       "FutureObject",
	},
		ObjectMeta: metav1.ObjectMeta{
			Namespace: ns,
			Name:      folderName + "-future",
		},
		Spec: cork.FutureObjectSpec{
			ConfigMapRef: &v1.LocalObjectReference{Name: ps + "-nameref-cm"},
		},
	}

	data, err := yaml2.Marshal(futureTemplate)
	if err != nil {
		return nil
	}
	futureNode, err := yaml.Parse(string(data))
	if err != nil {
		return nil
	}

	// copy this Folder krm, r, to the future nested object
	_, err = futureNode.Pipe(
		yaml.LookupCreate(yaml.MappingNode, "spec", "object"),
		yaml.Set(r))

	// TODO: mutate object in to a future
	return err

	/*
		//	dead stuff
		k, err := r.Pipe(yaml.Lookup("kind"))
		a, err := r.Pipe(yaml.Lookup("apiVersion"))
		if err != nil {
			s, _ := r.String()
			return fmt.Errorf("%v: %s", err, s)
		}
		if parent == nil {
			// doesn't have folder parent, skip
			return nil
		}
		yaml.Set(yaml.Loo)
	*/

}

futureObjecTemplate := `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FutureObject
metadata:
  name: {{ .name }}-future
  namespace: {{ .namespace }}
spec:
  object: {}
  configMapRef:
	name: {{ .parent }}-ref-cm
`

fieldRefTemplate := `apiVersion: orchestration.cnrm.cloud.google.com/v1alpha1
kind: FieldReference
metadata:
  name: {{ .parent }}-ref
  namespace: {{ .namespace }}
spec:
  configMapRef:
	name: {{ .parent }}-ref-cm
    key: folder-name
  jsonPath: '{$.status.name}'
  mutators:
  - name: substring
    settings:
      start: "8" # trim the 'folders/' prefix.
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Folder
    name: {{ .parent }}
    namespace: {{ .namespace }}`