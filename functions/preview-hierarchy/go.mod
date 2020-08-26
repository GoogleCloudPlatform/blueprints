module gob/blueprints/preview-hierarchy

go 1.14

replace gob/gcpdraw => ./third_party/gcpdraw

require (
	gob/gcpdraw v0.0.0-00010101000000-000000000000
	sigs.k8s.io/kustomize/kyaml v0.8.1
)
