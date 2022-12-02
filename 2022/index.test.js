import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";

describe("day 1", async () => {
  const { partOne, partTwo } = await import("./one");
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
});

describe("day 2", async () => {
  const { partOne, partTwo } = await import("./two");

  const data = `A Y
B X
C Z`.split("\n");

  test("part one test", () => {
    expect(partOne(data)).toEqual(15);
  });
  test("part two works", () => {
    expect(partTwo(data)).toEqual(12);
  });
  test("live", () => {
    expect(
      partOne(readFileSync("2022/two/input.txt", "utf-8").split("\n"))
    ).toMatchSnapshot();
    expect(
      partTwo(readFileSync("2022/two/input.txt", "utf-8").split("\n"))
    ).toMatchSnapshot();
  });
});
