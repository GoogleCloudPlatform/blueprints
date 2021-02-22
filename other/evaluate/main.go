package main

import (
	"bytes"
	"crypto/sha256"
	"flag"
	"fmt"
	"log"
	"os"

	"sigs.k8s.io/kustomize/kyaml/kio"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

var (
	afterConfigPath  = flag.String("after", "", "Path to updated configuration.")
	beforeConfigPath = flag.String("before", "", "Path to previously submitted configuration.")

	maxAdditions     = flag.Int("max_additions", 50, "Maximum number of additional resources.")
	maxModifications = flag.Int("max_modifications", 50, "Maximum number of changed resources.")
	maxDeletions     = flag.Int("max_deletions", 50, "Maximum number of deleted resources.")
)

// Each struct item is in the format:
//    Kind:
//      Namespace:
//         Name[]
type Evaluation struct {
	Added    map[string]map[string][]string
	Modified map[string]map[string][]string
	Deleted  map[string]map[string][]string
}

func prettyPrintEvalMap(b *bytes.Buffer, m map[string]map[string][]string, actionType string) {
	for kind, namespaces := range m {
		fmt.Fprintf(b, "%d - %s %s(s)\n", resourceCount(namespaces), kind, actionType)
		for namespace, resources := range namespaces {
			fmt.Fprintf(b, "  '%s' namespace\n", namespace)

			for _, resource := range resources {
				fmt.Fprintf(b, "  - %s\n", resource)
			}
		}
		fmt.Fprintf(b, "\n")
	}
}

func (e *Evaluation) String() string {
	var b bytes.Buffer
	fmt.Fprintf(&b, "%d - new resources added, %d - existing resources modified, %d - existing resources deleted\n\n", total(e.Added), total(e.Modified), total(e.Deleted))

	prettyPrintEvalMap(&b, e.Added, "addition")
	prettyPrintEvalMap(&b, e.Modified, "modification")
	prettyPrintEvalMap(&b, e.Deleted, "deletion")

	return b.String()
}

func main() {
	flag.Parse()

	before, err := resourceHashMap(*beforeConfigPath)
	if err != nil {
		log.Fatalf("Failed to read old config: %v", err)
	}
	after, err := resourceHashMap(*afterConfigPath)
	if err != nil {
		log.Fatalf("Failed to read new config: %v", err)
	}

	e := compare(before, after)
	fmt.Println(e)
	if err := accept(e); err != nil {
		fmt.Printf("Changes are greated than the allowed threshold: %v\n", err)
		os.Exit(1)
	}
}

func accept(e *Evaluation) error {
	if addedTotal := total(e.Added); addedTotal > *maxAdditions {
		return fmt.Errorf("the total number of added resources (%d) is greater than the specified maximum (%d)", addedTotal, *maxAdditions)
	}
	if modifiedTotal := total(e.Modified); modifiedTotal > *maxModifications {
		return fmt.Errorf("the total number of modified resources (%d) is greater than the specified maximum (%d)", modifiedTotal, *maxModifications)
	}
	if deletedTotal := total(e.Deleted); deletedTotal > *maxAdditions {
		return fmt.Errorf("the total number of deleted resources (%d) is greater than the specified maximum (%d)", deletedTotal, *maxDeletions)
	}
	return nil
}

func total(resources map[string]map[string][]string) int {
	t := 0
	for _, v := range resources {
		t += resourceCount(v)
	}
	return t
}

func resourceCount(namespaces map[string][]string) int {
	t := 0
	for _, r := range namespaces {
		t += len(r)
	}
	return t
}

func compare(before, after map[yaml.ResourceIdentifier]string) *Evaluation {
	e := &Evaluation{
		Added:    make(map[string]map[string][]string),
		Modified: make(map[string]map[string][]string),
		Deleted:  make(map[string]map[string][]string),
	}

	for id, beforeHash := range before {
		if afterHash, ok := after[id]; ok {
			if beforeHash != afterHash {
				appendResourceToEval(e.Modified, id)
			}
		} else {
			appendResourceToEval(e.Deleted, id)
		}
	}
	for id := range after {
		if _, ok := before[id]; !ok {
			appendResourceToEval(e.Added, id)
		}
	}
	return e
}

func appendResourceToEval(evalEntry map[string]map[string][]string, id yaml.ResourceIdentifier) {
	if _, ok := evalEntry[id.Kind]; !ok {
		evalEntry[id.Kind] = make(map[string][]string)
	}

	namespace := id.Namespace

	if namespace == "" {
		namespace = "default"
	}

	evalEntry[id.Kind][namespace] = append(evalEntry[id.Kind][namespace], id.Name)
}

func resourceHashMap(configPath string) (map[yaml.ResourceIdentifier]string, error) {
	lpr := kio.LocalPackageReader{
		PackagePath:           configPath,
		OmitReaderAnnotations: true,
	}
	nodes, err := lpr.Read()
	if err != nil {
		return nil, fmt.Errorf("error reading configuration: %v", err)
	}
	resources := make(map[yaml.ResourceIdentifier]string)
	for _, node := range nodes {
		if node.IsNilOrEmpty() {
			continue
		}
		meta, err := node.GetMeta()
		if err != nil {
			return nil, fmt.Errorf("error reading resource metadata: %v", err)
		}
		id := meta.GetIdentifier()
		// Keep only a hash of resource definition. We only need to check whether this definition
		// has changed or not.
		hash := sha256.Sum256([]byte(node.MustString()))
		resources[id] = fmt.Sprintf("%x", hash)
	}
	return resources, nil
}
