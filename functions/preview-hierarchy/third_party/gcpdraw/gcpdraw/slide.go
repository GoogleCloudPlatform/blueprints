package gcpdraw

import (
	"google.golang.org/api/slides/v1"
)

const (
	slideFontFamily = "Roboto"
	slideUnitPoint  = "PT"
)

func sizeToSlideSize(size Size) *slides.Size {
	return &slides.Size{
		Height: &slides.Dimension{
			Magnitude: size.Height,
			Unit:      slideUnitPoint,
		},
		Width: &slides.Dimension{
			Magnitude: size.Width,
			Unit:      slideUnitPoint,
		},
	}
}

func colorToSlideColor(color Color) *slides.OpaqueColor {
	return &slides.OpaqueColor{
		RgbColor: &slides.RgbColor{
			Red:   float64(color.Red) / 255.0,
			Green: float64(color.Green) / 255.0,
			Blue:  float64(color.Blue) / 255.0,
		},
	}
}

func transformForOffst(offset Offset) *slides.AffineTransform {
	return &slides.AffineTransform{
		ScaleX:     1.0,
		ScaleY:     1.0,
		TranslateX: offset.X,
		TranslateY: offset.Y,
		Unit:       slideUnitPoint,
	}
}

func createShapeRequest(pageObjectId, objectId, shapeType string, size Size, offset Offset) *slides.CreateShapeRequest {
	return &slides.CreateShapeRequest{
		ElementProperties: &slides.PageElementProperties{
			PageObjectId: pageObjectId,
			Size:         sizeToSlideSize(size),
			Transform:    transformForOffst(offset),
		},
		ObjectId:  objectId,
		ShapeType: shapeType,
	}
}

func createImageRequest(pageObjectId, objectId, url string, size Size, offset Offset) *slides.CreateImageRequest {
	return &slides.CreateImageRequest{
		ElementProperties: &slides.PageElementProperties{
			PageObjectId: pageObjectId,
			Size:         sizeToSlideSize(size),
			Transform:    transformForOffst(offset),
		},
		ObjectId: objectId,
		Url:      url,
	}
}

func fillBackgroundRequest(objectId string, color Color) *slides.UpdateShapePropertiesRequest {
	return &slides.UpdateShapePropertiesRequest{
		Fields:   "shapeBackgroundFill",
		ObjectId: objectId,
		ShapeProperties: &slides.ShapeProperties{
			ShapeBackgroundFill: &slides.ShapeBackgroundFill{
				SolidFill: &slides.SolidFill{
					Alpha: 1.0,
					Color: colorToSlideColor(color),
				},
			},
		},
	}
}

func createSolidBorderRequest(objectId string, color Color, weight float64) *slides.UpdateShapePropertiesRequest {
	return &slides.UpdateShapePropertiesRequest{
		Fields:   "outline",
		ObjectId: objectId,
		ShapeProperties: &slides.ShapeProperties{
			Outline: &slides.Outline{
				DashStyle: "SOLID",
				OutlineFill: &slides.OutlineFill{
					SolidFill: &slides.SolidFill{
						Alpha: 1,
						Color: colorToSlideColor(color),
					},
				},
				Weight: &slides.Dimension{
					Magnitude: weight,
					Unit:      slideUnitPoint,
				},
			},
		},
	}
}

func hideBorderRequest(objectId string) *slides.UpdateShapePropertiesRequest {
	return &slides.UpdateShapePropertiesRequest{
		Fields:   "outline",
		ObjectId: objectId,
		ShapeProperties: &slides.ShapeProperties{
			Outline: &slides.Outline{
				PropertyState: "NOT_RENDERED",
			},
		},
	}
}

func changeContentAlignmentRequest(objectId, alignment string) *slides.UpdateShapePropertiesRequest {
	return &slides.UpdateShapePropertiesRequest{
		Fields:   "contentAlignment",
		ObjectId: objectId,
		ShapeProperties: &slides.ShapeProperties{
			ContentAlignment: alignment,
		},
	}
}

func insertTextRequest(objectId string, index int64, text string) *slides.InsertTextRequest {
	return &slides.InsertTextRequest{
		InsertionIndex: index,
		ObjectId:       objectId,
		Text:           text,
	}
}

