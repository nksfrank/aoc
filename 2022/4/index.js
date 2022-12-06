const parseInputs = (inputs) =>
  inputs
    .split("\n")
    .map((pair) =>
      pair
        .split(",")
        .map((elf) => elf.split("-").map((n) => Number.parseInt(n)))
    );
/**
 *
 * @param {*} inputs
 */
export const partOne = (inputs) =>
  parseInputs(inputs).filter(
    ([[a0, a1], [b0, b1]]) => (a0 <= b0 && a1 >= b1) || (b0 <= a0 && b1 >= a1)
  ).length;
/**
 *
 * @param {*} inputs
 */
export const partTwo = (inputs) =>
  parseInputs(inputs).filter(
    ([[a0, a1], [b0, b1]]) => (a0 >= b0 && a0 <= b1) || (b0 >= a0 && b0 <= a1)
  ).length;

(async () => {
  const fs = await import("node:fs");
  const input = fs.readFileSync(
    new URL("./input.txt", import.meta.url),
    "utf-8"
  );
  console.log(partOne(input), partTwo(input));
})();
