# What is this

Sink-policy uses a spec.member.resourceRef field on an IAMPolicyMember that references a logging API object which will generate an IAM identity, to construct orchestration custom resources that will propagate generated identities in to their proper permission bindings.

Caution: this is a destructive function that mutates config to suit the orchestration system. Don't run and commit on dry code as it's a one way cork indirection wrapper.

This function uses a virtual KCC CRD field, `spec.member.resourceRef.name`.

# How do I use it?

1. Prereqs: To apply the output of the function, cork must be installed alongside KCC.

1. Build it

For container runtime:

```
# From this directory
gcloud builds submit -t gcr.io/$YOUR_PROJECT_ID/sink-policy:v1.
```

For exec: `go build -v -o config-function ./`

3. Run `kpt fn run sample/ --image gcr.io/$YOUR_PROJECT_ID/sink-policy:v1` if you have a gcr image cut.

OR

```
go build -v -o config-function ./
kpt fn run sample/ --enable-exec --exec-path ./config-function
```

NOTE: If you sudo docker then you need to sudo kpt and there's an obnoxious set of auth stuff you will likely have to do to enable kpt to run gcr images.

# How do I run the tests?

`make build; make full-test`

# Further Reading

- https://googlecontainertools.github.io/kpt/guides/consumer/function/
