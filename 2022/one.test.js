import { expect, it } from "vitest";
import { parseInput, sum, a, b } from "./one";
const data = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

it("splits input per elf", () => {
  const elfes = parseInput(data);
  expect(Array.isArray(elfes)).toEqual(true);
  expect(elfes.length).toEqual(5);
});

it("parsed data are numbers", () => {
  expect(
    parseInput(data)
      .flatMap((elf) => elf.flatMap((n) => n))
      .every((n) => typeof n === "number")
  ).toEqual(true);
});

it("sumarises elf input correctly", () => {
  expect(
    parseInput(`7000
    8000
    9000`).map(sum)
  ).toEqual([24000]);
});

it("finds elf with largest value", () => {
  expect(a(data)).toEqual(24000);
});

it("finds three fatest elfes", () => {
  expect(b(data)).toEqual(45000);
});
