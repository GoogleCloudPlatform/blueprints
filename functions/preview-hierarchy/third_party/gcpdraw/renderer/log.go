package main

import (
	"fmt"
	"net/http"

	"github.com/rs/zerolog/log"
)

const (
	accessLogUsername = "username"
	accessLogPath     = "path"
	accessLogType     = "type"
	logTypeAccessLog  = "access_log"

	headerUsername = "X-Appengine-User-Nickname"
)

func accessLogMiddleware(f http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username := r.Header.Get(headerUsername)
		msg := fmt.Sprintf("Accessed by %s", username)
		log.Ctx(r.Context()).Info().Str(accessLogUsername, username).Str(accessLogPath, r.URL.Path).Str(accessLogType, logTypeAccessLog).Msg(msg)

		f.ServeHTTP(w, r)
	}
}
