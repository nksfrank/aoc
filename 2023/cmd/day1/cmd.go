package day1

import (
	"bufio"
	"io"
	"strconv"
	"strings"
	"unicode"

	"github.com/nksfrank/aoc/internal/aoc"
	"github.com/spf13/cobra"
)

var Cmd = aoc.NewDayCmd(&cobra.Command{
	Use:   "1",
	Short: "Day one of Advent of Code 2023",
	Long:  "Day one of Advent of Code 2023",
}, partOne, partTwo)

type Matcher func(line string) (first, last string)

func matchInt(line string) (first , last string) {
	r := []rune(line)
	for i := range r {
		if first == "" && unicode.IsDigit(r[i]) {
			first = string(r[i])
		}
		if last == "" && unicode.IsDigit(r[len(r) - 1 - i]) {
			last = string(r[len(r) - 1 - i])
		}
		if first != "" && last != "" {
			break;
		}
	}
	return first, last
}

var letters = map[string]int{
	"one": 1,
	"two": 2,
	"three": 3,
	"four":4,
	"five": 5,
	"six": 6,
	"seven": 7,
	"eight": 8,
	"nine": 9,
}

func matchLetter(line string) (first , last string) {
	for i := 0; i < len(line); i++ {
		if first == "" {
			if unicode.IsDigit(rune(line[i])) {
				first = string(line[i])
			} else {
				for k, v := range letters {
					if i + len(k) <= len(line) && line[i:i+len(k)] == k {
						first = strconv.Itoa(v)
						break;
					}
				}
			}
		}
		if last == ""{
			if unicode.IsDigit(rune(line[len(line) - 1 - i])) {
				last = string(line[len(line) - 1 - i])
			} else {
				for k, v := range letters {
					if strings.Contains(line[len(line) - 1 - i:], k) {
						last = strconv.Itoa(v)
						break;
					}
				}
			}
		}
		if first != "" && last != "" {
			break;
		}
	}
	return first, last
}

func parse(m Matcher, line string) int {
	first, last := m(line)
	r := first + last
	i, err := strconv.Atoi(r)
	if err != nil {
		return 0
	}
	return i
}

func partOne(r io.Reader) int {
	s:= bufio.NewScanner(r)
	m := matchInt

	sum := 0
	for s.Scan() {
		line := s.Text()
		sum += parse(m, line)
	}
	return sum
}
func partTwo(r io.Reader) int {
	s:= bufio.NewScanner(r)
	m := matchLetter

	sum := 0
	for s.Scan() {
		line := s.Text()
		sum += parse(m, line)
	}
	return sum
}