package gcpdraw

import "fmt"

const defaultTitle = "Architecture"

type Meta struct {
	title string
}

func NewMeta(title string) *Meta {
	if title == "" {
		title = defaultTitle
	}
	return &Meta{
		title: title,
	}
}

// DisplayName returns the diagram title
func (m *Meta) Title() string {
	if m == nil {
		return defaultTitle
	}
	return m.title
}

func (m *Meta) String() string {
	return fmt.Sprintf("{title: %s}", m.Title())
}
