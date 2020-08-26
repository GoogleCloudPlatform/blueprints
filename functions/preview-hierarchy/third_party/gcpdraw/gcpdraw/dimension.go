package gcpdraw

type Offset struct {
	X float64
	Y float64
}

func (o Offset) add(diffX, diffY float64) Offset {
	return Offset{o.X + diffX, o.Y + diffY}
}

func (o Offset) addOffset(offset Offset) Offset {
	return Offset{o.X + offset.X, o.Y + offset.Y}
}

type Point Offset

type Size struct {
	Width  float64
	Height float64
}

func (s Size) add(diffWidth, diffHeight float64) Size {
	return Size{s.Width + diffWidth, s.Height + diffHeight}
}

type Margin struct {
	Top    float64
	Right  float64
	Bottom float64
	Left   float64
}
