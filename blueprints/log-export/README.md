# Log export blueprint

[TOC]

## Prerequisites
- Yakima cluster w/ Git Ops enabled

## What is this?
This folder contains 6 different blueprints which are different sources and destinations to export audit logs from and to, respectively.

### Log export types
**Folder:**
In this directory, we have log exports that source from a Folder resource type in GCP.
- **Bigquery export:**
  - Exports to bigquery
- **Pubsub export:**
  - Exports to pubsub
- **Storage export:**
  - Exports to a storage bucket

**Org:**
This directory has the same content as the folder directory except the source is from an Organization.

## How to use it
To run this blueprint, you can run the steps listed [here](https://cnrm.git.corp.google.com/blueprints/+/refs/heads/master/csr-git-ops-pipeline/#Making-your-first-git-ops-change).

Replace step #3 with the following commands instead:
```bash
kpt pkg get sso://cnrm/blueprints.git/blueprints/log-export/<source option>/<dest option>@master landing-zone/log-export
kpt cfg list-setters log-export
kpt cfg set ...
```

As part of step #9, you can run the following command to verify the state and existence of the resources
```
# For folder w/ bigquery
kubectl -n ${YOUR_NAMESPACE} get bigquerydataset,folderlogsink -o custom-columns=NAME:.metadata.name,ID:.status.name,STATUS_MESSAGE:.status.conditions[0].message,STATUS:.status.conditions[0].reason

# For org w/ pubsub
kubectl -n ${YOUR_NAMESPACE} get pubsubtopic,organizationlogsink -o custom-columns=NAME:.metadata.name,ID:.status.name,STATUS_MESSAGE:.status.conditions[0].message,STATUS:.status.conditions[0].reason

# For folder w/ storage
kubectl -n ${YOUR_NAMESPACE} get storagebucket,folderlogsink -o custom-columns=NAME:.metadata.name,ID:.status.name,STATUS_MESSAGE:.status.conditions[0].message,STATUS:.status.conditions[0].reason
```

Owners:
- [morgantep](http://who/morgantep@google.com)
- [jcwc](http://who/jcwc@google.com)
