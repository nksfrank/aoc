package day7

import (
	"bufio"
	"cmp"
	"io"
	"log"
	"maps"
	"slices"
	"strconv"
	"strings"

	"github.com/nksfrank/aoc/cmd/internal/utils"
	"github.com/nksfrank/aoc/pkg/assert"
	"github.com/spf13/cobra"
)

var Cmd = utils.NewDayCmd(&cobra.Command{
	Use:   "7",
	Short: "Day seven of Advent of Code 2023",
	Long:  "Day seven of Advent of Code 2023",
}, partOne, partTwo)

const (
	HIGH_CARD = iota + 1
	ONE_PAIR
	TWO_PAIR
	THREE_OF_A_KIND
	FULL_HOUSE
	FOUR_OF_A_KIND
	FIVE_OF_A_KIND
)

func mapFaceCountToRank(vals []int) int {
	switch len(vals) {
	case 1:
		return FIVE_OF_A_KIND
	case 2:
		{
			if vals[0] == 4 {
				return FOUR_OF_A_KIND
			}
			return FULL_HOUSE
		}
	case 3:
		if vals[0] == 3 {
			return THREE_OF_A_KIND
		}
		return TWO_PAIR
	case 4:
		return ONE_PAIR
	case 5:
		return HIGH_CARD
	}
	assert.Never("no match found for hand")
	return -1
}

func mapHandToFaceCount(hand string) map[rune]int {
	rmap := make(map[rune]int, len(hand))
	for _, r := range hand {
		if _, ok := rmap[r]; !ok {
			rmap[r] = 0
		}
		rmap[r]++
	}
	return rmap
}
func mapJokersToHighestFace(faceCountMap map[rune]int) map[rune]int {
	j := faceCountMap['J']
	m := 0
	var r rune
	for k, v := range faceCountMap {
		if m < v {
			r = k
			m = v
		}
	}

	if 0 < j {
		delete(faceCountMap, 'J')
		faceCountMap[r] += j
	}

	log.Printf("Joker: hand %s", printRuneMap(faceCountMap))
	return faceCountMap
}

func sortFaceCount(faceCountMap map[rune]int) []int {
	vals := slices.Collect(maps.Values(faceCountMap))
	slices.Sort(vals)
	slices.Reverse(vals)
	return vals
}

type Hand struct {
	hand     string
	bid      int
	strength int
}

func parseInput(r io.Reader, strength func(string) int) []Hand {
	s := bufio.NewScanner(r)
	var res []Hand
	for s.Scan() {
		l := s.Text()
		fields := strings.Fields(strings.TrimSpace(l))

		hand := fields[0]
		bid, err := strconv.Atoi(fields[1])
		assert.Ok(err, "failed to parse bid", fields)
		str := strength(hand)
		res = append(res, Hand{hand: hand, bid: bid, strength: str})
	}
	return res
}

func sum(hands []Hand) int {
	res := 0
	for i, h := range hands {
		res += h.bid * (i + 1)
	}
	return res
}

func partOneMap(hand string) int {
	return mapFaceCountToRank(sortFaceCount(mapHandToFaceCount(hand)))
}

var partOneSortFunc = createSortFunc(map[rune]int{
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'T': 10,
	'J': 11,
	'Q': 12,
	'K': 13,
	'A': 14,
})

func partOne(r io.Reader) int {
	hands := parseInput(r, partOneMap)

	slices.SortFunc(hands, partOneSortFunc)

	return sum(hands)
}

func partTwoMap(h string) int {
	return mapFaceCountToRank(sortFaceCount(mapJokersToHighestFace(mapHandToFaceCount(h))))
}

func createSortFunc(cardMap map[rune]int) func(a, b Hand) int {
	return func(a, b Hand) int {
		c := cmp.Compare(a.strength, b.strength)
		log.Printf("Sort: %v %v comp %b", a, b, c)
		if c == 0 {
			for i := range a.hand {
				a_i := cardMap[rune(a.hand[i])]
				b_i := cardMap[rune(b.hand[i])]
				c = cmp.Compare(a_i, b_i)
				if c == 0 {
					continue
				}
				return c
			}
		}
		return c
	}
}

var partTwoSortFunc = createSortFunc(map[rune]int{
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'T': 10,
	'J': 1,
	'Q': 12,
	'K': 13,
	'A': 14,
},
)

func partTwo(r io.Reader) int {
	hands := parseInput(r, partTwoMap)

	slices.SortFunc(hands, partTwoSortFunc)

	return sum(hands)
}
