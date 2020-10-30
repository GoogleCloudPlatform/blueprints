package helpers

import (
	"fmt"
	"os/exec"
)

/**
* Runs a set of shell commands in sequence in a given directory and prints output
* to combined output to stdout.
* Returns the first error encountered and returns immediately.
*
* Example usage:
* if err = ExecuteCommands([][]string{
*		[]string{"ls"},
*		[]string{"git", "config", "user.name", "SomeUserName"},
*	}, sourceRepoPath); err != nil {
*	  return err
* }
**/
func ExecuteCommands(cmds [][]string, dir string) error {
	for _, cmdArr := range cmds {
		cmd := exec.Command(cmdArr[0], cmdArr[1:]...)
		cmd.Dir = dir
		out, err := cmd.CombinedOutput()
		fmt.Println(string(out))
		if err != nil {
			return err
		}
	}

	return nil
}
