package main

import (
	"os"

	cork "cnrm.googlesource.com/cork/pkg/api/v1alpha1"
	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/kio/filters"
)

var namespace string

// TODO: all of this
func main() {
	resourceList := &framework.ResourceList{}
	cmd := framework.Command(resourceList, func() error {
		// cmd.Execute() will parse the ResourceList.functionConfig into cmd.Flags from
		// the ResourceList.functionConfig.data field.
		for i := range resourceList.Items {
			// modify the resources using the kyaml/yaml library:
			// https://pkg.go.dev/sigs.k8s.io/kustomize/kyaml/yaml
			// Set the metadata.namespace field
			fr := cork.FieldReference{}
			fo := cork.FutureObject{}
		}
		// add the template generated Resources to the output -- these will get merged by the next
		// filter
		resourceList.Items = append(resourceList.Items, s, d)

		// merge the new copies with the old copies of each resource
		error err
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

func wrapInCork(r *yaml.RNode) error {

}
