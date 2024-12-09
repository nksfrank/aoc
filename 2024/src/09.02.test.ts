import { describe, test, expect } from "bun:test";
import { parse } from "./09.02";

describe("09.02", async () => {
  //const input = await Bun.file(new URL("09.test.txt", import.meta.url)).text();
  test("parse", async () => {
    expect(parse("2333133121414131402")).toEqual([
      [0, 2],
      [".", 3],
      [1, 3],
      [".", 3],
      [2, 1],
      [".", 3],
      [3, 3],
      [".", 1],
      [4, 2],
      [".", 1],
      [5, 4],
      [".", 1],
      [6, 4],
      [".", 1],
      [7, 3],
      [".", 1],
      [8, 4],
      [9, 2],
    ]);
  });
  // test("move", async () => {
  //   expect(
  //     move("00...111...2...333.44.5555.6666.777.888899".split(""))
  //   ).toEqual("00992111777.44.333....5555.6666.....8888..".split(""));
  // });
  // test("sum", async () => {
  //   expect(sum("00992111777.44.333....5555.6666.....8888..".split(""))).toBe(
  //     2858
  //   );
  // });

  // test("partTwo", async () => {
  //   expect(partTwo(input)).toBe(2858);
  // });
});
