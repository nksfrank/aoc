import { describe, test, expect } from "bun:test";
import { partOne, partTwo } from "./05";

describe("05", () => {
  test("partOne", async () => {
    const input = await Bun.file(
      new URL("05.test.txt", import.meta.url)
    ).text();
    expect(partOne(input)).toBe(143);
  });

  test("partTwo", async () => {
    const input = await Bun.file(
      new URL("05.test.txt", import.meta.url)
    ).text();
    expect(partTwo(input)).toBe(123);
  });
});
