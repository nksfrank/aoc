package day5

import (
	"testing"

	"github.com/nksfrank/aoc/cmd/cmdtest"
	"github.com/stretchr/testify/assert"
)

func TestDayFive(t *testing.T) {
	t.Run("part one", func(t *testing.T) {
		assert.Equal(t, int64(35), partOne(cmdtest.Input(t, "test.txt")))
	})
	t.Run("part two", func(t *testing.T) {
		assert.Equal(t, int64(46), partTwo(cmdtest.Input(t, "test.txt")))
	})
}

func TestParseSeed(t *testing.T) {
	assert.Equal(t, [][]int64{{79, 14, 55, 13}}, parseSeed("seeds: 79 14 55 13"))
}
func TestParseRange(t *testing.T) {
	assert.Equal(t, Range{DestStart: 50, SourceStart: 98, Length: 2}, parseRange(`50 98 2`))
}
func TestParseFillInGapsCalculatesInbetweenFrames(t *testing.T) {
	m := Map{
		Ranges: []Range{
			{SourceStart: 0, DestStart: 0, Length: 5},
			{SourceStart: 10, DestStart: 12, Length: 10},
			{SourceStart: 30, DestStart: 40, Length: 2},
			{SourceStart: 36, DestStart: 23, Length: 17},
		}}

	m.Ranges = fillInGaps(m.Ranges)

	assert.Equal(t, int64(0), m.Find(0))
	assert.Equal(t, int64(9), m.Find(9))
	assert.Equal(t, int64(12), m.Find(10))
	assert.Equal(t, int64(21), m.Find(19))
	assert.Equal(t, int64(20), m.Find(20))
	assert.Equal(t, int64(35), m.Find(35))
}
func TestParseInput(t *testing.T) {
	input := cmdtest.Input(t, "test.txt")
	almanac := parseInput(input, parseSeed)

	t.Run("inserts gap range", func(t *testing.T) {
		assert.Equal(t, SEED, almanac.Start.From)
		assert.Equal(t, SOIL, almanac.Start.To)
		assert.Len(t, almanac.Start.Ranges, 3)
		assert.Equal(t, almanac.Maps[SEED].Ranges[0], Range{DestStart: 0, SourceStart: 0, Length: 50})
		assert.Equal(t, almanac.Maps[SEED].Ranges[1], Range{DestStart: 52, SourceStart: 50, Length: 48})
		assert.Equal(t, almanac.Maps[SEED].Ranges[2], Range{DestStart: 50, SourceStart: 98, Length: 2})
	})

	t.Run("chains maps from seed to location", func(t *testing.T) {
		src := almanac.Maps[SEED]
		dest := almanac.Maps[src.To]

		assert.Equal(t, SEED, src.From)

		for dest != nil {
			assert.Equal(t, src.To, dest.From)
			src = dest
			dest = almanac.Maps[dest.To]
		}

		assert.Equal(t, LOCATION, src.To)
	})
	t.Run("maps correctly from seed to location", func(t *testing.T) {
		tests := [][]struct {
			m    Maps
			find int64
			want int64
		}{
			{
				{m: SEED, find: 79, want: 81},
				{m: SOIL, find: 81, want: 81},
				{m: FERTILIZER, find: 81, want: 81},
				{m: WATER, find: 81, want: 74},
				{m: LIGHT, find: 74, want: 78},
				{m: TEMPERATURE, find: 78, want: 78},
				{m: HUMIDITY, find: 78, want: 82},
			},
			{
				{m: SEED, find: 14, want: 14},
				{m: SOIL, find: 14, want: 53},
				{m: FERTILIZER, find: 53, want: 49},
				{m: WATER, find: 49, want: 42},
				{m: LIGHT, find: 42, want: 42},
				{m: TEMPERATURE, find: 42, want: 43},
				{m: HUMIDITY, find: 43, want: 43},
			},
			{
				{m: SEED, find: 55, want: 57},
				{m: SOIL, find: 57, want: 57},
				{m: FERTILIZER, find: 57, want: 53},
				{m: WATER, find: 53, want: 46},
				{m: LIGHT, find: 46, want: 82},
				{m: TEMPERATURE, find: 82, want: 82},
				{m: HUMIDITY, find: 82, want: 86},
			},
			{
				{m: SEED, find: 13, want: 13},
				{m: SOIL, find: 13, want: 52},
				{m: FERTILIZER, find: 52, want: 41},
				{m: WATER, find: 41, want: 34},
				{m: LIGHT, find: 34, want: 34},
				{m: TEMPERATURE, find: 34, want: 35},
				{m: HUMIDITY, find: 35, want: 35},
			},
		}
		for _, tc := range tests {
			for _, tt := range tc {
				assert.Equal(t, tt.want, almanac.Maps[tt.m].Find(tt.find))
			}
		}
	})
}

func TestAlmanacFind(t *testing.T) {
	almanac := parseInput(cmdtest.Input(t, "test.txt"), parseSeed)

	t.Run("Almanac maps seed to soil", func(t *testing.T) {
		assert.Equal(t, int64(81), almanac.Start.Find(int64(79)))
		assert.Equal(t, int64(14), almanac.Start.Find(int64(14)))
		assert.Equal(t, int64(57), almanac.Start.Find(int64(55)))
		assert.Equal(t, int64(13), almanac.Start.Find(int64(13)))
	})
	t.Run("seed to soil range edges are correctly mapped", func(t *testing.T) {
		assert.Equal(t, int64(49), almanac.Start.Find(49))
		assert.Equal(t, int64(52), almanac.Start.Find(50))
		assert.Equal(t, int64(99), almanac.Start.Find(97))
		assert.Equal(t, int64(50), almanac.Start.Find(98))
	})
}

func TestSeedRanges(t *testing.T) {
	almanac := parseInput(cmdtest.Input(t, "test.txt"), parseSeedRange)

	assert.Equal(t, 2, len(almanac.Seeds))
	assert.Equal(t, []int64{79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92}, almanac.Seeds[0])
	assert.Equal(t, []int64{55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67}, almanac.Seeds[1])
}
