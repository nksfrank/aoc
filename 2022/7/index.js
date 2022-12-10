/**
 *
 * @param {*} inputs
 */
export const partOne = (inputs) => {};
/**
 *
 * @param {*} inputs
 */
export const partTwo = (inputs) => {};

if (process.env.NODE_ENV === "production") {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const input = fs.readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );
  console.log(partOne(input), partTwo(input));
}
