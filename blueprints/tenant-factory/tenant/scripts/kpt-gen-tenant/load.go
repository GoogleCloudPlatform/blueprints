package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strings"

	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/klog/v2"
	"sigs.k8s.io/yaml"
)

func loadAllObjects(p string) ([]*unstructured.Unstructured, error) {
	return loadObjectsFromDir(p)
}

func loadObjectsFromDir(dir string) ([]*unstructured.Unstructured, error) {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		return nil, fmt.Errorf("error reading directory %q: %w", dir, err)
	}

	var objects []*unstructured.Unstructured
	for _, f := range files {
		p := filepath.Join(dir, f.Name())
		if f.IsDir() {
			if f.Name() == ".configsync" {
				// TODO: Remove!
				klog.Warningf("skipping .configsync directory")
				continue
			}
			if f.Name() == "packages" {
				// TODO: Remove!
				klog.Warningf("skipping packages directory")
				continue
			}
			objs, err := loadObjectsFromDir(p)
			if err != nil {
				return nil, err
			}
			objects = append(objects, objs...)
			continue
		}

		fileExtension := strings.ToLower(filepath.Ext(f.Name()))
		if fileExtension == ".yml" || fileExtension == ".yaml" {
			objs, err := loadObjectsFromFile(p)
			if err != nil {
				return nil, err
			}
			objects = append(objects, objs...)
		}
	}

	return objects, nil
}

func loadObjectsFromFile(p string) ([]*unstructured.Unstructured, error) {
	b, err := ioutil.ReadFile(p)
	if err != nil {
		return nil, fmt.Errorf("error reading file %q: %w", p, err)
	}

	// replace the ending \r\n (line ending used in windows) with \n and then separate by \n---\n
	values := bytes.Split(bytes.ReplaceAll(b, []byte("\r\n"), []byte("\n")), []byte("\n---\n"))

	var objects []*unstructured.Unstructured

	for _, value := range values {
		m := make(map[string]interface{})
		if err := yaml.Unmarshal(value, &m); err != nil {
			return nil, fmt.Errorf("error parsing file %q: %w", p, err)
		}
		if len(m) == 0 {
			// Skip empty objects
			continue
		}
		objects = append(objects, &unstructured.Unstructured{Object: m})
	}

	return objects, nil
}
