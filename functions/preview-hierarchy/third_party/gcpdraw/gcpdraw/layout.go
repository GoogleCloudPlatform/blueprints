package gcpdraw

import (
	"container/list"
	"fmt"
	"strings"
)

const (
	MAX_RELOCATABLE_LIMIT = 100
)

// layout is linked list of linked list
type layout struct {
	blockHead *list.List
}

func composeLayout(elements []Element, paths []*Path) (*layout, error) {
	elementMap := newOrderedElementMap(elements)

	l := NewLayout()
	for elementMap.length() > 0 {
		nonDependents := removeNonDependents(elementMap, paths)
		if len(nonDependents) == 0 {
			// This diagram has loop (non-DAG).
			// To proceed layout forceflly, regard first element as a non-dependent element
			e := elementMap.rewind()
			elementMap.del(e.GetId())
			nonDependents = append(nonDependents, e)
		}
		l.addElements(nonDependents)
	}

	// relocation with layout hint
	if err := l.relocateElements(paths); err != nil {
		return nil, err
	}

	return l, nil
}

func NewLayout() *layout {
	head := list.New()
	return &layout{head}
}

func (l *layout) String() string {
	blockStrings := make([]string, 0)
	for be := l.blockHead.Front(); be != nil; be = be.Next() {
		b, _ := be.Value.(*block)
		elementIds := make([]string, 0)
		for ee := b.elementHead.Front(); ee != nil; ee = ee.Next() {
			e, _ := ee.Value.(Element)
			elementIds = append(elementIds, e.GetId())
		}
		blockStrings = append(blockStrings, fmt.Sprintf("{%s}", strings.Join(elementIds, ", ")))
	}
	return fmt.Sprintf("layout: {%s}", strings.Join(blockStrings, ", "))
}

func (l *layout) addElements(elements []Element) {
	b := NewBlock(elements)
	l.blockHead.PushBack(b)
}

func (l *layout) blocks() []*block {
	blocks := make([]*block, 0)
	for be := l.blockHead.Front(); be != nil; be = be.Next() {
		b, _ := be.Value.(*block)
		blocks = append(blocks, b)
	}
	return blocks
}

/*
TODO: following diagram falls into relocation loop
elements {
  card generic as a {
    name "A"
  }
  card generic as b {
    name "B"
  }
  group mygroup {
    card generic as c {
      name "C"
    }
    card generic as d {
      name "D"
    }
  }
}

paths {
  a --> b
  c --> d
  a -down-> c
  b -down-> d
}
*/
func (l *layout) relocateElements(paths []*Path) error {
	count := 0
	for {
		if !l.relocateOnce(paths) {
			l.removeEmptyBlock()
			return nil
		}
		count += 1
		if count > MAX_RELOCATABLE_LIMIT {
			return fmt.Errorf("failed to layout the diagram with layout hint. Please use another layout hint.")
		}
	}
}

func (l *layout) relocateOnce(paths []*Path) bool {
	for _, path := range paths {
		if !(l.hasElementInside(path.StartId) && l.hasElementInside(path.EndId)) {
			continue
		}

		switch path.Direction {
		case LineDirectionDown:
			if l.isInSameBlock(path.StartId, path.EndId) {
				continue
			}
			l.moveAfter(path.StartId, path.EndId)
			return true
		case LineDirectionUp:
			if l.isInSameBlock(path.StartId, path.EndId) {
				continue
			}
			l.moveBefore(path.StartId, path.EndId)
			return true
		case LineDirectionLeft:
			if l.isInLeftBlock(path.StartId, path.EndId) {
				continue
			}
			l.moveLeft(path.StartId, path.EndId)
			return true
		}
	}
	return false
}

func (l *layout) isInSameBlock(id1, id2 string) bool {
	id1Position := l.findBlockPosition(id1)
	id2Position := l.findBlockPosition(id2)
	if id1Position == id2Position {
		return true
	}
	return false
}

