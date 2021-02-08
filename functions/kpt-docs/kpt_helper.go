package main

import (
	"bytes"
	"fmt"
	"strings"

	kpt "github.com/GoogleContainerTools/kpt/run"
)

func getSetterTable(path string) (string, error) {
	// buffers for stdout and stderr
	buf := &bytes.Buffer{}
	ebuf := &bytes.Buffer{}
	kptCmd := kpt.GetMain()
	kptCmd.SetOut(buf)
	kptCmd.SetErr(ebuf)
	kptCmd.SetArgs([]string{"cfg", "list-setters", path, "--markdown", "--recurse-subpackages=false"})
	err := kptCmd.Execute()
	if err != nil {
		return "", fmt.Errorf("unable to create setter table for %v: %v", path, err)
	}
	// remove first line as it print the pkg path
	return strings.Join(strings.Split(buf.String(), "\n")[1:], "\n"), nil

}
