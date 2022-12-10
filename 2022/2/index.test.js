import fs from "node:fs";
import path from "node:path";
import { expect, test } from "bun:test";
import { partOne, partTwo } from ".";

const data = `A Y
B X
C Z`.split("\n");

test("part one works", () => {
  expect(partOne(data)).toEqual(15);
});
test("part two works", () => {
  expect(partTwo(data)).toEqual(12);
});