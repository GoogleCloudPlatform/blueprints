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

func installGitOps(p helpers.Parameters) {
	csrGitOpsBlueprintPath := "build/csr-git-ops-pipeline"
	projectNumber, err := exec.Command("gcloud", "projects", "describe", p.Project, "--format=get(projectNumber)").CombinedOutput()
	if err != nil {
		fmt.Println(string(projectNumber))
		log.Fatal("Could not get project number\n", err)
	}

	err = helpers.ExecuteCommands([][]string{
		[]string{"rm", "-rf", csrGitOpsBlueprintPath},
		[]string{"mkdir", "-p", "build"},
		[]string{"cp", "-rf", "../../blueprints/git-ops/csr-git-ops-pipeline", csrGitOpsBlueprintPath},
		[]string{"kpt", "cfg", "set", csrGitOpsBlueprintPath, "namespace", p.Namespace},
		[]string{"kpt", "cfg", "set", csrGitOpsBlueprintPath, "project-id", p.Project},
		[]string{"kpt", "cfg", "set", csrGitOpsBlueprintPath, "project-number", strings.TrimSpace(string(projectNumber))},
		[]string{"kpt", "cfg", "set", csrGitOpsBlueprintPath, "source-repo", p.SourceRepo},
		[]string{"kpt", "cfg", "set", csrGitOpsBlueprintPath, "deployment-repo", p.DeploymentRepo},
		[]string{"kpt", "cfg", "list-setters", csrGitOpsBlueprintPath},
		[]string{"kubectl", "apply", "--wait", "-f", csrGitOpsBlueprintPath},
		[]string{"kubectl", "wait", "--for=condition=READY", "--timeout=30m", "-f", csrGitOpsBlueprintPath + "/source-repositories.yaml"},
		[]string{"kubectl", "wait", "--for=condition=READY", "--timeout=30m", "-f", csrGitOpsBlueprintPath + "/hydration-trigger.yaml"},
		[]string{"kubectl", "wait", "--for=condition=READY", "--timeout=30m", "-f", csrGitOpsBlueprintPath + "/iam.yaml"},
	}, ".")

	if err != nil {
		log.Fatal("Could not install Git Ops blueprint\n", err)
	}
}

func TestMain(m *testing.M) {
	p := GlobalTestParameters()
	// TODO(jcwc): This command doesn't output in real time and can run for a long time
	out, err := exec.Command("./scripts/setup_yakima.sh", p.Project, p.Cluster, p.Region, p.SourceRepo, p.DeploymentRepo).CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		log.Fatal("Yakima setup failed\n", err)
	}

	installGitOps(p)

	testExitCode := m.Run()

	// TODO(jcwc): This command doesn't output in real time and can run for a long time
	out, err = exec.Command("./scripts/teardown_yakima.sh", p.Project, p.Cluster).CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		log.Fatal("Yakima teardown failed\n", err)
	}

	os.Exit(testExitCode)
}
