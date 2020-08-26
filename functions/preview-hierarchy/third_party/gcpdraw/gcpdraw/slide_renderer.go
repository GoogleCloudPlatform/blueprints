package gcpdraw

import (
	"fmt"
	"hash/fnv"
	"net/http"
	"net/url"
	"regexp"
	"sync/atomic"
	"time"
	"unicode/utf8"

	"google.golang.org/api/slides/v1"
)

const (
	slideGroupNameFontSize       = 7.5
	slideHeaderTextFontSize      = 8.5
	slideCardDisplayNameFontSize = 7.0
	slideCardNameFontSize        = 7.5
	slideCardDescriptionFontSize = 6.5
	slideCardDescriptionHeight   = 10.0
	slideCardSeparatorHeight     = 0.01
	slideCardSeparatorSpace      = 3.0

	iconNotSupportedID = "icon_not_supported"
)

var (
	objectIdCounter  int64
	slideGcpIconSize = Size{80.0, 25.0}
	slidePathSize    = Size{1.0, 1.0}
)

const (
	connectionSiteIndexTop    = 0
	connectionSiteIndexLeft   = 1
	connectionSiteIndexBottom = 2
	connectionSiteIndexRight  = 3
)

// SlideRenderer implements Renderer
type SlideRenderer struct {
	service        *slides.Service
	presentationId string
	slideId        string
	diagramText    string
	requests       []*slides.Request
}

var _ Renderer = (*SlideRenderer)(nil)

func NewSlideRenderer(client *http.Client, presentationUrl string, title string, diagramText string) (*SlideRenderer, error) {
	service, err := slides.New(client)
	if err != nil {
		return nil, err
	}

	presentationId, err := extractPresentationIdFromUrl(presentationUrl)
	if err != nil {
		return nil, err
	}

	if presentationId != "" {
		// check existence
		if _, err := service.Presentations.Get(presentationId).Do(); err != nil {
			return nil, fmt.Errorf("presentation (id: %s) not found, err=%s", presentationId, err)
		}
	} else {
		// create new presentation
		request := &slides.Presentation{
			Title: title,
		}
		presentation, err := service.Presentations.Create(request).Do()
		if err != nil {
			return nil, err
		}
		presentationId = presentation.PresentationId

		// delete default slide
		requests := []*slides.Request{
			{
				DeleteObject: &slides.DeleteObjectRequest{
					ObjectId: presentation.Slides[0].ObjectId,
				},
			},
		}
		batchReq := &slides.BatchUpdatePresentationRequest{
			Requests: requests,
		}
		_, err = service.Presentations.BatchUpdate(presentationId, batchReq).Do()
		if err != nil {
			return nil, err
		}
	}

	unixMilli := time.Now().UnixNano() / 1000 / 1000
	slideId := fmt.Sprintf("slide_%d", unixMilli)
	requests := []*slides.Request{
		{
			// Create a new slide
			CreateSlide: &slides.CreateSlideRequest{
				ObjectId: slideId,
				SlideLayoutReference: &slides.LayoutReference{
					PredefinedLayout: "BLANK",
				},
			},
		},
	}

	return &SlideRenderer{
		presentationId: presentationId,
		slideId:        slideId,
		service:        service,
		diagramText:    diagramText,
		requests:       requests,
	}, nil
}

func (r *SlideRenderer) PresentationId() string {
	return r.presentationId
}

func (r *SlideRenderer) SlideId() string {
	return r.slideId
}

func (r *SlideRenderer) RenderHeader(offset Offset, size Size, title string) error {
	objectId := r.generateRandomObjectId()
	requests := []*slides.Request{
		// Create Background Rectangle
		{CreateShape: createShapeRequest(r.slideId, objectId, "RECTANGLE", size, offset)},
		// Fill background color of Rectangle
		{UpdateShapeProperties: fillBackgroundRequest(objectId, headerColor)},
		// Hide border
		{UpdateShapeProperties: hideBorderRequest(objectId)},
		// Add title
		{InsertText: insertTextRequest(objectId, 0, title)},
		// Update text style
		{UpdateParagraphStyle: changeParagraphStyleRequest(objectId, "START", 0, 0, 0, 24)},
		{UpdateTextStyle: changeTextStyleRequest(objectId, slideHeaderTextFontSize, headerTextColor)},
	}
	r.requests = append(r.requests, requests...)
	return nil
}

