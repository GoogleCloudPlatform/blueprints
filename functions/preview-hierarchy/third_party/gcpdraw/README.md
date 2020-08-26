# gcpdraw ([go/gcpdraw](https://goto.google.com/gcpdraw))

Architecture diagram as code.

With this tool you can draw GCP architecture diagrams with code.

## Example

This is an example diagram text.

```
meta {
  title "Example Architecture"
}

elements {
  card laptop
  card phone

  gcp {
    card gclb
    card storage

    group vpc {
      card gke {
        name "Frontend Server"
        description "Multiple Pods"
      }
      card gce as vm1 {
        name "Media Server"
      }
      card gce as vm2 {
        name "Backend Server"
      }
    }
  }
}

paths {
  laptop --> gclb
  phone --> gclb

  gclb --> gke
  gke -down-> vm1
  gke --> vm2

  vm1 ..> storage
}
```

## Syntax

There are three top level keywords: `meta`, `elements`, and `paths`.

### Meta

In `meta` keyword, you can define the title of this diagram with `title` keyword.

```
meta {
  title "My Architecture"
}
```

### Elements

In `elements` keyword, you can define elements (like cards, groups) for the diagram.

```
elements {
  card gke
  card gce
  
  gcp {
    group mygroup {
      card pubsub
    }
  }
}
```

#### Card

`card` or `stacked_card` are basic elements for diagram components. Cards are defined inside `elements{}`, `group{}`, or `gcp{}`.

You can specify name and description of the card by `name` and `description` keyword respectively.
Also using `as` keyword, you can add alias name for the card so that the alias name can be used in `paths{}` later.

```
card pc

card gce as vm1
card gce as vm2

card gae {
  name "API Server"
  description "Auto Scaling"
}
  
stacked_card gke {
  name "Media Server"
}
```

You can check available cards in `Cards` tab of [gcpdraw](go/gcpdraw).

#### Group

`group` is for grouping multiple cards into a group.

You can specify groups inside `elements{}` or `gcp{}`. You can define group names with `name` keyword.

Background color for the group can be changed with `background_color` keyword.

```
group vpc {
  name "VPC sharing GKE and GCE"
  background_color "#fbe9e7"
  
  card gke
  card gce
}
```

group can be nested.

#### GCP

`gcp` is for grouping multiple cards and groups into a GCP zone.

```
gcp {
  card spanner

  card gae {
    name "API Server"
    description "Auto Scaling"
  }
  
  group vpc {
    stacked_card gke
  }
}
```

### Paths

With `pahts` keyword, you can specify connections between elements.

```
paths {
  gae --> pubsub
  pubsub --> storage
  
  gce <-- gke
  
  pubsub ..> dataflow
}
```

There are several notations for paths.

| Notation | What |
|----------|------|
| A `-->` B | arrow from A to B |
| A `<--` B | arrow from B to A |
| A `<-->` B | bidirectional arrow between A and B |
| A `..>` B | arrow from A to B with dotted line |
| A `-down->` B | layout hint: downward |
| A `-up->` B | layout hint: upward |
| A `-right->` B | layout hint: right (default) |
| A `(-->)` B | Hidden path for layout hint |

### Comment

```
# This is an inline comment
```

## For gcpdraw developers

### Prerequisites

This tool is written in [Go](https://golang.org/). Please make sure you have Go installed and `$GOPATH` is properly set.

Also this repository must be located at `$GOPATH/gob/gcpdraw`.

### How to add new icon

1. Add an icon to `icons/` directory.
2. Add icon config to `config/xxx.json`
3. Run `make build-static` to compile icon configs
4. Run `make sync-gcs` to sync directory to GCS bucket
5. Run `make sync-config` to sync config with web client
5. Run `npm run build` at `web/client` directory to compile web client
6. Run `make PROJECT=${PROJECT} deploy` at `renderer` directory to deploy renderer service
7. Run `make PROJECT=${PROJECT} deploy` at `web` directory to deploy web service

### How to code review

See: https://g3doc.corp.google.com/company/teams/gerritcodereview/users/intro-codelab.md?cl=head
