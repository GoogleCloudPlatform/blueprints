package gcpdraw

import (
	"fmt"
)

const (
	gcpMinimumWidth = 150.0
	gcpElementId    = "gcp"
	gcpConfigId     = "gcp_logo"
)

var (
	gcpMargin     = Margin{10.0, 15.0, 20.0, 15.0}
	gcpPadding    = Margin{30.0, 0, 0, 0}
	gcpIconOffset = Offset{10.0, 10.0}
)

// ElementGCP implements Element
type ElementGCP struct {
	InnerElements []Element

	offset Offset
	size   Size
}

func NewElementGCP(elements []Element) *ElementGCP {
	return &ElementGCP{
		InnerElements: elements,
	}
}

func (e *ElementGCP) String() string {
	return fmt.Sprintf("gcp{elements: %s}", e.InnerElements)
}

func (e *ElementGCP) GetId() string {
	return gcpElementId
}

func (e *ElementGCP) WalkEachElement(f func(element Element) error) error {
	if err := f(e); err != nil {
		return err
	}
	for _, ie := range e.InnerElements {
		if err := ie.WalkEachElement(f); err != nil {
			return err
		}
	}
	return nil
}

func (e *ElementGCP) ContainElement(id string) bool {
	return e.FindElement(id) != nil
}

func (e *ElementGCP) FindElement(id string) Element {
	if e.GetId() == id {
		return e
	}

	for _, ie := range e.InnerElements {
		if elem := ie.FindElement(id); elem != nil {
			return elem
		}
	}

	return nil
}

func (e *ElementGCP) GetMargin() Margin {
	return gcpMargin
}

func (e *ElementGCP) Layout(offset Offset, paths []*Path) (Size, error) {
	l, err := composeLayout(e.InnerElements, paths)
	if err != nil {
		return Size{}, err
	}

	innerOffset := offset.add(gcpPadding.Left, gcpPadding.Top)

	// layout to get inner size
	innerSize, err := LayoutInnerElements(innerOffset, Size{}, l, paths)
	if err != nil {
		return Size{}, err
	}

	// layout again
	innerSize, err = LayoutInnerElements(innerOffset, innerSize, l, paths)
	if err != nil {
		return Size{}, err
	}

	size := Size{
		gcpPadding.Left + gcpPadding.Right + innerSize.Width,
		gcpPadding.Top + gcpPadding.Bottom + innerSize.Height,
	}
	if size.Width < gcpMinimumWidth {
		size.Width = gcpMinimumWidth
	}

	e.offset = offset
	e.size = size
	return size, nil
}

func (e *ElementGCP) Render(renderer Renderer) error {
	if err := renderer.RenderGCPBackground(e.GetId(), e.offset, e.size); err != nil {
		return err
	}
	// render inner elements
	for _, element := range e.InnerElements {
		if err := element.Render(renderer); err != nil {
			return err
		}
	}
	return nil
}

func (e *ElementGCP) GetOffset() Offset {
	return e.offset
}

func (e *ElementGCP) GetSize() Size {
	return e.size
}
