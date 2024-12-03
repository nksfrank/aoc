import { run } from "./utils";

const r1 = /mul\((?<x>\d+),(?<y>\d+)\)/g;
export const partOne = (input: string): number =>
  Array.from(input.matchAll(r1))
    .map((m) => m.groups)
    .reduce((sum, g) => sum + parseInt(g!.x) * parseInt(g!.y), 0);

const r2 = /do\(\)|don't\(\)|mul\((?<x>\d+),(?<y>\d+)\)/g;
export const partTwo = (input: string): number => {
  let d = true;
  let sum = 0;
  for (const m of Array.from(input.matchAll(r2))) {
    if (m[0] === "don't()") {
      d = false;
    } else if (m[0] === "do()") {
      d = true;
    } else if (d && m.groups) {
      sum += parseInt(m.groups.x) * parseInt(m.groups.y);
    }
  }
  return sum;
};

run(async () => {
  const input = await Bun.file(
    new URL("three.input.txt", import.meta.url)
  ).text();
  console.log(partOne(input), partTwo(input));
});
