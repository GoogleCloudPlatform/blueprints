package gcpdraw

import (
	"errors"
	"fmt"
	"log"
)

type LineDirection int

const (
	LineDirectionRight LineDirection = iota
	LineDirectionLeft
	LineDirectionUp
	LineDirectionDown
)

type LineArrow string

const (
	// https://developers.google.com/slides/reference/rest/v1/presentations.pages/lines#arrowstyle
	LineArrowNone LineArrow = "NONE"
	LineArrowFill LineArrow = "FILL_ARROW"
)

type LineDash string

const (
	LineDashSolid LineDash = "SOLID"
	LineDashDot   LineDash = "DOT"
)

type Path struct {
	StartId    string
	EndId      string
	StartArrow LineArrow
	EndArrow   LineArrow
	Dash       LineDash
	Direction  LineDirection
	Hidden     bool
	Annotation string
}

func (p *Path) String() string {
	arrow := "-->"
	switch p.Direction {
	case LineDirectionLeft:
		arrow = "-Left->"
	case LineDirectionDown:
		arrow = "-down->"
	case LineDirectionUp:
		arrow = "-up->"
	}
	if p.Hidden {
		arrow = fmt.Sprintf("(%s)", arrow)
	}
	return fmt.Sprintf("{%s %s %s}", p.StartId, arrow, p.EndId)
}

type Route struct {
	Points []Point

	// For Google Slides renderer
	SrcCardSide CardSide
	DstCardSide CardSide
}

type Line struct {
	PointA Point
	PointB Point
}

type CardSide int

const (
	CardSideTop CardSide = iota
	CardSideRight
	CardSideBottom
	CardSideLeft
)

var allCardSides = [4]CardSide{CardSideTop, CardSideRight, CardSideBottom, CardSideLeft}

const distanceFromCardSide = 15

// findBestRouteForPath finds a non-overlapped route for the path.
// If non-overlapped route is not found, it selects the most preferable route as a default route.
func findBestRouteForPath(diagram *Diagram, path *Path, srcOffset, dstOffset Offset, srcSize, dstSize Size) Route {
	var routes []Route

	// Create the most preferable routes at first.
	switch path.Direction {
	case LineDirectionRight:
		routes = routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideRight, CardSideLeft)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideRight, CardSideTop)...)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideRight, CardSideRight)...)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideRight, CardSideBottom)...)
	case LineDirectionUp:
		routes = routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideTop, CardSideBottom)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideTop, CardSideLeft)...)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideTop, CardSideTop)...)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideTop, CardSideRight)...)
	case LineDirectionLeft:
		routes = routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideLeft, CardSideRight)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideLeft, CardSideBottom)...)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideLeft, CardSideLeft)...)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideLeft, CardSideTop)...)
	case LineDirectionDown:
		routes = routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideBottom, CardSideTop)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideBottom, CardSideRight)...)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideBottom, CardSideBottom)...)
		routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, CardSideBottom, CardSideLeft)...)
	}

	// Create all possible routes.
	// These routes contain the above routes, but checking the same routes is permissible as it doesn't highly cost.
	for _, srcSide := range allCardSides {
		for _, dstSide := range allCardSides {
			routes = append(routes, routesFor(srcOffset, dstOffset, srcSize, dstSize, srcSide, dstSide)...)
		}
	}

	for _, r := range routes {
		if !isRouteOverlappedWithAnyCards(r, diagram) {
			// Lucky! You found the non-overlapped route.
			return r
		}
	}

	// Non-overlapped routes not found
	log.Printf("all routes overlapped, use the first route: %v", routes[0])
	return routes[0]
}

