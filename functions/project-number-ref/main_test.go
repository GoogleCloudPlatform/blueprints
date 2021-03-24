package main

import (
	"testing"

	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const annotatedPolicyKrm string = `apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: service-project-id-container-network-user
  namespace: projects
  annotations:
    cnrm.cloud.google.com/project-id: host-project-id
    cnrm.cloud.google.com/project-number-ref: service-project-id
    config.kubernetes.io/function: |
      container:
        image: gcr.io/yakima-eap/project-number-ref:latest
spec:
  member: "serviceAccount:service-${project-number}@container-engine-robot.iam.gserviceaccount.com"
  role: roles/compute.networkUser
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Project
    name: host-project-id
    namespace: projects`

const annotatedPolicyDiffNamespaceKrm string = `apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: service-project-id-container-network-user
  namespace: projects
  annotations:
    cnrm.cloud.google.com/project-id: host-project-id
    cnrm.cloud.google.com/project-number-ref: |
      {"namespace": "namespace-two", "name": "service-project-id"}
    config.kubernetes.io/function: |
      container:
        image: gcr.io/yakima-eap/project-number-ref:latest
spec:
  member: "serviceAccount:service-${project-number}@container-engine-robot.iam.gserviceaccount.com"
  role: roles/compute.networkUser
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Project
    name: host-project-id
    namespace: projects`

const notAnnotatedPolicyKrm string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: service-project-id-container-network-user
  namespace: projects
  annotations:
    cnrm.cloud.google.com/project-id: host-project-id
spec:
  member: "serviceAccount:service-${project-number}@container-engine-robot.iam.gserviceaccount.com"
  role: roles/compute.networkUser
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Project
    name: host-project-id
    namespace: projects`

const childSameProjectOne string = `apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: policy-name-one
  namespace: namespace-one
  annotations:
    cnrm.cloud.google.com/project-id: host-project-id
    cnrm.cloud.google.com/project-number-ref: |
      {"namespace": "namespace-two", "name": "service-project-id"}
    config.kubernetes.io/function: |
      container:
        image: gcr.io/yakima-eap/project-number-ref:latest
spec:
  member: "serviceAccount:service-${project-number}@container-engine-robot.iam.gserviceaccount.com"
  role: roles/compute.networkUser
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Project
    name: host-project-id
    namespace: namespace-one`

const childSameProjectTwo string = `apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: policy-name-two
  namespace: namespace-one
  annotations:
    cnrm.cloud.google.com/project-id: host-project-id
    cnrm.cloud.google.com/project-number-ref: |
      {"namespace": "namespace-two", "name": "service-project-id"}
    config.kubernetes.io/function: |
      container:
        image: gcr.io/yakima-eap/project-number-ref:latest
spec:
  member: "serviceAccount:${project-number}@cloudservices.gserviceaccount.com"
  role: roles/compute.networkUser
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Project
    name: host-project-id
    namespace: namespace-one`

const childSimilarProject string = `apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: policy-name-two
  namespace: namespace-two
  annotations:
    cnrm.cloud.google.com/project-id: host-project-id
    cnrm.cloud.google.com/project-number-ref: |
      {"namespace": "namespace-one", "name": "service-project-id"}
    config.kubernetes.io/function: |
      container:
        image: gcr.io/yakima-eap/project-number-ref:latest
spec:
  member: "serviceAccount:${project-number}@cloudservices.gserviceaccount.com"
  role: roles/compute.networkUser
  resourceRef:
    apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
    kind: Project
    name: host-project-id
    namespace: namespace-two`

func TestShouldRun(t *testing.T) {
	r, err := yaml.Parse(annotatedPolicyKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	trueish := shouldRun(r)
	if !trueish {
		t.Fatal("Should have succeeded.")
	}

	r2, err := yaml.Parse(notAnnotatedPolicyKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}

	falsely := shouldRun(r2)
	if falsely {
		t.Fatal("Should have failed.")
	}
}

func TestFieldReference(t *testing.T) {
	r, err := yaml.Parse(annotatedPolicyKrm)
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
	expected := "project-number-ref-1r8ecx1"
	if meta.Name != expected {
		t.Fatal("Wrong name: [", meta.Name, "] wanted [", expected, "]")
	}
}

func TestFieldReferenceJson(t *testing.T) {
	r, err := yaml.Parse(annotatedPolicyDiffNamespaceKrm)
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
	expected := "project-number-ref-5l0zkp"
	if meta.Name != expected {
		t.Fatal("Wrong name: [", meta.Name, "] wanted [", expected, "]")
	}
}

func TestFutureObject(t *testing.T) {
	r, err := yaml.Parse(annotatedPolicyKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	out, e := futureObject(r)
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

func TestFutureObjectJson(t *testing.T) {
	r, err := yaml.Parse(annotatedPolicyDiffNamespaceKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	out, e := futureObject(r)
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

func TestProjectRbac(t *testing.T) {
	out, e := rbacObjects(
		map[string][]string{"my-namespace1": {"name1"}, "my-other-namespace": {"name2"}},
		parsedProjectRoleTemplate,
		parsedProjectBindingTemplate,
	)
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

func TestPolicyRbac(t *testing.T) {
	out, e := rbacObjects(
		map[string][]string{"my-namespace1": {"name1"}, "my-other-namespace": {"name2"}},
		parsedPolicyRoleTemplate,
		parsedPolicyBindingTemplate,
	)
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
		fingerprintStr, e := unorderedFingerprint(testList)
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
		fingerprintStr, e := unorderedFingerprint(testList)
		if e != nil {
			t.Fatal("Failed to hash testList\n", e)
		}
		testResults = append(testResults, fingerprintStr)
	}

	if testResults[0] == testResults[1] {
		t.Fatal("These unique contexts shouldn't have the same fingerprint!")
	}
}

func TestDeterminismForIntegration(t *testing.T) {
	// Test hash determinism for specific cases
	// Element 0 is the expected hash
	testLists := [][]string{
		{"1qfoc5y", "outer-folder", "project-number-ref-other"},
		{"g90evd", "third-folder"},
	}
	var testResults []string
	var testExpected []string

	for _, testList := range testLists {
		testExpected = append(testExpected, testList[0])
		fingerprintStr, err := unorderedFingerprint(testList[1:])
		if err != nil {
			t.Fatal("Failed to hash testList\n", err)
		}
		testResults = append(testResults, fingerprintStr)
	}

	for i := range testResults {
		if testResults[i] != testExpected[i] {
			t.Fatalf("Expected [%s] Got [%s]", testExpected[i], testResults[i])
		}
	}
}

func TestMustParseAnnotation(t *testing.T) {
	r, err := yaml.Parse(annotatedPolicyDiffNamespaceKrm)
	if err != nil {
		t.Fatal("This shouldn't fail if the test is written correctly:\n", err)
	}
	ref := mustParseAnnotation(r)
	expectedName := "service-project-id"
	if ref.Name != expectedName {
		t.Fatalf("Got [%v] Expected [%s]", ref.Name, expectedName)
	}
	expectedNamespace := "namespace-two"
	if ref.Namespace != expectedNamespace {
		t.Fatalf("Got [%v] Expected [%s]", ref.Namespace, expectedNamespace)
	}
}

func TestFieldReferenceUnique(t *testing.T) {
	r1, err := yaml.Parse(childSameProjectOne)
	if err != nil {
		t.Fatal("Failed to parse childSameProjectOne")
	}
	r2, err := yaml.Parse(childSameProjectTwo)
	if err != nil {
		t.Fatal("Failed to parse childSameProjectTwo")
	}
	r3, err := yaml.Parse(childSimilarProject)
	if err != nil {
		t.Fatal("Failed to parse childSimilarProject")
	}

	ref1, err := fieldReference(r1)
	if err != nil {
		t.Fatal("failed generation for childSameProjectOne\n", err)
	}
	ref2, err := fieldReference(r2)
	if err != nil {
		t.Fatal("failed generation for childSameProjectTwo\n", err)
	}
	ref3, err := fieldReference(r3)
	if err != nil {
		t.Fatal("failed generation for childSimilarProject\n", err)
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

	// childSameProjectOne & childSameProjectTwo refer to the same parent from the same ns.
	// These SHOULD share a FieldReference
	if m1.Name != m2.Name {
		t.Fatalf("Got [%v] [%v], expected identical FieldReference names.", m1.Name, m2.Name)
	}
	// childSimilarProject has the same parent but from a different ns.
	// These SHOULD NOT share a FieldReference
	if m1.Name == m3.Name {
		t.Fatalf("Got [%v] [%v], expected unique FieldReference names.", m1.Name, m3.Name)
	}
	if m3.Name == m2.Name {
		t.Fatalf("Got [%v] [%v], expected unique FieldReference names.", m3.Name, m2.Name)
	}
}

func TestFieldRefMatchFuture(t *testing.T) {
	r, err := yaml.Parse(childSameProjectOne)
	if err != nil {
		t.Fatal("Failed to parse childSameProjectOne")
	}
	reference, err := fieldReference(r)
	if err != nil {
		t.Fatal("failed FieldReference generation\n", err)
	}
	future, err := futureObject(r)
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
	s1, _ := orderedFingerprint([]string{"foo", "bar", "baz", "qux"})
	s2, _ := orderedFingerprint([]string{"foo", "qux", "baz", "bar"})
	if len(s1) == 0 {
		t.Fatal("orderedFingerprint note generating valid hash string")
	}
	if s1 == s2 {
		t.Fatalf("Got [%v], expected unique name hashes.", s1)
	}
}
