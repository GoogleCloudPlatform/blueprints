const code = `meta {
  title "Mobile Backend"
}

elements {
  card phone {
    display_name "Mobile App"
  }

  gcp {
    card endpoints

    group services {
      name "Microservices"

      stacked_card gae as service_a {
        name "Service A"
        description "Auto Scaling"
      }
      stacked_card gae as service_b {
        name "Service B"
        description "Auto Scaling"
      }
      stacked_card gae as service_c {
        name "Service C"
        description "Auto Scaling"
      }
    }
    
    card datastore {
      name "Main Database"
    }
  }

  card firebase {
    name "Authentication"
    description "AuthN & AuthZ"
  }
}

paths {
  phone -up-> firebase
  
  phone --> endpoints
  endpoints --> service_a
  endpoints --> service_b
  endpoints --> service_c

  service_a --> datastore
  service_b --> datastore
  service_c --> datastore
}
`
export default code;