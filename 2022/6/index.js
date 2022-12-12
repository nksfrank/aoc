/**
 *
 * @param {*} inputs
 */
export const partOne = (inputs, span = 4) =>
  [...inputs].findIndex(
    (_, i, arr) => Array.from(new Set(arr.slice(i, i + span))).length === span
  ) + span;

if (process.env.NODE_ENV === "production") {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const input = fs.readFileSync(
    path.resolve(import.meta.dir, "./input.txt"),
    "utf-8"
  );
  console.log(partOne(input), partOne(input, 14));
}
