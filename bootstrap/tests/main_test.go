package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"testing"
	"time"

	helpers "cnrm.googlesource.com/blueprints/bootstrap/tests/helpers"
)

var timestamp = time.Now().Unix()
var project string
var org string
var billingAccount string

func GlobalTestParameters() helpers.Parameters {
	return helpers.Parameters{
		Project:           project,
		SourceRepo:        "yakima-source-repo",
		DeploymentRepo:    "yakima-deployment-repo",
		CloudBuildTrigger: "yakima-source-repo-cicd-trigger",
		Namespace:         "yakima-system",
		Cluster:           fmt.Sprintf("probe-%d", timestamp),
		Region:            "us-central1",
		Org:               org,
		BillingAccount:    billingAccount,
	}
}

func TestMain(m *testing.M) {
	flag.StringVar(&project, "project", "blueprints-eap-testing", "project to run your tests on")
	flag.StringVar(&org, "org", "98363893875", "org to run your tests on (must be parent org of project)")
	flag.StringVar(&billingAccount, "billing-account", "019970-D6BDB5-6AF850", "the billing account ID linked to your project")
	flag.Parse()

	p := GlobalTestParameters()

	log.Printf("Executing tests using project '%s' in org '%s' with billing account '%s'", project, org, billingAccount)

	err := helpers.ExecuteStreamingCommand([]string{"./scripts/setup_yakima.sh", p.Project, p.Cluster, p.Region, p.SourceRepo, p.DeploymentRepo})
	if err != nil {
		log.Fatal("Yakima setup failed\n", err)
	}

	testExitCode := m.Run()

	err = helpers.ExecuteStreamingCommand([]string{"./scripts/teardown_yakima.sh", p.Project, p.Cluster})
	if err != nil {
		log.Fatal("Yakima teardown failed\n", err)
	}

	os.Exit(testExitCode)
}
