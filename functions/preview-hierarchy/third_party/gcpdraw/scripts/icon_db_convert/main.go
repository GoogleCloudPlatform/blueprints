package main

import (
	"flag"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	var inputDir string
	var outputDir string

	flag.StringVar(&inputDir, "input", "", "")
	flag.StringVar(&outputDir, "output", "", "")
	flag.Parse()

	if inputDir == "" || outputDir == "" {
		flag.Usage()
		os.Exit(1)
	}

	if err := os.Mkdir(outputDir, 0755); err != nil {
		log.Fatalf("failed to create directory: %v", err)
	}

	if err := filepath.Walk(inputDir, func(path string, info os.FileInfo, err error) error {
		if !strings.HasSuffix(path, "-512-color.png") && !strings.HasSuffix(path, "-512-blue.png") && !strings.HasSuffix(path, "_512x512_color.png"){
			return nil
		}
		normalized := strings.Replace(info.Name(), "-512-color", "", 1)
		normalized = strings.Replace(normalized, "-512-blue", "", 1)
		normalized = strings.Replace(normalized, "_512x512_color", "", 1)
		iconName := strings.ToLower(normalized)
		dstPath := filepath.Join(outputDir, iconName)
		log.Printf("convert from %s to %s", path, dstPath)

		src, err := os.Open(path)
		if err != nil {
			return err
		}
		defer src.Close()

		dst, err := os.Create(dstPath)
		if err != nil {
			return err
		}
		defer dst.Close()

		if _, err := io.Copy(dst, src); err != nil {
			return err
		}

		return nil
	}); err != nil {
		log.Fatalf("failed to convert icon: %v", err)
	}
}