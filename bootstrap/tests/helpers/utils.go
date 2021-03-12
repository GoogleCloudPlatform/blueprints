package helpers

import (
	"math/rand"
	"time"
)

// RandStr generates rand lowercase strings for length l
func RandStr(l int) string {
	charSet := "abcdefghijklmnopqrstuvwxyz"
	rand.Seed(time.Now().UnixNano())
	lenCharSet := len(charSet)
	bytes := make([]byte, l)
	for i := range bytes {
		bytes[i] = charSet[rand.Intn(lenCharSet)]
	}
	return string(bytes)
}
