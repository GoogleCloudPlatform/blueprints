package gcpdraw

import (
	"net/url"
	"testing"
)

func TestParseCustomIconURL(t *testing.T) {
	for _, tt := range []struct {
		desc      string
		input     string
		wantError bool
	}{
		{
			desc:      "valid drive URL",
			input:     "https://drive.google.com/file/d/1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu/view",
			wantError: false,
		},
		{
			desc:      "valid drive URL with query string",
			input:     "https://drive.google.com/file/d/1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu/view?sharing=true",
			wantError: false,
		},
		{
			desc:      "URL is not drive",
			input:     "https://example.com/",
			wantError: true,
		},
		{
			desc:      "URL is not https",
			input:     "http://drive.google.com/file/d/1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu/view",
			wantError: true,
		},
		{
			desc:      "URL does not have an expected path",
			input:     "https://drive.google.com/xxx",
			wantError: false,
		},
	} {
		t.Run(tt.desc, func(t *testing.T) {
			_, err := parseCustomIconURL(tt.input)
			if tt.wantError {
				if err == nil {
					t.Errorf("parseCustomIconURL(%q) wants error, but nil", tt.input)
				}
			}
		})
	}
}

func TestConvertDriveURL(t *testing.T) {
	for _, tt := range []struct {
		desc  string
		input string
		want  string
	}{
		{
			desc:  "Drive file URL",
			input: "https://drive.google.com/file/d/1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu/view",
			want:  "https://drive.google.com/a/google.com/uc?id=1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu",
		},
		{
			desc:  "Drive web download URL",
			input: "https://drive.google.com/a/google.com/uc?id=1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu",
			want:  "https://drive.google.com/a/google.com/uc?id=1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu",
		},
	} {
		t.Run(tt.desc, func(t *testing.T) {
			u, err := url.Parse(tt.input)
			if err != nil {
				t.Fatalf("unexpectedly input has invalid URL: %q", tt.input)
			}
			got := convertDriveURL(u)
			if got != tt.want {
				t.Errorf("convertDriveURL(%q) = %q, but want = %q", tt.input, got, tt.want)
			}
		})
	}
}
