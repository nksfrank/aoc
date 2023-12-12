package day4

import (
	"io"

	"github.com/nksfrank/aoc/internal/aoc"
	"github.com/spf13/cobra"
)


var Cmd = aoc.NewDayCmd(&cobra.Command{
	Use:   "4",
	Short: "Day four of Advent of Code 2023",
	Long:  "Day four of Advent of Code 2023",
}, partOne, partTwo)

func partOne(rd io.Reader) int {
	panic("not implemented")
}

func partTwo(rd io.Reader) int {
	panic("not implemented")
}