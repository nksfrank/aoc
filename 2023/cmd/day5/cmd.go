package day5

import (
	"fmt"
	"io"
	"math"
	"sync"

	"github.com/nksfrank/aoc/cmd/internal/utils"
	"github.com/nksfrank/aoc/pkg/assert"
	"github.com/spf13/cobra"
)

var Cmd = utils.NewDayCmd(&cobra.Command{
	Use:   "5",
	Short: "Day four of Advent of Code 2023",
	Long:  "Day four of Advent of Code 2023",
}, partOne, partTwo)

type Maps = uint

const (
	SEED Maps = iota
	SOIL
	FERTILIZER
	WATER
	LIGHT
	TEMPERATURE
	HUMIDITY
	LOCATION
)

var mapMap = map[string]Maps{
	"seed":        SEED,
	"soil":        SOIL,
	"fertilizer":  FERTILIZER,
	"water":       WATER,
	"light":       LIGHT,
	"temperature": TEMPERATURE,
	"humidity":    HUMIDITY,
	"location":    LOCATION,
}

var MapNameLookup = map[Maps]string{
	SEED:        "seed",
	SOIL:        "soil",
	FERTILIZER:  "fertilizer",
	WATER:       "water",
	LIGHT:       "light",
	TEMPERATURE: "temperature",
	HUMIDITY:    "humidity",
	LOCATION:    "location",
}

type Range struct {
	DestStart   int64
	SourceStart int64
	Length      int64
}

func (r Range) SourceEnd() int64 {
	return r.SourceStart + r.Length
}

func (r Range) DestEnd() int64 {
	return r.DestStart + r.Length
}

type Map struct {
	From   Maps
	To     Maps
	Ranges []Range
}

func (m *Map) Find(src int64) int64 {

	for _, r := range m.Ranges {
		if r.SourceStart <= src && src < r.SourceEnd() {
			diff := src - r.SourceStart
			dest := r.DestStart + diff
			return dest
		}
	}
	assert.Never(fmt.Sprintf("Map(%s): unmapped value found %d", MapNameLookup[m.From], src))
	return src
}

type Almanac struct {
	Seeds [][]int64
	Start *Map
	Maps  map[Maps]*Map
}

func (a *Almanac) Find(from Maps, value int64) int64 {
	var res int64 = value
	src, ok := a.Maps[from]
	assert.Assert(ok, "invalid from value")
	for src != nil {
		res = src.Find(res)
		src = a.Maps[src.To]
	}
	return res
}

func min(l int64, r int64) int64 {
	if l <= r {
		return l
	}
	return r
}

func partOne(r io.Reader) int64 {
	almanac := parseInput(r, parseSeed)
	var loc int64 = math.MaxInt64
	for _, seed := range almanac.Seeds[0] {
		r := almanac.Find(SEED, seed)
		loc = min(loc, r)
	}
	return loc
}

func partTwo(r io.Reader) int64 {
	almanac := parseInput(r, parseSeedRange)

	res := make(chan int64, len(almanac.Seeds))
	var wg sync.WaitGroup
	for _, seeds := range almanac.Seeds {
		wg.Add(1)
		go func(seeds []int64) {
			defer wg.Done()
			var loc int64 = math.MaxInt64
			for _, seed := range seeds {

				loc = min(loc, almanac.Find(SEED, seed))

			}
			res <- loc
		}(seeds)
	}

	go func() {
		wg.Wait()
		close(res)
	}()

	var loc int64 = math.MaxInt64
	for n := range res {
		loc = min(loc, n)
	}
	return loc
}
