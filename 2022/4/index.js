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


(async () => {
  const fs = await import("node:fs");
  const input = fs.readFileSync(
    new URL("./input.txt", import.meta.url),
    "utf-8"
  );
  console.log(partOne(input), partTwo(input));
})();
