package gcpdraw

import (
	"testing"
)

func TestDiagramValidate(t *testing.T) {
	loadCardConfigs([]CardConfig{
		{CardId: "cardId1", DisplayName: "name", IconUrl: "url"},
		{CardId: "cardId2", DisplayName: "name", IconUrl: "url"},
		{CardId: "cardId3", DisplayName: "name", IconUrl: "url"},
		{CardId: "cardId4", DisplayName: "name", IconUrl: "url"},
		{CardId: "cardId5", DisplayName: "name", IconUrl: "url"},
	})

	validDiagrams := []Diagram{
		{
			Elements: []Element{
				mustCreateCard(t, "id1", "cardId1", "", "", "", "", false),
				mustCreateCard(t, "id2", "cardId2", "", "", "", "", false),
				mustCreateGroup(t, "id3", "", "", Color{}, []Element{
					mustCreateCard(t, "id4", "cardId4", "", "", "", "", false),
					mustCreateCard(t, "id5", "cardId5", "", "", "", "", false),
				}),
			},
			Paths: []*Path{},
		},
		{
			Elements: []Element{
				mustCreateCard(t, "id1", "cardId1", "", "", "", "", false),
				mustCreateCard(t, "id2", "cardId2", "", "", "", "", false),
			},
			Paths: []*Path{
				{"id1", "id2", "", "", "", 0, false, ""},
			},
		},
		// group id2 is valid since id3 has an element
		{
			Elements: []Element{
				mustCreateCard(t, "id1", "cardId1", "", "", "", "", false),
				mustCreateGroup(t, "id2", "", "", Color{}, []Element{
					mustCreateGroup(t, "id3", "", "", Color{}, []Element{
						mustCreateCard(t, "id4", "cardId4", "", "", "", "", false),
					}),
				}),
			},
			Paths: []*Path{},
		},
	}

	for _, d := range validDiagrams {
		if err := d.validate(); err != nil {
			t.Errorf("invalid result: diagram=%v should be valid, but got error=%s", d, err)
		}
	}

	invalidDiagrams := []Diagram{
		// id1 is duplicated
		{
			Elements: []Element{
				mustCreateCard(t, "id1", "cardId1", "", "", "", "", false),
				mustCreateCard(t, "id1", "cardId2", "", "", "", "", false),
			},
			Paths: []*Path{},
		},
		// id2 is duplicated
		{
			Elements: []Element{
				mustCreateCard(t, "id1", "cardId1", "", "", "", "", false),
				mustCreateCard(t, "id2", "cardId2", "", "", "", "", false),
				mustCreateGroup(t, "id3", "", "", Color{}, []Element{
					mustCreateCard(t, "id4", "cardId4", "", "", "", "", false),
					mustCreateCard(t, "id2", "cardId5", "", "", "", "", false),
				}),
			},
			Paths: []*Path{},
		},
		// id2 in group is duplicated
		{
			Elements: []Element{
				mustCreateGroup(t, "id1", "", "", Color{}, []Element{
					mustCreateCard(t, "id2", "cardId2", "", "", "", "", false),
					mustCreateCard(t, "id2", "cardId3", "", "", "", "", false),
				}),
			},
			Paths: []*Path{},
		},
		// id2 in gcp is duplicated
		{
			Elements: []Element{
				NewElementGCP([]Element{
					mustCreateCard(t, "id2", "cardId2", "", "", "", "", false),
					mustCreateCard(t, "id2", "cardId3", "", "", "", "", false),
				}),
			},
			Paths: []*Path{},
		},
		// id3 group doesn't have any element
		{
			Elements: []Element{
				mustCreateCard(t, "id1", "cardId1", "", "", "", "", false),
				mustCreateCard(t, "id2", "cardId2", "", "", "", "", false),
				mustCreateGroup(t, "id3", "", "", Color{}, []Element{}),
			},
			Paths: []*Path{},
		},
		// id3 group has id4, but id4 group doesn't have any element
		{
			Elements: []Element{
				mustCreateCard(t, "id1", "cardId1", "", "", "", "", false),
				mustCreateCard(t, "id2", "cardId2", "", "", "", "", false),
				mustCreateGroup(t, "id3", "", "", Color{}, []Element{
					mustCreateGroup(t, "id4", "", "", Color{}, []Element{}),
				}),
			},
			Paths: []*Path{},
		},
		// non-existent element in path
		{
			Elements: []Element{
				mustCreateCard(t, "id1", "cardId1", "", "", "", "", false),
				mustCreateCard(t, "id2", "cardId2", "", "", "", "", false),
			},
			Paths: []*Path{
				{"id999", "id2", "", "", "", 0, false, ""},
			},
		},
	}

	for _, d := range invalidDiagrams {
		if err := d.validate(); err == nil {
			t.Errorf("invalid result: diagram=%v should be invalid, but got no error", d)
		}
	}
}
