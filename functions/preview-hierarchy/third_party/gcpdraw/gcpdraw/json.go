package gcpdraw

import (
	"encoding/json"
	"fmt"
)

const (
	// TODO(furuyama) version representation
	version1Alpha1 = "v1alpha1"

	ElementTypeCard  = "card"
	ElementTypeGroup = "group"
	ElementTypeGcp   = "gcp"

	PathDirectionRight = "right"
	PathDirectionLeft  = "left"
	PathDirectionUp    = "up"
	PathDirectionDown  = "down"

	ArrowTypeFill = "fill"
	ArrowTypeNone = "none"

	DashTypeSolid = "solid"
	DashTypeDot   = "dot"
)

type JSONRepresentation struct {
	Version string      `json:"version"`
	Diagram JSONDiagram `json:"diagram"`
}

type JSONDiagram struct {
	Meta     JSONMeta      `json:"meta"`
	Elements []JSONElement `json:"elements"`
	Paths    []JSONPath    `json:"paths"`
}

type JSONMeta struct {
	Title string `json:"title"`
}

type JSONElement struct {
	Type        string `json:"type"`
	ID          string `json:"id"`
	Name        string `json:"name"`
	IconURL     string `json:"icon_url"`
	Description string `json:"description"`

	// for card type
	CardID  string `json:"cardId"`
	Stacked bool   `json:"stacked"`

	// for gcp and group type
	InnerElements []JSONElement `json:"innerElements"`

	// for group type
	BackgroundColor string `json:"backgroundColor"`
}

// TODO(furuyama): naming
type JSONPath struct {
	Src          string `json:"src"`
	Dst          string `json:"dst"`
	Hidden       bool   `json:"hidden"`
	Direction    string `json:"direction"`
	SrcArrowType string `json:"srcArrowType"`
	DstArrowType string `json:"dstArrowType"`
	DashType     string `json:"dashType"`
	Annotation   string `json:"annotation"`
}

// JSONParser implements parser interface
type JSONParser struct {
	text string
}

func NewJSONParser(text string) *JSONParser {
	return &JSONParser{
		text: text,
	}
}

func (p *JSONParser) Parse() (*Diagram, error) {
	var j JSONRepresentation
	if err := json.Unmarshal([]byte(p.text), &j); err != nil {
		return nil, fmt.Errorf("invalid JSON: %v", err)
	}
	if j.Version != version1Alpha1 {
		return nil, fmt.Errorf("version is not available: %s", j.Version)
	}

	meta := NewMeta(j.Diagram.Meta.Title)

	var elements []Element
	for _, e := range j.Diagram.Elements {
		element, err := p.parseElement(e, 0)
		if err != nil {
			return nil, err
		}
		elements = append(elements, element)
	}

	var paths []*Path
	for _, jp := range j.Diagram.Paths {
		path, err := p.parsePath(jp)
		if err != nil {
			return nil, err
		}
		paths = append(paths, path)
	}

	return NewDiagram(meta, elements, paths, p.text)
}

func (p *JSONParser) parseElement(e JSONElement, groupLayer int) (Element, error) {
	switch e.Type {
	case ElementTypeCard:
		id := e.ID
		if id == "" {
			id = e.CardID
		}
		return NewElementCard(id, e.CardID, e.Name, e.Description, "", e.IconURL, e.Stacked)
	case ElementTypeGcp:
		var innerElements []Element
		for _, ie := range e.InnerElements {
			innerElement, err := p.parseElement(ie, groupLayer)
			if err != nil {
				return nil, err
			}
			innerElements = append(innerElements, innerElement)
		}
		return NewElementGCP(innerElements), nil
	case ElementTypeGroup:
		bgColor := getDefaultGroupBackgroundColor(groupLayer)
		if e.BackgroundColor != "" {
			c, err := hexColorToColor(e.BackgroundColor)
			if err != nil {
				return nil, fmt.Errorf("invalid backgroundColor: %q", e.BackgroundColor)
			}
			bgColor = c
		}

		var innerElements []Element
		for _, ie := range e.InnerElements {
			innerElement, err := p.parseElement(ie, groupLayer+1)
			if err != nil {
				return nil, err
			}
			innerElements = append(innerElements, innerElement)
		}

		name := e.Name
		if name == "" {
			name = e.ID
		}

		return NewElementGroup(e.ID, name, e.IconURL, bgColor, innerElements)
	default:
		return nil, fmt.Errorf("invalid element type: %q", e.Type)
	}
}

func (p *JSONParser) parsePath(jp JSONPath) (*Path, error) {
	var direction LineDirection
	switch jp.Direction {
	case "":
		direction = LineDirectionRight
	case PathDirectionRight:
		direction = LineDirectionRight
	case PathDirectionLeft:
		direction = LineDirectionLeft
	case PathDirectionUp:
		direction = LineDirectionUp
	case PathDirectionDown:
		direction = LineDirectionDown
	default:
		return nil, fmt.Errorf("invalid path direction: %q", jp.Direction)
	}

	var srcArrowType, dstArrowType LineArrow
	switch jp.SrcArrowType {
	case "":
		srcArrowType = LineArrowNone
	case ArrowTypeFill:
		srcArrowType = LineArrowFill
	case ArrowTypeNone:
		srcArrowType = LineArrowNone
	default:
		return nil, fmt.Errorf("invalid srcArrowType: %q", jp.SrcArrowType)
	}
	switch jp.DstArrowType {
	case "":
		dstArrowType = LineArrowFill
	case ArrowTypeFill:
		dstArrowType = LineArrowFill
	case ArrowTypeNone:
		dstArrowType = LineArrowNone
	default:
		return nil, fmt.Errorf("invalid dstArrowType: %q", jp.DstArrowType)
	}

	var dashType LineDash
	switch jp.DashType {
	case "":
		dashType = LineDashSolid
	case DashTypeSolid:
		dashType = LineDashSolid
	case DashTypeDot:
		dashType = LineDashDot
	default:
		return nil, fmt.Errorf("invalid dashType: %q", jp.DashType)
	}

	return &Path{
		StartId:    jp.Src,
		EndId:      jp.Dst,
		StartArrow: srcArrowType,
		EndArrow:   dstArrowType,
		Dash:       dashType,
		Direction:  direction,
		Hidden:     jp.Hidden,
		Annotation: jp.Annotation,
	}, nil
}
