package gcpdraw

import (
	"fmt"
)

var (
	groupMargin     = Margin{10.0, 15.0, 10.0, 15.0}
	groupPadding    = Margin{10.0, 0, 0, 0}
	groupNameOffset = Offset{5.0, 10.0}
)

type ElementGroup struct {
	Id              string
	Name            string
	IconURL         string
	BackgroundColor Color
	InnerElements   []Element

	offset Offset
	size   Size
}

func NewElementGroup(id, name, iconURL string, backgroundColor Color, elements []Element) (*ElementGroup, error) {
	if iconURL != "" {
		parsedURL, err := parseCustomIconURL(iconURL)
		if err != nil {
			return nil, err
		}
		iconURL = convertDriveURL(parsedURL)
	}
	return &ElementGroup{
		Id:              id,
		Name:            name,
		IconURL:         iconURL,
		BackgroundColor: backgroundColor,
		InnerElements:   elements,
	}, nil
}

func (e *ElementGroup) String() string {
	return fmt.Sprintf("group{name: %s, elements: %s}", e.Name, e.InnerElements)
}

func (e *ElementGroup) GetId() string {
	return e.Id
}

func (e *ElementGroup) WalkEachElement(f func(element Element) error) error {
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

func (e *ElementGroup) ContainElement(id string) bool {
	return e.FindElement(id) != nil
}

func (e *ElementGroup) FindElement(id string) Element {
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

func (e *ElementGroup) GetMargin() Margin {
	return groupMargin
}

func (e *ElementGroup) Layout(offset Offset, paths []*Path) (Size, error) {
	l, err := composeLayout(e.InnerElements, paths)
	if err != nil {
		return Size{}, err
	}

	// layout to get inner size
	innerOffset := offset.add(groupPadding.Left, groupPadding.Top)
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
		groupPadding.Left + groupPadding.Right + innerSize.Width,
		groupPadding.Top + groupPadding.Bottom + innerSize.Height,
	}

	e.offset = offset
	e.size = size

	return size, nil
}

func (e *ElementGroup) Render(renderer Renderer) error {
	if err := renderer.RenderGroupBackground(e.GetId(), e.offset, e.size, e.Name, e.IconURL, e.BackgroundColor); err != nil {
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

func (e *ElementGroup) GetOffset() Offset {
	return e.offset
}

func (e *ElementGroup) GetSize() Size {
	return e.size
}

func (e *ElementGroup) HasCard() bool {
	for _, ie := range e.InnerElements {
		if _, ok := ie.(*ElementCard); ok {
			return true
		} else if g, ok := ie.(*ElementGroup); ok {
			if g.HasCard() {
				return true
			}
		}
	}
	return false
}
