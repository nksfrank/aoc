const conditions = {
  ["A X"]: 0,
  ["A Y"]: 1,
  ["A Z"]: -1,
  ["B X"]: -1,
  ["B Y"]: 0,
  ["B Z"]: 1,
  ["C X"]: 1,
  ["C Y"]: -1,
  ["C Z"]: 0,
};
const roundPoint = {
  [-1]: 0,
  [0]: 3,
  [1]: 6,
};
const points = {
  ["A X"]: 1,
  ["A Y"]: 2,
  ["A Z"]: 3,
  ["B X"]: 1,
  ["B Y"]: 2,
  ["B Z"]: 3,
  ["C X"]: 1,
  ["C Y"]: 2,
  ["C Z"]: 3,
};
const moveSet = {
  ["A X"]: "A Z",
  ["A Y"]: "A X",
  ["A Z"]: "A Y",
  ["B X"]: "B X",
  ["B Y"]: "B Y",
  ["B Z"]: "B Z",
  ["C X"]: "C Y",
  ["C Y"]: "C Z",
  ["C Z"]: "C X",
};

export const partOne = (inputs) =>
  inputs
    .map((l) => roundPoint[conditions[l]] + points[l])
    .reduce((a, b) => a + b);
export const partTwo = (inputs) => partOne(inputs.map((l) => moveSet[l]));

(async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const input = fs
    .readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8")
    .split("\n");
  console.log(partOne(input), partTwo(input));
})();