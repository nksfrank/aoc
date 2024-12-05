import { run } from "../utils";

export function partOne(input: string): number {
  const matrix: number[][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const text = input
    .trim()
    .split("\n")
    .map((l) => l.split(""));

  return text
    .flatMap((l, y) =>
      l.flatMap((c, x) =>
        c !== "X"
          ? [0]
          : matrix.map(([dy, dx]) =>
              !(
                0 <= y + 3 * dy &&
                y + 3 * dy < text.length &&
                0 <= x + 3 * dx &&
                x + 3 * dx < text[0].length
              ) ||
              !(
                text[y + dy][x + dx] === "M" &&
                text[y + 2 * dy][x + 2 * dx] === "A" &&
                text[y + 3 * dy][x + 3 * dx] === "S"
              )
                ? 0
                : 1
            )
      )
    )
    .reduce((sum, n) => sum + n, 0);
}

export function partTwo(input: string): number {
  const matrix: number[][] = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];
  const text = input
    .trim()
    .split("\n")
    .map((l) => l.split(""));

  let count = 0;
  for (let y = 1; y < text.length; y++) {
    for (let x = 1; x < text[y].length; x++) {
      const c = text[y][x];
      if (c !== "A") continue;
      const corners = matrix.map(([dy, dx]) => text[y - dy]?.[x - dx]).join("");
      if (["MMSS", "MSSM", "SSMM", "SMMS"].some((c) => c === corners)) {
        count++;
      }
    }
  }
  return count;
}

run(async () => {
  const input = await Bun.file(new URL("04.input.txt", import.meta.url)).text();
  console.log("Day 1 part 1:", partOne(input));
  console.log("Day 1 part 2:", partTwo(input));
});
