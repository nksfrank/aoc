/**
 * @typedef {Object} crates
 * @property
 */
/**
 *
 * @param {string} input
 * @returns {Object.<number, string[]>}
 */
export function parseCrates(input) {
  return input
    .split("\n")
    .reverse()
    .slice(1)
    .map((row) => row.match(/.{1,4}/g).map((c) => c[1]))
    .reduce((acc, row) => {
      row.forEach((crate, i, arr) => {
        if (crate.trim() === "") return;
        const col = (i % arr.length) + 1;
        acc[col] = [...(acc[col] ?? []), crate];
      });
      return acc;
    }, {});
}
/**
 *
 * @param {string} input
 * @returns {number[][]} moves
 */
export const parseMoves = (input) =>
  Array.from(input.matchAll(/move (\d+) from (\d+) to (\d+)/g), (m) =>
    m.slice(1).map((m) => Number.parseInt(m))
  );

const formatOutput = (crates) =>
  Object.values(crates)
    .flatMap((row) => row.pop())
    .join("");
/**
 *
 * @param {*} inputs
 */
export function partOne(inputs) {
  const [inputCrates, inputMoves] = inputs.split("\n\n");
  const crates = parseCrates(inputCrates);
  const moves = parseMoves(inputMoves);
  for (const [m, f, t] of moves) {
    for (let i = 0; i < m; i++) {
      crates[t].push(crates[f].pop());
    }
  }
  return formatOutput(crates);
}
/**
 *
 * @param {*} inputs
 */
export const partTwo = (inputs) => {
  const [inputCrates, inputMoves] = inputs.split("\n\n");
  const crates = parseCrates(inputCrates);
  const moves = parseMoves(inputMoves);

  moves.forEach(([m, f, t]) => {
    crates[t].push(...crates[f].splice(-m));
  });

  return formatOutput(crates);
};

if (process.env.NODE_ENV === "production") {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const input = fs.readFileSync(
    path.resolve(import.meta.dir, "./input.txt"),
    "utf-8"
  );
  console.log(partOne(input), partTwo(input));
}
