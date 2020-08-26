package gcpdraw

import (
	"encoding/json"
	"fmt"
	_ "gob/gcpdraw/statik"
	"io/ioutil"
	"sync"

	"github.com/rakyll/statik/fs"
)

type CardConfig struct {
	CardId      string   `json:"cardId"`
	Aliases     []string `json:"aliases"`
	DisplayName string   `json:"displayName"`
	IconUrl     string   `json:"iconUrl"`
}

var (
	configMutex = new(sync.Mutex)
)

var cardConfigMap map[string]CardConfig

func init() {
	cardConfigMap = make(map[string]CardConfig, 0)
}

func GetCardConfig(cardId string) *CardConfig {
	configMutex.Lock()
	defer configMutex.Unlock()

	// this block is executed only once
	if len(cardConfigMap) == 0 {
		loadAllConfig()
	}

	if config, ok := cardConfigMap[cardId]; ok {
		return &config
	}
	return nil
}

func loadAllConfig() error {
	filePaths := []string{
		"/product_cards.json",
		"/gsuite_cards.json",
		"/oss_cards.json",
		"/user_cards.json",
		"/others.json",
	}

	for _, filePath := range filePaths {
		if err := loadConfigFile(filePath); err != nil {
			return fmt.Errorf("failed to read %s: %s", filePath, err)
		}
	}

	return nil
}

func loadConfigFile(filePath string) error {
	// read from statik
	statikFS, err := fs.New()
	if err != nil {
		return fmt.Errorf("failed to create statik fs: %s", err)
	}
	f, err := statikFS.Open(filePath)
	if err != nil {
		return fmt.Errorf("failed to open config file: %s", err)
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		return fmt.Errorf("failed to read config file: %s", err)
	}
	cardConfigs := make([]CardConfig, 0)
	if err := json.Unmarshal(b, &cardConfigs); err != nil {
		return fmt.Errorf("failed to unmarshal config file: %s", err)
	}
	return loadCardConfigs(cardConfigs)
}

func loadCardConfigs(cardConfigs []CardConfig) error {
	for _, config := range cardConfigs {
		cardConfigMap[config.CardId] = config
		for _, alias := range config.Aliases {
			cardConfigMap[alias] = config
		}
	}
	return nil
}
