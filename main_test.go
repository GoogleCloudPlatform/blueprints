package main

import (
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

const notAnnotatedFolderKrm string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: "Folder"
metadata:
    annotations:
        cnrm.cloud.google.com/organization-id: "foobar"
    name: top-folder
    namespace: project-hierarchy
spec:
    displayName: parent-folder`

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

func TestFieldGen(t *testing.T) {
	r, err := yaml.Parse(annotatedFolderKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	out, err := fieldReference(r)
	if err != nil {
		t.Fatal("failed generation\n", err)
	}
	meta, err := out.GetMeta()
	if err != nil {
		t.Fatal("fail to get meta\n", err)
	}
	if meta.Name != "top-folder-project-hierarchy-ref" {
		t.Fatal("Wrong name: [", meta.Name, "] wanted [top-folder-project-hierarchy-ref]")
	}
}

func TestFieldGenJson(t *testing.T) {
	r, err := yaml.Parse(annotatedFolderDiffNamespaceKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	out, err := fieldReference(r)
	if err != nil {
		t.Fatal("failed generation\n", err)
	}
	meta, err := out.GetMeta()
	if err != nil {
		t.Fatal("fail to get meta\n", err)
	}
	if meta.Name != "top-folder-namespace-two-ref" {
		t.Fatal("Wrong name: [", meta.Name, "] wanted [top-folder-namespace-two-ref]")
	}
}

func TestCorkWrap(t *testing.T) {
	r, err := yaml.Parse(annotatedFolderKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	out, e := wrapInCork(r)
	if e != nil {
		t.Fatal(e)
	}
	m, e := out.GetMeta()
	if e != nil {
		t.Fatal(e)
	}
	if m.Kind != "FutureObject" {
		t.Fatal("Did not wrap in a future")
	}
}

func TestCorkWrapJson(t *testing.T) {
	r, err := yaml.Parse(annotatedFolderDiffNamespaceKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	out, e := wrapInCork(r)
	if e != nil {
		t.Fatal(e)
	}
	m, e := out.GetMeta()
	if e != nil {
		t.Fatal(e)
	}
	if m.Kind != "FutureObject" {
		t.Fatal("Did not wrap in a future")
	}
}

func TestRbac(t *testing.T) {
	out, e := rbacObjects(map[string]bool{"my-namespace1": true, "my-other-namespace": true})
	if e != nil {
		t.Fatal(e)
	}
	if len(out) != 4 {
		t.Fatalf("Expected 4 objects for 2 namespaces, got %v", len(out))
	}
	for _, oneObj := range out {
		meta, err := oneObj.GetMeta()
		if err != nil {
			t.Fatal("fail to get meta\n", err)
		}
		if !(meta.Kind == "RoleBinding" || meta.Kind == "Role") {
			t.Fatalf("Expected valid RBAC kind, got %v", meta.Kind)
		}
	}
}
