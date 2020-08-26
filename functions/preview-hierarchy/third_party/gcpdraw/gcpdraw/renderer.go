package gcpdraw

// Renderer is an interface to render a diagram with calculated layout
type Renderer interface {
	RenderHeader(offset Offset, size Size, title string) error
	RenderFooter(offset Offset, size Size) error
	RenderGCPBackground(id string, offset Offset, size Size) error
	RenderGroupBackground(id string, offset Offset, size Size, name, iconURL string, bgColor Color) error
	RenderStackedCard(id string, offset Offset, size Size) error
	RenderCard(id string, offset Offset, size Size, displayName, name, description, iconURL string) error
	// TODO: passing Element is tightly coupled, think more decoupled arguments
	RenderPath(path *Path, route Route, startElement, endElement Element) error
	Finalize() error
}
