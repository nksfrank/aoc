import { expect, test } from "bun:test";
import {
  isVisible,
  parseInput,
  partOne,
  partTwo,
  rotate,
  rotateReverse,
} from ".";

const data = `30373
25512
65332
33549
35390`;

test("isvisible", () => {
  expect(isVisible(0, 1)).toBeTruthy();
  expect(isVisible(1, 0)).toBeFalsy();
  expect(isVisible(0, 0)).toBeFalsy();
});

test("parseInput returns matrix of numbers", () => {
  const expected = [
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0],
  ];
  const result = parseInput(data);

  expect(Array.isArray(result)).toBeTruthy();
  for (let x = 0; x < result.length; x++) {
    expect(Array.isArray(result[x])).toBeTruthy();
    for (let y = 0; y < result[x].length; y++) {
      expect(typeof result[x][y]).toEqual("number");
    }
  }
  expect(result).toEqual(expected);
});

test("rotate turns matrix 90 clockwise", () => {
  expect(
    rotate([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  ).toEqual([
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ]);
});

test("rotateReverse turns matrix 90 counter clockwise", () => {
  expect(
    rotateReverse([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ])
  ).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
});
test("partOne works", () => {
  const result = partOne(data);
  console.log(result);
  expect(result).toEqual(21);
});

// test.skip("partTwo works", () => {
//   expect(partTwo(data)).toEqual(0);
// });