func changeParagraphStyleRequest(objectId, alignment string, spaceTop, spaceRight, spaceBottom, spaceLeft float64) *slides.UpdateParagraphStyleRequest {
	return &slides.UpdateParagraphStyleRequest{
		Fields:   "alignment,indentFirstLine,indentStart,indentEnd,spaceAbove,spaceBelow,lineSpacing,spacingMode",
		ObjectId: objectId,
		Style: &slides.ParagraphStyle{
			Alignment: alignment,
			IndentFirstLine: &slides.Dimension{
				Magnitude: spaceLeft,
				Unit:      slideUnitPoint,
			},
			IndentStart: &slides.Dimension{
				Magnitude: spaceLeft,
				Unit:      slideUnitPoint,
			},
			IndentEnd: &slides.Dimension{
				Magnitude: spaceRight,
				Unit:      slideUnitPoint,
			},
			SpaceAbove: &slides.Dimension{
				Magnitude: spaceTop,
				Unit:      slideUnitPoint,
			},
			SpaceBelow: &slides.Dimension{
				Magnitude: spaceBottom,
				Unit:      slideUnitPoint,
			},
			LineSpacing: 0,
			SpacingMode: "NEVER_COLLAPSE",
		},
	}
}

func changeTextStyleRequest(objectId string, fontSize float64, fontColor Color) *slides.UpdateTextStyleRequest {
	return &slides.UpdateTextStyleRequest{
		Fields:   "backgroundColor,baselineOffset,fontFamily,fontSize,foregroundColor",
		ObjectId: objectId,
		Style: &slides.TextStyle{
			BackgroundColor: &slides.OptionalColor{},
			BaselineOffset:  "NONE",
			FontFamily:      slideFontFamily,
			FontSize: &slides.Dimension{
				Magnitude: fontSize,
				Unit:      slideUnitPoint,
			},
			ForegroundColor: &slides.OptionalColor{
				OpaqueColor: colorToSlideColor(fontColor),
			},
		},
		TextRange: &slides.Range{
			Type: "ALL",
		},
	}
}

func changeRangeTextStyleRequest(objectId string, startIndex, endIndex int64, fontSize float64, fontColor Color) *slides.UpdateTextStyleRequest {
	return &slides.UpdateTextStyleRequest{
		Fields:   "backgroundColor,baselineOffset,fontFamily,fontSize,foregroundColor",
		ObjectId: objectId,
		Style: &slides.TextStyle{
			BackgroundColor: &slides.OptionalColor{},
			BaselineOffset:  "NONE",
			FontFamily:      slideFontFamily,
			FontSize: &slides.Dimension{
				Magnitude: fontSize,
				Unit:      slideUnitPoint,
			},
			ForegroundColor: &slides.OptionalColor{
				OpaqueColor: colorToSlideColor(fontColor),
			},
		},
		TextRange: &slides.Range{
			StartIndex:      startIndex,
			EndIndex:        endIndex,
			Type:            "FIXED_RANGE",
			ForceSendFields: []string{"StartIndex"},
		},
	}
}

func createLineRequest(pageObjectId, objectId, category string, size Size, offset Offset) *slides.CreateLineRequest {
	return &slides.CreateLineRequest{
		Category: category,
		ElementProperties: &slides.PageElementProperties{
			PageObjectId: pageObjectId,
			Size:         sizeToSlideSize(size),
			Transform:    transformForOffst(offset),
		},
		ObjectId: objectId,
	}
}

func changeLineStyleRequest(objectId, dashStyle, startArrow, endArrow string, color Color) *slides.UpdateLinePropertiesRequest {
	return &slides.UpdateLinePropertiesRequest{
		Fields: "dashStyle,startArrow,endArrow,lineFill",
		LineProperties: &slides.LineProperties{
			DashStyle:  dashStyle,
			StartArrow: startArrow,
			EndArrow:   endArrow,
			LineFill: &slides.LineFill{
				SolidFill: &slides.SolidFill{
					Alpha: 1,
					Color: colorToSlideColor(color),
				},
			},
		},
		ObjectId: objectId,
	}
}

func connectLineRequest(objectId, startObjectId, endObjectId string, startSiteIndex, endSiteIndex int64) *slides.UpdateLinePropertiesRequest {
	return &slides.UpdateLinePropertiesRequest{
		Fields: "startConnection,endConnection",
		LineProperties: &slides.LineProperties{
			StartConnection: &slides.LineConnection{
				ConnectedObjectId:   startObjectId,
				ConnectionSiteIndex: startSiteIndex,
			},
			EndConnection: &slides.LineConnection{
				ConnectedObjectId:   endObjectId,
				ConnectionSiteIndex: endSiteIndex,
			},
		},
		ObjectId: objectId,
	}
}
