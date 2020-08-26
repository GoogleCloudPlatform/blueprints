package main

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"gob/gcpdraw/gcpdraw"
	"log"
	"net/http"
	"time"
)

var (
	slideDiagramOffset = gcpdraw.Offset{30.0, 30.0}
	svgDiagramOffset   = gcpdraw.Offset{0.0, 0.0}
)

type renderSlideRequest struct {
	Code        string `json:"code"`
	AccessToken string `json:"accessToken"`
	SlideUrl    string `json:"slideUrl"`
}

type renderSlideResponse struct {
	PreviewUrl string `json:"previewUrl"`
	EditUrl    string `json:"editUrl"`
	Title      string `json:"title"`
}

type renderSVGRequest struct {
	Code              string `json:"code"`
	DisableDropShadow bool   `json:"disableDropShadow"`
}

type renderSVGResponse struct {
	SVG string `json:"svg"`
}

type errorResponse struct {
	Error string `json:"error"`
}

func write400(w http.ResponseWriter, err, detailErr error) {
	writeError(http.StatusBadRequest, w, err, detailErr)
}

func write500(w http.ResponseWriter, err, detailErr error) {
	writeError(http.StatusInternalServerError, w, err, detailErr)
}

func writeError(statusCode int, w http.ResponseWriter, err, detailErr error) {
	errStr := fmt.Sprintf("%s: %s\n", err, detailErr)
	log.Print(errStr)

	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json")
	resp := &errorResponse{Error: errStr}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("Failed to encode error %v: %v", resp, err)
	}
}

func handleRenderSVG(w http.ResponseWriter, r *http.Request) {
	var reqBody renderSVGRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		write400(w, errors.New("invalid request json"), err)
		return
	}

	diagram, err := gcpdraw.NewDSLParser(reqBody.Code).Parse()
	if err != nil {
		write400(w, errors.New("syntax error"), err)
		return
	}

	size, err := diagram.Layout(svgDiagramOffset)
	if err != nil {
		write400(w, errors.New("failed to layout diagram"), err)
		return
	}

	out := &bytes.Buffer{}
	renderer := gcpdraw.NewSvgRenderer(out, size, reqBody.Code, reqBody.DisableDropShadow)
	if err := diagram.Render(renderer); err != nil {
		write400(w, errors.New("failed to render"), err)
		return
	}

	respBody := renderSVGResponse{
		SVG: out.String(),
	}
	encoder := json.NewEncoder(w)
	encoder.SetEscapeHTML(false)
	if err := encoder.Encode(&respBody); err != nil {
		write500(w, errors.New("internal server error"), err)
		return
	}
}

func handleRenderSlide(w http.ResponseWriter, r *http.Request) {
	var reqBody renderSlideRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		write400(w, errors.New("invalid request json"), err)
		return
	}

	diagram, err := gcpdraw.NewDSLParser(reqBody.Code).Parse()
	if err != nil {
		write400(w, errors.New("syntax error"), err)
		return
	}

	if _, err := diagram.Layout(slideDiagramOffset); err != nil {
		write400(w, errors.New("failed to layout diagram"), err)
		return
	}

	ctx := context.Background()
	client := gcpdraw.GetWebClient(ctx, reqBody.AccessToken)
	presentationTitle := fmt.Sprintf("[gcpdraw] %s", time.Now().Format(time.RFC3339))
	renderer, err := gcpdraw.NewSlideRenderer(client, reqBody.SlideUrl, presentationTitle, reqBody.Code)
	if err != nil {
		write400(w, errors.New("invalid request"), fmt.Errorf("failed to create slides client: %s", err))
		return
	}

	if err := diagram.Render(renderer); err != nil {
		write400(w, errors.New("invalid request"), fmt.Errorf("failed to render: %s", err))
		return
	}

	respBody := renderSlideResponse{
		PreviewUrl: fmt.Sprintf("https://docs.google.com/presentation/d/%s/export/svg?pageid=%s", renderer.PresentationId(), renderer.SlideId()),
		EditUrl:    fmt.Sprintf("https://docs.google.com/presentation/d/%s/edit#slide=id.%s", renderer.PresentationId(), renderer.SlideId()),
		Title:      presentationTitle,
	}
	if err := json.NewEncoder(w).Encode(&respBody); err != nil {
		write500(w, errors.New("internal server error"), err)
		return
	}
}
