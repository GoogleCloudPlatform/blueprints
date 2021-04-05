package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	k8syaml "sigs.k8s.io/yaml"

	"sigs.k8s.io/kustomize/kyaml/errors"
	"sigs.k8s.io/kustomize/kyaml/fn/framework"
	"sigs.k8s.io/kustomize/kyaml/kio/filters"
	"sigs.k8s.io/kustomize/kyaml/yaml"
)

const configFieldServiceNamespace = "namespace"
const defaultServiceNamespace = "gcp-services"
const configFieldDisableOnDestroy = "disable-on-destroy"
const defaultDisableOnDestroy = "" // empty means no annotation
const annotationDisableOnDestroy = "cnrm.cloud.google.com/disable-on-destroy"
const annotationProjectID = "cnrm.cloud.google.com/project-id"
const defaultServiceMapPath = "service-map.yaml"
const envServiceMapPath = "GENERATE_SERVICES_MAP"
const serviceHostNameSuffix = ".googleapis.com"
const serviceAPIVersion = "serviceusage.cnrm.cloud.google.com/v1beta1"
const serviceKind = "Service"

// getRequiredServices returns the List of API Service Names required for the specified KCC resource.
// If the resource is not a known KCC type, the boolean will be false.
func getRequiredServices(serviceMap map[string][]string, meta yaml.ResourceMeta) ([]string, bool, error) {
	// split group from GROUP/VERSION
	s := strings.SplitN(meta.APIVersion, "/", 2)
	apiGroup := s[0]
	if apiGroup == meta.APIVersion {
		// skip. no group (ex: "v1")
		return nil, false, nil
	}
	kindGroup := fmt.Sprintf("%s.%s", meta.Kind, apiGroup)

	requiredServices, exists := serviceMap[kindGroup]
	return requiredServices, exists, nil
}

func main() {
	processor := framework.ResourceListProcessorFunc(func(resourceList *framework.ResourceList) error {

		serviceMapPath := os.Getenv(envServiceMapPath)
		if serviceMapPath == "" {
			serviceMapPath = defaultServiceMapPath
		}

		serviceMap, err := loadServiceMap(serviceMapPath)
		if err != nil {
			return fmt.Errorf("failed to load ServiceMap: %v", err)
		}

		configMap := resourceList.FunctionConfig.GetDataMap()

		serviceNamespace, err := getValueOrDefault(configMap, configFieldServiceNamespace, defaultServiceNamespace)
		if err != nil {
			return err
		}

		disableOnDestroy, err := getValueOrDefault(configMap, configFieldDisableOnDestroy, defaultDisableOnDestroy)
		if err != nil {
			return err
		}

		// Map of Project IDs to Sets of Service APIs
		projectServices := make(map[string]map[string]bool)
		for _, item := range resourceList.Items {
			itemMeta, err := item.GetMeta()
			if err != nil {
				// Skip. Not a valid KRM resource.
				continue
			}

			if itemMeta.Name == "" || itemMeta.APIVersion == "" || itemMeta.Kind == "" {
				// Skip. Not a valid KRM resource.
				continue
			}

			requiredServices, found, err := getRequiredServices(serviceMap, itemMeta)
			if err != nil {
				return err
			}
			if !found {
				// Skip. Not a KCC resource.
				continue
			}

			projectID, err := getProjectID(item)
			if err != nil {
				return err
			}

			serviceMap, exists := projectServices[projectID]
			if !exists {
				serviceMap = map[string]bool{}
				projectServices[projectID] = serviceMap
			}
			for _, resourceID := range requiredServices {
				serviceMap[resourceID] = true
			}
		}

		for projectID, serviceMap := range projectServices {
			for resourceID := range serviceMap {
				svcObj, err := serviceObject(resourceID, serviceNamespace, projectID, disableOnDestroy)
				if err != nil {
					return err
				}
				resourceList.Items = append(resourceList.Items, svcObj)
			}
		}

		// apply formatting
		resourceList.Items, err = filters.FormatFilter{}.Filter(resourceList.Items)
		if err != nil {
			return err
		}

		return nil
	})

	if err := framework.Execute(&processor, nil); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}

