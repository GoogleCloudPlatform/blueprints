// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package simple_network_test

import (
	"fmt"
	"strconv"
	"strings"
	"testing"

	"github.com/GoogleCloudPlatform/cloud-foundation-toolkit/infra/blueprint-test/pkg/gcloud"
	"github.com/GoogleCloudPlatform/cloud-foundation-toolkit/infra/blueprint-test/pkg/krmt"
	"github.com/GoogleCloudPlatform/cloud-foundation-toolkit/infra/blueprint-test/pkg/utils"
	"github.com/gruntwork-io/terratest/modules/k8s"
	"github.com/stretchr/testify/assert"
)

func TestSimpleNetwork(t *testing.T) {
	vpnSecret := "vpn-shared-secret"
	networkingNS := "config-control"

	// VPN creation requires a secret to be present in the networking ns
	k8sOpts := k8s.KubectlOptions{Namespace: networkingNS}
	// check if secret exist, create if not
	_, err := k8s.GetSecretE(t, &k8sOpts, vpnSecret)
	if err != nil {
		t.Logf("error getting secret: %s error:%v", vpnSecret, err)
		t.Logf("attempting to create secret: %s", vpnSecret)
		k8s.RunKubectl(t, &k8sOpts, "create", "secret", "generic", vpnSecret, "--from-literal", fmt.Sprintf("%s=%s", vpnSecret, utils.RandStr(5)))
	}
	// start test
	networkTest := krmt.NewKRMBlueprintTest(t)
	// define a custom verify function
	networkTest.DefineVerify(
		func(assert *assert.Assertions) {
			// call default assert with asserts that all resources were created and no changes since apply
			networkTest.DefaultVerify(assert)
			projectID := utils.ValFromEnv(t, "PROJECT_ID")
			// most resources use the same region and project, so we can store them as common arguments when calling gcloud
			gcCommonArgs := gcloud.WithCommonArgs([]string{"--region", "us-central1", "--project", projectID, "--format", "json"})

			// VPC
			vpc := gcloud.Run(t, fmt.Sprintf("compute networks describe simple-network --project %s", projectID))
			assert.Equal("GLOBAL", vpc.Get("routingConfig.routingMode").String(), "VPC routing mode is global")
			assert.Equal(1, len(vpc.Get("subnetworks").Array()), "should have only one subnet")
			subnetSelfLink := vpc.Get("subnetworks").Array()[0].String()
			subnetName := subnetSelfLink[strings.LastIndex(subnetSelfLink, "/")+1:]
			assert.Equal("simple-network-subnetwork", subnetName, "should have correct subnet")

			// Subnet
			subnet := gcloud.Run(t, "compute networks subnets describe simple-network-subnetwork", gcCommonArgs)
			assert.Equal("10.2.0.0/16", subnet.Get("ipCidrRange").String(), "should have the right CIDR")
			assert.Equal("true", subnet.Get("logConfig.enable").String(), "logConfig should be enabled")
			assert.Equal("0.5", subnet.Get("logConfig.flowSampling").String(), "logConfig flowSampling should be 0.5")

			// Router
			router := gcloud.Run(t, "compute routers describe simple-network-router", gcCommonArgs)
			assert.Equal(vpc.Get("selfLink").String(), router.Get("network").String(), "should be attached to VPC")
			assert.Equal(1, len(router.Get("nats").Array()), "should have only one nat")
			assert.Equal("simple-network-router-nat", router.Get("nats").Array()[0].Get("name").String(), "should have only one nat")

			// NAT
			nat := gcloud.Run(t, fmt.Sprintf("compute routers nats describe simple-network-router-nat --router simple-network-router --router-region us-central1 --project %s", projectID))
			assert.Equal("AUTO_ONLY", nat.Get("natIpAllocateOption").String(), "natIpAllocateOption should be AUTO_ONLY")
			assert.Equal("ALL_SUBNETWORKS_ALL_IP_RANGES", nat.Get("sourceSubnetworkIpRangesToNat").String(), "sourceSubnetworkIpRangesToNat should be ALL_SUBNETWORKS_ALL_IP_RANGES")

			// VPN Gateway
			vpnGW := gcloud.Run(t, "compute vpn-gateways describe simple-network-ha-vpn-gateway", gcCommonArgs)
			assert.Equal(vpc.Get("selfLink").String(), vpnGW.Get("network").String(), "should be attached to VPC")

			// VPN External Gateway
			vpnExternalGW := gcloud.Run(t, fmt.Sprintf("compute external-vpn-gateways describe simple-network-ext-vpn-gateway --project %s", projectID))
			assert.Equal("TWO_IPS_REDUNDANCY", vpnExternalGW.Get("redundancyType").String(), "redundancyType should be TWO_IPS_REDUNDANCY")
			assert.Equal(2, len(vpnExternalGW.Get("interfaces").Array()), "external GW has two interfaces")
			assert.Equal("15.1.0.120", vpnExternalGW.Get("interfaces").Array()[0].Get("ipAddress").String(), "first interface has correct ip address")
			assert.Equal("15.1.1.120", vpnExternalGW.Get("interfaces").Array()[1].Get("ipAddress").String(), "second interface has correct ip address")

			// VPN Tunnels
			expectedTunnels := []string{"simple-network-vpn-tunnel-01", "simple-network-vpn-tunnel-02"}
			for i, expected := range expectedTunnels {
				tunnel := gcloud.Run(t, fmt.Sprintf("compute vpn-tunnels describe %s", expected), gcCommonArgs)
				assert.Equal(strconv.Itoa(i), tunnel.Get("peerExternalGatewayInterface").String(), "tunnel is attached to expected peerExternalGatewayInterface")
				assert.Equal(vpnGW.Get("selfLink").String(), tunnel.Get("vpnGateway").String(), "tunnel is attached to expected vpnGateway")
			}
		})

	// run the test
	networkTest.Test()
}
