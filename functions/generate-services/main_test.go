package main

import (
	"reflect"
	"testing"

	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const annotatedProjectKrm string = `apiVersion: resourcemanager.cnrm.cloud.google.com/v1beta1
kind: Project
metadata:
  name: host-project-id # {"$kpt-set":"host-project-id"}
  namespace: projects # {"$kpt-set":"projects-namespace"}
  annotations:
    cnrm.cloud.google.com/auto-create-network: "false"
    cnrm.cloud.google.com/organization-id: "123456789012" # {"$kpt-set":"org-id"}
spec: {}`

const annotatedPolicyKrm string = `apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: service-project-id-container-network-user
  namespace: projects
  annotations:
    cnrm.cloud.google.com/project-id: host-project-id
spec: {}`

func TestShouldRun(t *testing.T) {
	serviceMap, err := loadServiceMap(defaultServiceMapPath)
	if err != nil {
		t.Fatal("failed to load ServiceMap:\n", err)
	}
	item, err := yaml.Parse(annotatedProjectKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	itemMeta, err := item.GetMeta()
	if err != nil {
		t.Fatal("GetMeta Errored:\n", err)
	}
	svcList, supported, err := getRequiredServices(serviceMap, itemMeta)
	if err != nil {
		t.Fatal("getRequiredServices Errored:\n", err)
	}
	if !supported {
		t.Fatal("kind.group SHOULD be supported.\n", annotatedProjectKrm)
	}
	expectedSvcList := []string{"cloudresourcemanager.googleapis.com"}
	if !reflect.DeepEqual(svcList, expectedSvcList) {
		t.Fatalf("Unexpected result. Got %v. Wanted %v.\n", svcList, expectedSvcList)
	}

	item, err = yaml.Parse(annotatedPolicyKrm)
	if err != nil {
		t.Fatal("lol this isn't even the test yet:\n", err)
	}
	itemMeta, err = item.GetMeta()
	if err != nil {
		t.Fatal("GetMeta Errored:\n", err)
	}
	svcList, supported, err = getRequiredServices(serviceMap, itemMeta)
	if err != nil {
		t.Fatal("getRequiredServices Errored:\n", err)
	}
	if supported {
		t.Fatal("kind.group SHOULD NOT be supported.\n", annotatedPolicyKrm)
	}
	expectedSvcList = nil
	if !reflect.DeepEqual(svcList, expectedSvcList) {
		t.Fatalf("Unexpected result. Got %v. Wanted %v.\n", svcList, expectedSvcList)
	}
}
