const CARD_IMAGE = '/static/img/syntax/card.png';
const CARD_EXAMPLE = `elements {
  card gce

  card sql {
    name "Main database"
    description "Master"
  }
}`;

const STACKED_CARD_IMAGE = '/static/img/syntax/stacked_card.png';
const STACKED_CARD_EXAMPLE = `elements {
  stacked_card gce

  stacked_card sql {
    name "Main database"
    description "Master and Read Replica"
  }
}`;

const CUSTOM_ICON_IMAGE = '/static/img/syntax/custom_icon.png';
const CUSTOM_ICON_EXAMPLE = `# Refer to: go/gcpdraw-custom-icons
elements {
  card dogfoody {
    icon_url "https://drive.google.com/file/d/12zWhX8QfKB6hNEI4szwc5aUxA2HvuXbG/view"
    display_name "Dogfoody"
  }

  group google {
    icon_url "https://drive.google.com/file/d/1j0NsRl88Wo0Kuw_0bw11t66s30PIMnNq/view"

    card dory {
      icon_url "https://drive.google.com/file/d/1MpsltlqOaBcdkhwMiEiohSa5Pkyg7Gji/view"
    }
  }
}`;

const GROUP_IMAGE = '/static/img/syntax/group.png';
const GROUP_EXAMPLE = `elements {
  group stackdriver {
    name "Stackdriver"
    card logging
    card monitoring

    # group can be nested
    group apm {
      name "APM"
      background_color "#f6f6f6"
      card trace
      card debugger
    }
  }
}`;

const GCP_IMAGE = '/static/img/syntax/gcp.png';
const GCP_EXAMPLE = `elements {
  gcp {
    card gae
    card gke
  }
}`;

const PATHS_IMAGE = '/static/img/syntax/paths.png';
const PATHS_EXAMPLE = `elements {
  card run
  card spanner
  card datastore
  card gcs
}

paths {
  run --> spanner
  run ..> datastore
  run -down-> gcs

  # A --> B      : Arrow from A to B
  # A <-- B      : Arrow from B to A
  # A <--> B     : Bidirectional arrow
  # A ..> B      : Dotted line
  # A -right-> B  : Layout hint (right)
  # A -left-> B  : Layout hint (left)
  # A -down-> B  : Layout hint (downward)
  # A -up-> B    : Layout hint (upward)
  # A (-->) B    : Hidden path for layout hint
}`;

const META_IMAGE = '/static/img/syntax/meta.png';
const META_EXAMPLE = `meta {
  title "My Architecture"
}`;

const COMMENT_EXAMPLE = `# This is an inline comment`;


const obj = (keyword, image, example, classNameAddOn = '') => (
  {keyword, image, example, classNameAddOn}
)

const syntax = [
  obj('Card', CARD_IMAGE, CARD_EXAMPLE),
  obj('Stacked Card', STACKED_CARD_IMAGE, STACKED_CARD_EXAMPLE),
  obj('Custom Icon', CUSTOM_ICON_IMAGE, CUSTOM_ICON_EXAMPLE, 'tall'),
  obj('Group', GROUP_IMAGE, GROUP_EXAMPLE, 'tall'),
  obj('GCP', GCP_IMAGE, GCP_EXAMPLE),
  obj('Paths', PATHS_IMAGE, PATHS_EXAMPLE, 'tall'),
  obj('Meta', META_IMAGE, META_EXAMPLE, 'short'),
  obj('Comment', null, COMMENT_EXAMPLE, 'short')
];

export default syntax;
