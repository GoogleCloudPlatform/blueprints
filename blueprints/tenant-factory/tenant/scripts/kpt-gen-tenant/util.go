package main

import (
	"context"
	crypto_rand "crypto/rand"
	"encoding/binary"
	"fmt"
	math_rand "math/rand"
	"os/exec"
	"strings"

	"k8s.io/klog/v2"
)

// seedRand uses crypto/rand to seed math/rand.
// If this is not run, the math/rand output will be predictable and not random.
// This seeds with crypto/rand, because the crypto/rand reads from /dev/urandom or equivelent.
// https://stackoverflow.com/a/54491783/760185
func seedRand() error {
	var b [8]byte
	_, err := crypto_rand.Read(b[:])
	if err != nil {
		return fmt.Errorf("failed to seed math/rand: %w", err)
	}
	math_rand.Seed(int64(binary.LittleEndian.Uint64(b[:])))
	return nil
}

// suffix generates a random 4 digit code using math/rand, with padding zeros.
func suffix() string {
	return fmt.Sprintf("%04d", math_rand.Intn(10000))
}

func abbreviate(s string) string {
	// TODO: Allow manual specification of abbreviations
	if len(s) > 3 {
		return s[:3]
	}
	return s
}

func execCmd(ctx context.Context, workDir string, args ...string) error {
	cmd := exec.CommandContext(ctx, args[0], args[1:]...)
	if workDir != "" {
		cmd.Dir = workDir
		klog.Infof("exec (%s): %s", workDir, strings.Join(args, " "))
	} else {
		klog.Infof("exec: %s", strings.Join(args, " "))
	}
	out, err := cmd.CombinedOutput()
	if strings.TrimSpace(string(out)) != "" {
		klog.Info("exec output:")
		klog.Info(string(out))
	}
	if err != nil {
		return fmt.Errorf("error running command %s: %w", strings.Join(args, " "), err)
	}
	return nil
}

func gitInitAndCommit(ctx context.Context, gitDir string) error {
	err := execCmd(ctx, gitDir, "git", "init")
	if err != nil {
		return err
	}

	err = execCmd(ctx, gitDir, "git", "add", ".")
	if err != nil {
		return err
	}

	err = execCmd(ctx, gitDir, "git", "config", "--local", "user.email", "kpt-gen-tenant@example.com")
	if err != nil {
		return err
	}

	err = execCmd(ctx, gitDir, "git", "config", "--local", "user.name", "kpt-gen-tenant")
	if err != nil {
		return err
	}

	err = execCmd(ctx, gitDir, "git", "commit", "-m", "temporary commit to make kpt update happy")
	if err != nil {
		return err
	}

	return nil
}
