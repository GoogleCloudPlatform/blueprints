package gcpdraw

import (
	"testing"
)

func TestComposeLayout(t *testing.T) {
	loadCardConfigs([]CardConfig{
		{CardId: "cardId", DisplayName: "name", IconUrl: "url"},
	})

	successTests := []struct {
		elements []Element
		paths    []*Path
		expected [][]string
	}{
		{
			elements: []Element{
				mustCreateCard(t, "a", "cardId", "", "", "", "", false),
				mustCreateCard(t, "b", "cardId", "", "", "", "", false),
				mustCreateGroup(t, "g", "", "", Color{}, []Element{
					mustCreateCard(t, "c", "cardId", "", "", "", "", false),
					mustCreateCard(t, "d", "cardId", "", "", "", "", false),
				}),
			},
			paths: []*Path{
				{StartId: "a", EndId: "b", Direction: LineDirectionRight},
				{StartId: "b", EndId: "c", Direction: LineDirectionRight},
				{StartId: "c", EndId: "d", Direction: LineDirectionRight},
			},
			expected: [][]string{
				[]string{"a"},
				[]string{"b"},
				[]string{"g"},
			},
		},
		{
			elements: []Element{
				mustCreateCard(t, "d", "cardId", "", "", "", "", false),
				mustCreateCard(t, "e", "cardId", "", "", "", "", false),
			},
			paths: []*Path{
				{StartId: "a", EndId: "b", Direction: LineDirectionRight},
				{StartId: "b", EndId: "d", Direction: LineDirectionRight},
				{StartId: "d", EndId: "e", Direction: LineDirectionRight},
			},
			expected: [][]string{
				[]string{"d"},
				[]string{"e"},
			},
		},
		{
			elements: []Element{
				mustCreateCard(t, "a", "cardId", "", "", "", "", false),
				mustCreateCard(t, "b", "cardId", "", "", "", "", false),
				mustCreateCard(t, "c", "cardId", "", "", "", "", false),
				mustCreateCard(t, "d", "cardId", "", "", "", "", false),
				mustCreateCard(t, "e", "cardId", "", "", "", "", false),
			},
			paths: []*Path{
				{StartId: "a", EndId: "b", Direction: LineDirectionDown},
				{StartId: "b", EndId: "c", Direction: LineDirectionRight},
				{StartId: "c", EndId: "d", Direction: LineDirectionUp},
				{StartId: "d", EndId: "e", Direction: LineDirectionRight},
			},
			expected: [][]string{
				[]string{"a", "b"},
				[]string{"d", "c"},
				[]string{"e"},
			},
		},
		{
			elements: []Element{
				mustCreateCard(t, "a", "cardId", "", "", "", "", false),
				mustCreateCard(t, "b", "cardId", "", "", "", "", false),
				mustCreateCard(t, "c", "cardId", "", "", "", "", false),
				mustCreateCard(t, "d", "cardId", "", "", "", "", false),
			},
			paths: []*Path{
				{StartId: "a", EndId: "b", Direction: LineDirectionDown},
				{StartId: "b", EndId: "c", Direction: LineDirectionLeft},
				{StartId: "c", EndId: "d", Direction: LineDirectionUp},
			},
			expected: [][]string{
				[]string{"d", "c"},
				[]string{"a", "b"},
			},
		},
		{
			elements: []Element{
				mustCreateCard(t, "a", "cardId", "", "", "", "", false),
				mustCreateCard(t, "b", "cardId", "", "", "", "", false),
				mustCreateCard(t, "c", "cardId", "", "", "", "", false),
				mustCreateCard(t, "d", "cardId", "", "", "", "", false),
			},
			paths: []*Path{
				{StartId: "a", EndId: "b", Direction: LineDirectionLeft},
				{StartId: "b", EndId: "c", Direction: LineDirectionLeft},
				{StartId: "c", EndId: "d", Direction: LineDirectionLeft},
			},
			expected: [][]string{
				[]string{"d"},
				[]string{"c"},
				[]string{"b"},
				[]string{"a"},
			},
		},
		// cyclic dependency
		{
			elements: []Element{
				mustCreateCard(t, "a", "cardId", "", "", "", "", false),
				mustCreateCard(t, "b", "cardId", "", "", "", "", false),
				mustCreateCard(t, "c", "cardId", "", "", "", "", false),
				mustCreateCard(t, "d", "cardId", "", "", "", "", false),
			},
			paths: []*Path{
				{StartId: "a", EndId: "b", Direction: LineDirectionRight},
				{StartId: "b", EndId: "c", Direction: LineDirectionDown},
				{StartId: "c", EndId: "d", Direction: LineDirectionLeft},
				{StartId: "d", EndId: "a", Direction: LineDirectionUp},
			},
			expected: [][]string{
				[]string{"a", "d"},
				[]string{"b", "c"},
			},
		},
	}

	for _, test := range successTests {
		got, err := composeLayout(test.elements, test.paths)
		if err != nil {
			t.Errorf("err: %s\n", err)
		}

		if len(got.blocks()) != len(test.expected) {
			t.Errorf("layout different: expected=%v, but got=%v\n", test.expected, got)
		}
		for i, b := range got.blocks() {
			if len(b.elements()) != len(test.expected[i]) {
				t.Errorf("layout different: expected=%v, but got=%v\n", test.expected, got)
			}
			for j, e := range b.elements() {
				if e.GetId() != test.expected[i][j] {
					t.Errorf("layout different: expected=%v, but got=%v\n", test.expected, got)
				}
			}
		}
	}

	failTests := []struct {
		elements []Element
		paths    []*Path
	}{
		// relocation loop error
		{
			elements: []Element{
				mustCreateCard(t, "a", "cardId", "", "", "", "", false),
				mustCreateCard(t, "b", "cardId", "", "", "", "", false),
				mustCreateGroup(t, "g", "", "", Color{}, []Element{
					mustCreateCard(t, "c", "cardId", "", "", "", "", false),
					mustCreateCard(t, "d", "cardId", "", "", "", "", false),
				}),
			},
			paths: []*Path{
				{StartId: "a", EndId: "b", Direction: LineDirectionRight},
				{StartId: "c", EndId: "d", Direction: LineDirectionRight},
				{StartId: "a", EndId: "c", Direction: LineDirectionDown},
				{StartId: "b", EndId: "d", Direction: LineDirectionDown},
			},
		},
	}

	for _, test := range failTests {
		_, err := composeLayout(test.elements, test.paths)
		if err == nil {
			t.Errorf("got non-error, but error expected for test: %s\n", test)
		}
	}
}