func (r *SlideRenderer) RenderFooter(offset Offset, size Size) error {
	objectId := r.generateRandomObjectId()
	requests := []*slides.Request{
		// Create Background Rectangle
		{CreateShape: createShapeRequest(r.slideId, objectId, "RECTANGLE", size, offset)},
		// Fill background color of Rectangle
		{UpdateShapeProperties: fillBackgroundRequest(objectId, footerColor)},
		// Hide border
		{UpdateShapeProperties: hideBorderRequest(objectId)},
	}
	r.requests = append(r.requests, requests...)
	return nil
}

func (r *SlideRenderer) RenderGCPBackground(id string, offset Offset, size Size) error {
	backgroundRectangleId := r.generateStaticObjectId(id)
	gcpLogoId := r.generateRandomObjectId()
	iconUrl := GetCardConfig(gcpConfigId).IconUrl
	iconOffset := offset.addOffset(gcpIconOffset)

	requests := []*slides.Request{
		// Create Background Rectangle
		{CreateShape: createShapeRequest(r.slideId, backgroundRectangleId, "RECTANGLE", size, offset)},
		// Fill background color of Rectangle
		{UpdateShapeProperties: fillBackgroundRequest(backgroundRectangleId, gcpBackgroundColor)},
		// Change content alignment
		{UpdateShapeProperties: changeContentAlignmentRequest(backgroundRectangleId, "MIDDLE")},
		// Hide border
		{UpdateShapeProperties: hideBorderRequest(backgroundRectangleId)},
		// Add icon
		{CreateImage: createImageRequest(r.slideId, gcpLogoId, iconUrl, slideGcpIconSize, iconOffset)},
	}
	r.requests = append(r.requests, requests...)

	return nil
}

func (r *SlideRenderer) RenderGroupBackground(id string, offset Offset, size Size, name, iconURL string /* iconURL is not used for slide */, bgColor Color) error {
	objectId := r.generateStaticObjectId(id)
	requests := []*slides.Request{
		// Create Background Rectangle
		{CreateShape: createShapeRequest(r.slideId, objectId, "RECTANGLE", size, offset)},
		// Fill background color of Rectangle
		{UpdateShapeProperties: fillBackgroundRequest(objectId, bgColor)},
		// Change content alignment
		{UpdateShapeProperties: changeContentAlignmentRequest(objectId, "TOP")},
		// Hide border
		{UpdateShapeProperties: hideBorderRequest(objectId)},
		// Add name
		{InsertText: insertTextRequest(objectId, 0, name)},
		{UpdateTextStyle: changeTextStyleRequest(objectId, slideGroupNameFontSize, groupTextColor)},
	}
	r.requests = append(r.requests, requests...)
	return nil
}

func (r *SlideRenderer) RenderStackedCard(id string, offset Offset, size Size) error {
	stackedCardId := r.generateStaticObjectId(id + "_stacked")
	requests := []*slides.Request{
		// Create Rectangle for stack
		{CreateShape: createShapeRequest(r.slideId, stackedCardId, "RECTANGLE", size, offset)},
		// Fill background color of Rectangle with white
		{UpdateShapeProperties: fillBackgroundRequest(stackedCardId, cardColor)},
		// Change border
		{UpdateShapeProperties: createSolidBorderRequest(stackedCardId, cardBorderColor, 0.1)},
	}
	r.requests = append(r.requests, requests...)
	return nil
}

