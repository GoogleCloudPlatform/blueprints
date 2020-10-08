package main

import (
	"testing"

	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const operableIamKRM string = `apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
    name: iam-member
    namespace: unit-test
spec:
    member:
        resourceRef:
            name: another-resource
    role: roles/storage.admin`

const inOperableIamKRM string = `apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
    name: iam-member
    namespace: unit-test
spec:
    member: serviceAccount:foobar@example.com
    role: roles/storage.admin`

func TestShouldRun(t *testing.T) {
	r, err := yaml.Parse(operableIamKRM)
	if err != nil {
		t.Fatal("Failed to parse test constant operableIamKRM\n", err)
	}
	trueish := shouldRun(r)
	if !trueish {
		t.Fatal("Should have succeeded.")
	}

	r2, err := yaml.Parse(inOperableIamKRM)
	if err != nil {
		t.Fatal("Failed to parse test constant inOperableIamKRM:\n", err)
	}

	falsely := shouldRun(r2)
	if falsely {
		t.Fatal("Error: Expected shouldRun to be false on inOperableIamKRM.")
	}
}

func TestFieldGen(t *testing.T) {
	r, err := yaml.Parse(operableIamKRM)
	if err != nil {
		t.Fatal("Failed to parse test constant operableIamKRM\n", err)
	}
	out, err := fieldReference(r, map[string]string{"another-resource": "FolderLogSink"})
	if err != nil {
		t.Fatal("failed generation\n", err)
	}
	meta, err := out.GetMeta()
	if err != nil {
		t.Fatal("fail to get meta\n", err)
	}
	if meta.Name != "another-resource-ref" {
		t.Fatal("Wrong name: [", meta.Name, "] wanted [another-resource-ref]")
	}
	kind, e := out.Pipe(yaml.Lookup("spec", "resourceRef", "kind"))
	if e != nil {
		t.Fatal(e)
	}
	kindField := yaml.GetValue(kind)
	if kindField != "FolderLogSink" {
		t.Fatalf("Got [%v] Wanted [FolderLogSink]", kindField)
	}
}

func TestCorkWrap(t *testing.T) {
	r, err := yaml.Parse(operableIamKRM)
	if err != nil {
		t.Fatal("Failed to parse test constant operableIamKRM\n", err)
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
	member, e := out.Pipe(yaml.Lookup("spec", "object", "spec", "member"))
	if e != nil {
		t.Fatal(e)
	}
	memField := yaml.GetValue(member)
	if memField != "${identity}" {
		t.Fatalf("Got [%v] Wanted [${identity}]", memField)
	}
}

func TestRbac(t *testing.T) {
	out, e := rbacObjects(map[string]bool{"my-namespace1": true, "my-other-namespace": true})
	if e != nil {
		t.Fatal(e)
	}
	if len(out) != 4 {
		t.Fatalf("Got %v, Want 4 objects for 2 namespaces.", len(out))
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
