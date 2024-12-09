import { describe, test, expect } from "bun:test";
import { move, parse, partOne, sum } from "./09.01";

describe("09.01", async () => {
  const input = await Bun.file(new URL("09.test.txt", import.meta.url)).text();
  test("parse", async () => {
    expect(parse("2333133121414131402").join("")).toBe(
      "00...111...2...333.44.5555.6666.777.888899"
    );
    expect(parse("12345").join("")).toBe("0..111....22222");
  });
  test("move", async () => {
    expect(move("0..111....22222".split(""))).toEqual(
      "022111222......".split("")
    );
    expect(
      move("00...111...2...333.44.5555.6666.777.888899".split(""))
    ).toEqual("0099811188827773336446555566..............".split(""));
  });
  test("sum", async () => {
    expect(sum("022111222......".split(""))).toBe(60);
    expect(sum("0099811188827773336446555566..............".split(""))).toBe(
      1928
    );
  });

  test("partOne", async () => {
    expect(partOne(input)).toBe(1928);
  });
});
