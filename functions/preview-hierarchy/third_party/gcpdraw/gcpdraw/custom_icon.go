package gcpdraw

import (
	"fmt"
	"net/url"
	"regexp"
	"strings"
)

const driveHost = "drive.google.com"

var driveURLPathRegExp = regexp.MustCompile(`/file/d/([^/]+)/view`)

func parseCustomIconURL(iconURL string) (*url.URL, error) {
	u, err := url.Parse(iconURL)
	if err != nil {
		return nil, fmt.Errorf("invalid icon_url: %s", iconURL)
	}
	if !(u.Scheme == "https" && strings.ToLower(u.Host) == driveHost) {
		return nil, fmt.Errorf("icon_url must be for Google Drive: %s", iconURL)
	}
	if !driveURLPathRegExp.MatchString(u.Path) {
		return nil, fmt.Errorf("invalid icon_url: %s", iconURL)
	}
	return u, nil
}

// convertDriveURL converts icon URL for Google Drive to Web Downloads URL
// Before: https://drive.google.com/file/d/{FILE_ID}/view
// After: https://drive.google.com/a/google.com/uc?id={FILE_ID}
// For Web Download URL, see go/explorer-downloads#web-downloads-via-uc
func convertDriveURL(driveURL *url.URL) string {
	// Check if URL is already Web Downloads URL
	if strings.HasPrefix(driveURL.Path, "/uc") {
		return driveURL.String()
	}

	matched := driveURLPathRegExp.FindStringSubmatch(driveURL.Path)
	if len(matched) == 2 {
		fileID := matched[1]
		return fmt.Sprintf("https://%s/a/google.com/uc?id=%s", driveHost, fileID)
	}

	// No match
	return driveURL.String()
}

func isCustomIconURL(iconURL string) bool {
	u, err := url.Parse(iconURL)
	if err != nil {
		return false
	}
	if strings.ToLower(u.Host) == driveHost {
		return true
	}
	return false
}
