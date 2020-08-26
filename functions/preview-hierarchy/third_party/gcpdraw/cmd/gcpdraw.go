package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"gob/gcpdraw/gcpdraw"
)

var usage = `Usage:
    gcpdraw [options...] <INPUT_FILE>

Example:
    # For SVG
    gcpdraw <INPUT_FILE>

    # For Google Slide
    gcpdraw -f slide -c <CLIENT_CREDENTIALS.json> <INPUT_FILE>

Options:
    -f=svg|slide              Output format (default: svg)
    -t=gcpdraw|json           Input type (default: gcpdraw)
    -o=OUTPUT_FILE            Output file (default: STDOUT) for SVG, Output slide URL for Google Slide
    -c=CLIENT_CREDENTIALS     Client credentials JSON file for Google Slide
    -v                        Logging verbosely
`

const (
	formatSvg   = "svg"
	formatSlide = "slide"

	typeGcpdraw = "gcpdraw"
	typeJSON    = "json"
)

var (
	diagramOffset = gcpdraw.Offset{0, 0}
)

func main() {
	var format string
	var typ string
	var outFile string
	var credentialsFile string
	var verbose bool

	flag.StringVar(&format, "f", formatSvg, "")
	flag.StringVar(&typ, "t", typeGcpdraw, "")
	flag.StringVar(&outFile, "o", "", "")
	flag.StringVar(&credentialsFile, "c", "", "")
	flag.BoolVar(&verbose, "v", false, "")
	flag.Usage = func() { fmt.Fprint(os.Stderr, usage) }
	flag.Parse()

	if format == formatSlide && credentialsFile == "" {
		flag.Usage()
		os.Exit(1)
	}

	inputFile := flag.Arg(0)
	input, err := readInputFile(inputFile)
	if err != nil {
		log.Fatalf("failed to read input file from %q: %v", inputFile, err)
	}
	if input == "" {
		flag.Usage()
		os.Exit(1)
	}

	var parser gcpdraw.Parser
	switch typ {
	case typeGcpdraw:
		parser = gcpdraw.NewDSLParser(input)
	case typeJSON:
		parser = gcpdraw.NewJSONParser(input)
	default:
		log.Fatalf("invalid type: %s", typ)
	}

	diagram, err := parser.Parse()
	if err != nil {
		log.Fatalf("failed to parse diagram text: %v", err)
	}

	if verbose {
		log.Printf("diagram: %s\n", diagram)
	}

	size, err := diagram.Layout(diagramOffset)
	if err != nil {
		log.Fatalf("failed to layout diagram: %v", err)
	}

	switch format {
	case formatSvg:
		out := os.Stdout
		if outFile != "" {
			out, err = os.OpenFile(outFile, os.O_RDWR|os.O_CREATE, 0644)
			if err != nil {
				log.Fatalf("failed to createe output file %q: %v", outFile, err)
			}
		}
		canvasSize := gcpdraw.Size{size.Width + diagramOffset.X, size.Height + diagramOffset.Y}
		renderer := gcpdraw.NewSvgRenderer(out, canvasSize, input, false)
		if err := diagram.Render(renderer); err != nil {
			log.Fatalf("failed to render: %v", err)
		}
	case formatSlide:
		ctx := context.Background()
		client, err := gcpdraw.GetCliClient(ctx, credentialsFile)
		if err != nil {
			log.Fatalf("failed to create slide client: %v", err)
		}
		renderer, err := gcpdraw.NewSlideRenderer(client, outFile, diagram.Meta.Title(), input)
		if err := diagram.Render(renderer); err != nil {
			log.Fatalf("failed to render: %v", err)
		}
		fmt.Printf("https://docs.google.com/presentation/d/%s/edit#slide=id.%s\n", renderer.PresentationId(), renderer.SlideId())
	default:
		log.Fatalf("unsupported format: %q", format)
	}
}

func readInputFile(inputFile string) (string, error) {
	if inputFile == "" {
		return readStdin()
	}

	b, err := ioutil.ReadFile(inputFile)
	if err != nil {
		return "", err
	}

	return string(b), nil
}

func readStdin() (string, error) {
	stat, _ := os.Stdin.Stat()
	if (stat.Mode() & os.ModeCharDevice) == 0 {
		b, err := ioutil.ReadAll(os.Stdin)
		if err != nil {
			return "", err
		}
		return string(b), nil
	} else {
		return "", nil
	}
}
