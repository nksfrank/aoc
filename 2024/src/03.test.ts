import { describe, test, expect } from "bun:test";
import { partOne, partTwo } from "./03";

describe("part three", () => {
  test("part one", async () => {
    expect(
      partOne(await Bun.file(new URL("three.test.txt", import.meta.url)).text())
    ).toBe(161);
  });

  test("part two", async () => {
    expect(
      partTwo(
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
      )
    ).toBe(48);
  });
});
