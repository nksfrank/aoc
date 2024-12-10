import { describe, test, expect } from "bun:test";
import { partOne, partTwo } from "./10";

describe("10.02", () => {
  test("partOne", async () => {
    const cases = [
      [
        `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`,
        2,
        "first: fork in the road",
      ],
      [
        `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`,
        4,
        "second: not 0, 2",
      ],
      [
        `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`,
        3,
      ],
      [
        `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        36,
      ],
    ] as const;
    for (const [input, expected, msg] of cases) {
      expect(partOne(input), msg).toBe(expected);
    }
  });

  test("partTwo", async () => {
    const cases = [
      [
        `.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`,
        3,
        "first",
      ],
      [
        `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`,
        13,
        "second",
      ],
      [
        `012345
123456
234567
345678
4.6789
56789.`,
        227,
      ],
      [
        `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        81,
      ],
    ] as const;
    for (const [input, expected, msg] of cases) {
      expect(partTwo(input), msg).toBe(expected);
    }
  });
});
