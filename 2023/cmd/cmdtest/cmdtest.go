package cmdtest

import (
	"io"
	"log"
	"os"
	"strings"
	"testing"
)

func Input(t *testing.T, path string) io.Reader {
	t.Helper()
	f, err := os.ReadFile(path)
	if err != nil {
		log.Panic(err)
	}
	return strings.NewReader(string(f))
}