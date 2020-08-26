const code = `meta {
  title "CI/CD Pipeline"
}

elements {
  card users as developers {
    display_name "Developers"
  }
  card server as git {
    display_name "Git"
  }

  gcp {
    card generic as csr {
      display_name "Cloud Source Repositories"
      name "Git Replication"
    }
    card build {
      name "Managed Build"
      description "Build and Deploy"
    }
    card gcr
    card spinnaker {
      name "Deploy Server"
    }
    card gke as dev_gke {
      name "Dev Cluster"
    }
    card gke as prod_gke {
      name "Prod Cluster"
    }
  }

  card users as developers2 {
    display_name "Trigger"
  }

  card users as qa {
    display_name "QA"
  }
}

paths {
  developers -down-> git
  git ..> csr
  csr --> build
  build -up-> gcr
  build -down-> dev_gke
  dev_gke <-down- qa
  build --> spinnaker
  spinnaker -down-> prod_gke
  spinnaker <-- developers2
}`
export default code;
