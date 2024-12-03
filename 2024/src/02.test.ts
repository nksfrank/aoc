import { describe, test, expect } from "bun:test";
import { partOne, partTwo } from "./two";

describe("day two", () => {
  describe("inputs", () => {
    test("part one", () => {
      expect(partOne("7 6 4 2 1")).toBe(1);
      expect(partOne("1 2 7 8 9")).toBe(0);
      expect(partOne("9 7 6 2 1")).toBe(0);
      expect(partOne("1 3 2 4 5")).toBe(0);
      expect(partOne("8 6 4 4 1")).toBe(0);
      expect(partOne("1 3 6 7 9")).toBe(1);
    });
  });
  test("part one", async () => {
    const t = await Bun.file(new URL("two.test.txt", import.meta.url)).text();
    expect(partOne(t)).toBe(2);
  });
  test("part two", async () => {
    expect(
      partTwo(await Bun.file(new URL("two.test.txt", import.meta.url)).text()),
    ).toBe(4);
  });
});
