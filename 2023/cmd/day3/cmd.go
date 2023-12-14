package day3

import (
	"bufio"
	"io"
	"math"
	"strconv"
	"unicode"

	"github.com/nksfrank/aoc/cmd/internal/utils"
	"github.com/spf13/cobra"
)

var Cmd = utils.NewDayCmd(&cobra.Command{
	Use:   "3",
	Short: "Day three of Advent of Code 2023",
	Long:  "Day three of Advent of Code 2023",
}, partOne, partTwo)

func scanLines(r io.Reader) []string {
	s := bufio.NewScanner(r)
	var lines []string
	for s.Scan() {
		lines = append(lines, s.Text())
	}
	return lines
}

func inBounds(lines []string, nX, nY int) bool {
	return nY >= 0 && nY < len(lines) && nX >= 0 && nX < len(lines[nY])
}

func isPart(r rune) bool {
	return !unicode.IsPunct(r) && !unicode.IsDigit(r)
}

func isGear(r rune) bool {
	return r == '*'
}

func partOne(rd io.Reader) int {
	lines := scanLines(rd) 

	sum := 0
	for y, line := range lines {
		x1, x2 := -1, -1
		for x, r := range line {
			if unicode.IsDigit(r) {
				x2 = x
				if x1 == -1 {
					x1 = x
				}
				continue
			}
			if x1 != -1 {
				n, _ := strconv.Atoi(line[x1:x2+1])
				if partAdjacent(lines, x1, x2, y) {
					sum += n
				}
			}
			x1, x2 = -1, -1
		}
		if x1 != -1 {
			n, _ := strconv.Atoi(line[x1:x2+1])
			if partAdjacent(lines, x1, x2, y) {
				sum += n
			}
		}
	}
	return sum
}

var neighbours = []struct{ x, y int }{
	{-1, -1}, {0, -1}, {1, -1},
	{-1,  0},          {1,  0},
	{-1,  1}, {0,  1}, {1,  1},
}
func partAdjacent(lines []string, x1, x2, y int) bool {
	for x := x1; x <= x2; x++ {
		for _, n := range neighbours {
			nX, nY := x + n.x, y + n.y
			if !inBounds(lines, nX, nY) {
				continue
			}
			if isPart(rune(lines[nY][nX])) {
				return true
			}
		}
	}
	return false
}

func partTwo(rd io.Reader) int {
	s := scanLines(rd)

	sum := 0
	for y, line := range s {
		for x, r := range line {
			if !isGear(r) {
				continue
			}
			gears := []int{}
			var prev_gear int
			for _, nbr := range neighbours {
				nX, nY := x + nbr.x, y + nbr.y
				if !inBounds(s, nX, nY) {
					continue
				}
				row := s[nY]
				if !unicode.IsDigit(rune(row[nX])) {
					continue
				}

				xs := leftMostIndex(row, nX)
				xe := rightMostIndex(row, nX)
				n, _ := strconv.Atoi(string(row[xs:xe+1]))
				if prev_gear == n {
					continue
				}

				gears = append(gears, n)
				prev_gear = n
			}
			
			if(len(gears) != 2) {
				continue
			}

			t := 1
			for _, g := range gears {
				t *= g
			}
			sum += t
		}
	}
	return sum
}

func rightMostIndex(row string, start int) int {
	var r int
	for n := start; n < len(row); n++ {
		if !unicode.IsDigit(rune(row[n])) {
			break
		}
		r = n
	}
	return int(math.Min(float64(len(row)-1), float64(r)))
}

func leftMostIndex(row string, start int) int {
	var r int
	for n := start; n >= 0; n-- {
		if !unicode.IsDigit(rune(row[n])) {
			break
		}
		r = n
	}
	
	return int(math.Max(0, float64(r)))
}
