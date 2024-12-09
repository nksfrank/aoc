import { describe, test, expect } from "bun:test";
import { partTwo } from "./09.02";

describe("09.02", () => {
  test("partTwo", async () => {
    const input = await Bun.file(
      new URL("09.test.txt", import.meta.url)
    ).text();
    expect(partTwo(input)).toBe(2858);
  });
});