func (r *SlideRenderer) RenderCard(id string, offset Offset, size Size, displayName, name, description, iconURL string) error {
	objectId := r.generateStaticObjectId(id)
	iconObjectId := r.generateRandomObjectId()
	objectIds := []string{objectId, iconObjectId}

	iconOffset := offset.add(cardIconMargin.Left, cardIconMargin.Top)
	nameOffsetLeft := cardIconMargin.Left + cardIconSize.Width

	// Slides API doesn't support an access-restricted URL for image creation,
	// so we convert custom icon URL to publicly-accessible predefined icon.
	if isCustomIconURL(iconURL) {
		iconURL = GetCardConfig(iconNotSupportedID).IconUrl
	}

	cardRequests := []*slides.Request{
		// Create Rectangle
		{CreateShape: createShapeRequest(r.slideId, objectId, "RECTANGLE", size, offset)},
		// Fill background color of Rectangle with white
		{UpdateShapeProperties: fillBackgroundRequest(objectId, cardColor)},
		// Change border
		{UpdateShapeProperties: createSolidBorderRequest(objectId, cardBorderColor, 0.1)},
		// Change content alignment
		{UpdateShapeProperties: changeContentAlignmentRequest(objectId, "MIDDLE")},
		// Add icon
		{CreateImage: createImageRequest(r.slideId, iconObjectId, iconURL, cardIconSize, iconOffset)},
	}
	r.requests = append(r.requests, cardRequests...)

	if displayName != "" {
		requests := []*slides.Request{
			{InsertText: insertTextRequest(objectId, 0, displayName)},
			{UpdateTextStyle: changeTextStyleRequest(objectId, slideCardDisplayNameFontSize, cardDisplayNameColor)},
			// Change paragraph style for displayName.
			{UpdateParagraphStyle: changeParagraphStyleRequest(objectId, "START", 0, 0, 0, nameOffsetLeft)},
		}
		r.requests = append(r.requests, requests...)
	}

	if name != "" {
		nameEndIndex := int64(utf8.RuneCountInString(name))
		nameRequests := []*slides.Request{
			// Add name
			{InsertText: insertTextRequest(objectId, 0, name)},
			// Update text style
			{UpdateTextStyle: changeRangeTextStyleRequest(objectId, 0, nameEndIndex, slideCardNameFontSize, cardNameColor)},
			// Change paragraph style for name.
			{UpdateParagraphStyle: changeParagraphStyleRequest(objectId, "START", 0, 0, 0, nameOffsetLeft)},
		}
		if displayName != "" {
			// Insert new line between displayName and name.
			nameRequests = append(nameRequests, &slides.Request{
				InsertText: insertTextRequest(objectId, nameEndIndex, "\n"),
			})
		}
		r.requests = append(r.requests, nameRequests...)
	}

	if description != "" {
		descObjectId := r.generateRandomObjectId()
		separatorObjectId := r.generateRandomObjectId()

		descriptionWidth := size.Width - (cardIconMargin.Left + cardIconSize.Width + cardIconMargin.Right) - slideCardSeparatorSpace

		descRequests := []*slides.Request{
			// Create separator
			{CreateLine: createLineRequest(r.slideId, separatorObjectId, "STRAIGHT", Size{descriptionWidth, slideCardSeparatorHeight}, offset.add(32, 28))},
			// Change separator color
			{UpdateLineProperties: changeLineStyleRequest(separatorObjectId, "SOLID", "NONE", "NONE", cardSeparatorColor)},
			// Create textbox for description
			{CreateShape: createShapeRequest(r.slideId, descObjectId, "TEXT_BOX", Size{descriptionWidth, slideCardDescriptionHeight}, offset.add(32.5, 30))},
			// Move slide content (name and productName) to Top
			{UpdateShapeProperties: changeContentAlignmentRequest(objectId, "TOP")},
			// Change content alignment
			{UpdateShapeProperties: changeContentAlignmentRequest(descObjectId, "MIDDLE")},
			// Add description
			{InsertText: insertTextRequest(descObjectId, 0, description)},
			{UpdateParagraphStyle: changeParagraphStyleRequest(descObjectId, "START", 0, 0, 0, -7.2)},
			{UpdateTextStyle: changeTextStyleRequest(descObjectId, slideCardDescriptionFontSize, cardDescriptionColor)},
		}

		r.requests = append(r.requests, descRequests...)
		objectIds = append(objectIds, descObjectId, separatorObjectId)
	}

	// group each objects so that users can handle them easily
	r.requests = append(r.requests, &slides.Request{
		GroupObjects: &slides.GroupObjectsRequest{
			ChildrenObjectIds: objectIds,
			GroupObjectId:     r.generateRandomObjectId(),
		},
	})

	return nil
}