func routesFor(srcOffset, dstOffset Offset, srcSize, dstSize Size, srcSide, dstSide CardSide) []Route {
	// Use simple route for face-to-face card sides.
	// face-to-face: The src card's side and dst card's side is faced to faced like this,
	//    +-------+     +-------+
	//    |  src  |---->|  dst  |
	//    +-------+     +-------+
	if (srcSide == CardSideRight && dstSide == CardSideLeft) ||
		(srcSide == CardSideTop && dstSide == CardSideBottom) ||
		(srcSide == CardSideLeft && dstSide == CardSideRight) ||
		(srcSide == CardSideBottom && dstSide == CardSideTop) {
		return simpleRoutesFor(srcOffset, dstOffset, srcSize, dstSize, srcSide, dstSide)
	}
	return advancedRoutesFor(srcOffset, dstOffset, srcSize, dstSize, srcSide, dstSide)
}

// simpleRoutesFor calculates the route for face-to-face card sides.
func simpleRoutesFor(srcOffset, dstOffset Offset, srcSize, dstSize Size, srcSide, dstSide CardSide) []Route {
	var pointA, pointB, pointC, pointD Point

	switch {
	case srcSide == CardSideRight && dstSide == CardSideLeft:
		//    +-------+
		//    |  src  A----B
		//    +-------+    |
		//                 |    +-------+
		//                 C----D  dst  |
		//                      +-------+
		pointA = Point{srcOffset.X + srcSize.Width, srcOffset.Y + srcSize.Height/2}
		pointD = Point{dstOffset.X, dstOffset.Y + dstSize.Height/2}
		pointB = Point{pointA.X + (pointD.X-pointA.X)/2, pointA.Y}
		pointC = Point{pointB.X, pointD.Y}
	case srcSide == CardSideTop && dstSide == CardSideBottom:
		//         +-------+
		//         |  dst  |
		//         +---D---+
		//             |
		//             |
		//        B----C
		//        |
		//        |
		//    +---A---+
		//    |  src  |
		//    +-------+
		pointA = Point{srcOffset.X + srcSize.Width/2, srcOffset.Y}
		pointD = Point{dstOffset.X + dstSize.Width/2, dstOffset.Y + dstSize.Height}
		pointB = Point{pointA.X, pointD.Y + (pointA.Y-pointD.Y)/2}
		pointC = Point{pointD.X, pointB.Y}
	case srcSide == CardSideLeft && dstSide == CardSideRight:
		//                      +-------+
		//                 B----A  src  |
		//                 |    +-------+
		//   +-------+     |
		//   |  dst  D-----C
		//   +-------+
		pointA = Point{srcOffset.X, srcOffset.Y + srcSize.Height/2}
		pointD = Point{dstOffset.X + dstSize.Width, dstOffset.Y + dstSize.Height/2}
		pointB = Point{pointD.X + (pointA.X-pointD.X)/2, pointA.Y}
		pointC = Point{pointB.X, pointD.Y}
	case srcSide == CardSideBottom && dstSide == CardSideTop:
		//         +-------+
		//         |  src  |
		//         +---A---+
		//             |
		//             |
		//        C----B
		//        |
		//        |
		//    +---D---+
		//    |  dst  |
		//    +-------+
		pointA = Point{srcOffset.X + srcSize.Width/2, srcOffset.Y + srcSize.Height}
		pointD = Point{dstOffset.X + dstSize.Width/2, dstOffset.Y}
		pointB = Point{pointA.X, pointA.Y + (pointD.Y-pointA.Y)/2}
		pointC = Point{pointD.X, pointB.Y}
	}

	return []Route{
		{
			Points:      []Point{pointA, pointB, pointC, pointD},
			SrcCardSide: srcSide,
			DstCardSide: dstSide,
		},
	}
}

