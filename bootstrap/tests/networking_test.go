package main

import (
	"fmt"
	"testing"
	"time"

	helpers "cnrm.googlesource.com/blueprints/bootstrap/tests/helpers"
)

// Tests the Shared VPC + Networking blueprint using BlueprintTest helper
func TestNetworking(t *testing.T) {
	const (
		networkName      = "yakima-test-network"
		networkNamespace = "networking"
	)

	p := GlobalTestParameters()

	networkingTest := helpers.BlueprintTest{
		Name:            "Networking blueprints can create respective compute resources via Yakima",
		TeardownCommand: fmt.Sprintf("../../scripts/reset_lz_blueprint.sh %s %s %s", p.Project, p.Org, p.BillingAccount),
		SetupCommand:    fmt.Sprintf("../../scripts/setup_networking.sh %s %s %s", p.Project, networkName, networkNamespace),
		KubernetesResourceList: []helpers.KubernetesResource{
			helpers.NewKccResource(networkNamespace, "ComputeSharedVPCHostProject", p.Project+"-sharedvpc"),
			helpers.NewKccResource(networkNamespace, "ComputeNetwork", networkName),
			helpers.NewKccResource(networkNamespace, "ComputeRouter", networkName+"-router"),
			helpers.NewKccResource(networkNamespace, "ComputeRouterNAT", networkName+"-router-nat"),
			helpers.NewKccResource(networkNamespace, "ComputeSubnetwork", networkName+"-subnetwork"),
			helpers.NewKccResource(networkNamespace, "ComputeTargetVPNGateway", networkName+"-vpn-gateway"),
			helpers.NewKccResource(networkNamespace, "ComputeVPNTunnel", networkName+"-vpn-tunnel"),
			helpers.NewKccResource(networkNamespace, "ComputeAddress", networkName+"-vpn-address"),
			helpers.NewKccResource(networkNamespace, "ComputeForwardingRule", networkName+"-vpn-esp-fr"),
			helpers.NewKccResource(networkNamespace, "ComputeForwardingRule", networkName+"-vpn-udp500-fr"),
			helpers.NewKccResource(networkNamespace, "ComputeForwardingRule", networkName+"-vpn-udp4500-fr"),
		},
		Parameters:   p,
		RetryCount:   30,
		PollDuration: 60 * time.Second,
	}

	networkingTest.Run(t)
}
