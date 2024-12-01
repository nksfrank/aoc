package day2

import (
	"bufio"
	"io"
	"strconv"
	"strings"

	"github.com/nksfrank/aoc/cmd/internal/utils"
	"github.com/spf13/cobra"
)

var Cmd = utils.NewDayCmd(&cobra.Command{
	Use:   "2",
	Short: "Day one of Advent of Code 2023",
	Long:  "Day one of Advent of Code 2023",
}, partOne, partTwo)

func partOne(rd io.Reader) int {
	s := bufio.NewScanner(rd)

	var (
		id        = 0
		sum       = 0
		MAX_RED   = 12
		MAX_GREEN = 13
		MAX_BLUE  = 14
	)
	for s.Scan() {
		line := s.Text()

		id++
		game_rounds := strings.Split(line, ": ")
		rounds := game_rounds[1]

		ok := true
		for _, round := range strings.Split(rounds, "; ") {
			if !ok {
				break
			}
			for _, dice := range strings.Split(round, ", ") {
				dice := strings.Split(dice, " ")
				v, _ := strconv.Atoi(dice[0])
				switch dice[1] {
				case "red":
					if v > MAX_RED {
						ok = false
					}
				case "green":
					if v > MAX_GREEN {
						ok = false
					}
				case "blue":
					if v > MAX_BLUE {
						ok = false
					}
				}
				if !ok {
					break
				}
			}
		}
		if ok {
			sum += id
		}
	}

	return sum
}

func partTwo(rd io.Reader) int {
	s := bufio.NewScanner(rd)

	sum := 0
	for s.Scan() {
		line := s.Text()
		rounds := strings.Split(line, ": ")[1]

		r, g, b := 0, 0, 0
		for _, round := range strings.Split(rounds, "; ") {
			for _, dice := range strings.Split(round, ", ") {
				dice := strings.Split(dice, " ")
				v, _ := strconv.Atoi(dice[0])
				switch dice[1] {
				case "red":
					if v > r {
						r = v
					}
				case "green":
					if v > g {
						g = v
					}
				case "blue":
					if v > b {
						b = v
					}
				}
			}
		}
		sum += r * g * b
	}

	return sum
}
