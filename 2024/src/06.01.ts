import { run } from "../utils";
import "../pkg";
import { getManhattanDistance, isLookingAt, vec, type Vec } from "../pkg";

const moveToEdge = (position: Vec, direction: Vec, grid: unknown[][]): Vec =>
  direction.x === 0
    ? vec(position.x, direction.y < 0 ? 0 : grid.length + 1)
    : vec(direction.x < 0 ? 0 : grid[0].length + 1, position.y);

const direction = {
  "^": vec(0, -1),
  ">": vec(1, 0),
  v: vec(0, 1),
  "<": vec(-1, 0),
} as const;
const rotation = {
  "^": ">",
  ">": "v",
  v: "<",
  "<": "^",
} as const;
type Dir = keyof typeof direction;

export function partOne(input: string): number {
  const grid = input.split("\n").map((l) => l.split(""));
  const boxes = input.findIndexOfAll("#").map((b) => input.itoc(b));

  let facing: Dir = "^";
  let pos = input.itoc(input.findIndexOf(facing));
  const seen = new Set([pos.toString()]);

  while (
    0 <= pos.y &&
    pos.y < grid.length &&
    0 <= pos.x &&
    pos.x < grid[0].length
  ) {
    const obstacle = boxes
      .filter((b) => isLookingAt(pos, direction[facing], b))
      .reduce(
        (closest, current) =>
          getManhattanDistance(pos, current) <
          getManhattanDistance(pos, closest)
            ? current
            : closest,
        moveToEdge(pos, direction[facing], grid)
      );
    const next = obstacle.sub(direction[facing]);
    pos
      .lerp(next)
      .map((p) => p.toString())
      .forEach((p) => seen.add(p));
    pos = next;
    facing = rotation[facing];
  }
  return seen.size - 1;
}

run(async () => {
  const input = await Bun.file(new URL("06.input.txt", import.meta.url)).text();
  console.log("Day 1 part 1:", partOne(input));
});
