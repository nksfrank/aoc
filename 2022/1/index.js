export const parseInput = (data) =>
  data
    .split("\n\n")
    .map((elf) => elf.split("\n").map((n) => Number.parseInt(n)));
export const add = (a, b) => a + b;
export const sum = (values) => values.reduce(add);
export const max = (acc, item) => Math.max(acc, item);
export const partOne = (data) => parseInput(data).flatMap(sum).reduce(max);
export const partTwo = (data) =>
  parseInput(data)
    .flatMap(sum)
    .reduce((acc, item) => [...acc, item].sort((a, b) => b - a).slice(0, 3), [])
    .reduce(add);

if (process.env.NODE_ENV === "production") {
  const fs = await import("node:fs");
  const input = fs.readFileSync(
    new URL("./input.txt", import.meta.url),
    "utf-8"
  );
  console.log(partOne(input), partTwo(input));
}
