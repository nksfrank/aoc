import { expect, test, describe } from "bun:test";
import { partOne, partTwo } from "./one";

describe("day one", () => {
  test("part 1", async () => {
    const input = Bun.file(new URL("one.test.txt", import.meta.url));
    expect(await partOne(input)).toBe(11);
  });

  test("partTwo", async () => {
    expect(
      await partTwo(Bun.file(new URL("one.test.txt", import.meta.url))),
    ).toBe(31);
  });
});
