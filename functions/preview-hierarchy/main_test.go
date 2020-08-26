package main

import (
	"bytes"
	"fmt"
	"testing"

	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

func TestPreviewHierarchy(t *testing.T) {
	rl := &framework.ResourceList{}

	err := loadYAMLs(rl, "retail.yaml", "retail-apps.yaml", "retail-apps-dev.yaml")
	if err != nil {
		t.Errorf("Error when loading yaml files %s", err.Error())
		return
	}

	var buf bytes.Buffer
	err = processHierarchy(rl, &buf)
	if err != nil {
		t.Errorf("Error when calling processFramework %s", err.Error())
	}
}

const samplesDirectory = "samples"

func loadYAMLs(rl *framework.ResourceList, filenames ...string) error {

	for _, filename := range filenames {
		node, err := yaml.ReadFile(fmt.Sprintf("%s/%s", samplesDirectory, filename))
		if err != nil {
			return err
		}
		rl.Items = append(rl.Items, node)
	}

	return nil
}
