package day4

import (
	"io"
	"testing"

	"github.com/nksfrank/aoc/cmd/cmdtest"
	"github.com/stretchr/testify/assert"
)

func TestDayTwo(t *testing.T) {
	tests := []struct {
		name string
		want int
		input io.Reader
		fn func(r io.Reader) int
	}{
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
