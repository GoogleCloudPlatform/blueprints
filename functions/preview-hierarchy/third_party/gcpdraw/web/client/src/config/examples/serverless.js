const code = `meta {
  title "Serverless Architecture"
}

elements {
  card phone
  card laptop

  gcp {
    card gclb {
      name "Frontend"
      description "w/Serverless NEG"
    }

    group microservices {
      name "Microservices"
      stacked_card gae as service_a {
        name "User Service"
        description "Autoscale"
      }
      stacked_card run as service_b {
        name "Billing Service"
        description "Autoscale"
      }
      stacked_card gcf as service_c {
        name "Event Service"
        description "Max Instances: 10"
      }
    }

    card firestore {
      name "Datastore mode"
    }
    card tasks {
      name "Asynchronous task"
    }

    card run as tasks_target {
      name "Push to Devices"
    }
  }

  card mobile_devices
}

paths {
  phone --> gclb
  laptop --> gclb

  gclb --> service_a
  gclb --> service_b
  gclb --> service_c

  service_a --> firestore

  service_a --> tasks
  tasks -down-> tasks_target
  tasks_target --> mobile_devices
}`
export default code;
