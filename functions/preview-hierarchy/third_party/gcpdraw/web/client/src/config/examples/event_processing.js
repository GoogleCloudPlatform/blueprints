const code = `meta {
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
export default code;
