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

package simple_bucket_test

import (
	"fmt"
	"testing"

	"github.com/GoogleCloudPlatform/cloud-foundation-toolkit/infra/blueprint-test/pkg/gcloud"
	"github.com/GoogleCloudPlatform/cloud-foundation-toolkit/infra/blueprint-test/pkg/krmt"
	"github.com/GoogleCloudPlatform/cloud-foundation-toolkit/infra/blueprint-test/pkg/utils"
	"github.com/stretchr/testify/assert"
)

func TestSimpleBucket(t *testing.T) {
	bucketName := "test-bucket"
	bucketTest := krmt.NewKRMBlueprintTest(t)
	bucketTest.DefineVerify(
		func(assert *assert.Assertions) {
			bucketTest.DefaultVerify(assert)
			projectID := utils.ValFromEnv(t, "PROJECT_ID")
			// alpha command to list buckets has --json instead of format=json
			op := gcloud.Run(t, fmt.Sprintf("alpha storage ls --buckets gs://%s-%s --project %s", projectID, bucketName, projectID), gcloud.WithCommonArgs([]string{"--json"}))

			// gcloud command returns a list of matching buckets
			matchedBuckets := op.Array()
			assert.Equal(1, len(matchedBuckets), "only one matching bucket exists")
			assert.True(matchedBuckets[0].Get("metadata.iamConfiguration.uniformBucketLevelAccess.enabled").Bool(), "uniformBucketLevelAccess is enabled")
			assert.Equal("STANDARD", matchedBuckets[0].Get("metadata.storageClass").String(), "storageClass is standard")
		})
	bucketTest.Test()
}
