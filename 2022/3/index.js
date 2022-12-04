export const compartments = (rucksack) => [
  rucksack.slice(0, rucksack.length / 2),
  rucksack.slice(-(rucksack.length / 2)),
];
export const toSets = (arr) => arr.map((s) => new Set(s.split("")));
export const pointsMap = Array(26)
  .fill()
  .map((_, i) => String.fromCharCode("a".charCodeAt(0) + i))
  .concat(
    Array(26)
      .fill()
      .map((_, i) => String.fromCharCode("A".charCodeAt(0) + i))
  )
  .reduce((acc, item, index) => ({ ...acc, [item]: index + 1 }), {});
const toPoint = (c) => pointsMap[c];
const sum = (a, b) => a + b;
export const intersects = ([l, ...r]) => {
  for (const e of l) {
    if (r.every((r) => r.has(e))) return e;
  }
};
export const partOne = (inputs) =>
  inputs
    .split("\n")
    .map(compartments)
    .map(toSets)
    .map((sets) => intersects(sets))
    .map(toPoint)
    .reduce(sum);
export const groupBy = (size = 1, acc = [], item, i) => {
  const ch = Math.floor(i / size);
  acc[ch] = [].concat(acc[ch] || [], item);
  return acc;
};
export const partTwo = (inputs, size) =>
  inputs
    .split("\n")
    .reduce(groupBy.bind(null, size), [])
    .map(toSets)
    .map(intersects)
    .map(toPoint)
    .reduce(sum);

(async () => {
  const fs = await import("node:fs");
  const input = fs.readFileSync(
    new URL("./input.txt", import.meta.url),
    "utf-8"
  );
  console.log(partOne(input), partTwo(input, 3));
})();
