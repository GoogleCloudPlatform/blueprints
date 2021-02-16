# Org hierarchy blueprint

[TOC]

## Prerequisites
- Yakima cluster w/ Git Ops enabled

## What is this?
This folder contains 4 different blueprint options for org hierarchy folder structures: simple, team, bu and env-bu.

### Hierarchies
- **Simple:** Single level folder hierarchy which separates projects by environment
- **Team:** Two level folder hierarchy. From top down: teams -> environments -> projects
- **BU:** Three level folder hierarchy for business units. From top down: division -> teams -> environments -> projects.
- **Env BU:** Three level folder hierarchy which is similar to BU structured but inverted. From top down: environments -> divisions -> teams -> projects

## How to use it
To run this blueprint, you can run the steps listed [here](../../bootstrap/csr-git-ops-pipeline/#Making-your-first-git-ops-change).

Replace step #3 with the following commands instead:
```bash
kpt pkg get sso://cnrm/blueprints.git/blueprints/hierarchy/<hierarchy option>@master hierarchy
kpt cfg list-setters hierarchy
kpt cfg set hierarchy namespace <your namespace>
kpt cfg set hierarchy org-id <your organization ID>
```

As part of step #9, you can run the following command to verify the state and existence of the resources
```
kubectl -n ${YOUR_NAMESPACE} get folders -o custom-columns=NAME:.metadata.name,ID:.status.name,STATUS_MESSAGE:.status.conditions[0].message,STATUS:.status.conditions[0].type
```

Owners:
- [jcwc](http://who/jcwc@google.com)
- [morgantep](http://who/morgantep@google.com)
