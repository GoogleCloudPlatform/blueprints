const code = `meta {
  title "Simple Example"
}

elements {
  card pc
  card smartphone

  gcp {
    card gclb
    card storage
    card gke
    
    group vpc {
      name "VPC (default network)"
      card gce
      card sql as database
    }

    stacked_card gae {
      name "Microservices"
      description "Auto scale"
    }
  }
}

paths {
  pc --> gclb
  smartphone --> gclb
  gclb --> storage
  gclb --> gke
  gke --> gae
  gke --> gce
  gce ..> database
}
`
export default code;
