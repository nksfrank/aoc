import { expect, test } from "bun:test";
import { partOne } from ".";

test("partOne works", () => {
  [
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
    ["nppdvjthqldpwncqszvftbrmjlhg", 6],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
  ].forEach(([input, expected]) => {
    expect(partOne(input)).toEqual(expected);
    expect(partOne(input)).toEqual(expected);
    expect(partOne(input)).toEqual(expected);
    expect(partOne(input)).toEqual(expected);
    expect(partOne(input)).toEqual(expected);
  });
});

test("partTwo works", () => {
  [
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 23],
    ["nppdvjthqldpwncqszvftbrmjlhg", 23],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26],
  ].forEach(([input, expected]) => {
    expect(partOne(input, 14)).toEqual(expected);
  });
});
