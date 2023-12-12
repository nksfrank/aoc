package cmdtest

import (
	"io"
	"os"
	"strings"
	"testing"
)

func Input(t *testing.T, path string) io.Reader {
	t.Helper()
	f, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}
	return strings.NewReader(string(f))
}