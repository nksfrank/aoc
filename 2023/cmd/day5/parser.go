package day5

import (
	"bufio"
	"cmp"
	"fmt"

	"io"
	"slices"
	"strconv"
	"strings"

	"github.com/nksfrank/aoc/pkg/assert"
)

func parseSeed(line string) [][]int64 {
	var seeds []int64
	for _, field := range strings.Fields(strings.TrimPrefix(line, "seeds: ")) {
		number, err := strconv.ParseInt(field, 10, 64)
		assert.Ok(err, "seed parse failed", field)
		seeds = append(seeds, number)
	}
	return [][]int64{seeds}
}

func parseSeedRange(line string) [][]int64 {
	var ranges [][]int64
	fields := strings.Fields(strings.TrimPrefix(line, "seeds: "))
	for i := 0; i < len(fields); i += 2 {
		var seeds []int64
		start, err := strconv.ParseInt(fields[i], 10, 64)
		assert.Ok(err, "seed start parse failed", fields)
		length, err := strconv.ParseInt(fields[i+1], 10, 64)
		assert.Ok(err, "seed length parse failed", fields)
		for n := start; n < start+length; n++ {
			seeds = append(seeds, n)
		}
		ranges = append(ranges, seeds)
	}
	return ranges
}

func parseRange(line string) Range {
	fields := strings.Fields(line)
	assert.Assert(len(line) != 3, "invalid range format")

	dest, err := strconv.ParseInt(fields[0], 10, 64)
	assert.Ok(err, "range dest parse failed", fields)
	src, err := strconv.ParseInt(fields[1], 10, 64)
	assert.Ok(err, "range src parse failed", fields)
	length, err := strconv.ParseInt(fields[2], 10, 64)
	assert.Ok(err, "range length parse failed", fields)

	return Range{
		DestStart:   dest,
		SourceStart: src,
		Length:      length,
	}
}

func parseInput(r io.Reader, parseSeed func(string) [][]int64) *Almanac {
	s := bufio.NewScanner(r)

	var currMap *Map
	almanac := &Almanac{
		Start: currMap,
		Maps:  make(map[Maps]*Map),
	}

	for s.Scan() {
		l := strings.TrimSpace(s.Text())
		if l == "" {
			continue
		}

		if strings.HasPrefix(l, "seeds:") {
			almanac.Seeds = parseSeed(l)
			continue
		}

		if strings.HasSuffix(l, "map:") {
			from, to, _ := strings.Cut(strings.TrimSuffix(l, " map:"), "-to-")
			currMap = &Map{
				From: mapMap[from],
				To:   mapMap[to],
			}
			if almanac.Start == nil {
				almanac.Start = currMap
			}
			almanac.Maps[mapMap[from]] = currMap

			for s.Scan() {
				l := strings.TrimSpace(s.Text())
				if l == "" {
					break
				}
				currMap.Ranges = append(currMap.Ranges, parseRange(l))
			}
			slices.SortFunc(currMap.Ranges, sortBySource)
			currMap.Ranges = fillInGaps(currMap.Ranges)
		}
	}
	return almanac
}

func fillInGaps(ranges []Range) []Range {
	// add gap range between prev and curr
	var res []Range
	prev := Range{
		DestStart:   0,
		SourceStart: 0,
		Length:      0,
	}
	for _, curr := range ranges {
		if prev.SourceStart == curr.SourceStart {
			res = append(res, curr)
			prev = curr
			continue
		}
		if prev.SourceEnd() != curr.SourceStart {
			gap := Range{
				SourceStart: prev.SourceStart + prev.Length,
				DestStart:   prev.SourceStart + prev.Length,
				Length:      curr.SourceStart - prev.SourceEnd(),
			}
			//log.Printf("%v", gap)
			res = append(res, gap)
		}
		res = append(res, curr)
		prev = curr
	}

	return res
}

func sortBySource(a, b Range) int {
	return cmp.Compare(a.SourceStart, b.SourceStart)
}

func expandRanges(rs []Range) map[int64]int64 {
	res := make(map[int64]int64)
	for _, r := range rs {
		ex := expandRange(r)
		for k, v := range ex {
			_, exists := res[k]
			assert.Assert(!exists, fmt.Sprintf("expandRanges(k=%d,v=%d) found key %d with value %d", k, v, k, res[k]))
			res[k] = v
		}
	}
	return res
}
func expandRange(r Range) map[int64]int64 {
	res := make(map[int64]int64, r.Length)
	for i := int64(0); i < r.Length; i++ {
		res[r.SourceStart+i] = r.DestStart + i
	}
	return res
}
