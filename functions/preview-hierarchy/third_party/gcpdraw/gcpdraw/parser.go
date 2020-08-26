package gcpdraw

import (
	"fmt"
	"strings"
)

// Parser is an interface for parsing diagram code
type Parser interface {
	// Parse parses the diagram code
	Parse() (*Diagram, error)
}

// DSLParser implements Parser interface
type DSLParser struct {
	tokenizer    *Tokenizer
	currentToken Token
	nextToken    Token
	errors       []error
	originalText string
}

func NewDSLParser(text string) *DSLParser {
	p := &DSLParser{
		tokenizer:    NewTokenizer(text),
		errors:       []error{},
		originalText: text,
	}
	p.readToken()
	p.readToken()
	return p
}

func (p *DSLParser) Parse() (*Diagram, error) {
	var meta *Meta
	var elements []Element
	var paths []*Path

	for p.currentToken.Type != TokenEOF {
		switch p.currentToken.Type {
		case TokenMeta:
			meta = p.parseMeta()
		case TokenElements:
			elements = p.parseElements()
		case TokenPaths:
			paths = p.parsePaths()
		}
		p.readNext()
	}

	if len(p.errors) > 0 {
		errStrings := make([]string, len(p.errors))
		for i, err := range p.errors {
			errStrings[i] = err.Error()
		}
		return nil, fmt.Errorf("%s", strings.Join(errStrings, ", "))
	}

	return NewDiagram(meta, elements, paths, p.originalText)
}

func (p *DSLParser) readToken() {
	p.currentToken = p.nextToken
	p.nextToken = p.tokenizer.NextToken()
}

func (p *DSLParser) readNext() {
	p.currentToken = p.nextToken
	p.nextToken = p.tokenizer.NextToken()
}

func (p *DSLParser) readNextIf(tokenType TokenType) bool {
	if p.nextToken.Type == tokenType {
		p.readNext()
		return true
	} else {
		return false
	}
}

func (p *DSLParser) expectNext(tokenType TokenType) bool {
	if p.nextToken.Type == tokenType {
		p.readNext()
		return true
	} else {
		err := fmt.Errorf("unexpected token: %s, line: %d", p.nextToken.Value, p.nextToken.LineNumber)
		p.errors = append(p.errors, err)
		return false
	}
}

func (p *DSLParser) parseMeta() *Meta {
	if !p.expectNext(TokenLBrace) {
		return nil
	}

	var title string
	for p.currentToken.Type != TokenRBrace && p.currentToken.Type != TokenEOF {
		switch p.currentToken.Type {
		case TokenTitle:
			title = p.parseLineString()
		}
		p.readNext()
	}

	return NewMeta(title)
}

func (p *DSLParser) parseElements() []Element {
	elements := make([]Element, 0)

	for p.currentToken.Type != TokenRBrace && p.currentToken.Type != TokenEOF {
		switch p.currentToken.Type {
		case TokenCard:
			card := p.parseCard(false)
			if card != nil {
				elements = append(elements, card)
			}
		case TokenStackedCard:
			card := p.parseCard(true)
			if card != nil {
				elements = append(elements, card)
			}
		case TokenGCP:
			gcp := p.parseGcp()
			if gcp != nil {
				elements = append(elements, gcp)
			}
		case TokenGroup:
			group := p.parseGroup()
			if group != nil {
				elements = append(elements, group)
			}
		}
		p.readNext()
	}

	return elements
}

func (p *DSLParser) parseCard(stacked bool) *ElementCard {
	if !p.expectNext(TokenIdentifier) {
		return nil
	}

	cardId := p.currentToken.Value
	id := cardId

	// check alias
	if p.readNextIf(TokenAs) {
		if !p.expectNext(TokenIdentifier) {
			return nil
		}
		id = p.currentToken.Value
	}

	var name, description, displayName, iconURL string

	// expanded card
	if p.readNextIf(TokenLBrace) {
		for p.currentToken.Type != TokenRBrace && p.currentToken.Type != TokenEOF {
			switch p.currentToken.Type {
			case TokenName:
				name = p.parseLineString()
			case TokenDescription:
				description = p.parseLineString()
			case TokenDisplayName:
				displayName = p.parseLineString()
			case TokenIconURL:
				iconURL = p.parseLineString()
			}
			p.readNext()
		}
	}

	card, err := NewElementCard(id, cardId, name, description, displayName, iconURL, stacked)
	if err != nil {
		p.errors = append(p.errors, err)
		return nil
	}
	return card
}

func (p *DSLParser) parseLineString() string {
	if !p.expectNext(TokenIdentifier) {
		return ""
	}
	return p.currentToken.Value
}

func (p *DSLParser) parseGroup() *ElementGroup {
	return p.parseNestedGroup(0)
}

