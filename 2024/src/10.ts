import "../pkg";
import { vec, type Vec } from "../pkg";
import { Grid } from "../pkg/grid";
import { run } from "../utils";

const matrix = [vec.UP, vec.RIGHT, vec.DOWN, vec.LEFT];

function walk(input: string, start: Vec): Map<string, number> {
  const grid = new Grid(input, Number);
  const found = new Map<string, number>();
  const w: [Vec, number][] = [[start, grid.valueAt(start)]];
  while (w.length) {
    const [pos, current] = w.pop()!;
    if (grid.valueAt(pos) === 9) {
      const seen = found.get(pos.toString());
      if (!seen) {
        found.set(pos.toString(), 1);
      } else {
        found.set(pos.toString(), seen + 1);
      }
      continue;
    }
    matrix.forEach((n) => {
      const d = pos.add(n);
      if (grid.isInbounds(d) && grid.valueAt(d) === current + 1) {
        w.push([d, current + 1]);
      }
    });
  }
  return found;
}

export function partOne(input: string): number {
  const trailheads = input.findIndexOfAll("0").map((i) => input.itoc(i));
  let res = 0;
  for (const trailhead of trailheads) {
    res += walk(input, trailhead).size;
  }
  return res;
}

export function partTwo(input: string): number {
  const trailheads = input.findIndexOfAll("0").map((i) => input.itoc(i));
  let res = 0;
  for (const trailhead of trailheads) {
    res += Array.from(walk(input, trailhead).values()).reduce(
      (a, b) => a + b,
      0
    );
  }
  return res;
}

run(async () => {
  const input = await Bun.file(new URL("10.input.txt", import.meta.url)).text();
  console.log("Day 10 part 1:", partOne(input));
  console.log("Day 10 part 2:", partTwo(input));
});
