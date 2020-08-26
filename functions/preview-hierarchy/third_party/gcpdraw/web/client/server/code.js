const code = `meta {
  title "Serverless Architecture"
}

elements {
  card phone
  card laptop

  gcp {
    stacked_card gae as frontend {
      name "Frontend"
      description "Autoscale"
    }

    group microservices {
      name "Microservices"
      stacked_card gae as service_a {
        name "User Service"
        description "Autoscale"
      }
      stacked_card run as service_b {
        name "Event Service"
        description "Autoscale"
      }
    }

    card firestore {
      name "Datastore mode"
    }
    card tasks {
      name "Asynchronous task"
    }
    card scheduler {
      name "Periodical task"
    }

    card run as tasks_target {
      name "Push to Devices"
    }
  }

  card mobile_devices
}

paths {
  phone --> frontend
  laptop --> frontend

  frontend --> service_a
  frontend --> service_b

  service_a --> firestore

  service_a --> tasks
  tasks -down-> tasks_target
  tasks_target --> mobile_devices
  scheduler --> service_b
}
`

const codeComplex = `meta {
  title "Event Processing"
}

elements {
  gcp {
    group data_ingestion {
      name "Data Ingestion"
      group streaming {
        name "Streaming"
        card gce
        card gae
        card logging
        card pubsub
      }

      group batch {
        name "Batch"
        card gcs
      }
    }

    group data_processing {
      name "Data Processing"
      background_color "#eceff1"

      card dataflow as df_streaming {
        name "Streaming"
      }
      card dataflow as df_batch {
        name "Batch"
      }
    }

    group data_analytics {
      name "Data Analytics"
      card bigquery
      card datalab
    }

    group application {
      name "Application"
      card bigtable
      card gke
    }
  }
}

paths {
  gce --> pubsub
  gae --> pubsub
  logging --> pubsub
  pubsub --> df_streaming
  df_streaming --> bigquery
  bigquery -down-> datalab
  gcs --> df_batch
  df_batch --> bigtable
  bigtable -down-> gke
}
`

module.exports = {
  code,
  codeComplex
};