func loadServiceMap(filePath string) (map[string][]string, error) {
	kindGroupServiceListMap := make(map[string][]string)

	serviceMapYaml, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	node, err := yaml.Parse(string(serviceMapYaml))
	if err != nil {
		return nil, err
	}

	dataNode := node.Field("data")
	if dataNode == nil {
		return nil, errors.Errorf("missing data field")
	}
	err = dataNode.Value.VisitFields(func(kgNode *yaml.MapNode) error {
		kindGroup := yaml.GetValue(kgNode.Key)
		return kgNode.Value.VisitElements(func(node *yaml.RNode) error {
			serviceHostName := yaml.GetValue(node)
			kindGroupServiceListMap[kindGroup] = append(kindGroupServiceListMap[kindGroup], serviceHostName)
			return nil
		})
	})
	if err != nil {
		return nil, err
	}
	return kindGroupServiceListMap, nil
}

func getValueOrDefault(configMap map[string]string, key, defaultValue string) (string, error) {
	value := configMap[key]
	if value == "" {
		return defaultValue, nil
	}
	return value, nil
}

// getProjectID returns the project-id annotation value, if set and not empty,
// otherwise the namespace is assumed to be the project-id, because that's what
// ConfigConnectorContext uses by default.
func getProjectID(node *yaml.RNode) (string, error) {
	key, err := node.Pipe(yaml.GetAnnotation(annotationProjectID))
	if err != nil {
		return "", errors.Wrap(err)
	}
	meta := mustMeta(node)
	if key != nil && key.YNode() != nil {
		value := key.YNode().Value
		if value == "" {
			return "", errors.Errorf("empty project-id annotation: %v", meta)
		}
		return value, nil
	}
	if meta.Namespace == "" {
		return "", errors.Errorf("empty namespace and no project-id annotation: %v", meta)
	}
	return meta.Namespace, nil
}

// mustMeta will panic if the provided node doesn't have a metadata field.
// This assumes the object metadata has already benn checked.
func mustMeta(node *yaml.RNode) yaml.ResourceMeta {
	meta, err := node.GetMeta()
	if err != nil {
		panic(err)
	}
	return meta
}

func serviceObject(resourceID, namespace, projectID, disableOnDestroy string) (*yaml.RNode, error) {
	name, err := serviceObjectName(resourceID, projectID)
	if err != nil {
		return nil, err
	}

	// RNode is a pain to use directly.
	// So we're using sigs.k8s.io/yaml and converting to RNode instead.
	svc := &Service{
		TypeMeta: metav1.TypeMeta{
			APIVersion: serviceAPIVersion,
			Kind:       serviceKind,
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: namespace,
			Annotations: map[string]string{
				annotationProjectID: projectID,
			},
		},
		Spec: ServiceSpec{
			ResourceID: resourceID,
		},
	}
	if disableOnDestroy != "" {
		svc.ObjectMeta.Annotations[annotationDisableOnDestroy] = disableOnDestroy
	}

	// Struct -> YAML
	svcYamlBytes, err := k8syaml.Marshal(svc)
	if err != nil {
		return nil, err
	}

	// Strip CreationTimestamp to workaround a bug in apimachinery.
	// https://github.com/kubernetes/apimachinery/issues/119
	svcYaml := strings.Replace(string(svcYamlBytes), "creationTimestamp: null", "", 1)

	// YAML -> RNode
	node, err := yaml.Parse(svcYaml)
	if err != nil {
		return nil, err
	}

	return node, nil
}

func serviceObjectName(resourceID, projectID string) (string, error) {
	s := strings.SplitN(resourceID, serviceHostNameSuffix, 2)
	servicePrefix := s[0]
	if servicePrefix == resourceID {
		return "", fmt.Errorf("invalid resource ID: %q", resourceID)
	}
	servicePrefix = strings.ReplaceAll(servicePrefix, ".", "-")
	return fmt.Sprintf("%s-%s", projectID, servicePrefix), nil
}

type Service struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              ServiceSpec `json:"spec"`
}

type ServiceSpec struct {
	ResourceID string `json:"resourceID"`
}