func (r *SlideRenderer) RenderPath(path *Path, route Route, startElement, endElement Element) error {
	lineId := r.generateRandomObjectId()

	var startSiteIndex, endSiteIndex int
	switch route.SrcCardSide {
	case CardSideTop:
		startSiteIndex = connectionSiteIndexTop
	case CardSideRight:
		startSiteIndex = connectionSiteIndexRight
	case CardSideBottom:
		startSiteIndex = connectionSiteIndexBottom
	case CardSideLeft:
		startSiteIndex = connectionSiteIndexLeft
	}
	switch route.DstCardSide {
	case CardSideTop:
		endSiteIndex = connectionSiteIndexTop
	case CardSideRight:
		endSiteIndex = connectionSiteIndexRight
	case CardSideBottom:
		endSiteIndex = connectionSiteIndexBottom
	case CardSideLeft:
		endSiteIndex = connectionSiteIndexLeft
	}

	startObjectId := r.generateStaticObjectId(startElement.GetId())
	endObjectId := r.generateStaticObjectId(endElement.GetId())

	requests := []*slides.Request{
		{CreateLine: createLineRequest(r.slideId, lineId, "BENT", slidePathSize, Offset{0, 0})},
		// Change line color
		{UpdateLineProperties: changeLineStyleRequest(lineId, string(path.Dash), string(path.StartArrow), string(path.EndArrow), pathColor)},
		// Connect elements
		{UpdateLineProperties: connectLineRequest(lineId, startObjectId, endObjectId, int64(startSiteIndex), int64(endSiteIndex))},
	}
	r.requests = append(r.requests, requests...)

	return nil
}

func (r *SlideRenderer) Finalize() error {
	batchReq := &slides.BatchUpdatePresentationRequest{
		Requests: r.requests,
	}
	if _, err := r.service.Presentations.BatchUpdate(r.presentationId, batchReq).Do(); err != nil {
		return err
	}

	// update speaker notes to save original code
	presentation, err := r.service.Presentations.Get(r.presentationId).Fields(
		"slides(objectId,slideProperties/notesPage/notesProperties/speakerNotesObjectId)",
	).Do()
	if err != nil {
		return err
	}
	for _, slide := range presentation.Slides {
		if slide.ObjectId == r.slideId {
			speakerNotesId := slide.SlideProperties.NotesPage.NotesProperties.SpeakerNotesObjectId
			batchReq := &slides.BatchUpdatePresentationRequest{
				Requests: []*slides.Request{
					{
						InsertText: &slides.InsertTextRequest{
							ObjectId: speakerNotesId,
							Text:     fmt.Sprintf("# Generated by go/gcpdraw\n%s", r.diagramText),
						},
					},
				},
			}
			if _, err = r.service.Presentations.BatchUpdate(r.presentationId, batchReq).Do(); err != nil {
				return err
			}
			break
		}
	}

	return nil
}

func (r *SlideRenderer) generateRandomObjectId() string {
	count := atomic.AddInt64(&objectIdCounter, 1)
	return fmt.Sprintf("%d_%04d", time.Now().Unix(), count)
}

func (r *SlideRenderer) generateStaticObjectId(suffix string) string {
	// The length of the slide object ID must not be less than 5 or greater than 50.
	// Suffix could be long, so hash it to 16 chars.
	// The r.slideId won't be over 34 chars.
	h := fnv.New64()
	h.Write([]byte(suffix))
	return fmt.Sprintf("%s_%x", r.slideId, h.Sum64())
}

func extractPresentationIdFromUrl(presentationUrl string) (string, error) {
	if presentationUrl == "" {
		return "", nil
	}
	u, err := url.ParseRequestURI(presentationUrl)
	if err != nil {
		return "", err
	}
	re := regexp.MustCompile(`^/presentation/d/([^/]+)(?:/(?:edit|preview))?`)
	match := re.FindStringSubmatch(u.Path)
	if len(match) != 2 {
		return "", fmt.Errorf("not slide url: %s", presentationUrl)
	}
	return match[1], nil
}
