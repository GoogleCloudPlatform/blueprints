const code = `meta {
  title "Hybrid Clouds"
}

elements {
  card users {
    display_name "End Users"
  }
  card users as users2 {
    display_name "End Users"
  }

  gcp {
    card gclb {
      name "Ingress"
      description "ingress-gce"
    }
    card gke {
      name "GKE"
    }
    card service_mesh as istio_on_gke {
      name "Service Mesh"
    }
  }

  group common {
    name "Common Components"

    card stackdriver
    card build
    card gcr
  }

  card dedicated_interconnect

  group onprem {
    name "On-Prem Data Center"
    background_color "#efebe9"

    card server as lb_onprem {
      display_name "Ingress"
    }
    card gke_onprem {
      name "On-Prem Servers"
    }
    card istio as istio_onprem {
      name "Service Mesh"
    }
  }
}

paths {
  users --> gclb
  gclb -down-> gke
  gke -down-> istio_on_gke

  gke ..> common
  common <.. gke_onprem

  istio_on_gke <--> dedicated_interconnect
  dedicated_interconnect <--> istio_onprem

  gke_onprem <-up- lb_onprem
  gke_onprem -down-> istio_onprem
  lb_onprem <-- users2
}`
export default code;
