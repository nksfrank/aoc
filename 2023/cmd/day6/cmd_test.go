package day6

import (
	"testing"

	"github.com/nksfrank/aoc/cmd/cmdtest"
	"github.com/stretchr/testify/assert"
)

func TestPartOne(t *testing.T) {
	assert.Equal(t, 288, partOne(cmdtest.Input(t, "test.txt")))
}

func TestPartTwo(t *testing.T) {
	assert.Equal(t, 71503, partTwo(cmdtest.Input(t, "test.txt")))
}
