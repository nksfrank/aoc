package day4

import (
	"bufio"
	"io"
	"strings"

	"github.com/nksfrank/aoc/cmd/internal/utils"
	"github.com/spf13/cobra"
)

var Cmd = utils.NewDayCmd(&cobra.Command{
	Use:   "4",
	Short: "Day four of Advent of Code 2023",
	Long:  "Day four of Advent of Code 2023",
}, partOne, partTwo)

func partOne(rd io.Reader) int {
	s := bufio.NewScanner(rd)

	sum := 0
	for s.Scan() {
		line := s.Text()
		want, have := parseCard(line)
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
		sum += r
	}

	return sum
}

func parseCard(line string) (want, have []string) {
	line = strings.ReplaceAll(line, "  ", " ")
	line = strings.Split(line, ": ")[1]
	num := strings.Split(line, " | ")
	want = strings.Split(num[0], " ")
	have = strings.Split(num[1], " ")
	return
}

func partTwo(rd io.Reader) int {
	s := bufio.NewScanner(rd)
	wins := make(map[int]int)
	id := 0
	for s.Scan() {
		wins[id] += 1
		line := s.Text()
		want, have := parseCard(line)

		won := 0
		for _, h := range have {
			for _, w := range want {
				if h == w {
					won++
					break
				}
			}
		}

		for i := id + 1; i <= id+won; i++ {
			wins[i] += 1 + wins[id] - 1
		}

		id++
	}

	sum := 0
	for _, v := range wins {
		sum += v
	}
	return sum
}
