module cnrm.googlesource.com/kpt-folder-parent

go 1.14

require (
	cnrm.googlesource.com/cork v0.0.0-00010101000000-000000000000
	k8s.io/api v0.17.2 // cork is not 0.18.x compatible yet
	k8s.io/apimachinery v0.17.2 // cork is not 0.18.x compatible yet
	sigs.k8s.io/kustomize/kyaml v0.4.2
	sigs.k8s.io/yaml v1.2.0
)

replace cnrm.googlesource.com/cork => /usr/local/google/home/thackerm/go/src/cnrm.googlesource.com/cork
