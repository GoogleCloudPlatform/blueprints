# What is this

Folder-ref uses an annotation on a folder or project that references its intended parent folder, to construct orchestration custom resources that will ensure the proper hierarchy happens without further user config editing.

Caution: this is a destructive function that mutates config to suit the orchestration system. Don't run and commit on dry code as it's a one way cork indirection wrapper.

This function creates a virtual KCC annotation, `cnrm.cloud.google.com/folder-ref`.

So objects in KCC can be parented by 4 annotations:
1. `cnrm.cloud.google.com/organization-id`
1. `cnrm.cloud.google.com/folder-id`
1. `cnrm.cloud.google.com/project-id`
1. `cnrm.cloud.google.com/folder-ref`

# How do I use it?

1. Prereqs: To apply the output of the function, cork must be installed and its service account must be able to read and write KCC folders, projects, etc.

1. Build it

For container runtime:

```
# From this directory
gcloud builds submit -t gcr.io/$YOUR_PROJECT_ID/folder-ref:latest .
```

For exec: `go build -v -o config-function ./`

3. Run `kpt fn run sample/ --image gcr.io/$YOUR_PROJECT_ID/folder-ref:latest` if you have a gcr image cut.

OR

```
go build -v -o config-function ./
kpt fn run sample/ --enable-exec --exec-path ./config-function
```

NOTE: If you sudo docker then you need to sudo kpt and there's an obnoxious set of auth stuff you will likely have to do to enable kpt to run gcr images.

# How do I run the tests?

`make`

# How do I "release" it to prod

For now: `gcloud builds submit -t gcr.io/yakima-eap/folder-ref:latest .`

# Further Reading

- https://googlecontainertools.github.io/kpt/guides/consumer/function/