package helpers

import (
	"errors"
	"fmt"
	"log"
	"time"
)

// Polls on a particular condition function while the returns true. Once it returns false
// either the condition function's error or a timed out error is returned.
func Poll(condition func() (bool, error), numRetries int, interval time.Duration) error {
	if numRetries < 0 {
		return errors.New("Invalid value for numRetries. Must be >= 0")
	}

	if interval <= 0 {
		return errors.New("Invalid value for numRetries. Must be > 0")
	}

	retry, err := condition()

	for count := 0; retry && count <= numRetries; count++ {
		time.Sleep(interval)
		if err != nil {
			log.Printf("Received error while polling: %v", err)
		}
		log.Printf("Retrying... %d", count+1)
		retry, err = condition()
	}

	if err != nil {
		return fmt.Errorf("Failed to pull provided condition after %d retries, last error: %v", numRetries, err)
	}

	if retry {
		return fmt.Errorf("Polling timed out after %d retries with %d second intervals", numRetries, interval/time.Second)
	}

	return nil // Success
}
