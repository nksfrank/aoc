import { run } from "../utils";
import "../pkg";
import { getManhattanDistance, isLookingAt, vec, type Vec } from "../pkg";

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
const key = (pos: Vec, facing: Dir) => pos.toString() + facing;

const moveToEdge = (position: Vec, direction: Vec, grid: unknown[][]): Vec =>
  direction.x === 0
    ? vec(position.x, direction.y < 0 ? -2 : grid.length + 1)
    : vec(direction.x < 0 ? -2 : grid[0].length + 1, position.y);

export function partTwo(input: string): number {
  const grid = input.split("\n").map((l) => l.split(""));
  const boxes = input.findIndexOfAll("#").map((b) => input.itoc(b));

  let facing: Dir = "^";
  const start = input.itoc(input.findIndexOf(facing));
  let pos = start;
  const paths = new Map<string, Vec>();
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
    pos.lerp(next).forEach((p) => paths.set(p.toString(), p));
    pos = next;
    facing = rotation[facing];
  }

  let sum = 0;
  const positions = Array.from(paths.values());
  for (let i = 0; i < positions.length; i++) {
    const path = positions.at(i)!;
    if (
      (path.x === start.x && path.y === start.y) ||
      path.y === grid.length ||
      path.x === grid[0].length
    ) {
      continue;
    }

    let facing: Dir = "^";
    let pos = start;

    let seen = new Set();
    while (true) {
      const obstacle = [...boxes, path]
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
      if (
        !(
          0 <= next.y &&
          next.y < grid.length &&
          0 <= next.x &&
          next.x < grid[0].length
        )
      ) {
        break;
      }
      const visited = new Set(pos.lerp(next).map((p) => key(p, facing)));
      if (visited.isSubsetOf(seen)) {
        sum++;
        break;
      }
      seen = seen.union(visited);
      pos = next;
      facing = rotation[facing];
    }
  }

  return sum;
}

run(async () => {
  const input = await Bun.file(new URL("06.input.txt", import.meta.url)).text();
  console.log("Day 1 part 2:", partTwo(input));
});
