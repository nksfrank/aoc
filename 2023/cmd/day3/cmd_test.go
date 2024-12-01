package day3

import (
	"io"
	"testing"

	"github.com/nksfrank/aoc/cmd/cmdtest"
	"github.com/stretchr/testify/assert"
)

func TestDayThree(t *testing.T) {
	tests := []struct {
		name string
		want int
		input io.Reader
		fn func(r io.Reader) int
	}{
		{
			name: "part one",
			want: 4361,
			input: cmdtest.Input(t, "test.txt"),
			fn: partOne,
		},
		// {
		// 	name: "connecting parts",
		// 	want: 256+128,
		// 	input: strings.NewReader("256#128"),
		// 	fn: partOne,
		// },
		{
			name: "part two",
			want: 467835,
			input: cmdtest.Input(t, "test.txt"),
			fn: partTwo,
		},
		// {
		// 	name: "index_out_of_bounds",
		// 	want: 467835,
		// 	input: strings.NewReader(`...........................*....+.............239......................863....................*..........341.....*329...................$...\n
		// 	801..+...638.659........358...29..695.....@........241...680.....863..........................310.#...........941........@216........311....\n
		// 	...*.358.*...*....................@....786....*330................&.........842........11..........279...................................686
		// 	`),
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
