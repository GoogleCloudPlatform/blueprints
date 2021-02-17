package main

import (
	"bytes"
	"gob/gcpdraw/gcpdraw"
	"io"
	"text/template"
)

var (
	diagramOffset = gcpdraw.Offset{X: 0, Y: 0}
)

// invokeGCPDraw calls the GCPDraw library passing in as input the DSL to render
func invokeGCPDraw(input string, output io.Writer) error {
	diagram, err := gcpdraw.NewDSLParser(input).Parse()
	if err != nil {
		return err
	}

	size, err := diagram.Layout(diagramOffset)
	if err != nil {
		return err
	}

	canvasSize := gcpdraw.Size{
		Width:  size.Width + diagramOffset.X,
		Height: size.Height + diagramOffset.Y,
	}

	renderer := gcpdraw.NewSvgRenderer(output, canvasSize, input, false)
	return diagram.Render(renderer)
}

// createDiagram creates a GCP Draw diagram by rendering the list of folders
// into the GCPDraw DSL format and then invoking GCPDraw to output the
// SVG
func createDiagram(hierarchy []*gcpHierarchyResource, output io.Writer) error {
	// Convert to GCP Draw DSL format
	tmpl, err := template.ParseFiles("template.tmpl")
	if err != nil {
		return err
	}

	buf := bytes.NewBufferString("")
	err = tmpl.Execute(buf, hierarchy)
	if err != nil {
		return err
	}

	// Use GCP draw to output file
	return invokeGCPDraw(buf.String(), output)
}
