import { describe, test, expect } from "bun:test";
import { partOne } from "./07.01";

describe("07.01", async () => {
  const input = await Bun.file(new URL("07.test.txt", import.meta.url)).text();

  test("partOne ", async () => {
    expect(partOne(input)).toBe(3749);
  });
});
