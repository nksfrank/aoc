package day6

import (
	"io"
	"strconv"
	"strings"

	"github.com/nksfrank/aoc/cmd/internal/utils"
	"github.com/nksfrank/aoc/pkg/assert"
	"github.com/spf13/cobra"
)

var Cmd = utils.NewDayCmd(&cobra.Command{
	Use:   "6",
	Short: "Day six of Advent of Code 2023",
	Long:  "Day six of Advent of Code 2023",
}, partOne, partTwo)

func partOne(r io.Reader) int {
	s, err := io.ReadAll(r)
	assert.Ok(err, "failed reading file")
	lines := strings.Split(string(s), "\n")
	assert.Assert(strings.HasPrefix(lines[0], "Time:"), "first line doesn't contain Time")
	assert.Assert(strings.HasPrefix(lines[1], "Distance:"), "second line doesn't contain Distance")

	times := strings.Fields(strings.TrimSpace(strings.TrimPrefix(lines[0], "Time:")))
	distances := strings.Fields(strings.TrimSpace(strings.TrimPrefix(lines[1], "Distance:")))
	assert.Assert(len(times) == len(distances), "parsing lines failed")
	res := 1
	for i := 0; i < len(times); i++ {
		time, err := strconv.Atoi(times[i])
		assert.Ok(err, "parse time failed")
		dist, err := strconv.Atoi(distances[i])
		assert.Ok(err, "parse time failed")
		res *= calcRace(time, dist)
	}
	return res
}

func calcRace(time, dist int) int {
	won := 0
	for i := time / 2; i > 0; i-- {
		speed := i
		left := time - speed
		move := left * speed

		if dist < move {
			won++
		} else {
			break
		}
	}
	won = won * 2
	if time%2 == 0 {
		won -= 1
	}
	return won
}

func partTwo(r io.Reader) int {
	s, err := io.ReadAll(r)
	assert.Ok(err, "failed reading file")
	lines := strings.Split(string(s), "\n")

	time, err := strconv.Atoi(strings.Join(strings.Fields(strings.TrimPrefix(lines[0], "Time:")), ""))
	assert.Ok(err, "parse time failed")
	dist, err := strconv.Atoi(strings.Join(strings.Fields(strings.TrimPrefix(lines[1], "Distance:")), ""))
	assert.Ok(err, "parse dist failed")

	return calcRace(time, dist)
}

func sum(values []string) (s int) {
	for _, v := range values {
		n, err := strconv.Atoi(v)
		assert.Ok(err, "parsing value failed")
		s += n
	}
	return
}