// isInLeftBlock returns true if id2 is located Left side of id1
func (l *layout) isInLeftBlock(id1, id2 string) bool {
	id1Position := l.findBlockPosition(id1)
	id2Position := l.findBlockPosition(id2)
	for e := id2Position.Next(); e != nil; e = e.Next() {
		if e == id1Position {
			return true
		}
	}
	return false
}

// moveAfter moves id2 to its new position after id1
func (l *layout) moveAfter(id1, id2 string) {
	id1BlockElement := l.findBlockPosition(id1)
	id2BlockElement := l.findBlockPosition(id2)
	id1Element := l.findElementPosition(id1)
	id2Element := l.findElementPosition(id2)

	id1Block, _ := id1BlockElement.Value.(*block)
	id2Block, _ := id2BlockElement.Value.(*block)

	id2Value := id2Element.Value
	id2Block.elementHead.Remove(id2Element)
	id1Block.elementHead.InsertAfter(id2Value, id1Element)
}

// moveBefore moves id2 to its new position before id1
func (l *layout) moveBefore(id1, id2 string) {
	id1BlockElement := l.findBlockPosition(id1)
	id2BlockElement := l.findBlockPosition(id2)
	id1Element := l.findElementPosition(id1)
	id2Element := l.findElementPosition(id2)

	id1Block, _ := id1BlockElement.Value.(*block)
	id2Block, _ := id2BlockElement.Value.(*block)

	id2Value := id2Element.Value
	id2Block.elementHead.Remove(id2Element)
	id1Block.elementHead.InsertBefore(id2Value, id1Element)
}

// moveLeft moves id2 to the Left side of id1's block
func (l *layout) moveLeft(id1, id2 string) {
	id1BlockElement := l.findBlockPosition(id1)
	id2BlockElement := l.findBlockPosition(id2)
	id2Element := l.findElementPosition(id2)

	id2Block := id2BlockElement.Value.(*block)
	id2E, _ := id2Element.Value.(Element)
	id2Block.elementHead.Remove(id2Element)

	if leftBlockElement := id1BlockElement.Prev(); leftBlockElement != nil {
		leftBlock := leftBlockElement.Value.(*block)
		leftBlock.elementHead.PushBack(id2E)
	} else {
		l.blockHead.PushFront(NewBlock([]Element{id2E}))
	}
}

func (l *layout) removeEmptyBlock() {
	for be := l.blockHead.Front(); be != nil; {
		b, _ := be.Value.(*block)
		if b.elementHead.Len() == 0 {
			next := be.Next()
			l.blockHead.Remove(be)
			be = next
		} else {
			be = be.Next()
		}
	}
}

func (l *layout) findBlockPosition(id string) *list.Element {
	for be := l.blockHead.Front(); be != nil; be = be.Next() {
		b, _ := be.Value.(*block)
		for ee := b.elementHead.Front(); ee != nil; ee = ee.Next() {
			e, _ := ee.Value.(Element)
			if e.ContainElement(id) {
				return be
			}
		}
	}
	return nil
}

func (l *layout) findElementPosition(id string) *list.Element {
	for be := l.blockHead.Front(); be != nil; be = be.Next() {
		b, _ := be.Value.(*block)
		for ee := b.elementHead.Front(); ee != nil; ee = ee.Next() {
			e, _ := ee.Value.(Element)
			if e.ContainElement(id) {
				return ee
			}
		}
	}
	return nil
}

func (l *layout) hasElementInside(id string) bool {
	return l.findBlockPosition(id) != nil
}

type block struct {
	elementHead *list.List
}

func NewBlock(elements []Element) *block {
	head := list.New()
	for _, e := range elements {
		head.PushBack(e)
	}
	return &block{head}
}

func (b *block) elements() []Element {
	elements := make([]Element, 0)
	for ee := b.elementHead.Front(); ee != nil; ee = ee.Next() {
		e, _ := ee.Value.(Element)
		elements = append(elements, e)
	}
	return elements
}

func (b *block) hasGroup() bool {
	for ee := b.elementHead.Front(); ee != nil; ee = ee.Next() {
		e, _ := ee.Value.(Element)
		if _, ok := e.(*ElementGroup); ok {
			return true
		}
	}
	return false
}
