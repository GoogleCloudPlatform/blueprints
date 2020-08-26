package gcpdraw

import (
	"fmt"
	"strings"
	"unicode/utf8"
)

const (
	cardNameWidthChar           = 4.3
	cardDescriptionWidthPerChar = 3.8
	expandedCardHeight          = 45.0
)

var (
	cardMargin             = Margin{10.0, 15.0, 10.0, 15.0}
	defaultCardSize        = Size{75.0, 30.0}
	cardIconSize           = Size{20.0, 20.0}
	cardIconMargin         = Margin{5.0, 7.0, 0, 5.0}
	cardNameMargin         = Margin{2.0, 0, 0, 0}
	cardDisplayNameMargin  = Margin{10.0, 0, 0, 0}
	iconOnlyCardSize       = Size{30.0, 30.0}
	iconOnlyCardIconSize   = Size{20.0, 20.0}
	iconOnlyCardIconMargin = Margin{5.0, 5.0, 5.0, 5.0}
	stackedCardOffset      = Offset{4.0, 4.0}
)

type ElementCard struct {
	Id          string
	DisplayName string
	Name        string
	Description string
	IconURL     string
	Stacked     bool

	offset Offset
	size   Size
}

func NewElementCard(id, cardId, name, description, displayName, iconURL string, stacked bool) (*ElementCard, error) {
	// Custom icon
	if iconURL != "" {
		parsedURL, err := parseCustomIconURL(iconURL)
		if err != nil {
			return nil, err
		}
		iconURL = convertDriveURL(parsedURL)
	}

	if cardConfig := GetCardConfig(cardId); cardConfig != nil {
		if displayName == "" {
			displayName = cardConfig.DisplayName
		}
		if iconURL == "" {
			iconURL = cardConfig.IconUrl
		}
	}

	if iconURL == "" {
		return nil, fmt.Errorf(`card id="%s" is not supported. For a custom icon, please specify "icon_url"`, cardId)
	}

	return &ElementCard{
		Id:          id,
		DisplayName: displayName,
		Name:        name,
		Description: description,
		IconURL:     iconURL,
		Stacked:     stacked,
	}, nil
}

func (e *ElementCard) String() string {
	return fmt.Sprintf("card{id: %s}", e.Id)
}

func (e *ElementCard) GetId() string {
	return e.Id
}

func (e *ElementCard) WalkEachElement(f func(element Element) error) error {
	return f(e)
}

func (e *ElementCard) GetMargin() Margin {
	return cardMargin
}

func (e *ElementCard) ContainElement(id string) bool {
	return e.FindElement(id) != nil
}

func (e *ElementCard) FindElement(id string) Element {
	if e.Id == id {
		return e
	} else {
		return nil
	}
}

func (e *ElementCard) Layout(offset Offset, paths []*Path) (Size, error) {
	size := e.calculateSize()
	e.size = size
	e.offset = offset
	return size, nil
}

func (e *ElementCard) Render(renderer Renderer) error {
	if e.Stacked {
		// render stacked card at first
		offset := e.offset.addOffset(stackedCardOffset)
		renderer.RenderStackedCard(e.GetId(), offset, e.size)
	}

	return renderer.RenderCard(e.GetId(), e.offset, e.size, e.DisplayName, e.Name, e.Description, e.IconURL)
}

func (e *ElementCard) GetOffset() Offset {
	return e.offset
}

func (e *ElementCard) GetSize() Size {
	return e.size
}

/*
Card Patterns:

1. Only Icon
+--------+
| [Icon] |
|        |
+--------+

2. Icon and Display Name (Display Name is multi-line)
+------------------+
| [Icon] [Display- |
|        Name]     |
+------------------+

3. Icon, Display Name, and Name
+-----------------------+
| [Icon] [Name]         |
|        [Display Name] |
+-----------------------+

4. Icon, Display Name, Name, and Description
+-----------------------+
| [Icon] [Name]         |
|        [Display Name] |
|        [Description]  |
+-----------------------+
*/
func (e *ElementCard) calculateSize() Size {
	// Card Pattern #1.
	if e.DisplayName == "" && e.Name == "" && e.Description == "" {
		return iconOnlyCardSize
	}

	displayNameWidth := calcDisplayNameWidth(e.DisplayName)

	// Card Pattern #2.
	if e.Name == "" && e.Description == "" {
		// Split displayName into words and find the longest word.
		words := strings.Split(e.DisplayName, " ")
		var displayNameWidths []float64
		for _, word := range words {
			displayNameWidths = append(displayNameWidths, calcDisplayNameWidth(word))
		}
		displayNameWidth = maxWidth(displayNameWidths...)
	}

	iconWidth := cardIconMargin.Left + cardIconSize.Width + cardIconMargin.Right
	nameWidth := calcNameWidth(e.Name)
	descriptionWidth := calcDescriptionWidth(e.Description)

	width := maxWidth(
		defaultCardSize.Width,
		iconWidth+displayNameWidth,
		iconWidth+nameWidth,
		iconWidth+descriptionWidth,
	)

	height := defaultCardSize.Height
	if e.Description != "" {
		height = expandedCardHeight
	}

	return Size{width, height}
}

func calcNameWidth(s string) float64 {
	return float64(utf8.RuneCountInString(s)) * cardNameWidthChar
}

func calcDescriptionWidth(s string) float64 {
	return float64(utf8.RuneCountInString(s)) * cardDescriptionWidthPerChar
}

func calcDisplayNameWidth(s string) float64 {
	return float64(utf8.RuneCountInString(s)) * cardNameWidthChar
}

func maxWidth(widths ...float64) float64 {
	if len(widths) == 0 {
		return 0
	}

	max := widths[0]
	for _, width := range widths {
		if max < width {
			max = width
		}
	}
	return max
}
