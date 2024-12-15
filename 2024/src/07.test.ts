import { describe, test, expect } from "bun:test";
import { partOne, partTwo } from "./07";

describe("07", () => {
  test("partOne ", async () => {
    const input = await Bun.file(
      new URL("07.test.txt", import.meta.url)
    ).text();
    expect(partOne(input)).toBe(3749);
  });
  test("partTwo", async () => {
    const input = await Bun.file(
      new URL("07.test.txt", import.meta.url)
    ).text();
    expect(partTwo(input)).toBe(11387);
  });
});
