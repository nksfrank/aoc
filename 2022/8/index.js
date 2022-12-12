import { pipe } from "../utils";

export const parseInput = (inputs) =>
  inputs.split("\n").map((row) => row.split("").map(Number));
export const rotate = (matrix) =>
  matrix.map((_, index) => matrix.map((row) => row[index]).reverse());
export const rotateReverse = (matrix) =>
  matrix.map((_, index) => matrix.map((row) => row[row.length - 1 - index]));

const rotate90 = rotate;
const rotate180 = pipe(rotate, rotate);
const rotate270 = pipe(rotate, rotate, rotate);
const rotateRight90 = rotateReverse;
const rotateRight180 = pipe(rotateReverse, rotateReverse);
const rotateRight270 = pipe(rotateReverse, rotateReverse, rotateReverse);

export const isVisible = (prev, next) => prev < next;
export const count = (matrix) => {
  const map = Array.from({ length: matrix.length }, () =>
    Array.from({ length: matrix[0].length }, () => undefined)
  );
  matrix.forEach((row, x) => {
    row.reduce((highest, next, y) => {
      const visible = isVisible(highest, next);
      if (visible) {
        map[x][y] = true;
        return next;
      }
      return highest;
    }, -1);
  });
  return map;
};

export const partOne = (inputs) => {
  const matrix = parseInput(inputs);
  let [c, c90, c180, c270] = [
    matrix,
    rotate90(matrix),
    rotate180(matrix),
    rotate270(matrix),
  ].map(count);
  const [f, f90, f180, f270] = [
    c,
    rotateRight90(c90),
    rotateRight180(c180),
    rotateRight270(c270),
  ].map((c) => c.flat());
  return f.map((_, i) => f[i] || f90[i] || f180[i] || f270[i]).filter(Boolean)
    .length;
};

export const partTwo = (inputs) => {};

if (process.env.NODE_ENV === "production") {
  const fs = await import("node:fs");
  const input = fs.readFileSync(import.meta.dir + "/input.txt", "utf-8");
  console.log(partOne(input));
}
