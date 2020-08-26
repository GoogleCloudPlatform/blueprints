package gcpdraw

import (
	"fmt"
	"strconv"
)

var (
	headerColor               = Color{0x51, 0x9b, 0xf7}
	headerTextColor           = Color{0xff, 0xff, 0xff}
	footerColor               = Color{0xe0, 0xe0, 0xe0}
	gcpBackgroundColor        = Color{0xF6, 0xF6, 0xF6}
	groupTextColor            = Color{0x9e, 0x9e, 0x9e}
	groupBackgroundColorBlue  = Color{0xe3, 0xf2, 0xfd}
	groupBackgroundColorBeige = Color{0xff, 0xf8, 0xe1}
	groupBackgroundColorPink  = Color{0xfb, 0xe9, 0xe7}
	cardColor                 = Color{0xff, 0xff, 0xff}
	cardBorderColor           = Color{0, 0, 0}
	cardNameColor             = Color{0x21, 0x21, 0x21}
	cardDisplayNameColor      = Color{0x75, 0x75, 0x75}
	cardSeparatorColor        = Color{0xe0, 0xe0, 0xe0}
	cardDescriptionColor      = Color{0, 0, 0}
	pathColor                 = Color{0x3a, 0x7d, 0xf0}
	pathAnnotationColor       = Color{0x75, 0x75, 0x75}
)

var groupBackgroundColors = [3]Color{
	groupBackgroundColorBlue,
	groupBackgroundColorBeige,
	groupBackgroundColorPink,
}

type Color struct {
	Red   uint
	Green uint
	Blue  uint
}

func (c Color) ToCssRgb() string {
	return fmt.Sprintf("rgb(%d, %d, %d)", c.Red, c.Green, c.Blue)
}

func hexColorToColor(hexColor string) (Color, error) {
	if len(hexColor) != 7 {
		return Color{}, fmt.Errorf("Invalid color format length: %s", hexColor)
	}

	_ = hexColor[0] // #
	redHex := string(hexColor[1:3])
	greenHex := string(hexColor[3:5])
	blueHex := string(hexColor[5:7])

	red, err1 := strconv.ParseUint(redHex, 16, 8)
	green, err2 := strconv.ParseUint(greenHex, 16, 8)
	blue, err3 := strconv.ParseUint(blueHex, 16, 8)
	if err1 != nil || err2 != nil || err3 != nil {
		return Color{}, fmt.Errorf("Invalid color format: %s", hexColor)
	}

	return Color{uint(red), uint(green), uint(blue)}, nil
}

func getDefaultGroupBackgroundColor(layer int) Color {
	return groupBackgroundColors[layer%len(groupBackgroundColors)]
}
