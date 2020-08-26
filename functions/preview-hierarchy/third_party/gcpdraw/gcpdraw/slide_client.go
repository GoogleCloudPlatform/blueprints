package gcpdraw

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/user"
	"path"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func GetWebClient(ctx context.Context, token string) *http.Client {
	return oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token}))
}

func GetCliClient(ctx context.Context, credentialFile string) (*http.Client, error) {
	b, err := ioutil.ReadFile(credentialFile)
	if err != nil {
		log.Fatalf("failed to read client credentials from %q: %v", credentialFile, err)
	}
	config, err := google.ConfigFromJSON(b, "https://www.googleapis.com/auth/presentations")
	if err != nil {
		return nil, fmt.Errorf("unable to parse client credentials file: %v", err)
	}

	if err := initCliCredentialsStore(); err != nil {
		log.Fatalf("failed to initialize credentials store: %v", err)
	}

	tok, err := loadCredentials()
	if err != nil {
		tok, err = authorize(config)
		if err != nil {
			return nil, err
		}
		if err := saveCredentials(tok); err != nil {
			return nil, err
		}
	}

	return config.Client(ctx, tok), nil
}

func initCliCredentialsStore() error {
	path, err := getCredentialStorePath()
	if err != nil {
		return err
	}
	return os.MkdirAll(path, os.ModePerm)
}

func authorize(config *oauth2.Config) (*oauth2.Token, error) {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)

	fmt.Printf("Go to the following link in your browser:\n%v\n", authURL)
	fmt.Printf("\n")
	fmt.Printf("Then copy and paste authorization code: ")

	var code string
	if _, err := fmt.Scan(&code); err != nil {
		return nil, fmt.Errorf("unable to read authorization code %v", err)
	}

	tok, err := config.Exchange(oauth2.NoContext, code)
	if err != nil {
		return nil, fmt.Errorf("unable to retrieve token from web %v", err)
	}

	return tok, nil
}

func loadCredentials() (*oauth2.Token, error) {
	storePath, err := getCredentialStorePath()
	if err != nil {
		return nil, err
	}
	filePath := path.Join(storePath, "credentials.json")

	f, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}

	t := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(t)
	defer f.Close()
	return t, err
}

func saveCredentials(token *oauth2.Token) error {
	storePath, err := getCredentialStorePath()
	if err != nil {
		return err
	}
	filePath := path.Join(storePath, "credentials.json")

	fmt.Printf("Saving credential file to: %s\n", filePath)
	f, err := os.OpenFile(filePath, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		return fmt.Errorf("unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)

	return nil
}

func getCredentialStorePath() (string, error) {
	currentUser, err := user.Current()
	if err != nil {
		return "", err
	}

	return path.Join(currentUser.HomeDir, ".config", "gcpdraw"), nil
}
