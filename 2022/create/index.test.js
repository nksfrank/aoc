import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { partOne, partTwo } from ".";

const data = ``;

test.skip("partOne works", () => {
  expect(partOne(data)).toEqual(0);
});

test.skip("partTwo works", () => {
  expect(partTwo(data)).toEqual(0);
});

test.skip("live", () => {
  const input = fs.readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );
  expect(partOne(input)).toMatchSnapshot();
  expect(partTwo(input)).toMatchSnapshot();
});
