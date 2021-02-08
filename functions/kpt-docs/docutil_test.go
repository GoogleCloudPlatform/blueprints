// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"reflect"
	"testing"
)

func Test_insertIntoDoc(t *testing.T) {
	type args struct {
		top     string
		bottom  string
		setters string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{"singleline", args{"foo", "baz", "setter1"}, `foo
## Setters
setter1
baz`,
		},
		{"multiline", args{
			`foo
bar`,
			`baz
qux`,
			`setter1
setter2`,
		},
			`foo
bar
## Setters
setter1
setter2
baz
qux`,
		},
		{"no setters", args{
			`foo
bar`,
			`baz
qux`,
			"", // no setters
		},
			`foo
bar
baz
qux`,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := insertIntoDoc(tt.args.top, tt.args.bottom, tt.args.setters); got != tt.want {
				t.Errorf("insertIntoDoc() =\n****got:****\n%v\n****want:****\n%v\n", got, tt.want)
			}
		})
	}
}

func Test_docByLine(t *testing.T) {
	type args struct {
		doc []byte
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{"singleline", args{[]byte("foo")}, []string{"foo"}},
		{"multiline", args{[]byte(
			`foo
bar
`)}, []string{"foo", "bar"}},
		{"empty", args{[]byte("")}, []string{}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := docByLine(tt.args.doc); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("docByLine() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_findDocInsertPoint(t *testing.T) {
	type args struct {
		doc []string
	}
	tests := []struct {
		name    string
		args    args
		want    int
		want1   int
		wantErr bool
	}{
		{"simple", args{[]string{docMarkerStart, docMarkerEnd}}, 0, 1, false},
		{"multiline", args{[]string{"foo", docMarkerStart, "bar", docMarkerEnd, "baz"}}, 1, 3, false},
		{"multiline malformed start", args{[]string{"<!- BEGINNING OF PRE-COMMIT-KPT DOCS HOOK ->", "bar", docMarkerEnd}}, -1, 2, true},
		{"missing start", args{[]string{"foo", docMarkerEnd, "baz"}}, -1, 1, true},
		{"missing end", args{[]string{"foo", docMarkerStart, "baz"}}, 1, -1, true},
		{"empty", args{[]string{}}, -1, -1, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, got1, err := findDocInsertPoint(tt.args.doc)
			if (err != nil) != tt.wantErr {
				t.Errorf("findDocInsertPoint() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("findDocInsertPoint() got = %v, want %v", got, tt.want)
			}
			if got1 != tt.want1 {
				t.Errorf("findDocInsertPoint() got1 = %v, want %v", got1, tt.want1)
			}
		})
	}
}
