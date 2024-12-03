import { expect, test, describe } from "bun:test";
import { partOne, partTwo } from "./01";

describe("01", () => {
  test("partOne", async () => {
    expect(
      partOne(await Bun.file(new URL("01.test.txt", import.meta.url)).text())
    ).toBe(11);
  });

  test("partTwo", async () => {
    expect(
      partTwo(await Bun.file(new URL("01.test.txt", import.meta.url)).text())
    ).toBe(31);
  });
});
