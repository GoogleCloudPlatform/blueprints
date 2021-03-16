package main

import (
	"fmt"
	"testing"
	"time"

	helpers "cnrm.googlesource.com/blueprints/bootstrap/tests/helpers"
)

// Tests the Simple hierarchy blueprint using BlueprintTest helper
func TestDRSOrgPolicy(t *testing.T) {
	const (
		policyNamespace = "policies"
	)

	p := GlobalTestParameters()

	simpleHierarchyTest := helpers.BlueprintTest{
		Name:            "Org polciy and LZ blueprints can create org policies via Yakima",
		TeardownCommand: fmt.Sprintf("../../scripts/reset_lz_blueprint.sh %s %s %s", p.Project, p.Org, p.BillingAccount),
		SetupCommand:    fmt.Sprintf("../../scripts/setup_drs_policy.sh %s", p.Org),
		KubernetesResourceList: []helpers.KubernetesResource{
			helpers.NewKccResource(policyNamespace, "ResourceManagerPolicy", "domain-restricted-sharing"),
		},
		Parameters:   p,
		RetryCount:   30,
		PollDuration: 60 * time.Second,
	}

	simpleHierarchyTest.Run(t)
}