// advancedRoutesFor calculates the routes with the tailored routing algorithm.
// The route is composed of 5 points (A, B, C, D, E) and it allows us to use 4 different lines to draw the path.
// The point A and E are statically calculated as they locate on the center of the card side.
// The point B and D are located apart from the point A and E with static amount of distance.
// The point C is calculated based on the point B and point D.
//
//        B--------------------C
//        |                    |
//    +---A---+                |
//    |  src  |                |
//    +-------+                |
//                 +-------+   |
//                 |  dst  E---D
//                 +-------+
//
func advancedRoutesFor(srcOffset, dstOffset Offset, srcSize, dstSize Size, srcSide, dstSide CardSide) []Route {
	var pointA, pointB, pointC, pointD, pointE Point
	var routes [2]Route

	switch srcSide {
	case CardSideRight:
		pointA = Point{srcOffset.X + srcSize.Width, srcOffset.Y + srcSize.Height/2}
		pointB = Point{pointA.X + distanceFromCardSide, pointA.Y}
	case CardSideTop:
		pointA = Point{srcOffset.X + srcSize.Width/2, srcOffset.Y}
		pointB = Point{pointA.X, pointA.Y - distanceFromCardSide}
	case CardSideLeft:
		pointA = Point{srcOffset.X, srcOffset.Y + srcSize.Height/2}
		pointB = Point{srcOffset.X - distanceFromCardSide, pointA.Y}
	case CardSideBottom:
		pointA = Point{srcOffset.X + srcSize.Width/2, srcOffset.Y + srcSize.Height}
		pointB = Point{pointA.X, pointA.Y + distanceFromCardSide}
	}

	switch dstSide {
	case CardSideRight:
		pointE = Point{dstOffset.X + dstSize.Width, dstOffset.Y + dstSize.Height/2}
		pointD = Point{pointE.X + distanceFromCardSide, pointE.Y}
	case CardSideTop:
		pointE = Point{dstOffset.X + dstSize.Width/2, dstOffset.Y}
		pointD = Point{pointE.X, pointE.Y - distanceFromCardSide}
	case CardSideLeft:
		pointE = Point{dstOffset.X, dstOffset.Y + dstSize.Height/2}
		pointD = Point{dstOffset.X - distanceFromCardSide, pointE.Y}
	case CardSideBottom:
		pointE = Point{dstOffset.X + dstSize.Width/2, dstOffset.Y + dstSize.Height}
		pointD = Point{pointE.X, pointE.Y + distanceFromCardSide}
	}

	// Pattern 1: pointC is vertically aligned with pointD
	//        B
	//        |
	//    +---A---+
	//    |       |
	// B--A  src  A--B-----------------C
	//    |       |                    |
	//    +---A---+                    |
	//        |                        D
	//        B                        |
	//                             +---E---+
	//                             |       |
	//                          D--E  dst  E--D
	//                             |       |
	//                             +---E---+
	//                                 |
	//                                 D
	//
	pointC = Point{pointD.X, pointB.Y}
	if isPointOnLine(Line{pointA, pointB}, pointC) {
		// If pointB runs over pointC, use pointC as pointB
		//    +-------+
		//    |  src  A----------C----B
		//    +-------+          |
		//                       D
		//                       |
		//                   +---E---+
		//                   |  dst  |
		//                   +-------+
		pointB = pointC
	}
	if isPointOnLine(Line{pointE, pointD}, pointC) {
		// If pointD runs over pointC, use pointC as pointD
		//                       D
		//    +-------+          |
		//    |  src  A---B------C
		//    +-------+          |
		//                       |
		//                   +---E---+
		//                   |  dst  |
		//                   +-------+
		pointD = pointC
	}
	routes[0] = Route{
		Points:      []Point{pointA, pointB, pointC, pointD, pointE},
		SrcCardSide: srcSide,
		DstCardSide: dstSide,
	}

	// Pattern 2: pointC is vertically aligned with pointB
	//        B
	//        |
	//    +---A---+
	//    |       |
	// B--A  src  A--B
	//    |       |  |
	//    +---A---+  |
	//        |      C-----------------D
	//        B                        |
	//                             +---E---+
	//                             |       |
	//                          D--E  dst  E--D
	//                             |       |
	//                             +---E---+
	//                                 |
	//                                 D
	//
	pointC = Point{pointB.X, pointD.Y}
	if isPointOnLine(Line{pointA, pointB}, pointC) {
		// If pointB runs over pointC, use pointC as pointB
		//    +-------+
		//    |  src  |
		//    +---A---+
		//        |
		//        |          +-------+
		//        C-------D--E  dst  |
		//        |          +-------+
		//        B
		//
		pointB = pointC
	}
	if isPointOnLine(Line{pointE, pointD}, pointC) {
		// If pointD runs over pointC, use pointC as pointD
		//    +-------+
		//    |  src  |
		//    +---A---+
		//        |
		//        B
		//        |      +-------+
		//    D---C------E  dst  |
		//               +-------+
		//
		pointD = pointC
	}
	routes[1] = Route{
		Points:      []Point{pointA, pointB, pointC, pointD, pointE},
		SrcCardSide: srcSide,
		DstCardSide: dstSide,
	}

	return routes[:]
}

