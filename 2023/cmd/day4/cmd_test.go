package day4

import (
	"io"
	"strings"
	"testing"

	"github.com/nksfrank/aoc/cmd/cmdtest"
	"github.com/stretchr/testify/assert"
)

func TestDayFour(t *testing.T) {
	tests := []struct {
		name string
		want int
		input io.Reader
		fn func(r io.Reader) int
	}{
		{
			name: "card 1",
			want: 8,
			input: strings.NewReader("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"),
			fn: partOne,
		},
		{
			name: "card 2",
			want: 2,
			input: strings.NewReader("Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19"),
			fn: partOne,
		},
		{
			name: "card 3",
			want: 2,
			input: strings.NewReader("Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1"),
			fn: partOne,
		},
		{
			name: "card 4",
			want: 1,
			input: strings.NewReader("Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83"),
			fn: partOne,
		},
		{
			name: "card 5",
			want: 0,
			input: strings.NewReader("Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36"),
			fn: partOne,
		},
		{
			name: "card 6",
			want: 0,
			input: strings.NewReader("Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"),
			fn: partOne,
		},

		{
			name: "part one",
			want: 13,
			input: cmdtest.Input(t, "test.txt"),
			fn: partOne,
		},
		// {
		// 	name: "part two",
		// 	want: 0,
		// 	input: cmdtest.Input(t, "test.txt"),
		// 	fn: partTwo,
		// },
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.fn(tt.input)
			assert.Equal(t, tt.want, got)
		})
	}
}