func (p *DSLParser) parseNestedGroup(layer int) *ElementGroup {
	if !p.expectNext(TokenIdentifier) {
		return nil
	}

	groupId := p.currentToken.Value

	if !p.expectNext(TokenLBrace) {
		return nil
	}

	name := groupId
	backgroundColor := getDefaultGroupBackgroundColor(layer)
	var iconURL string

	innerElements := make([]Element, 0)
	for p.currentToken.Type != TokenRBrace && p.currentToken.Type != TokenEOF {
		switch p.currentToken.Type {
		case TokenName:
			name = p.parseLineString()
			if name == "" {
				p.errors = append(p.errors, fmt.Errorf("group id=%q must have non-empty name", groupId))
			}
		case TokenBackgroundColor:
			bgColor, err := hexColorToColor(p.parseLineString())
			if err != nil {
				// TODO: error handling
				fmt.Println(err)
			} else {
				backgroundColor = bgColor
			}
		case TokenIconURL:
			iconURL = p.parseLineString()
		case TokenGroup: // Nested Group
			innerGroup := p.parseNestedGroup(layer + 1)
			if innerGroup != nil {
				innerElements = append(innerElements, innerGroup)
			}
		case TokenCard:
			card := p.parseCard(false)
			if card != nil {
				innerElements = append(innerElements, card)
			}
		case TokenStackedCard:
			card := p.parseCard(true)
			if card != nil {
				innerElements = append(innerElements, card)
			}
		}
		p.readNext()
	}

	group, err := NewElementGroup(groupId, name, iconURL, backgroundColor, innerElements)
	if err != nil {
		p.errors = append(p.errors, err)
		return nil
	}
	return group
}

func (p *DSLParser) parseGcp() *ElementGCP {
	if !p.expectNext(TokenLBrace) {
		return nil
	}

	innerElements := make([]Element, 0)
	for p.currentToken.Type != TokenRBrace && p.currentToken.Type != TokenEOF {
		switch p.currentToken.Type {
		case TokenCard:
			card := p.parseCard(false)
			if card != nil {
				innerElements = append(innerElements, card)
			}
		case TokenStackedCard:
			card := p.parseCard(true)
			if card != nil {
				innerElements = append(innerElements, card)
			}
		case TokenGroup:
			group := p.parseGroup()
			if group != nil {
				innerElements = append(innerElements, group)
			}
		}
		p.readNext()
	}

	return NewElementGCP(innerElements)
}

func (p *DSLParser) parsePaths() []*Path {
	paths := make([]*Path, 0)
	if !p.expectNext(TokenLBrace) {
		return nil
	}
	p.readNext()

	for p.currentToken.Type != TokenRBrace && p.currentToken.Type != TokenEOF {
		switch p.currentToken.Type {
		case TokenIdentifier:
			path := p.parsePath()
			if path != nil {
				paths = append(paths, path)
			}
		}
		p.readNext()
	}

	return paths
}

func (p *DSLParser) parsePath() *Path {
	startId := p.currentToken.Value

	startArrow := LineArrowNone
	endArrow := LineArrowNone

	if p.readNextIf(TokenLt) {
		startArrow = LineArrowFill
	}

	hiddenPath := false
	if p.readNextIf(TokenLParenthesis) {
		hiddenPath = true
	}

	dash := LineDashSolid
	direction := LineDirectionRight
	if p.readNextIf(TokenMinus) {
		if p.readNextIf(TokenIdentifier) {
			switch p.currentToken.Value {
			case "left":
				direction = LineDirectionLeft
			case "down":
				direction = LineDirectionDown
			case "up":
				direction = LineDirectionUp
			}
		}
		if !p.expectNext(TokenMinus) {
			return nil
		}
		dash = LineDashSolid
	} else if p.readNextIf(TokenDot) {
		if p.readNextIf(TokenIdentifier) {
			switch p.currentToken.Value {
			case "left":
				direction = LineDirectionLeft
			case "down":
				direction = LineDirectionDown
			case "up":
				direction = LineDirectionUp
			}
		}
		if !p.expectNext(TokenDot) {
			return nil
		}
		dash = LineDashDot
	} else {
		return nil
	}

	if p.readNextIf(TokenGt) {
		endArrow = LineArrowFill
	}

	if hiddenPath {
		if !p.expectNext(TokenRParenthesis) {
			return nil
		}
	}

	if !p.expectNext(TokenIdentifier) {
		return nil
	}

	endId := p.currentToken.Value

	var annotation string
	if p.readNextIf(TokenColon) {
		annotation = p.parseLineString()
	}

	return &Path{
		StartId:    startId,
		EndId:      endId,
		StartArrow: startArrow,
		EndArrow:   endArrow,
		Dash:       dash,
		Direction:  direction,
		Hidden:     hiddenPath,
		Annotation: annotation,
	}
}
