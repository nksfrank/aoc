import { describe, test, expect } from "bun:test";
import { partOne, partTwo } from "./04";

describe("04", () => {
  test("partOne", async () => {
    const input = await Bun.file(
      new URL("04.test.txt", import.meta.url)
    ).text();
    expect(partOne(input)).toBe(18);
  });
  test("partTwo", async () => {
    const input = await Bun.file(
      new URL("04.test.txt", import.meta.url)
    ).text();
    expect(partTwo(input)).toBe(9);
  });
});
