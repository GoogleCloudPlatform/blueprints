const code = `elements {
  gcp {
    group g1 {
      card gce
      card gcf
      card gae
    }

    group g2 {
      card gke
    }

    group g3 {
      card run
    }
  }
}

paths {
  gce --> gke
  gke --> run
  gce --> run
  gcf --> run

  gce -down-> gae
  gae -down-> gcf
}
`
export default code;
