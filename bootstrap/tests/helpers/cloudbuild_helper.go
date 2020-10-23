package helpers

import (
	"context"
	"fmt"
	"log"
	"os/exec"
	"strings"
	"time"

	cloudbuild "cloud.google.com/go/cloudbuild/apiv1"
	cloudbuildpb "google.golang.org/genproto/googleapis/devtools/cloudbuild/v1"
)

func commitSha(sourceRepo string) (string, error) {
	sourceRepoDir := "build/" + sourceRepo
	cmd := exec.Command("git", "rev-parse", "HEAD")
	cmd.Dir = sourceRepoDir

	out, err := cmd.CombinedOutput()
	return strings.TrimSpace(string(out)), err
}

// Takes latest commit of a source repo and polls CloudBuild until status is neither
// WORKING or QUEUED. Returns an error object if status is not SUCCESS
func PollCloudBuild(project string, sourceRepo string) error {
	commit, err := commitSha(sourceRepo)
	if err != nil {
		return err
	}

	log.Printf("Polling cloudbuild results for commit: %s", commit)

	ctx := context.Background()
	c, err := cloudbuild.NewClient(ctx)
	if err != nil {
		return err
	}

	req := &cloudbuildpb.ListBuildsRequest{
		ProjectId: project,
		Filter:    fmt.Sprintf("source.repo_source.commit_sha=\"%s\"", commit),
	}

	itr := c.ListBuilds(ctx, req)

	build, err := itr.Next()
	if err != nil {
		return err
	}

	err = Poll(func() (bool, error) {
		log.Println("Build in progress... This may take a while...")
		req := &cloudbuildpb.GetBuildRequest{
			ProjectId: project,
			Id:        build.Id,
		}

		build, err = c.GetBuild(ctx, req)
		if err != nil {
			return false, err
		} else {
			return build.Status == 1 || build.Status == 2, nil // QUEUED or WORKING
		}
	}, 30, 10*time.Second)

	logsUrl := fmt.Sprintf("https://console.cloud.google.com/cloud-build/builds/%s?project=%s", build.Id, project)

	if err != nil {
		return err
	} else if build.Status == 3 { // SUCCESS
		log.Printf("Build succeeded. Logs found: %s\n", logsUrl)
	} else { // Any other codes
		return fmt.Errorf("Build failed with a status: %d.\nLogs found: %s", build.Status, logsUrl)
	}

	return nil
}
