import { test, expect, describe } from "bun:test";
import { partOne, partTwo } from "./11";

describe("11", () => {
  test("partOne", () => {
    expect(partOne("125 17", 25)).toBe(55312);
  });

  test("partTwo", () => {
    expect(partTwo("125 17", 25)).toBe(55312);
  });
});
