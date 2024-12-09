import { describe, test, expect } from "bun:test";
import { partTwo } from "./07.02";

describe("07.02", () => {
  test("partTwo", async () => {
    const input = await Bun.file(
      new URL("07.test.txt", import.meta.url)
    ).text();
    expect(partTwo(input)).toBe(11387);
  });
});
