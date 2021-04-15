package main

import (
	"log"
	"reflect"
	"testing"

	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const annotatedFolderKrm string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Folder
metadata:
    annotations:
        cnrm.cloud.google.com/folder-ref: top-folder
    name: folder-b
    namespace: project-hierarchy
spec:
    displayName: nested-folder`

const annotatedFolderKrmExpected string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Folder
metadata:
  annotations:
    cnrm.cloud.google.com/folder-ref: top-folder
  name: folder-b
  namespace: project-hierarchy
spec:
  displayName: nested-folder
  folderRef:
    name: top-folder
    namespace: project-hierarchy`

const annotatedFolderDiffNamespaceKrm string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Folder
metadata:
    annotations:
        cnrm.cloud.google.com/folder-ref: |
            {"namespace": "namespace-two", "name": "top-folder"}
    name: folder-b
    namespace: project-hierarchy
spec:
    displayName: nested-folder`

const annotatedFolderDiffNamespaceKrmExpected string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Folder
metadata:
    annotations:
        cnrm.cloud.google.com/folder-ref: |
           {"namespace": "namespace-two", "name": "top-folder"}
    name: folder-b
    namespace: project-hierarchy
spec:
    displayName: nested-folder
    folderRef:
        name: top-folder
        namespace: namespace-two`

const notAnnotatedFolderKrm string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: "Folder"
metadata:
    annotations:
        cnrm.cloud.google.com/organization-id: "foobar"
    name: top-folder
    namespace: project-hierarchy
spec:
    displayName: parent-folder`

func Test_newReference(t *testing.T) {
	type args struct {
		r string
	}
	tests := []struct {
		name    string
		args    args
		want    string
		wantErr bool
	}{
		{"simple", args{annotatedFolderKrm}, annotatedFolderKrmExpected, false},
		{"with-explicit-ns", args{annotatedFolderDiffNamespaceKrm}, annotatedFolderDiffNamespaceKrmExpected, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// get input RNode
			i, err := yaml.Parse(tt.args.r)
			if err != nil {
				t.Errorf("Error parsing input yaml: %v", err)
			}
			// get expected RNode
			expected, err := yaml.Parse(tt.want)
			if err != nil {
				t.Errorf("Error parsing expected yaml: %v", err)
			}
			got, err := newReference(i)
			if (err != nil) != tt.wantErr {
				t.Errorf("newReference() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(marshalJSON(got), marshalJSON(expected)) {
				t.Errorf("newReference() = %v, want %v", marshalJSON(got), marshalJSON(expected))
			}
		})
	}
}

func marshalJSON(r *yaml.RNode) string {
	j, err := r.MarshalJSON()
	if err != nil {
		log.Fatalf("Error marshalling json: %v", err)
	}
	return string(j)
}

func TestShouldRun(t *testing.T) {
	r, err := yaml.Parse(annotatedFolderKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	trueish := shouldRun(r)
	if !trueish {
		t.Fatal("Should have succeeded.")
	}

	r2, err := yaml.Parse(notAnnotatedFolderKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}

	falsely := shouldRun(r2)
	if falsely {
		t.Fatal("Should have failed.")
	}
}

func TestMustParseAnnotation(t *testing.T) {
	r, err := yaml.Parse(annotatedFolderDiffNamespaceKrm)
	if err != nil {
		t.Fatal("This shouldn't fail if the test is written correctly:\n", err)
	}
	ref := mustParseAnnotation(r)
	if ref.Name != "top-folder" {
		t.Fatalf("Got [%v] Expected [top-folder]", ref.Name)
	}
	if ref.Namespace != "namespace-two" {
		t.Fatalf("Got [%v] Expected [namespace-two]", ref.Namespace)
	}
}
