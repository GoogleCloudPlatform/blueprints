package gcpdraw

import (
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestFindBestRouteForPath(t *testing.T) {
	for _, tt := range []struct {
		desc      string
		diagram   *Diagram
		path      *Path
		srcOffset Offset
		dstOffset Offset
		srcSize   Size
		dstSize   Size
		want      Route
	}{
		{
			//        -----------------------------
			//        |                           |
			//    +-------+     +-------+     +-------+
			//    |  src  |     |       |     |  dst  |
			//    +-------+     +-------+     +-------+
			desc: "route must be detoured around the middle card horizontally",
			diagram: &Diagram{
				Elements: []Element{
					mustCreateLayoutedCard(t, "id1", "cardId1", "", "", "", "", false, Offset{0, 100}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id2", "cardId2", "", "", "", "", false, Offset{20, 100}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id3", "cardId3", "", "", "", "", false, Offset{40, 100}, Size{10, 10}),
				},
			},
			path: &Path{
				Direction: LineDirectionRight,
			},
			srcOffset: Offset{0, 100},
			dstOffset: Offset{40, 100},
			srcSize:   Size{10, 10},
			dstSize:   Size{10, 10},
			want: Route{
				Points: []Point{
					{X: 5, Y: 100},
					{X: 5, Y: 85},
					{X: 45, Y: 85},
					{X: 45, Y: 85},
					{X: 45, Y: 100},
				},
				SrcCardSide: CardSideTop,
				DstCardSide: CardSideTop,
			},
		},
		{
			//        --------
			//        |      |
			//    +-------+  |
			//    |  src  |  |
			//    +-------+  |
			//               |
			//    +-------+  |
			//    |       |  |
			//    +-------+  |
			//               |
			//    +-------+  |
			//    |  dst  |---
			//    +-------+
			desc: "route must be detoured around the middle card vertically",
			diagram: &Diagram{
				Elements: []Element{
					mustCreateLayoutedCard(t, "id1", "cardId1", "", "", "", "", false, Offset{0, 0}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id2", "cardId2", "", "", "", "", false, Offset{0, 20}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id3", "cardId3", "", "", "", "", false, Offset{0, 40}, Size{10, 10}),
				},
			},
			path: &Path{
				Direction: LineDirectionDown,
			},
			srcOffset: Offset{0, 0},
			dstOffset: Offset{0, 40},
			srcSize:   Size{10, 10},
			dstSize:   Size{10, 10},
			want: Route{
				Points: []Point{
					{X: 5, Y: 0},
					{X: 5, Y: -15},
					{X: 25, Y: -15},
					{X: 25, Y: 45},
					{X: 10, Y: 45},
				},
				SrcCardSide: CardSideTop,
				DstCardSide: CardSideRight,
			},
		},
		{
			//    +-------+       +-------+
			//    |  src  |----   |       |
			//    +-------+   |   +-------+
			//                |
			//                |   +-------+
			//                ----|  dst  |
			//                    +-------+
			desc: "most preferable route is selected",
			diagram: &Diagram{
				Elements: []Element{
					mustCreateLayoutedCard(t, "id1", "cardId1", "", "", "", "", false, Offset{0, 0}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id2", "cardId2", "", "", "", "", false, Offset{20, 0}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id3", "cardId3", "", "", "", "", false, Offset{20, 20}, Size{10, 10}),
				},
			},
			path: &Path{
				Direction: LineDirectionRight,
			},
			srcOffset: Offset{0, 0},
			dstOffset: Offset{20, 20},
			srcSize:   Size{10, 10},
			dstSize:   Size{10, 10},
			want: Route{
				Points: []Point{
					{X: 10, Y: 5},
					{X: 15, Y: 5},
					{X: 15, Y: 25},
					{X: 20, Y: 25},
				},
				SrcCardSide: CardSideRight,
				DstCardSide: CardSideLeft,
			},
		},
	} {
		t.Run(tt.desc, func(t *testing.T) {
			got := findBestRouteForPath(tt.diagram, tt.path, tt.srcOffset, tt.dstOffset, tt.srcSize, tt.dstSize)
			if !cmp.Equal(tt.want, got) {
				t.Errorf("findBestRouteForPath(%v, %v, %v, %v, %v, %v): diff (-want +got) = %v",
					tt.diagram, tt.path, tt.srcOffset, tt.dstOffset, tt.srcSize, tt.dstSize, cmp.Diff(tt.want, got))
			}
		})
	}
}

func TestIsRouteOverlappedWithAnyCards(t *testing.T) {
	for _, tt := range []struct {
		desc    string
		route   Route
		diagram *Diagram
		want    bool
	}{
		{
			desc: "route is overlapped with the middle of the cards",
			route: Route{
				Points: []Point{
					{X: 10, Y: 5},
					{X: 15, Y: 5},
					{X: 40, Y: 5},
				},
			},
			diagram: &Diagram{
				Elements: []Element{
					mustCreateLayoutedCard(t, "id1", "cardId1", "", "", "", "", false, Offset{0, 0}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id2", "cardId2", "", "", "", "", false, Offset{20, 0}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id3", "cardId3", "", "", "", "", false, Offset{40, 0}, Size{10, 10}),
				},
			},
			want: true,
		},
		{
			desc: "route is not overlapped with any cards",
			route: Route{
				Points: []Point{
					{X: 5, Y: 10},
					{X: 5, Y: 15},
					{X: 40, Y: 15},
					{X: 40, Y: 10},
				},
			},
			diagram: &Diagram{
				Elements: []Element{
					mustCreateLayoutedCard(t, "id1", "cardId1", "", "", "", "", false, Offset{0, 0}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id2", "cardId2", "", "", "", "", false, Offset{20, 0}, Size{10, 10}),
					mustCreateLayoutedCard(t, "id3", "cardId3", "", "", "", "", false, Offset{40, 0}, Size{10, 10}),
				},
			},
			want: false,
		},
	} {
		t.Run(tt.desc, func(t *testing.T) {
			if got := isRouteOverlappedWithAnyCards(tt.route, tt.diagram); got != tt.want {
				t.Errorf("isRouteOverlappedWithAnyCards(%v, %v) = %v, but want = %v", tt.route, tt.diagram, got, tt.want)
			}
		})
	}
}

func TestIsLineOverlapped(t *testing.T) {
	for _, tt := range []struct {
		desc   string
		line   Line
		offset Offset
		size   Size
		want   bool
	}{
		{
			desc:   "pointA is inside the card",
			line:   Line{Point{5, 5}, Point{5, 20}},
			offset: Offset{0, 0},
			size:   Size{10, 10},
			want:   true,
		},
		{
			desc:   "pointB is inside the card",
			line:   Line{Point{5, 20}, Point{5, 5}},
			offset: Offset{0, 0},
			size:   Size{10, 10},
			want:   true,
		},
		{
			desc:   "pointA and pointB makes the line which cross the card vertically",
			line:   Line{Point{5, 5}, Point{5, 25}},
			offset: Offset{0, 10},
			size:   Size{10, 10},
			want:   true,
		},
		{
			desc:   "pointB and pointA makes the line which cross the card vertically",
			line:   Line{Point{5, 25}, Point{5, 5}},
			offset: Offset{0, 10},
			size:   Size{10, 10},
			want:   true,
		},
		{
			desc:   "pointA and pointB makes the line which cross the card horizontally",
			line:   Line{Point{5, 5}, Point{25, 5}},
			offset: Offset{10, 0},
			size:   Size{10, 10},
			want:   true,
		},
		{
			desc:   "pointB and pointA makes the line which cross the card horizontally",
			line:   Line{Point{25, 5}, Point{5, 5}},
			offset: Offset{10, 0},
			size:   Size{10, 10},
			want:   true,
		},
		{
			desc:   "The line is outside of the card",
			line:   Line{Point{15, 5}, Point{25, 5}},
			offset: Offset{0, 0},
			size:   Size{10, 10},
			want:   false,
		},
		{
			desc:   "pointA touches the right side of the card",
			line:   Line{Point{10, 5}, Point{20, 5}},
			offset: Offset{0, 0},
			size:   Size{10, 10},
			want:   false,
		},
		{
			desc:   "pointB touches the right side of the card",
			line:   Line{Point{20, 5}, Point{10, 5}},
			offset: Offset{0, 0},
			size:   Size{10, 10},
			want:   false,
		},
	} {
		t.Run(tt.desc, func(t *testing.T) {
			if got := isLineOverlapped(tt.line, tt.offset, tt.size); got != tt.want {
				t.Errorf("isLineOverlapped(%v, %v, %v) = %v, but want = %v", tt.line, tt.offset, tt.size, got, tt.want)
			}
		})
	}
}

func TestIsPointOnLine(t *testing.T) {
	for _, tt := range []struct {
		desc  string
		point Point
		line  Line
		want  bool
	}{
		{
			desc:  "point is on the vertical line",
			point: Point{5, 5},
			line:  Line{Point{5, 0}, Point{5, 10}},
			want:  true,
		},
		{
			desc:  "point is on the horizontal line",
			point: Point{5, 5},
			line:  Line{Point{0, 5}, Point{10, 5}},
			want:  true,
		},
		{
			desc:  "point is not on the line",
			point: Point{5, 4},
			line:  Line{Point{0, 5}, Point{10, 5}},
			want:  false,
		},
	} {
		t.Run(tt.desc, func(t *testing.T) {
			if got := isPointOnLine(tt.line, tt.point); got != tt.want {
				t.Errorf("isPointOnLine(%v, %v) = %v, but want = %v", tt.line, tt.point, got, tt.want)
			}
		})
	}
}
