package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"testing"

	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const samplesDirectory = "testdata"

func TestPreviewHierarchy(t *testing.T) {
	rl := &framework.ResourceList{}

	cases := []struct {
		name  string
		files []string
	}{
		{name: "simple", files: []string{"simple/retail.yaml", "simple/retail-apps.yaml", "simple/retail-apps-dev.yaml"}},
	}

	for i := range cases {
		c := cases[i]
		err := loadYAMLs(rl, c.files...)
		if err != nil {
			t.Errorf("Error when loading yaml files %s", err.Error())
			return
		}

		_, err = processHierarchy(rl)
		if err != nil {
			t.Errorf("Error when calling processFramework %s", err.Error())
		}
	}
}

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

// helper to get hierarchy from a dir of yamls
func getHierarchy(dir string) []*gcpHierarchyResource {
	rl := &framework.ResourceList{}
	files, err := ioutil.ReadDir(fmt.Sprintf("%s/%s", samplesDirectory, dir))
	if err != nil {
		log.Fatal(err)
	}
	var filePaths []string
	for _, file := range files {
		if file.Name() != "Kptfile" {
			filePaths = append(filePaths, fmt.Sprintf("%s/%s", dir, file.Name()))
		}
	}
	err = loadYAMLs(rl, filePaths...)
	if err != nil {
		log.Fatal(err)
	}
	h, err := processHierarchy(rl)
	if err != nil {
		log.Fatal(err)
	}
	return h
}

func Test_textTreeRenderer(t *testing.T) {
	type args struct {
		hierarchy []*gcpHierarchyResource
	}
	tests := []struct {
		name       string
		args       args
		wantOutput string
		wantErr    bool
	}{
		{"simple", args{getHierarchy("simple")}, `
org-11111
├─Commercial
├─Financial
| ├─Apps
| | ├─Dev
| | ├─Prod
| | └─Test
| ├─Shared
| └─Web
├─Retail
| ├─Apps
| | ├─Dev
| | ├─Prod
| | └─Test
| ├─Shared
| └─Web
└─Risk Mgmt
`, false},
		{"env-bu", args{getHierarchy("env-bu")}, `
org-123456789012
├─dev
| ├─finance
| | ├─commercial
| | └─retail
| └─retail
|   ├─apps
|   └─data_and_analysis
└─prod
  ├─finance
  | ├─commercial
  | └─retail
  └─retail
    ├─apps
    └─data_and_analysis
`, false},
		{"team", args{getHierarchy("team")}, `
org-123456789012
├─finance
| ├─dev
| ├─prod
| └─qa
└─retail
  ├─dev
  ├─prod
  └─qa
`, false},
		{"bu", args{getHierarchy("bu")}, `
org-123456789012
├─commercial
| └─ctrl-service
|   ├─dev
|   └─prod
├─financial
| ├─core-services
| | ├─dev
| | └─prod
| └─web
|   ├─dev
|   └─prod
├─retail
| ├─apps
| | ├─dev
| | └─prod
| └─shared
|   ├─dev
|   └─prod
└─risk-management
  ├─core-service
  | ├─dev
  | └─prod
  └─data-and-analysis
    ├─dev
    └─prod
`, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			output := &bytes.Buffer{}
			if err := textTreeRenderer(tt.args.hierarchy, output); (err != nil) != tt.wantErr {
				t.Errorf("textTreeRenderer() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if gotOutput := output.String(); gotOutput != tt.wantOutput {
				t.Errorf("textTreeRenderer() = %v, want %v", gotOutput, tt.wantOutput)
			}
		})
	}
}
