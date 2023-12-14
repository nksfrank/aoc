package day4

import (
	"bufio"
	"io"
	"strings"

	"github.com/nksfrank/aoc/internal/aoc"
	"github.com/spf13/cobra"
)


var Cmd = aoc.NewDayCmd(&cobra.Command{
	Use:   "4",
	Short: "Day four of Advent of Code 2023",
	Long:  "Day four of Advent of Code 2023",
}, partOne, partTwo)

func partOne(rd io.Reader) int {
	s := bufio.NewScanner(rd)

	sum := 0
	for s.Scan() {
		line := s.Text()
		sum += parseCard(line)
	}

	return sum
}

func parseCard(line string) int {
	line = strings.ReplaceAll(line, "  ", " ")
	line = strings.Split(line, ": ")[1]
	num := strings.Split(line, " | ")
	want := strings.Split(num[0], " ")
	have := strings.Split(num[1], " ")
	r := 0
	for _, h := range have {
		for _, w := range want {
			if h == w {
				if r == 0 {
					r = 1
				} else {
					r *= 2
				}
				break
			}
		}
	}
	return r
}

func partTwo(rd io.Reader) int {
	panic("not implemented")
}