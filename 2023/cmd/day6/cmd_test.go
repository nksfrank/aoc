package day6

import (
	"testing"

	"github.com/nksfrank/aoc/cmd/cmdtest"
	"github.com/stretchr/testify/assert"
)

func TestParseInput(t *testing.T) {
	assert.Equal(
		t,
		[]Race{
			{time: 7, distance: 9}, {time: 15, distance: 40}, {time: 30, distance: 200},
		},
		parseInput(cmdtest.Input(t, "test.txt")),
	)
}

func TestCalcWinnings(t *testing.T) {
	assert.Equal(t, 4, calcRace(Race{time: 7, distance: 9}))
	assert.Equal(t, 8, calcRace(Race{time: 15, distance: 40}))
	assert.Equal(t, 9, calcRace(Race{time: 30, distance: 200}))
}
func TestPartOne(t *testing.T) {
	assert.Equal(t, 288, partOne(cmdtest.Input(t, "test.txt")))
}

func TestPartTwo(t *testing.T) {
	assert.Equal(t, 71503, partTwo(cmdtest.Input(t, "test.txt")))
}
