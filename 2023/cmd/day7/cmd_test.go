package day7

import (
	"slices"
	"testing"

	"github.com/nksfrank/aoc/cmd/cmdtest"
	"github.com/stretchr/testify/assert"
)

func TestParseInput(t *testing.T) {
	assert.Equal(
		t,
		[]Hand{
			{hand: "32T3K", bid: 765, strength: ONE_PAIR},
			{hand: "T55J5", bid: 684, strength: THREE_OF_A_KIND},
			{hand: "KK677", bid: 28, strength: TWO_PAIR},
			{hand: "KTJJT", bid: 220, strength: TWO_PAIR},
			{hand: "QQQJA", bid: 483, strength: THREE_OF_A_KIND},
		},
		parseInput(cmdtest.Input(t, "test.txt"), partOneMap),
	)
}

func TestPartOne(t *testing.T) {
	t.Run("part one", func(t *testing.T) {
		assert.Equal(t, 6440, partOne(cmdtest.Input(t, "test.txt")))
	})

	t.Run("map faces to rank", func(t *testing.T) {
		assert.Equal(t, FIVE_OF_A_KIND, partOneMap("AAAAA"))
		assert.Equal(t, FOUR_OF_A_KIND, partOneMap("AA8AA"))
		assert.Equal(t, FULL_HOUSE, partOneMap("23332"))
		assert.Equal(t, THREE_OF_A_KIND, partOneMap("TTT98"))
		assert.Equal(t, TWO_PAIR, partOneMap("23432"))
		assert.Equal(t, ONE_PAIR, partOneMap("A23A4"))
		assert.Equal(t, HIGH_CARD, partOneMap("23456"))
	})
}

func TestPartTwo(t *testing.T) {
	t.Run("part two", func(t *testing.T) {
		assert.Equal(t, 5905, partTwo(cmdtest.Input(t, "test.txt")))
	})

	t.Run("map hand to rank with joker high", func(t *testing.T) {
		assert.Equal(t, ONE_PAIR, partTwoMap("32T3K"))
		assert.Equal(t, TWO_PAIR, partTwoMap("KK677"))
		assert.Equal(t, FOUR_OF_A_KIND, partTwoMap("T55J5"))
		assert.Equal(t, FOUR_OF_A_KIND, partTwoMap("KTJJT"))
		assert.Equal(t, FOUR_OF_A_KIND, partTwoMap("QQQJA"))
	})

	t.Run("sorting hands to ranks", func(t *testing.T) {
		hands := parseInput(cmdtest.Input(t, "test.txt"), partTwoMap)
		slices.SortFunc(hands, partTwoSortFunc)
		assert.Equal(t, []Hand{
			{hand: "32T3K", bid: 765, strength: ONE_PAIR},
			{hand: "KTJJT", bid: 220, strength: FOUR_OF_A_KIND},
			{hand: "KK677", bid: 28, strength: TWO_PAIR},
			{hand: "T55J5", bid: 684, strength: FOUR_OF_A_KIND},
			{hand: "QQQJA", bid: 483, strength: FOUR_OF_A_KIND},
		}, hands)
	})
}
