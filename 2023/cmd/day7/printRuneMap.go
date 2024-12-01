package day7

import (
	"fmt"
	"sort"
	"strings"
)

func printRuneMap(m map[rune]int) string {
	// Create a slice to hold the runes so we can sort them
	runes := make([]rune, 0, len(m))
	for r := range m {
		runes = append(runes, r)
	}

	// Sort runes to make output deterministic
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})

	// Build the output string
	var b strings.Builder
	b.WriteString("map[")

	for i, r := range runes {
		if i > 0 {
			b.WriteString(" ")
		}

		// Handle special characters
		var display string
		switch r {
		case '\n':
			display = "'\\n'"
		case '\t':
			display = "'\\t'"
		case '\r':
			display = "'\\r'"
		case ' ':
			display = "' '"
		default:
			if r < 32 || r > 126 { // Control characters or non-ASCII
				display = fmt.Sprintf("'\\u%04x'", r)
			} else {
				display = fmt.Sprintf("'%c'", r)
			}
		}

		fmt.Fprintf(&b, "%s:%d", display, m[r])
	}

	b.WriteString("]")
	return b.String()
}