// isPointOnLine checks if point is on the line.
func isPointOnLine(line Line, point Point) bool {
	pointA := line.PointA
	pointB := line.PointB

	if pointA.Y == pointB.Y && pointB.Y == point.Y {
		if pointA.X <= point.X && point.X <= pointB.X {
			return true
		}
		if pointB.X <= point.X && point.X <= pointA.X {
			return true
		}
	}
	if pointA.X == pointB.X && pointB.X == point.X {
		if pointA.Y <= point.Y && point.Y <= pointB.Y {
			return true
		}
		if pointB.Y <= point.Y && point.Y <= pointA.Y {
			return true
		}
	}
	return false
}

// isRouteOverlappedWithAnyCards checks if any line in the route overlaps any card in the diagram.
func isRouteOverlappedWithAnyCards(route Route, diagram *Diagram) bool {
	for i := 0; i+1 < len(route.Points); i++ {
		line := Line{route.Points[i], route.Points[i+1]}

		if err := diagram.walkEachElement(func(e Element) error {
			if card, ok := e.(*ElementCard); ok {
				if isLineOverlapped(line, card.GetOffset(), card.GetSize()) {
					return errors.New("overlapped")
				}
			}
			return nil
		}); err != nil {
			return true
		}
	}
	return false
}

// isLineOverlapped checks if the line overlaps the card.
// The line is composed of the two edges, pointA and pointB.
func isLineOverlapped(line Line, offset Offset, size Size) bool {
	pointA := line.PointA
	pointB := line.PointB

	// pointA is inside the card
	//  -------
	//  |  A  |
	//  ---|---
	//     |
	//     B
	if (offset.X < pointA.X && pointA.X < offset.X+size.Width) && (offset.Y < pointA.Y && pointA.Y < offset.Y+size.Height) {
		return true
	}

	// pointB is inside the card
	//     A
	//     |
	//  ---|---
	//  |  B  |
	//  -------
	if (offset.X < pointB.X && pointB.X < offset.X+size.Width) && (offset.Y < pointB.Y && pointB.Y < offset.Y+size.Height) {
		return true
	}

	// vertical line
	if pointA.X == pointB.X {
		if offset.X <= pointA.X && pointA.X <= offset.X+size.Width {
			// pointA and pointB makes the line which cross the card vertically
			//     A
			//     |
			//  ---|---
			//  |  |  |
			//  ---|---
			//     |
			//     B
			if pointA.Y <= offset.Y && pointB.Y >= offset.Y+size.Height {
				return true
			}
			// reverse
			if pointB.Y <= offset.Y && pointA.Y >= offset.Y+size.Height {
				return true
			}
		}
	}

	// horizontal line
	if pointA.Y == pointB.Y {
		if offset.Y <= pointA.Y && pointA.Y <= offset.Y+size.Height {
			// pointA and pointB makes the line which cross the card horizontally
			//     -------
			//  A--|-----|--B
			//     -------
			if pointA.X <= offset.X && pointB.X >= offset.X+size.Width {
				return true
			}
			// reverse
			if pointB.X <= offset.X && pointA.X >= offset.X+size.Width {
				return true
			}
		}
	}

	return false
}
