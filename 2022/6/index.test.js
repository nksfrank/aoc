import { expect, test } from "vitest";
import { partOne, partTwo } from ".";

test.each([
  ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
  ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
  ["nppdvjthqldpwncqszvftbrmjlhg", 6],
  ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
  ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
])("partOne works", (input, expected) => {
  expect(partOne(input)).toEqual(expected);
  expect(partOne(input)).toEqual(expected);
  expect(partOne(input)).toEqual(expected);
  expect(partOne(input)).toEqual(expected);
  expect(partOne(input)).toEqual(expected);
});

test.each([
  ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19],
  ["bvwbjplbgvbhsrlpgdmjqwftvncz", 23],
  ["nppdvjthqldpwncqszvftbrmjlhg", 23],
  ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29],
  ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26],
])("partTwo works", (input, expected) => {
  expect(partOne(input, 14)).toEqual(expected);
});
