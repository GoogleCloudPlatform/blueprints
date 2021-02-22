package main

import (
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestCompare(t *testing.T) {
	before, err := resourceHashMap("test_data/before")
	if err != nil {
		t.Fatalf("Failed read old config: %v", err)
	}
	after, err := resourceHashMap("test_data/after")
	if err != nil {
		t.Fatalf("Failed read new config: %v", err)
	}

	want := &Evaluation{
		Added: map[string]map[string][]string{
			"RedisInstance": {
				"my-namespace": []string{"redis-sample-003"},
			},
			"Service": {
				"default": []string{"redis.googleapis.com"},
			},
		},
		Modified: map[string]map[string][]string{
			"RedisInstance": {
				"default": []string{"redis-sample-001"},
			},
		},
		Deleted: map[string]map[string][]string{
			"RedisInstance": {
				"default": []string{"redis-sample-002"},
			},
		},
	}
	got := compare(before, after)
	diff := cmp.Diff(want, got)

	if diff != "" {
		t.Errorf(diff)
	}
}
