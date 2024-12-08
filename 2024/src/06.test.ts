import { describe, test, expect } from "bun:test";
import { partOne } from "./06.01";
import { partTwo } from "./06.02";

describe("06", () => {
  test("partOne", async () => {
    const input = await Bun.file(
      new URL("06.test.txt", import.meta.url)
    ).text();
    expect(partOne(input)).toBe(41);
  });

  test("partTwo", async () => {
    const input = await Bun.file(
      new URL("06.test.txt", import.meta.url)
    ).text();
    expect(partTwo(input)).toBe(6);
  });
});
