// Package main implements gcpdraw GAE app for renderer service
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/rs/zerolog"
	"github.com/yfuruyama/crzerolog"
)

func main() {
	rootLogger := zerolog.New(os.Stdout)
	loggingMiddleware := crzerolog.InjectLogger(&rootLogger)

	http.Handle("/render/svg", loggingMiddleware(accessLogMiddleware(http.HandlerFunc(handleRenderSVG))))
	http.Handle("/render/slide", loggingMiddleware(accessLogMiddleware(http.HandlerFunc(handleRenderSlide))))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server listening on port %q\n", port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
