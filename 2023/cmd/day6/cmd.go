package day6

import (
	"bufio"
	"io"
	"math"
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

type Race struct {
	time, distance int
}

func parseInput(r io.Reader) []Race {
	s := bufio.NewScanner(r)

	s.Scan()
	times := strings.Fields(strings.TrimPrefix(s.Text(), "Time:"))
	s.Scan()
	distances := strings.Fields(strings.TrimPrefix(s.Text(), "Distance:"))
	assert.Assert(len(times) == len(distances), "parsing lines failed")

	races := make([]Race, len(times))
	for i := range times {
		time, err := strconv.Atoi(times[i])
		assert.Ok(err, "parse time failed")
		dist, err := strconv.Atoi(distances[i])
		assert.Ok(err, "parse distance failed")
		races[i] = Race{time: time, distance: dist}
	}
	return races
}

func calcRace(race Race) int {
	t := float64(race.time)
	d := float64(race.distance)

	discriminant := t*t - 4*d
	if discriminant < 0 {
		// no wins exists
		return 0
	}

	sqrtDisc := math.Sqrt(discriminant)
	x1 := (t - sqrtDisc) / 2
	x2 := (t + sqrtDisc) / 2

	start := int(math.Ceil(x1))
	end := int(math.Floor(x2))

	if float64(start) == x1 {
		start++
	}
	if float64(end) == x2 {
		end--
	}

	return end - start + 1
}

func partOne(r io.Reader) int {
	result := 1
	for _, race := range parseInput(r) {
		result *= calcRace(race)
	}
	return result
}

func partTwo(r io.Reader) int {
	s, err := io.ReadAll(r)
	assert.Ok(err, "failed reading file")
	lines := strings.Split(string(s), "\n")

	time, err := strconv.Atoi(strings.Join(strings.Fields(strings.TrimPrefix(lines[0], "Time:")), ""))
	assert.Ok(err, "parse time failed")
	dist, err := strconv.Atoi(strings.Join(strings.Fields(strings.TrimPrefix(lines[1], "Distance:")), ""))
	assert.Ok(err, "parse dist failed")

	return calcRace(Race{time: time, distance: dist})
}
