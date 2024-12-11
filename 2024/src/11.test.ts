import { test, expect } from "bun:test";
import { partOne } from "./11";

test("partOne", () => {
  expect(partOne("125 17")).toBe(55312);
});
