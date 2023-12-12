package day4

import (
	"bufio"
	"io"
	"strings"
	"sync"

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

	wg := &sync.WaitGroup{}
	res := make(chan int, 6)
	for s.Scan() {
		line := s.Text()
		wg.Add(1)
		go parseCard(res, line, wg)
	}
	go func() {
		wg.Wait()
		close(res)
	}()

	sum := 0
	for i := range res {
		sum += i
	}

	return sum
}

func parseCard(res chan<- int, line string, wg *sync.WaitGroup) {
	defer wg.Done()
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
					r = r * 2
				}
			}
		}
	}

	res <- r
}

func partTwo(rd io.Reader) int {
	panic("not implemented")
}