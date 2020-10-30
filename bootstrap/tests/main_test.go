package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
	"testing"
	"time"

	helpers "cnrm.googlesource.com/blueprints/bootstrap/tests/helpers"
)

var timestamp = time.Now().Unix()

func GlobalTestParameters() helpers.Parameters {
	return helpers.Parameters{
		Project:           "blueprints-eap-testing",
		SourceRepo:        "yakima-source-repo",
		DeploymentRepo:    "yakima-deployment-repo",
		CloudBuildTrigger: "yakima-source-repo-cicd-trigger",
		Namespace:         "yakima-system",
		Cluster:           fmt.Sprintf("probe-%d", timestamp),
		Region:            "us-central1",
		Org:               "98363893875",
		BillingAccount:    "019970-D6BDB5-6AF850",
	}
}

// From: https://docs.google.com/document/d/1VeC6cNo5vsD3-niYNZYfWZxsrqGxoKjpfDSY5QLH3a4/edit#
// TODO(b/171985454): Delete this function once ACP push to prod is successful
func acpWorkarounds() {
	err := helpers.ExecuteCommands([][]string{
		strings.Split("kubectl delete --wait Deployment bootstrap -n krmapihosting-system --ignore-not-found", " "),
		strings.Split("gsutil cp gs://configconnector-operator/latest/release-bundle.tar.gz build/release-bundle.tar.gz", " "),
		strings.Split("tar zxvf build/release-bundle.tar.gz -C build", " "),
	}, ".")

	if err != nil {
		log.Fatal("ACP workarounds failed with error:\n", err)
	}

	err = helpers.Poll(func() (bool, error) {
		err := helpers.ExecuteCommands([][]string{
			strings.Split("kubectl apply -f build/operator-system/configconnector-operator.yaml", " "),
		}, ".")

		return err != nil, err
	}, 120, 5)

	if err != nil {
		log.Fatal("Could not apply Config Connector workaround...\n", err)
	}
}

func TestMain(m *testing.M) {
	p := GlobalTestParameters()
	// TODO(jcwc): This command doesn't output in real time and can run for a long time
	out, err := exec.Command("./scripts/setup_yakima.sh", p.Project, p.Cluster, p.Region, p.SourceRepo).CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		log.Fatal("Yakima setup failed\n", err)
	}

	// TODO(b/171985454): Delete this function once ACP push to prod is successful
	acpWorkarounds()

	testExitCode := m.Run()

	// TODO(jcwc): This command doesn't output in real time and can run for a long time
	out, err = exec.Command("./scripts/teardown_yakima.sh", p.Project, p.Cluster).CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		log.Fatal("Yakima teardown failed\n", err)
	}

	os.Exit(testExitCode)
}
