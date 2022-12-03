import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
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
test("live", () => {
  const inputs = fs
    .readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
    .split("\n");
  expect(partOne(inputs)).toMatchSnapshot();
  expect(partTwo(inputs)).toMatchSnapshot();
});
