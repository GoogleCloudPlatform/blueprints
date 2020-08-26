package gcpdraw

import (
	"fmt"
)

const (
	headerHeight = 20
	footerHeight = 10
)

type Diagram struct {
	Meta     *Meta
	Elements []Element
	Paths    []*Path
	Code     string

	offset Offset
	size   Size
}

func NewDiagram(meta *Meta, elements []Element, paths []*Path, code string) (*Diagram, error) {
	diagram := &Diagram{
		Meta:     meta,
		Elements: elements,
		Paths:    paths,
		Code:     code,
	}
	if err := diagram.validate(); err != nil {
		return nil, err
	}
	return diagram, nil
}

func (d *Diagram) Layout(offset Offset) (Size, error) {
	layout, err := composeLayout(d.Elements, d.Paths)
	if err != nil {
		return Size{}, err
	}

	// layout to get body size
	bodyOffset := offset.add(0, headerHeight)
	bodySize, err := LayoutInnerElements(bodyOffset, Size{}, layout, d.Paths)
	if err != nil {
		return Size{}, err
	}

	// layout again
	bodySize, err = LayoutInnerElements(bodyOffset, bodySize, layout, d.Paths)
	if err != nil {
		return Size{}, err
	}

	size := bodySize.add(0, headerHeight+footerHeight)

	d.offset = offset
	d.size = size
	return size, nil
}

func (d *Diagram) Render(renderer Renderer) error {
	// Header
	headerOffset := d.offset
	headerSize := Size{d.size.Width, headerHeight}
	if err := renderer.RenderHeader(headerOffset, headerSize, d.Meta.Title()); err != nil {
		return err
	}

	// Footer
	footerOffset := d.offset.add(0, d.size.Height-footerHeight)
	footerSize := Size{d.size.Width, footerHeight}
	if err := renderer.RenderFooter(footerOffset, footerSize); err != nil {
		return err
	}

	// Elements
	for _, element := range d.Elements {
		if err := element.Render(renderer); err != nil {
			return err
		}
	}

	// Paths
	for _, path := range d.Paths {
		if path.Hidden {
			continue
		}
		var startElement, endElement Element
		for _, element := range d.Elements {
			if e := element.FindElement(path.StartId); e != nil {
				startElement = e
				break
			}
		}
		for _, element := range d.Elements {
			if e := element.FindElement(path.EndId); e != nil {
				endElement = e
				break
			}
		}
		if startElement != nil && endElement != nil {
			route := findBestRouteForPath(d, path, startElement.GetOffset(), endElement.GetOffset(), startElement.GetSize(), endElement.GetSize())
			if err := renderer.RenderPath(path, route, startElement, endElement); err != nil {
				return err
			}
		}
	}

	return renderer.Finalize()
}

func (d *Diagram) validate() error {
	// validate elements' ids
	elementIdMap := make(map[string]bool, 0)
	err := d.walkEachElement(func(e Element) error {
		id := e.GetId()
		if _, exists := elementIdMap[id]; exists {
			return fmt.Errorf("id=%q is used in multiple elements. Please assign unique id with `as` keyword", id)
		}
		elementIdMap[id] = true
		return nil
	})
	if err != nil {
		return err
	}

	// validate group
	err = d.walkEachElement(func(e Element) error {
		if group, ok := e.(*ElementGroup); ok {
			if !group.HasCard() {
				return fmt.Errorf("group id=%q must include at least one element inside it", e.GetId())
			}
		}
		return nil
	})
	if err != nil {
		return err
	}

	// validate paths
	for _, path := range d.Paths {
		var startFound, endFound bool
		for _, elem := range d.Elements {
			if elem.ContainElement(path.StartId) {
				startFound = true
			}
			if elem.ContainElement(path.EndId) {
				endFound = true
			}
		}
		if !startFound {
			return fmt.Errorf("path has non-existent element id=%q", path.StartId)
		}
		if !endFound {
			return fmt.Errorf("path has non-existent element id=%q", path.EndId)
		}
	}

	return nil
}

func (d *Diagram) walkEachElement(f func(element Element) error) error {
	for _, e := range d.Elements {
		if err := e.WalkEachElement(f); err != nil {
			return err
		}
	}
	return nil
}
