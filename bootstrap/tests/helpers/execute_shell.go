package helpers

import (
	"fmt"
	"os"
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

// Runs a shell command and streams output to terminal
func ExecuteStreamingCommand(c []string) error {
	cmd := exec.Command(c[0], c[1:]...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Start(); err != nil {
		return err
	}
	if err := cmd.Wait(); err != nil {
		return err
	}
	return nil
}
