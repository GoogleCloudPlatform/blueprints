package helpers

import (
	"fmt"
	"log"
	"os/exec"
	"strings"
	"time"
)

type KubernetesResource struct {
	Namespace    string
	Type         string
	Name         string
	JsonPath     string // i.e. `.status.condition[0].reason` for KCC resources
	SuccessValue string // i.e. "UpToDate"
}

func NewKccResource(namespace string, resourceType string, name string) KubernetesResource {
	return KubernetesResource{
		Namespace:    namespace,
		Name:         name,
		Type:         resourceType,
		JsonPath:     ".status.conditions[0].reason",
		SuccessValue: "UpToDate",
	}
}

// Polls using kubectl on a list of resources to determine if the resources have successfully been created
func VerifyKubernetesResources(resourceList []KubernetesResource, retryCount int, interval time.Duration, deletion bool) error {
	for _, resource := range resourceList {
		if err := Poll(resourceStatus(resource, deletion), retryCount, interval); err != nil {
			return err
		}
	}

	return nil
}

// This function is used as a function parameter to the Poll function. Checks
// kubectl for the resource and compares it against the proposed success value.
// Returns true if Poll should keep polling and false if not.
func resourceStatus(resource KubernetesResource, deletion bool) func() (bool, error) {
	return func() (bool, error) {
		jsonpath := fmt.Sprintf("-o=jsonpath='{%s}'", resource.JsonPath)
		// TODO(jcwc): Look into go client for kubernetes instead of relying on kubectl client tool
		out, err := exec.Command("kubectl", "get", resource.Type, resource.Name, "-n", resource.Namespace, jsonpath).CombinedOutput()
		trimmedOut := strings.TrimSpace(string(out))
		trimmedOut = strings.Trim(trimmedOut, "'")

		log.Printf("Resource type '%s', name '%s' returned:\n", resource.Type, resource.Name)
		fmt.Println(string(out) + "\n")

		if deletion {
			if err != nil && strings.Contains(trimmedOut, "NotFound") {
				return false, nil
			} else {
				log.Printf("`kubectl describe -n %s %s %s` command returned:", resource.Namespace, resource.Type, resource.Name)
				out, _ := exec.Command("kubectl", "describe", "-n", resource.Namespace, resource.Type, resource.Name).CombinedOutput()
				fmt.Println(string(out))
				return true, err
			}
		} else {
			if trimmedOut == resource.SuccessValue {
				return false, nil // don't retry, no errors
			} else {
				log.Printf("`kubectl describe -n %s %s %s` command returned:", resource.Namespace, resource.Type, resource.Name)
				out, _ := exec.Command("kubectl", "describe", "-n", resource.Namespace, resource.Type, resource.Name).CombinedOutput()
				fmt.Println(string(out))
				return true, err // retry, error
			}
		}
	}
}
