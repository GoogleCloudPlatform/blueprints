package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"k8s.io/klog/v2"
)

func kptCfgSet(ctx context.Context, pkgDir string, key string, value string) error {
	err := execCmd(ctx, pkgDir, "kpt", "cfg", "set", ".", key, value, "--recurse-subpackages")
	if err != nil {
		return err
	}
	return nil
}

type SetterNotSetError struct {
	s string
}

func (e *SetterNotSetError) Error() string {
	return e.s
}

// Example Kptfile setter:
/*
apiVersion: kpt.dev/v1alpha1
kind: Kptfile
metadata:
  name: tenant
openAPI:
  definitions:
    io.k8s.cli.setters.tenant-name:
      x-k8s-cli:
        setter:
          name: tenant-name
		  required: true
		  isSet: true
*/

func kptCfgGet(ctx context.Context, pkgDir string, key string) (string, error) {
	kptfilePath := filepath.Join(pkgDir, "Kptfile")
	objs, err := loadObjectsFromFile(kptfilePath)
	if err != nil {
		return "", err
	}

	var kptfile map[string]interface{}
	for _, o := range objs {
		if o.GroupVersionKind().Group == "kpt.dev" && o.GetKind() == "Kptfile" {
			kptfile = o.UnstructuredContent()
			break
		}
	}
	if kptfile == nil {
		return "", fmt.Errorf("invalid Kptfile %q: expected type Kptfile.kpt.dev", kptfilePath)
	}

	setterPath := []string{"openAPI", "definitions", "io.k8s.cli.setters." + key, "x-k8s-cli", "setter"}

	isSet, err := yamlMapFind(kptfile, "", append(setterPath, "isSet")...)
	if _, ok := err.(*FieldNotFoundError); ok {
		// missing isSet means not set yet
		// ignore the default value
		return "", &SetterNotSetError{s: fmt.Sprintf("setter not set: %q", key)}
	} else if err != nil {
		// invalid kptfile
		return "", fmt.Errorf("failed to read setter %q in Kptfile %q: %w", key, kptfilePath, err)
	}
	isSetBool, ok := isSet.(bool)
	if !ok {
		// invalid kptfile
		return "", fmt.Errorf("failed to read setter %q in Kptfile %q: isSet found but not a boolean", key, kptfilePath)
	}
	if !isSetBool {
		// unlikely, but possible if yaml was fiddled with.
		// usually the isSet is just missing if not set
		return "", &SetterNotSetError{s: fmt.Sprintf("setter not set: %q", key)}
	}

	value, err := yamlMapFind(kptfile, "", append(setterPath, "value")...)
	if _, ok := err.(*FieldNotFoundError); ok {
		// invalid kptfile
		return "", fmt.Errorf("failed to read value of setter %q in Kptfile %q: isSet=true but value is missing", key, kptfilePath)
	} else if err != nil {
		// probably not possible...
		// this would mean isSet=true, but the value wasn't present, yet didn't throw a FieldNotFoundError
		return "", fmt.Errorf("failed to read value of setter %q in Kptfile %q: %w", key, kptfilePath, err)
	}

	valueString, ok := value.(string)
	if !ok {
		return "", fmt.Errorf("failed to read value of setter %q in Kptfile %q: expected string value but found %T", key, kptfilePath, value)
	}
	return valueString, nil
}

type FieldNotFoundError struct {
	s string
}

func (e *FieldNotFoundError) Error() string {
	return e.s
}

// TODO: there's probably a library for this...
func yamlMapFind(obj map[string]interface{}, parentPath string, fieldPath ...string) (interface{}, error) {
	if len(fieldPath) < 1 {
		return nil, fmt.Errorf("unspecified fieldPath (programmer error)")
	}

	// current field
	key := fieldPath[0]
	value, found := obj[key]
	if !found {
		return nil, &FieldNotFoundError{s: fmt.Sprintf("field not found: %s[%q]", parentPath, key)}
	}

	// more field path left
	if len(fieldPath) > 1 {
		valueMap, ok := value.(map[string]interface{})
		if !ok {
			return nil, fmt.Errorf("field not a map: %s[%q]", parentPath, key)
		}
		return yamlMapFind(valueMap, fmt.Sprintf("%s[%q]", parentPath, key), fieldPath[1:]...)
	}

	// last field in path
	return value, nil
}

func fmtFieldPath(fieldPath ...string) string {
	if len(fieldPath) < 1 {
		return ""
	} else if len(fieldPath) > 1 {
		return fmt.Sprintf("[%q]%s", fieldPath[0], fmtFieldPath(fieldPath[1:]...))
	} else {
		return fmt.Sprintf("[%q]", fieldPath[0])
	}
}

func kptPkgGet(ctx context.Context, src string, destDir string) error {
	// kpt pkg get doesn't take the current dir as a destination path:
	// https://github.com/GoogleContainerTools/kpt/issues/1407
	destDirParent := filepath.Dir(destDir)
	destDirBase := filepath.Base(destDir)

	if err := os.MkdirAll(destDirParent, 0755); err != nil {
		return fmt.Errorf("error creating directories %q: %w", destDir, err)
	}

	if exists, err := kptPackageExists(ctx, destDir); err != nil {
		return err
	} else if exists {
		return fmt.Errorf("package (Kptfile) already exists at %q", destDir)
	}

	err := execCmd(ctx, destDirParent, "kpt", "pkg", "get", src, destDirBase)
	if err != nil {
		return err
	}

	return nil
}

func kptPkgUpdate(ctx context.Context, pkgDir string) error {
	if exists, err := kptPackageExists(ctx, pkgDir); err != nil {
		return err
	} else if !exists {
		return fmt.Errorf("package (Kptfile) missing at %q", pkgDir)
	}

	// kpt pkg update doesn't take absolute paths:
	// https://github.com/GoogleContainerTools/kpt/issues/1406
	err := execCmd(ctx, pkgDir, "kpt", "pkg", "update", ".", "--strategy", "resource-merge")
	if err != nil {
		return err
	}

	return nil
}

func kptPackageExists(ctx context.Context, destDir string) (bool, error) {
	if _, err := os.Stat(filepath.Join(destDir, "Kptfile")); err != nil {
		if os.IsNotExist(err) {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

func kptGetAndSet(ctx context.Context, src string, destDir string, setters map[string]string, update bool) error {
	if exists, err := kptPackageExists(ctx, destDir); err != nil {
		return err
	} else if exists {
		if update {
			if err := kptPkgUpdate(ctx, destDir); err != nil {
				return err
			}
		} else {
			klog.Warningf("kpt package exists at %q, skipping kpt pkg get (pass --update to enable updating)", destDir)
		}
	} else {
		if err := kptPkgGet(ctx, src, destDir); err != nil {
			return err
		}
	}
	for k, v := range setters {
		if err := kptCfgSet(ctx, destDir, k, v); err != nil {
			return err
		}
	}
	return nil

}
