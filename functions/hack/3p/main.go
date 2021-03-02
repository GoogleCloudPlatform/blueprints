// Forked from https://cnrm.git.corp.google.com/cork/+/65da99065abc0e77e40f1d6756c382b5e80d6484/hack/3p/main.go
// This program creates two directories in the root directory, THIRD_PARTY_NOTICES and MIRRORED_LIBRARY_SOURCE,
// that contain the licenses of our third-party code and MPL-mandated mirrored library source code.
package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

const (
	inputDir                 = "vendor"
	thirdPartyNoticeDir      = "THIRD_PARTY_NOTICES"
	mirroredLibrarySourceDir = "MIRRORED_LIBRARY_SOURCE"
	dirMode                  = 0700
	fileMode                 = 0600
)

func main() {
	var files []string
	os.RemoveAll(thirdPartyNoticeDir)
	os.RemoveAll(mirroredLibrarySourceDir)
	// find all the LICENSE files in the vendor directory
	err := filepath.Walk(inputDir, func(path string, info os.FileInfo, err error) error {
		if !strings.Contains(path, "LICENSE") && !strings.Contains(path, "LICENCE") {
			return nil
		}
		files = append(files, path)
		return nil
	})
	if err != nil {
		fmt.Printf("error walking vendor directory: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("")
	sourceMirrorEmpty := true
	for _, file := range files {
		licensePath := strings.TrimLeft(file, "vendor/")
		repo, licenseFilename := splitLicensePath(licensePath)
		licenseURL := repoToLicenseURL(repo, licenseFilename)

		outputFilename := thirdPartyNoticeDir + "/" + licensePath
		outputFileDir := thirdPartyNoticeDir + "/" + repo
		input, err := ioutil.ReadFile(file)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		if err := os.MkdirAll(outputFileDir, dirMode); err != nil {
			fmt.Printf("error creating output directory '%v': %v\n", outputFileDir, err)
			os.Exit(1)
		}
		// copy the license
		if err := ioutil.WriteFile(outputFilename, input, fileMode); err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		if licenseRequiresSourceCodeMirroring(input) {
			fmt.Printf("\nREQUIRES SOURCE MIRRORING: %v\n", file)
			outputSourceDir := mirroredLibrarySourceDir + "/" + repo
			if err := os.MkdirAll(outputSourceDir, dirMode); err != nil {
				fmt.Printf("error creating output directory '%v': %v\n", outputFileDir, err)
				os.Exit(1)
			}
			// need to remove the actual dir so 'cp' works
			os.Remove(outputSourceDir)
			sourceDir := "vendor/" + repo
			cmd := exec.Command("cp", "-r", sourceDir, outputSourceDir)
			if output, err := cmd.CombinedOutput(); err != nil {
				fmt.Printf("error copying source code for '%v': %v", sourceDir, string(output))
				os.Exit(1)
			}
			sourceMirrorEmpty = false
		}
		simpleLicenseName := licenseMatcher(input)
		fmt.Printf("\n%s, %s, %s", repo, licenseURL, simpleLicenseName)
	}
	if sourceMirrorEmpty {
		// Leave empty dir so downstream workflows don't fail on invalid path.
		e := os.Mkdir(mirroredLibrarySourceDir, os.ModePerm)
		if e != nil {
			panic(e)
		}
	}
	fmt.Println("")
}

// DISCLAIMER: this is best effort, YMMV
func licenseMatcher(l []byte) string {
	normalizedText := strings.ToLower(string(l))
	matcher := map[string]string{
		"www.apache.org/licenses/license-2.0": "Apache 2",
		"mit license":                         "MIT",
		"may be used to endorse or promote products derived from":                   "BSD-3",
		"to use, copy, modify, merge, publish, distribute, sublicense, and/or sell": "MIT",
		"this list of conditions and the following disclaimer in the documentation": "BSD-2",
		"of contract, tort or otherwise, arising from, out of or in connection":     "MIT",
		"mozilla public license, version 2.0":                                       "MPL 2",
		"isc license":                                                               "ISC",
	}
	for match := range matcher {
		if strings.Contains(normalizedText, match) {
			return matcher[match]
		}
	}
	return "UNKNOWN"
}
func licenseRequiresSourceCodeMirroring(licenseText []byte) bool {
	normalizedText := strings.ToLower(string(licenseText))
	licenseRequiresSourceCodeMirroring := map[string]bool{
		"mozilla public license":                      true,
		"common development and distribution license": true,
		"eclipse public license":                      true,
		"gnu general public license":                  true,
		"lesser general public license":               true,
	}
	for licenseType := range licenseRequiresSourceCodeMirroring {
		if strings.Contains(normalizedText, licenseType) {
			return true
		}
	}
	return false
}
func splitLicensePath(path string) (repo string, licenseFilename string) {
	splitPath := strings.Split(path, "/")
	repo = strings.Join(splitPath[:len(splitPath)-1], "/")
	licenseFilename = splitPath[len(splitPath)-1]
	return repo, licenseFilename
}
func repoToLicenseURL(repo string, licenseFilename string) string {
	if manualLicenseURLMapping[repo] != "" {
		return manualLicenseURLMapping[repo]
	}
	domain, repoRoot, subrepoPath := splitRepo(repo)
	licensePathInRepo := licenseFilename
	if subrepoPath != "" {
		licensePathInRepo = strings.Join([]string{subrepoPath, licenseFilename}, "/")
	}
	// TODO: instead of assuming "blob/master", link to the specific SHA we use
	switch domain {
	case "cloud.google.com":
		splitRepoRoot := strings.Split(repoRoot, "/")
		if len(splitRepoRoot) == 2 && splitRepoRoot[0] == "go" {
			return "https://github.com/googleapis/google-cloud-go/blob/master/LICENSE"
		} else {
			panic(fmt.Sprintf("unrecognized repo under cloud.google.com: %v", repoRoot))
		}
	case "sigs.k8s.io":
		return fmt.Sprintf("https://github.com/kubernetes-sigs/%v/blob/master/%v", repoRoot, licensePathInRepo)
	case "github.com":
		return fmt.Sprintf("https://github.com/%v/blob/master/%v", repoRoot, licensePathInRepo)
	case "golang.org":
		if !strings.HasPrefix(repoRoot, "x/") {
			panic(fmt.Sprintf("unhandled domain for repo %v, consider finding the license and adding to manualLicenseURLMapping", repo))
		}
		newRepoRoot := strings.TrimLeft(repoRoot, "x/")
		if newRepoRoot == "tools" && strings.Contains(licensePathInRepo, "third_party") {
			// This SHA still contains the licenses for the third_party dir
			return fmt.Sprintf("https://github.com/golang/tools/blob/7414d4c1f71cec71978b1aec0539171a2e42d230/%v", licensePathInRepo)
		} else {
			return fmt.Sprintf("https://github.com/golang/%v/blob/master/%v", newRepoRoot, licensePathInRepo)
		}
	case "k8s.io":
		return fmt.Sprintf("https://github.com/kubernetes/%v/blob/master/%v", repoRoot, licensePathInRepo)
	case "go.uber.org":
		return fmt.Sprintf("https://github.com/uber-go/%v/blob/master/%v", repoRoot, licensePathInRepo)
	case "go.mongodb.org":
		return fmt.Sprintf("https://github.com/mongodb/%v/blob/master/%v", repoRoot, licensePathInRepo)
	case "go.starlark.net":
		return fmt.Sprintf("https://github.com/google/%v/blob/master/%v", repoRoot, licensePathInRepo)
	case "gopkg.in":
		switch repoRoot {
		case "yaml.v3":
			return fmt.Sprintf("https://github.com/go-yaml/yaml/blob/v3/%v", licensePathInRepo)
		case "yaml.v2":
			return fmt.Sprintf("https://github.com/go-yaml/yaml/blob/v2/%v", licensePathInRepo)
		default:
			panic(fmt.Sprintf("unhandled domain for repo [%v] domain [%v]", repo, domain))
		}
	case "go.opencensus.io":
		return fmt.Sprintf("https://github.com/census-instrumentation/opencensus-go/blob/master/%v", licensePathInRepo)
	default:
		panic(fmt.Sprintf("unhandled domain for repo [%v] domain [%v]", repo, domain))
	}
}
func splitRepo(repo string) (domain string, repoRoot string, subrepoPath string) {
	splitRepo := strings.Split(repo, "/")
	domain = splitRepo[0]
	if len(splitRepo) == 2 {
		repoRoot = splitRepo[1]
	} else if len(splitRepo) > 2 {
		repoRoot = strings.Join(splitRepo[1:3], "/")
	}
	subrepoPath = ""
	if len(splitRepo) > 3 {
		subrepoPath = strings.Join(splitRepo[3:], "/")
	}
	return domain, repoRoot, subrepoPath
}

var manualLicenseURLMapping = map[string]string{
	"cloud.google.com/go":                                     "https://github.com/googleapis/google-cloud-go/blob/master/LICENSE",
	"contrib.go.opencensus.io/exporter/prometheus":            "https://github.com/census-ecosystem/opencensus-go-exporter-prometheus/blob/master/LICENSE",
	"google.golang.org/api":                                   "https://github.com/googleapis/google-api-go-client/blob/master/LICENSE",
	"google.golang.org/appengine":                             "https://github.com/golang/appengine/blob/master/LICENSE",
	"google.golang.org/api/internal/third_party/uritemplates": "https://github.com/googleapis/google-api-go-client/blob/master/internal/third_party/uritemplates/LICENSE",
	"google.golang.org/genproto":                              "https://github.com/google/go-genproto/blob/master/LICENSE",
	"google.golang.org/grpc":                                  "https://github.com/grpc/grpc-go/blob/master/LICENSE",
	"google.golang.org/protobuf":                              "https://github.com/protocolbuffers/protobuf-go/blob/master/LICENSE",
	"gopkg.in/fsnotify.v1":                                    "https://github.com/fsnotify/fsnotify/blob/master/LICENSE",
	"gopkg.in/inf.v0":                                         "https://github.com/go-inf/inf/blob/master/LICENSE",
	"gopkg.in/tomb.v1":                                        "https://github.com/go-tomb/tomb/blob/v1/LICENSE",
	"gopkg.in/vmihailenco/msgpack.v4":                         "https://github.com/vmihailenco/msgpack/blob/master/LICENSE",
	"honnef.co/go/tools":                                      "https://github.com/dominikh/go-tools/blob/master/LICENSE",
	"honnef.co/go/tools/lint":                                 "https://github.com/dominikh/go-tools/blob/master/lint/LICENSE",
	"honnef.co/go/tools/ssa":                                  "https://github.com/dominikh/go-tools/blob/master/ssa/LICENSE",
	"gomodules.xyz/jsonpatch/v2":                              "https://github.com/gomodules/jsonpatch/blob/master/LICENSE",
}
