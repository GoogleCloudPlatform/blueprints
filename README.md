# What is this

Folder-parent uses an annotation on a folder to its intended parent folder to construct orchestration custom resources that will ensure the proper folder hierarchy happens without further user config editing.

# How do I use it?

1. Build it

For container runtime:

```
# From this directory
gcloud builds submit -t gcr.io/$YOUR_PROJECT_ID/folder-parent:v1 .
```

For exec: `go build -v -o config-function ./`

2. Run `kpt fn run sample/ --image gcr.io/$YOUR_PROJECT_ID/folder-parent:v1` if you have a gcr image cut.

OR

```
go build -v -o config-function ./
kpt fn run sample/ --enable-exec --exec-path ./config-function
```

NOTE: If you sudo docker then you need to sudo kpt and there's an obnoxious set of auth stuff you will likely have to do to enable kpt to run gcr images.

# How do I run the tests?

`make`

# Further Reading

- https://googlecontainertools.github.io/kpt/guides/consumer/function/