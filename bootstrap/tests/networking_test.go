package main

import (
	"fmt"
	"testing"
	"time"

	helpers "cnrm.googlesource.com/blueprints/bootstrap/tests/helpers"
)

const (
	networkName      = "yakima-test-network"
	networkNamespace = "networking"
	prefix           = "foo-"
)

// Tests the Shared VPC + Networking blueprint using BlueprintTest helper
func TestNetworking(t *testing.T) {
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

// Tests network subpackages using BlueprintTest helper
func TestComposedNetworking(t *testing.T) {
	p := GlobalTestParameters()

	networkingTest := helpers.BlueprintTest{
		Name:            "Networking blueprints can be composed individually",
		TeardownCommand: fmt.Sprintf("../../scripts/reset_lz_blueprint.sh %s %s %s", p.Project, p.Org, p.BillingAccount),
		SetupCommand:    fmt.Sprintf("../../scripts/setup_networking_composed.sh %s %s %s %s %s", p.Project, networkName, networkNamespace, prefix, p.Org),
		KubernetesResourceList: []helpers.KubernetesResource{
			helpers.NewKccResource(networkNamespace, "ComputeSharedVPCHostProject", p.Project+"-sharedvpc"),
			helpers.NewKccResource(networkNamespace, "ComputeNetwork", networkName),
			helpers.NewKccResource(networkNamespace, "ComputeRouter", prefix+networkName+"-router"),
			helpers.NewKccResource(networkNamespace, "ComputeRouterNAT", prefix+networkName+"-router-nat"),
			helpers.NewKccResource(networkNamespace, "ComputeSubnetwork", prefix+networkName+"-subnetwork"),
			helpers.NewKccResource(networkNamespace, "ComputeRoute", networkName+"-route"),
			helpers.NewKccResource(networkNamespace, "ComputeFirewall", networkName+"-fw-allow-internal-common"),
			helpers.NewKccResource(networkNamespace, "ComputeFirewall", networkName+"-fw-allow-gcp-lb"),
			helpers.NewKccResource(networkNamespace, "ComputeFirewall", networkName+"-fw-allow-iap-ssh"),
			helpers.NewKccResource(networkNamespace, "ComputeFirewall", networkName+"-fw-allow-iap-rdp"),
			helpers.NewKccResource(networkNamespace, "ComputeFirewall", networkName+"-fw-deny-all-egress"),
			helpers.NewKccResource(networkNamespace, "ComputeFirewall", networkName+"-fw-allow-google-apis"),
			helpers.NewKccResource(networkNamespace, "ComputeFirewall", networkName+"-fw-allow-windows-kms"),
		},
		Parameters:   p,
		RetryCount:   30,
		PollDuration: 60 * time.Second,
	}

	networkingTest.Run(t)
}

// Tests dns subpackages using BlueprintTest helper
func TestDNSNetworking(t *testing.T) {
	p := GlobalTestParameters()

	networkingTest := helpers.BlueprintTest{
		Name:            "DNS blueprints can create respective compute resources via Yakima",
		TeardownCommand: fmt.Sprintf("../../scripts/reset_lz_blueprint.sh %s %s %s", p.Project, p.Org, p.BillingAccount),
		SetupCommand:    fmt.Sprintf("../../scripts/setup_networking_dns.sh %s %s %s %s", p.Project, networkName, networkNamespace, p.Org),
		KubernetesResourceList: []helpers.KubernetesResource{
			helpers.NewKccResource(networkNamespace, "ComputeNetwork", networkName),
			helpers.NewKccResource(networkNamespace, "ComputeNetwork", networkName+"-peer"),
			helpers.NewKccResource(networkNamespace, "DNSPolicy", networkName+"-policy"),
			helpers.NewKccResource(networkNamespace, "DNSManagedZone", networkName+"-mz-private"),
			helpers.NewKccResource(networkNamespace, "DNSRecordSet", networkName+"-mz-rs"),
			helpers.NewKccResource(networkNamespace, "DNSManagedZone", networkName+"-mz-fwd"),
			helpers.NewKccResource(networkNamespace, "DNSManagedZone", networkName+"-mz-peer"),
		},
		Parameters:   p,
		RetryCount:   30,
		PollDuration: 60 * time.Second,
	}

	networkingTest.Run(t)
}
