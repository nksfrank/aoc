import { run } from "../utils";

type Cell = {
  c: string;
  y: number;
  x: number;
};
type CellDir = Cell & { dy: number; dx: number };
const isDefined = <T>(x: T | undefined): x is T => x !== undefined;

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
  const ctoi = (y: number, x: number) => y * text.length + x;
  const isInBounds = (y: number, x: number) =>
    0 <= y && y < text.length && 0 <= x && x < text[0].length;

  return text
    .flatMap((line, y) => {
      return line.map((c, x) => {
        if (c === "X") {
          return { y, x, c };
        }
      });
    })
    .filter(isDefined)
    .flatMap((cell) => {
      const chars = new Map<number, CellDir>();
      matrix.forEach(([dy, dx]) => {
        const c = "M";
        const y = cell.y + dy;
        const x = cell.x + dx;
        const i = ctoi(y, x);
        if (!isInBounds(y, x) || text[y][x] !== c || chars.has(i)) {
          return;
        }
        chars.set(i, {
          y,
          x,
          c: c,
          dy,
          dx,
        });
      });
      return [...chars.values()];
    })
    .map((cd) => {
      const c = "A";
      const y = cd.y + cd.dy;
      const x = cd.x + cd.dx;
      if (!isInBounds(y, x) || text[y][x] !== c) {
        return;
      }
      return { ...cd, c, y, x };
    })
    .filter(isDefined)
    .map((cd) => {
      const c = "S";
      const y = cd.y + cd.dy;
      const x = cd.x + cd.dx;
      if (!isInBounds(y, x) || text[y][x] !== c) {
        return;
      }
      return { ...cd, c: "S", y, x };
    })
    .filter(isDefined).length;
}
export function partTwo(input: string): number {
  const matrix: number[][] = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  const text = input
    .trim()
    .split("\n")
    .map((l) => l.split(""));
  const ctoi = (y: number, x: number) => y * text.length + x;
  const isInBounds = (y: number, x: number) =>
    0 <= y && y < text.length && 0 <= x && x < text[0].length;

  const w = text
    .flatMap((line, y) => {
      return line.map((c, x) => {
        if (c === "M") {
          return { y, x, c };
        }
      });
    })
    .filter(isDefined)
    .flatMap((cell) => {
      const chars = new Map<number, CellDir & { p: number }>();
      matrix.forEach(([dy, dx]) => {
        const c = "A";
        const y = cell.y + dy;
        const x = cell.x + dx;
        const i = ctoi(y, x);
        if (!isInBounds(y, x) || text[y][x] !== c || chars.has(i)) {
          return;
        }
        chars.set(i, {
          y,
          x,
          c: c,
          dy,
          dx,
          p: i,
        });
      });
      return [...chars.values()];
    })
    .map((cd) => {
      const c = "S";
      const y = cd.y + cd.dy;
      const x = cd.x + cd.dx;
      if (!isInBounds(y, x) || text[y][x] !== c) {
        return;
      }
      return { ...cd, c, y, x };
    })
    .filter(isDefined)
    .reduce(
      (s, c) => {
        if (s[c.p] === undefined) {
          s[c.p] = 0;
        }
        s[c.p]++;
        return s;
      },
      {} as Record<number, number>
    );

  return Object.values(w).filter((l) => l == 2).length;
}

run(async () => {
  const input = await Bun.file(new URL("04.input.txt", import.meta.url)).text();
  console.log("Day 1 part 1:", partOne(input));
  console.log("Day 1 part 2:", partTwo(input));
});
