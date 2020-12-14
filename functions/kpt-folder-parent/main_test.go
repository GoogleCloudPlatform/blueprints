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

const childSameParentOne string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Folder
metadata:
    annotations:
        cnrm.cloud.google.com/folder-ref: |
            {"namespace": "ns-two", "name": "parent-obj"}
    name: child-folder
    namespace: ns-one
spec:
    displayName: nested-folder-a`

const childSameParentTwo string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Folder
metadata:
    annotations:
        cnrm.cloud.google.com/folder-ref: |
            {"namespace": "ns-two", "name": "parent-obj"}
    name: child-folder2
    namespace: ns-one
spec:
    displayName: nested-folder-b`

const childSimilarParent string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Folder
metadata:
    annotations:
        cnrm.cloud.google.com/folder-ref: |
            {"namespace": "ns-one", "name": "parent-obj"}
    name: child-folder
    namespace: ns-two
spec:
    displayName: nested-folder-b`

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
	if meta.Name != "1lqrf51-ref" {
		t.Fatal("Wrong name: [", meta.Name, "] wanted [1lqrf51-ref]")
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
	if meta.Name != "1xokn1q-ref" {
		t.Fatal("Wrong name: [", meta.Name, "] wanted [1xokn1q-ref]")
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
	out, e := rbacObjects(map[string][]string{"my-namespace1": {"name1"}, "my-other-namespace": {"name2"}})
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

func TestDeterministicFingerprint(t *testing.T) {
	// Order should not matter for the name list.
	testLists := [][]string{
		{"nameOne", "another-name"},
		{"another-name", "nameOne"},
	}

	for _, testList := range testLists {
		fingerprintStr, e := uniqueFingerprint(testList)
		if e != nil {
			t.Fatal("Failed to hash testList\n", e)
		}
		// s0uiqu was calculated beforehand. The answer for testList should only change if the input strings change.
		if fingerprintStr != "s0uiqu" {
			t.Fatalf("Got [%v] Expected [s0uiqu]", fingerprintStr)
		}
	}
}

func TestUniqueFingerprint(t *testing.T) {
	// Similar namesets shouldn't give the same hash
	testLists := [][]string{
		{"alpha", "bravo"},
		{"alphabravo"},
	}
	var testResults []string

	for _, testList := range testLists {
		fingerprintStr, e := uniqueFingerprint(testList)
		if e != nil {
			t.Fatal("Failed to hash testList\n", e)
		}
		testResults = append(testResults, fingerprintStr)
	}

	if testResults[0] == testResults[1] {
		t.Fatal("These unique contexts shouldn't have the same fingerprint!")
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

func TestFieldReferenceUnique(t *testing.T) {
	// same parent 1&2 refer to the same parent from the same ns
	// similar parent has the same identifying namespaced name strings but in slightly different arrangement
	// none should share a reference name or collide
	r1, err := yaml.Parse(childSameParentOne)
	if err != nil {
		t.Fatal("Failed to parse childSameParentOne")
	}
	r2, err := yaml.Parse(childSameParentTwo)
	if err != nil {
		t.Fatal("Failed to parse childSameParentTwo")
	}
	r3, err := yaml.Parse(childSimilarParent)
	if err != nil {
		t.Fatal("Failed to parse childSimilarParent")
	}

	ref1, err := fieldReference(r1)
	if err != nil {
		t.Fatal("failed generation for childSameParentOne\n", err)
	}
	ref2, err := fieldReference(r2)
	if err != nil {
		t.Fatal("failed generation for childSameParentTwo\n", err)
	}
	ref3, err := fieldReference(r3)
	if err != nil {
		t.Fatal("failed generation for childSimilarParent\n", err)
	}

	m1, err := ref1.GetMeta()
	if err != nil {
		t.Fatal(err)
	}
	m2, err := ref2.GetMeta()
	if err != nil {
		t.Fatal(err)
	}
	m3, err := ref3.GetMeta()
	if err != nil {
		t.Fatal(err)
	}
	// Parsing done, test for (incorrect) matches.
	if m1.Name == m2.Name {
		t.Fatalf("Got [%v] [%v], expected unique FieldReference names.", m1.Name, m2.Name)
	}
	if m1.Name == m3.Name {
		t.Fatalf("Got [%v] [%v], expected unique FieldReference names.", m1.Name, m3.Name)
	}
	if m3.Name == m2.Name {
		t.Fatalf("Got [%v] [%v], expected unique FieldReference names.", m3.Name, m2.Name)
	}
}

func TestFieldRefMatchFuture(t *testing.T) {
	r, err := yaml.Parse(childSameParentOne)
	if err != nil {
		t.Fatal("Failed to parse childSameParentOne")
	}
	reference, err := fieldReference(r)
	if err != nil {
		t.Fatal("failed FieldReference generation\n", err)
	}
	future, err := wrapInCork(r)
	if err != nil {
		t.Fatal("failed FutureObject generation\n", err)
	}
	cName1, err := reference.Pipe(yaml.Lookup("spec", "configMapRef", "name"))
	if err != nil {
		t.Fatal("failed FieldReference parsing\n", err)
	}
	cName2, err := future.Pipe(yaml.Lookup("spec", "configMapRef", "name"))
	if err != nil {
		t.Fatal("failed FutureObject parsing\n", err)
	}
	cNameStr1 := yaml.GetValue(cName1)
	cNameStr2 := yaml.GetValue(cName2)
	if cNameStr1 != cNameStr2 {
		t.Fatalf("Got [%v] [%v], expected configMapRef names should match.", cNameStr1, cNameStr2)
	}
}

func TestNameStringSwapsUnique(t *testing.T) {
	s1, _ := referenceNamer("foo", "bar", "baz", "qux")
	s2, _ := referenceNamer("foo", "qux", "baz", "bar")
	if len(s1) == 0 {
		t.Fatal("referenceNamer note generating valid hash string")
	}
	if s1 == s2 {
		t.Fatalf("Got [%v], expected unique name hashes.", s1)
	}
}
