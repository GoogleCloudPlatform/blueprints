// main.go
package main

import (
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/GoogleContainerTools/kpt/pkg/kptfile"
	"sigs.k8s.io/kustomize/kyaml/fn/framework"
)

var baseDir string

// getBlueprintDirs returns directories that contain a Kptfile
func getBlueprintDirs(baseDir string) []string {
	var dirs = make([]string, 0)
	err := filepath.Walk(baseDir, func(path string, info os.FileInfo, err error) error {
		if info.Name() == kptfile.KptFileName {
			dirs = append(dirs, filepath.Dir(path))
		}
		return nil
	})
	if err != nil {
		panic(err)
	}
	return dirs

}

// generateBlueprintReadme generates a readme for a blueprint and it's current readme
func generateBlueprintReadme(blueprintDir string, readmePath string) (string, error) {
	if _, err := os.Stat(readmePath); os.IsNotExist(err) {
		return "", fmt.Errorf("%s does not exist, skipping generation", readmePath)
	}
	setterTable, err := getSetterTable(blueprintDir)
	if err != nil {
		return "", err
	}
	readmeArr := docByLine(readFile(readmePath))
	start, stop, err := findDocInsertPoint(readmeArr)
	if err != nil {
		return "", fmt.Errorf("error inserting into %s: %v", readmePath, err)
	}
	finalDoc := (insertIntoDoc(strings.Join(readmeArr[:start+1], "\n"), strings.Join(readmeArr[stop:], "\n"), setterTable))
	return finalDoc, nil
}

func main() {
	resourceList := &framework.ResourceList{}
	cmd := framework.Command(resourceList, func() error {
		if baseDir == "" {
			return errors.New("Blueprints base directory must be specified")
		}
		blueprints := getBlueprintDirs(baseDir)
		for _, blueprint := range blueprints {
			readmePath := fmt.Sprintf("%s/README.md", blueprint)
			finalDoc, err := generateBlueprintReadme(blueprint, readmePath)
			if err != nil {
				log.Print(err)
				// continue processing other blueprints in baseDir
				continue
			}
			writeFile(finalDoc, readmePath)
			log.Printf("successfully updated %v", readmePath)
		}
		return nil
	})
	cmd.Flags().StringVar(&baseDir, "baseDir", "", "Blueprint base directory")
	if err := cmd.Execute(); err != nil {
		os.Exit(1)
	}
}
