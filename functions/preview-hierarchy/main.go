package main

import (
	"errors"
	"fmt"
	"io"
	"os"
	"strings"

	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

var outFile string

const (
	folderKind          = "Folder"
	kccAPIVersion       = "resourcemanager.cnrm.cloud.google.com/v1beta1"
	folderRefAnnotation = "cnrm.cloud.google.com/folder-ref"
	orgRefAnnotation    = "cnrm.cloud.google.com/organization-id"
)

func main() {
	resourceList := &framework.ResourceList{}
	cmd := framework.Command(resourceList, func() error {
		if outFile == "" {
			return errors.New("output is a required argument")
		}

		out, err := os.OpenFile(outFile, os.O_RDWR|os.O_CREATE, 0644)
		if err != nil {
			return err
		}

		return processHierarchy(resourceList, out)
	})
	cmd.Flags().StringVar(&outFile, "output", "", "Output file")
	if err := cmd.Execute(); err != nil {
		os.Exit(1)
	}
}

// gcpHierarchyResource represents a GCP folder or org placeholder
type gcpHierarchyResource struct {
	Name        string
	DisplayName string
	Parent      string
	ParentType  string
	Type        string
}

// IsFolder checks if the object is a folder or an org placeholder
func (g *gcpHierarchyResource) IsFolder() bool {
	return g.Type == "Folder"
}

func gpcDrawSanitize(name string) string {
	val := strings.ReplaceAll(name, "-", "_")
	val = strings.ReplaceAll(val, ".", "_")
	return val
}

// GCPDrawName changes the name of the object to one that is supported by the
// GCPDraw DSL
func (g *gcpHierarchyResource) GCPDrawName() string {
	return gpcDrawSanitize(g.Name)
}

// GCPDrawParentName returns the name of the parent object and transforms it to
// a version supported by the GCP Draw DSL
func (g *gcpHierarchyResource) GCPDrawParentName() string {
	return gpcDrawSanitize(g.Parent)
}

func processHierarchy(resourceList *framework.ResourceList, output io.Writer) error {
	var hierarchy []gcpHierarchyResource

	orgsAdded := make(map[string]struct{})

	for _, item := range resourceList.Items {
		metadata, err := item.GetMeta()
		if err != nil {
			return err
		}

		displayNameNode, err := item.Pipe(yaml.Lookup("spec", "displayName"))
		if err != nil {
			return err
		}

		displayName, err := displayNameNode.String()
		if err != nil {
			return err
		}

		if metadata.Kind == folderKind && metadata.APIVersion == kccAPIVersion {
			if val, ok := metadata.Annotations[folderRefAnnotation]; ok {
				hierarchy = append(hierarchy, gcpHierarchyResource{
					Name:        metadata.Name,
					DisplayName: displayName,
					Parent:      val,
					ParentType:  "Folder",
					Type:        "Folder",
				})
			} else if val, ok := metadata.Annotations[orgRefAnnotation]; ok {

				orgName := fmt.Sprintf("org-%s", val)

				hierarchy = append(hierarchy, gcpHierarchyResource{
					Name:        metadata.Name,
					DisplayName: displayName,
					Parent:      orgName,
					ParentType:  "Org",
					Type:        "Folder",
				})

				if _, ok := orgsAdded[orgName]; !ok {
					orgsAdded[orgName] = struct{}{}
					hierarchy = append(hierarchy, gcpHierarchyResource{
						Name:        orgName,
						Parent:      "",
						ParentType:  "",
						DisplayName: orgName,
						Type:        "Org",
					})
				}
			}
		}
	}

	return createDiagram(hierarchy, output)
}
