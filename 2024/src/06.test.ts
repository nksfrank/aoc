import { describe, test, expect } from "bun:test";
import { partOne } from "./06.01";

describe("06", () => {
  test("partOne", async () => {
    const input = await Bun.file(
      new URL("06.test.txt", import.meta.url)
    ).text();
    expect(partOne(input)).toBe(41);
  });
});
