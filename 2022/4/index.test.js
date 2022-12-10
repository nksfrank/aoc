import { expect, test } from "bun:test";
import { partOne, partTwo } from ".";

const data = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

test("partOne works", () => {
  [
    [data, 2],
    [
      `2-6,2-6
    2-6,6-7
    2-6,4-6
    2-2,2-6
    2-6,6-6`,
      4,
    ],
  ].forEach(([input, expected]) => {
    expect(partOne(input)).toEqual(expected);
  });
});

test("partTwo works", () => {
  expect(partTwo(data)).toEqual(4);
});
