// Package main implements gcpdraw GAE app for default service
package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
)

const headerUsername = "X-Appengine-User-Nickname"

var indexTemplate = template.Must(template.ParseFiles("client/build/index.html"))

type indexTemplateData struct {
	CurrentUsername string
}

func requestUsername(r *http.Request) string {
	return r.Header.Get(headerUsername)
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		username := requestUsername(r)
		if username == "" {
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprint(w, "Must be accessed through UberProxy.")
			return
		}
		indexTemplate.Execute(w, indexTemplateData{username})
	})
	// This is for local development (On GAE, static files are served from static servers. See app.yaml).
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("client/build/static"))))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server listening on port %q\n", port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
