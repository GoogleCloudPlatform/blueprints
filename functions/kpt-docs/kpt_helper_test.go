package main

import "testing"

func Test_getSetterTable(t *testing.T) {
	type args struct {
		path string
	}
	tests := []struct {
		name    string
		args    args
		want    string
		wantErr bool
	}{
		{"simple", args{"testdata/simple-pkg"}, `|   NAME    | VALUE  |     SET BY      |     DESCRIPTION      | COUNT | REQUIRED | IS SET |
|-----------|--------|-----------------|----------------------|-------|----------|--------|
| http-port | 80     | package-default | helloworld port      | 3     | No       | No     |
| image-tag | v0.3.0 | package-default | helloworld image tag | 1     | No       | No     |
| replicas  | 5      | package-default | helloworld replicas  | 1     | No       | No     |
`, false},
		{"no kptfile", args{"testdata/no-kpt-file"}, "", true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := getSetterTable(tt.args.path)
			if (err != nil) != tt.wantErr {
				t.Errorf("getSetterTable()\n error =\n %v, wantErr \n%v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("getSetterTable()\n = \n%v, want \n%v", got, tt.want)
			}
		})
	}
}
