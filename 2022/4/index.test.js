import { expect, test } from "vitest";
import { partOne, partTwo } from ".";

const data = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

test.each([
  [data, 2],
  [
    `2-6,2-6
  2-6,6-7
  2-6,4-6
  2-2,2-6
  2-6,6-6`,
    4,
  ],
])("partOne works", (input, expected) => {
  expect(partOne(input)).toEqual(expected);
});

test("partTwo works", () => {
  expect(partTwo(data)).toEqual(4);
});
