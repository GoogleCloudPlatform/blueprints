package gcpdraw

type TokenType string

const (
	TokenIdentifier      TokenType = "IDENTIFIER"
	TokenLBrace          TokenType = "{"
	TokenRBrace          TokenType = "}"
	TokenLParenthesis    TokenType = "("
	TokenRParenthesis    TokenType = ")"
	TokenMinus           TokenType = "-"
	TokenGt              TokenType = ">"
	TokenLt              TokenType = "<"
	TokenDot             TokenType = "."
	TokenColon           TokenType = ":"
	TokenInvalid         TokenType = "INVALID"
	TokenEOL             TokenType = "EOL"
	TokenEOF             TokenType = "EOF"
	TokenZone            TokenType = "ZONE"
	TokenCard            TokenType = "CARD"
	TokenGroup           TokenType = "GROUP"
	TokenMeta            TokenType = "META"
	TokenTitle           TokenType = "TITLE"
	TokenDisplayName     TokenType = "DISPLAY_NAME"
	TokenElements        TokenType = "ELEMENTS"
	TokenGCP             TokenType = "GCP"
	TokenPaths           TokenType = "PATHS"
	TokenAs              TokenType = "AS"
	TokenName            TokenType = "NAME"
	TokenDescription     TokenType = "DESCRIPTION"
	TokenBackgroundColor TokenType = "BACKGROUND_COLOR"
	TokenStackedCard     TokenType = "STACKED_CARD"
	TokenIconURL         TokenType = "ICON_URL"
)

var keywords = map[string]TokenType{
	"zone":             TokenZone,
	"card":             TokenCard,
	"stacked_card":     TokenStackedCard,
	"group":            TokenGroup,
	"meta":             TokenMeta,
	"title":            TokenTitle,
	"display_name":     TokenDisplayName,
	"elements":         TokenElements,
	"gcp":              TokenGCP,
	"paths":            TokenPaths,
	"as":               TokenAs,
	"name":             TokenName,
	"description":      TokenDescription,
	"background_color": TokenBackgroundColor,
	"icon_url":         TokenIconURL,
}

type Token struct {
	Type       TokenType
	Value      string
	LineNumber int
}

type Tokenizer struct {
	input    []rune
	ch       rune
	position int
	line     int
}

func NewTokenizer(input string) *Tokenizer {
	t := &Tokenizer{
		input:    []rune(input),
		position: -1,
		line:     1,
	}
	t.readChar()
	return t
}

func (t *Tokenizer) NextToken() Token {
	var token Token

	t.skipWhitespace()

	switch t.ch {
	case '{':
		token = Token{TokenLBrace, string(t.ch), t.line}
	case '}':
		token = Token{TokenRBrace, string(t.ch), t.line}
	case '(':
		token = Token{TokenLParenthesis, string(t.ch), t.line}
	case ')':
		token = Token{TokenRParenthesis, string(t.ch), t.line}
	case '-':
		token = Token{TokenMinus, string(t.ch), t.line}
	case '>':
		token = Token{TokenGt, string(t.ch), t.line}
	case '<':
		token = Token{TokenLt, string(t.ch), t.line}
	case '.':
		token = Token{TokenDot, string(t.ch), t.line}
	case '#':
		t.skipCommentLine()
		return t.NextToken()
	case ':':
		token = Token{TokenColon, string(t.ch), t.line}
	case '\n':
		token = Token{TokenEOL, string(t.ch), t.line}
		t.line += 1
	// TODO: \r\n
	case '\r':
		token = Token{TokenEOL, string(t.ch), t.line}
		t.line += 1
	case '"':
		str := t.readString()
		// already read next char, so return here
		return Token{TokenIdentifier, str, t.line}
	case 0:
		token = Token{TokenEOF, "", t.line}
	default:
		if isLetter(t.ch) || isDigit(t.ch) {
			identifier := t.readIdentifier()
			tokenType := lookupTokenType(identifier)
			// already read next char, so return here
			return Token{tokenType, identifier, t.line}
		} else {
			token = Token{TokenInvalid, string(t.ch), t.line}
		}
	}

	t.readChar()

	return token
}

func (t *Tokenizer) skipWhitespace() {
	for t.ch == ' ' || t.ch == '\t' {
		t.readChar()
	}
}

func (t *Tokenizer) skipCommentLine() {
	for !isEol(t.ch) && !isEof(t.ch) {
		t.readChar()
	}
}

func (t *Tokenizer) readChar() {
	nextPosition := t.position + 1
	if nextPosition >= len(t.input) {
		t.ch = 0
	} else {
		t.ch = t.input[nextPosition]
	}
	t.position = nextPosition
}

func (t *Tokenizer) readIdentifier() string {
	position := t.position
	for isLetter(t.ch) || isDigit(t.ch) {
		t.readChar()
	}
	return string(t.input[position:t.position])
}

func (t *Tokenizer) readString() string {
	t.readChar() // skip Left `"`
	position := t.position
	for t.ch != '"' && !isEol(t.ch) && !isEof(t.ch) {
		t.readChar()
	}
	return string(t.input[position:t.position])
}

func isLetter(ch rune) bool {
	return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch == '_'
}

func isDigit(ch rune) bool {
	return '0' <= ch && ch <= '9'
}

func isEol(ch rune) bool {
	return ch == '\n' || ch == '\r'
}

func isEof(ch rune) bool {
	return ch == 0
}

func lookupTokenType(identifier string) TokenType {
	if tokenType, ok := keywords[identifier]; ok {
		return tokenType
	}
	return TokenIdentifier
}
