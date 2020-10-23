package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"testing"
	"time"

	helpers "tests.helpers"
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

func TestMain(m *testing.M) {
	p := GlobalTestParameters()
	// TODO(jcwc): This command doesn't output in real time and can run for a long time
	out, err := exec.Command("./scripts/setup_yakima.sh", p.Project, p.Cluster, p.Region, p.SourceRepo).CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		log.Fatal("Yakima setup failed\n", err)
	}

	testExitCode := m.Run()

	// TODO(jcwc): This command doesn't output in real time and can run for a long time
	out, err = exec.Command("./scripts/teardown_yakima.sh", p.Project, p.Cluster).CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		log.Fatal("Yakima teardown failed\n", err)
	}

	os.Exit(testExitCode)
}
