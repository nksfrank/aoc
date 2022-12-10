import { expect, test } from "bun:test";
import {
  compartments,
  groupBy,
  intersects,
  partOne,
  partTwo,
  pointsMap,
  toSets,
} from ".";

const data = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

test("split rucksack to compartments", () => {
  expect(compartments("vJrwpWtwJgWrhcsFMMfFFhFp")).toEqual([
    "vJrwpWtwJgWr",
    "hcsFMMfFFhFp",
  ]);
});
test("toSets", () => {
  const [first, last] = toSets(["vJrwpWtwJgWr", "hcsFMMfFFhFp"]);
  expect(Array.from(first)).toEqual(["v", "J", "r", "w", "p", "W", "t", "g"]);
  expect(Array.from(last)).toEqual(["h", "c", "s", "F", "M", "f", "p"]);
});
test("pointsMap", () => {
  expect(pointsMap["a"]).toEqual(1);
  expect(pointsMap["z"]).toEqual(26);
  expect(pointsMap["A"]).toEqual(27);
  expect(pointsMap["Z"]).toEqual(52);
});

test("intersects", () => {
  [
    [["vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL"], "r"],
    [
      [
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
      ],
      "Z",
    ],
  ].forEach(([cases, expected]) => {
    expect(intersects(cases.map((s) => new Set(s.split(""))))).toEqual(
      expected
    );
  });
});
test("groupBy", () => {
  expect(
    [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ].reduce(groupBy.bind(null, 3), [])
  ).toEqual([
    [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ],
    [
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ],
  ]);
});

test("partOne works", () => {
  expect(partOne(data)).toEqual(157);
});

test("partTwo works", () => {
  expect(partTwo(data, 3)).toEqual(70);
});
