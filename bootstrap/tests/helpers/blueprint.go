package helpers

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
	"testing"
	"time"
)

type Parameters struct {
	Project           string
	SourceRepo        string
	Namespace         string
	Cluster           string
	Region            string
	Org               string
	BillingAccount    string
	DeploymentRepo    string
	CloudBuildTrigger string
}

// Parameters which specify what to run for blueprints tests
type BlueprintTest struct {
	Name                   string
	TeardownCommand        string               // i.e. "./teardown.sh my-project-id"
	SetupCommand           string               // i.e. "./networking/setup.sh my-project-id"
	KubernetesResourceList []KubernetesResource // The list of resources to check for after blueprint is applied
	Parameters             Parameters
	RetryCount             int           // How many retry loops to poll kubectl with
	PollDuration           time.Duration // The intervals in between each retry loop
}

func (b *BlueprintTest) runScriptAndVerify(t *testing.T, sourceRepoPath string, command string, retryCount int, pollDuration time.Duration, deletion bool) error {
	p := b.Parameters

	t.Logf("Running command: %s", command)
	cmdArr := strings.Split(command, " ")
	cmd := exec.Command(cmdArr[0], cmdArr[1:]...)
	cmd.Dir = sourceRepoPath
	out, err := cmd.CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		return err
	}

	t.Log("Polling Cloudbuild status...")
	// Retry 3 times since sometimes cloudbuild takes some time to trigger
	if err := Poll(func() (bool, error) {
		if err = PollCloudBuild(p.Project, p.SourceRepo); err != nil {
			return true, err
		}
		return false, nil
	}, 3, 1*time.Second); err != nil {
		return err
	}

	t.Log("Verifying Kubernetes resources...")
	if err := VerifyKubernetesResources(b.KubernetesResourceList, retryCount, pollDuration, deletion); err != nil {
		return err
	}

	return nil
}

/**
 * Runs an end to end blueprints test given the BlueprintTest parameters that the
 * struct was initialized with. This test:
 *   1. Executes teardown script provided and polls for cloudbuild to complete
 *   2. Executes setup script provided and polls for cloudbuild to complete
 *   3. Checks for resources to be ready using kubectl
 *   4. Executes the teardown script again to bring the test back to the clean state
 */
func (b *BlueprintTest) Run(t *testing.T) {
	// Set defaults
	retryCount := b.RetryCount
	pollDuration := b.PollDuration

	if retryCount == 0 {
		retryCount = 10
	}

	if pollDuration == 0 {
		pollDuration = 30 * time.Second
	}

	t.Logf("Running test: '%s'\n", b.Name)

	p := b.Parameters
	sourceRepoPath := "build/" + p.SourceRepo

	err := os.MkdirAll("build", 0755)
	if err != nil {
		t.Fatal("Could not make directory 'build'")
	}

	if err := os.RemoveAll(sourceRepoPath); err != nil {
		t.Fatalf("Could not delete source repo path: %s", sourceRepoPath)
	}

	out, err := exec.Command("gcloud", "source", "repos", "clone", p.SourceRepo, sourceRepoPath, "--project", p.Project).CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		t.Fatal("Could not clone source repo\n", err)
	}

	t.Log("Setting up resources...")

	if err := b.runScriptAndVerify(t, sourceRepoPath, b.SetupCommand, retryCount, pollDuration, false); err != nil {
		t.Fatal("Setup failed\n", err)
	}

	t.Cleanup(func() {
		if err := b.runScriptAndVerify(t, sourceRepoPath, b.TeardownCommand, retryCount, pollDuration, true); err != nil {
			t.Error("Test was successful but teardown failed\n", err)
		}
	})
}
