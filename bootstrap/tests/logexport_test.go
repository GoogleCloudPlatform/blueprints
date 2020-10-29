package main

import (
	"fmt"
	"testing"
	"time"

	helpers "cnrm.googlesource.com/blueprints/bootstrap/tests/helpers"
)

const folderName = "blueprints-test-folder"
const loggingNamespace = "logging"

func TestLogExportFromOrgToBigQuery(t *testing.T) {
	p := GlobalTestParameters()
	runLogExportTest(t, p, "org", "bigquery-export", []helpers.KubernetesResource{
		helpers.NewKccResource(loggingNamespace, "BigQueryDataset", "bqlogexportdataset"),
		helpers.NewKccResource(loggingNamespace, "LoggingLogSink", p.Org+"-bqsink"),
		helpers.NewKccResource(loggingNamespace, "IAMPolicyMember", "bq-project-iam-policy"),
	})
}

// TODO(jcwc): Enable these tests once we get other log export blueprints working
// func TestLogExportFromOrgToPubsub(t *testing.T) {
// 	p := GlobalTestParameters()
// 	runLogExportTest(t, p, "org", "pubsub-export", []helpers.KubernetesResource{
// 		helpers.NewKccResource(loggingNamespace, "PubSubTopic", "pubsub-logexport-dataset"),
// 		helpers.NewKccResource(loggingNamespace, "LoggingLogSink", p.Org+"-pubsubsink"),
// 		helpers.NewKccResource(loggingNamespace, "IAMPolicyMember", "pubsub-iam-policy"),
// 	})
// }

// func TestLogExportFromOrgToStorage(t *testing.T) {
// 	p := GlobalTestParameters()
// 	runLogExportTest(t, p, "org", "storage-export", []helpers.KubernetesResource{
// 		helpers.NewKccResource(loggingNamespace, "StorageBucket", "my-storage-bucket"),
// 		helpers.NewKccResource(loggingNamespace, "LoggingLogSink", p.Org+"-storagesink"),
// 		helpers.NewKccResource(loggingNamespace, "IAMPolicyMember", "storage-project-iam-policy"),
// 	})
// }

// func TestLogExportFromFolderToBigQuery(t *testing.T) {
// 	p := GlobalTestParameters()
// 	runLogExportTest(t, p, "folder", "bigquery-export", []helpers.KubernetesResource{
// 		helpers.NewKccResource(loggingNamespace, "BigQueryDataset", "bqlogexportdataset"),
// 		helpers.NewKccResource(loggingNamespace, "LoggingLogSink", folderName+"-bqsink"),
// 		helpers.NewKccResource(loggingNamespace, "IAMPolicyMember", "bq-project-iam-policy"),
// 	})
// }

// func TestLogExportFromFolderToPubSub(t *testing.T) {
// 	p := GlobalTestParameters()
// 	runLogExportTest(t, p, "folder", "pubsub-export", []helpers.KubernetesResource{
// 		helpers.NewKccResource(loggingNamespace, "PubSubTopic", "pubsub-logexport-dataset"),
// 		helpers.NewKccResource(loggingNamespace, "LoggingLogSink", folderName+"-pubsubsink"),
// 		helpers.NewKccResource(loggingNamespace, "IAMPolicyMember", "pubsub-iam-policy"),
// 	})
// }

// func TestLogExportFromFolderToStorage(t *testing.T) {
// 	p := GlobalTestParameters()
// 	runLogExportTest(t, p, "folder", "storage-export", []helpers.KubernetesResource{
// 		helpers.NewKccResource(loggingNamespace, "StorageBucket", "my-storage-bucket"),
// 		helpers.NewKccResource(loggingNamespace, "LoggingLogSink", folderName+"-storagesink"),
// 		helpers.NewKccResource(loggingNamespace, "IAMPolicyMember", "storage-project-iam-policy"),
// 	})
// }

func runLogExportTest(t *testing.T, p helpers.Parameters, orgOrFolder string, logExportType string, resourceList []helpers.KubernetesResource) {
	if orgOrFolder != "org" && orgOrFolder != "folder" {
		t.Fatalf("Invalid 'orgOrFolder' field to runLogExportTest. Got '%s', but expected either 'org' or 'folder'", orgOrFolder)
	}

	if logExportType != "bigquery-export" && logExportType != "pubsub-export" && logExportType != "storage-export" {
		t.Fatalf("Invalid 'logExportType' field to runLogExportTest. Got '%s', but expected 'bigquery-export', 'pubsub-export' or 'storage-export'", logExportType)
	}

	test := helpers.BlueprintTest{
		Name:                   fmt.Sprintf("Folder %s export blueprint can be actuated with Yakima", logExportType),
		TeardownCommand:        fmt.Sprintf("../../scripts/reset_lz_blueprint.sh %s %s %s", p.Project, p.Org, p.BillingAccount),
		SetupCommand:           fmt.Sprintf("../../scripts/setup_%s_logexport.sh %s %s %s %s", orgOrFolder, p.Project, logExportType, p.Org, folderName),
		KubernetesResourceList: resourceList,
		Parameters:             p,
		RetryCount:             60,
		PollDuration:           15 * time.Second,
	}

	test.Run(t)
}
