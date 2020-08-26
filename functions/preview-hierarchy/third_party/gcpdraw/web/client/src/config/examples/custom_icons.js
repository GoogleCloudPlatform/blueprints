const code = `meta {
  title "Custom Icons"
}

elements {
  card users
  card dog {
    icon_url "https://drive.google.com/file/d/12zWhX8QfKB6hNEI4szwc5aUxA2HvuXbG/view"
  }
  card desktop
  card recaptcha {
    icon_url "https://drive.google.com/file/d/1oDJGaU5WTmzLrHjh0NVLGcbo55LIvKry/view"
    display_name "Recaptcha"
  }

  group google {
    name "Google"
    icon_url "https://drive.google.com/file/d/1j0NsRl88Wo0Kuw_0bw11t66s30PIMnNq/view"

    group plx {
      name "Plx"
      card dashboard {
        icon_url "https://drive.google.com/file/d/1SrJC7jQTuCwBtR2bD2wplRsKBPGw_r4T/view"
        display_name "Plx Dashboard"
      }
      card script {
        icon_url "https://drive.google.com/file/d/1IQKbt6xeqGftL5704Z537rwMUlYPkuIj/view"
        display_name "Plx Scripts"
      }
      card dataset {
        icon_url "https://drive.google.com/file/d/1mAnvuZMf3x6uzdxDmqubu4ZkzF6QDlk7/view"
        display_name "Plx Dataset"
      }
    }
  }
}

paths {
  users --> recaptcha
  dog --> recaptcha
  recaptcha --> desktop
  desktop --> dashboard
  dashboard .down.> script
  script .down.> dataset
}`
export default code;
