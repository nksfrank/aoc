import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { partOne, partTwo } from ".";

const data = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

test("part one works", () => {
  expect(partOne(data)).toEqual(24000);
});
test("part two works", () => {
  expect(partTwo(data)).toEqual(45000);
});