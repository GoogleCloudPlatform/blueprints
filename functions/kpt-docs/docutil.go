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
	"bufio"
	"errors"
	"strings"
)

const docMarkerStart = "<!-- BEGINNING OF PRE-COMMIT-KPT DOCS HOOK -->"
const docMarkerEnd = "<!-- END OF PRE-COMMIT-KPT DOCS HOOK -->"
const setterHeading = "## Setters\n"

func insertIntoDoc(top string, bottom string, setters string) string {
	body := ""
	if setters != "" {
		body += setterHeading + setters + "\n"
	}
	return top + "\n" + body + bottom
}

func docByLine(doc []byte) []string {
	scanner := bufio.NewScanner(strings.NewReader(string(doc)))
	var lines = make([]string, 0)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	return lines
}

func findDocInsertPoint(doc []string) (int, int, error) {
	start, stop := -1, -1
	for i, line := range doc {
		if line == docMarkerStart {
			start = i
		}
		if line == docMarkerEnd {
			stop = i
		}
		if start != -1 && stop != -1 {
			return start, stop, nil
		}
	}
	if start == -1 {
		return start, stop, errors.New("Unable to find start marker")
	}
	return start, stop, errors.New("Unable to find end marker")
}
