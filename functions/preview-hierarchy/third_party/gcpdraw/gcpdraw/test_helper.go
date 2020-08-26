package gcpdraw

import "testing"

func mustCreateCard(t *testing.T, id, cardId, name, description, displayName, iconURL string, stacked bool) *ElementCard {
	t.Helper()
	card, err := NewElementCard(id, cardId, name, description, displayName, iconURL, stacked)
	if err != nil {
		t.Fatalf("unexpected error on creating a card: %v", err)
	}
	return card
}

func mustCreateLayoutedCard(t *testing.T, id, cardId, name, description, displayName, iconURL string, stacked bool, offset Offset, size Size) *ElementCard {
	t.Helper()
	card, err := NewElementCard(id, cardId, name, description, displayName, iconURL, stacked)
	if err != nil {
		t.Fatalf("unexpected error on creating a card: %v", err)
	}
	card.offset = offset
	card.size = size
	return card
}

func mustCreateGroup(t *testing.T, id, name, iconURL string, backgroundColor Color, elements []Element) *ElementGroup {
	t.Helper()
	group, err := NewElementGroup(id, name, iconURL, backgroundColor, elements)
	if err != nil {
		t.Fatalf("unexpected error on creating a group: %v", err)
	}
	return group
}
