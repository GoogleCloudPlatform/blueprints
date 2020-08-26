package gcpdraw

const (
	cardAdditionalMarginLeft = 15.0
)

type Element interface {
	GetId() string
	ContainElement(id string) bool
	FindElement(id string) Element
	GetMargin() Margin
	String() string
	WalkEachElement(func(element Element) error) error
	Layout(offset Offset, paths []*Path) (Size, error)
	Render(renderer Renderer) error
	GetOffset() Offset
	GetSize() Size
}

func LayoutInnerElements(offset Offset, parentSize Size, l *layout, paths []*Path) (Size, error) {
	nextOffset := offset
	maxHeight := 0.0
	for _, block := range l.blocks() {
		// get Height
		nextOffset.Y = offset.Y
		for _, element := range block.elements() {
			margin := element.GetMargin()
			offset := nextOffset.add(margin.Left, margin.Top)
			size, err := element.Layout(offset, paths)
			if err != nil {
				return Size{}, err
			}
			nextOffset.Y = offset.Y + size.Height + margin.Bottom
		}

		// adjust offset for center align vertically
		blockOffset := offset
		if parentSize.Height > 0 {
			blockHeight := nextOffset.Y - offset.Y
			space := parentSize.Height - blockHeight
			blockOffset.Y = offset.Y + space/2.0
		}

		// Calculate the maximum width of the cards in this block for aligning horizontally
		var maxCardWidth float64
		for _, element := range block.elements() {
			if card, ok := element.(*ElementCard); ok {
				size := card.calculateSize()
				if size.Width > maxCardWidth {
					maxCardWidth = size.Width
				}
			}
		}

		// layout
		maxWidth := 0.0
		nextOffset.Y = blockOffset.Y
		for _, element := range block.elements() {
			margin := element.GetMargin()

			// adjust margin for aligning Left side of card and group
			if _, ok := element.(*ElementCard); ok {
				if block.hasGroup() {
					margin.Left = margin.Left + cardAdditionalMarginLeft
				}
			}

			// align horizontally for cards
			if card, ok := element.(*ElementCard); ok {
				margin.Left = margin.Left + (maxCardWidth-card.calculateSize().Width)/2.0
			}

			offset := nextOffset.add(margin.Left, margin.Top)
			size, err := element.Layout(offset, paths)
			if err != nil {
				return Size{}, err
			}
			nextOffset.Y = offset.Y + size.Height + margin.Bottom
			if width := margin.Left + size.Width + margin.Right; width > maxWidth {
				maxWidth = width
			}
		}

		blockHeight := nextOffset.Y - offset.Y
		if blockHeight > maxHeight {
			maxHeight = blockHeight
		}

		nextOffset.X = nextOffset.X + maxWidth
	}

	size := Size{nextOffset.X - offset.X, maxHeight}

	return size, nil
}
