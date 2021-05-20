package main

import (
	"flag"
	"fmt"
	"log"
	"time"

	helpers "cnrm.googlesource.com/blueprints/bootstrap/tests/helpers"
)

func main() {
	setup := flag.Bool("setup", true, "setup yakima")
	project := flag.String("project", "", "Project to deploy in")
	clusterName := flag.String("cluster", fmt.Sprintf("probe-%d", time.Now().Unix()), "Cluster name")
	region := flag.String("region", "us-central1", "region")
	flag.Parse()
	if *setup {
		err := helpers.ExecuteStreamingCommand([]string{"./scripts/setup_yakima.sh", *project, *clusterName, *region, "yakima-source-repo", "yakima-deployment-repo"})
		if err != nil {
			log.Fatal("Yakima setup failed\n", err)
		}
	}
}
