package gcpdraw

type orderedElementMap struct {
	keys []string
	m    map[string]Element
	curr int
}

func newOrderedElementMap(elements []Element) *orderedElementMap {
	keys := make([]string, len(elements))
	elementMap := make(map[string]Element, len(elements))
	for i, e := range elements {
		keys[i] = e.GetId()
		elementMap[e.GetId()] = e
	}

	return &orderedElementMap{
		keys: keys,
		m:    elementMap,
		curr: 0,
	}
}

func (o *orderedElementMap) length() int {
	return len(o.m)
}

func (o *orderedElementMap) get(key string) Element {
	return o.m[key]
}

func (o *orderedElementMap) del(key string) {
	// delete key
	newKeys := make([]string, 0, len(o.keys))
	for _, k := range o.keys {
		if key != k {
			newKeys = append(newKeys, k)
		}
	}
	o.keys = newKeys

	// delete element from map
	delete(o.m, key)
}

func (o *orderedElementMap) rewind() Element {
	o.curr = 0
	key := o.keys[0]
	return o.m[key]
}

func (o *orderedElementMap) next() Element {
	o.curr += 1
	if o.curr >= len(o.keys) {
		return nil
	}
	key := o.keys[o.curr]
	return o.m[key]
}

func isCurrentLayerPath(elementMap *orderedElementMap, path *Path) bool {
	for element := elementMap.rewind(); element != nil; element = elementMap.next() {
		if element.ContainElement(path.StartId) && element.ContainElement(path.EndId) {
			// startElement and endElement exist in the same element,
			// so path is not for current layer
			return false
		}
	}
	return true
}

func removeNonDependents(elementMap *orderedElementMap, paths []*Path) []Element {
	// find dependent elements
	var dependentIds []string
	for _, path := range paths {
		if !isCurrentLayerPath(elementMap, path) {
			continue
		}

		startElementRemoved := true
		for element := elementMap.rewind(); element != nil; element = elementMap.next() {
			if element.ContainElement(path.StartId) {
				startElementRemoved = false
				break
			}
		}
		if startElementRemoved {
			continue
		}

		for element := elementMap.rewind(); element != nil; element = elementMap.next() {
			if element.ContainElement(path.EndId) {
				dependentIds = append(dependentIds, element.GetId())
			}
		}
	}

	// find non-dependent elements
	var nonDependentIds []string
	for element := elementMap.rewind(); element != nil; element = elementMap.next() {
		key := element.GetId()
		depends := false
		for _, id := range dependentIds {
			if key == id {
				depends = true
				break
			}
		}
		if depends {
			continue
		}

		nonDependentIds = append(nonDependentIds, key)
	}
	var nonDependents []Element
	for _, id := range nonDependentIds {
		nonDependents = append(nonDependents, elementMap.get(id))
	}

	// remove non-dependent elements
	for _, id := range nonDependentIds {
		elementMap.del(id)
	}

	return nonDependents
}
