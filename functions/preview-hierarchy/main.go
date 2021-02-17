package main

import (
	"errors"
	"fmt"
	"io"
	"log"
	"os"
	"strings"

	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

var outFile string
var renderer string

const (
	folderKind          = "Folder"
	kccAPIVersion       = "resourcemanager.cnrm.cloud.google.com/v1beta1"
	folderRefAnnotation = "cnrm.cloud.google.com/folder-ref"
	orgRefAnnotation    = "cnrm.cloud.google.com/organization-id"
)

func main() {
	resourceList := &framework.ResourceList{}
	cmd := framework.Command(resourceList, func() error {
		hierarchy, err := processHierarchy(resourceList)
		if err != nil {
			return err
		}
		if renderer == "svg" {
			// if svg renderer, throw error if no outfile specified
			if outFile == "" {
				return errors.New("output is a required argument")
			}
			out, err := os.OpenFile(outFile, os.O_RDWR|os.O_CREATE, 0644)
			if err != nil {
				return err
			}
			return createDiagram(hierarchy, out)

		}
		// if renderer is not svg, outfile is optional
		// if outfile not specified print to stdout
		if outFile == "" {
			return textTreeRenderer(hierarchy, log.Writer())
		}
		// if outfile specified write to outfile
		out, err := os.OpenFile(outFile, os.O_RDWR|os.O_CREATE, 0644)
		if err != nil {
			return err
		}
		return textTreeRenderer(hierarchy, out)
	})
	cmd.Flags().StringVar(&outFile, "output", "", "Output file")
	cmd.Flags().StringVar(&renderer, "renderer", "svg", "svg or tree renderer")
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
	Children    []*gcpHierarchyResource
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

func processHierarchy(resourceList *framework.ResourceList) ([]*gcpHierarchyResource, error) {
	var hierarchy []*gcpHierarchyResource

	orgsAdded := make(map[string]struct{})
	hierarchyChildren := map[string][]*gcpHierarchyResource{}

	for _, item := range resourceList.Items {
		metadata, err := item.GetMeta()
		if err != nil {
			return nil, err
		}

		displayNameNode, err := item.Pipe(yaml.Lookup("spec", "displayName"))
		if err != nil {
			return nil, err
		}

		displayName, err := displayNameNode.String()
		if err != nil {
			return nil, err
		}

		if metadata.Kind == folderKind && metadata.APIVersion == kccAPIVersion {
			if val, ok := metadata.Annotations[folderRefAnnotation]; ok {
				h := gcpHierarchyResource{
					Name:        metadata.Name,
					DisplayName: displayName,
					Parent:      val,
					ParentType:  "Folder",
					Type:        "Folder",
				}
				hierarchy = append(hierarchy, &h)
				hierarchyChildren[h.Parent] = append(hierarchyChildren[h.Parent], &h)
			} else if val, ok := metadata.Annotations[orgRefAnnotation]; ok {

				orgName := fmt.Sprintf("org-%s", val)
				h := gcpHierarchyResource{
					Name:        metadata.Name,
					DisplayName: displayName,
					Parent:      orgName,
					ParentType:  "Org",
					Type:        "Folder",
				}
				hierarchyChildren[h.Parent] = append(hierarchyChildren[h.Parent], &h)
				hierarchy = append(hierarchy, &h)

				if _, ok := orgsAdded[orgName]; !ok {
					orgsAdded[orgName] = struct{}{}
					hierarchy = append(hierarchy, &gcpHierarchyResource{
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
	for i := range hierarchy {
		if c, ok := hierarchyChildren[hierarchy[i].Name]; ok {
			hierarchy[i].Children = c
		}
	}
	return hierarchy, nil
}

// textTreeRenderer returns the tree visualization
func textTreeRenderer(hierarchy []*gcpHierarchyResource, output io.Writer) error {
	for _, h := range hierarchy {
		// find root org
		if h.Type == "Org" && h.Parent == "" {
			// add root org to top of tree viz
			io.WriteString(output, fmt.Sprintf("\n%s\n", h.Name))
			// generate rest of tree viz
			genTree(h, output, []bool{})
		}
	}
	return nil
}

// genTree recursively generates the tree viz
func genTree(root *gcpHierarchyResource, output io.Writer, parentLastElems []bool) {
	currChildren := root.Children
	for i, c := range currChildren {
		sep := ""
		// check if current element is last element, formatting for separator differs based on this
		isLastElem := i == len(currChildren)-1
		// parentLastElems is a bool slice which keeps track of depth and whether the parents are last elements or not
		for _, s := range parentLastElems {
			// if parent is last element fill with spaces, else use pipe + space
			// this is used for rendering cases like
			// | └─retail
			// |   ├─apps
			// |   └─data_and_analysis
			// where retail was a last element
			if s {
				sep += "  "
			} else {
				sep += "| "
			}
		}
		// if current child is the last element, use a different connector
		if isLastElem {
			sep += "└─"
		} else {
			sep += "├─"
		}
		// append to existing tree
		io.WriteString(output, fmt.Sprintf("%s%s", sep, c.DisplayName))
		// call genTree with current child as root
		genTree(c, output, append(parentLastElems, isLastElem))

	}
}
