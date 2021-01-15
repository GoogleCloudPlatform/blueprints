package main

import (
	"fmt"
	"testing"
	"time"

	helpers "cnrm.googlesource.com/blueprints/bootstrap/tests/helpers"
)

// Tests the Simple hierarchy blueprint using BlueprintTest helper
func TestSimpleHierarchy(t *testing.T) {
	const (
		hierarchyNamespace = "hierarchy"
	)

	p := GlobalTestParameters()

	simpleHierarchyTest := helpers.BlueprintTest{
		Name:            "Simple hierarchy blueprints can create hierarchy via Yakima",
		TeardownCommand: fmt.Sprintf("../../scripts/reset_lz_blueprint.sh %s %s %s", p.Project, p.Org, p.BillingAccount),
		SetupCommand:    fmt.Sprintf("../../scripts/setup_hierarchy-simple.sh %s", p.Org),
		KubernetesResourceList: []helpers.KubernetesResource{
			helpers.NewKccResource(hierarchyNamespace, "Folder", "dev"),
			helpers.NewKccResource(hierarchyNamespace, "Folder", "qa"),
			helpers.NewKccResource(hierarchyNamespace, "Folder", "prod"),
			helpers.NewKccResource(hierarchyNamespace, "Folder", "shared"),
		},
		Parameters:   p,
		RetryCount:   30,
		PollDuration: 60 * time.Second,
	}

	simpleHierarchyTest.Run(t)
}
