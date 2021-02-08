// main.go
package main

import (
	"reflect"
	"testing"
)

func Test_getBlueprintDirs(t *testing.T) {
	type args struct {
		baseDir string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{"simple pkg", args{"testdata/simple-pkg"}, []string{"testdata/simple-pkg"}},
		{"nested pkg", args{"testdata/nested-pkg"}, []string{"testdata/nested-pkg/simple-pkg-base", "testdata/nested-pkg/simple-pkg-base/simple-pkg-nested"}},
		{"pkg with no kptfile", args{"testdata/no-kpt-file"}, []string{}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := getBlueprintDirs(tt.args.baseDir); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("getBlueprintDirs() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_generateBlueprintReadme(t *testing.T) {
	type args struct {
		blueprintDir string
		readmePath   string
	}
	tests := []struct {
		name    string
		args    args
		want    string
		wantErr bool
	}{
		{"simple pkg", args{"testdata/simple-pkg", "testdata/simple-pkg/README.md"}, `# Test KPT pkg

<!-- BEGINNING OF PRE-COMMIT-KPT DOCS HOOK -->
## Setters
|   NAME    | VALUE  |     SET BY      |     DESCRIPTION      | COUNT | REQUIRED | IS SET |
|-----------|--------|-----------------|----------------------|-------|----------|--------|
| http-port | 80     | package-default | helloworld port      | 3     | No       | No     |
| image-tag | v0.3.0 | package-default | helloworld image tag | 1     | No       | No     |
| replicas  | 5      | package-default | helloworld replicas  | 1     | No       | No     |

<!-- END OF PRE-COMMIT-KPT DOCS HOOK -->`, false},
		{"simple pkg, no readme", args{"testdata/simple-pkg", "testdata/simple-pkg/foo.md"}, "", true},
		{"simple pkg, no kptfile", args{"testdata/no-kpt-file", "testdata/no-kpt-file/README.md"}, "", true},
		{"malformed readme tag", args{"testdata/malformed-readme-tags", "testdata/malformed-readme-tags/malformed-tag-README.md"}, "", true},
		{"missing readme tag", args{"testdata/malformed-readme-tags", "testdata/malformed-readme-tags/missing-tag-README.md"}, "", true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := generateBlueprintReadme(tt.args.blueprintDir, tt.args.readmePath)
			if (err != nil) != tt.wantErr {
				t.Errorf("generateBlueprintReadme() error =\n %v\n, wantErr\n %v\n", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("generateBlueprintReadme() =\n %v\n, want\n %v\n", got, tt.want)
			}
		})
	}
}
