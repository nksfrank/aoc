import { expect, test } from "vitest";
import { parseCrates, parseMoves, partOne, partTwo } from ".";

const data = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

test("parseCrates", () => {
  expect(
    parseCrates(`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `)
  ).toEqual({ 1: ["Z", "N"], 2: ["M", "C", "D"], 3: ["P"] });
});

test("parseMoves", () => {
  expect(
    parseMoves(`move 1 from 2 to 1
move 13 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`)
  ).toEqual([
    [1, 2, 1],
    [13, 1, 3],
    [2, 2, 1],
    [1, 1, 2],
  ]);
});
test("partOne works", () => {
  expect(partOne(data)).toEqual(`CMZ`);
});

test("partTwo works", () => {
  expect(partTwo(data)).toEqual("MCD");
});
