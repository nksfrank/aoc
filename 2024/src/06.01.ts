import { run } from "../utils";
import "../pkg";
import { getManhattanDistance, isLookingAt, vec, type Vec } from "../pkg";

const moveToEdge = (position: Vec, direction: Vec, grid: unknown[][]): Vec =>
  direction.x === 0
    ? vec(position.x, direction.y < 0 ? 0 : grid.length + 1)
    : vec(direction.x < 0 ? 0 : grid[0].length + 1, position.y);

const makeMover = (pos: Vec) => ({
  facing: "^",
  facings: {
    "^": ">",
    ">": "v",
    v: "<",
    "<": "^",
  } as const,
  position: pos,
  move(next: Vec) {
    this.position = next;
  },
  rotate() {
    this.facing = this.facings[this.facing]!;
  },
  directions: {
    "^": vec(0, -1),
    ">": vec(1, 0),
    v: vec(0, 1),
    "<": vec(-1, 0),
  },
  direction() {
    return this.directions[this.facing];
  },
});

function* lerp(a: Vec, b: Vec): Generator<Vec, void, unknown> {
  if (a.y === b.y) {
    const start = Math.min(a.x, b.x);
    const end = Math.max(a.x, b.x);
    for (let x = start; x <= end; x++) {
      yield vec(x, a.y);
    }
  } else if (a.x === b.x) {
    const start = Math.min(a.y, b.y);
    const end = Math.max(a.y, b.y);
    for (let y = start; y <= end; y++) {
      yield vec(a.x, y);
    }
  }
}
export function partOne(input: string): number {
  const grid = input.split("\n").map((l) => l.split(""));
  const boxes = input.findIndexOfAll("#").map((b) => input.itoc(b));

  const mover = makeMover(input.itoc(input.findIndexOf("^")));
  const seen = new Set([mover.position.toString()]);

  while (
    0 <= mover.position.y &&
    mover.position.y < grid.length &&
    0 <= mover.position.x &&
    mover.position.x < grid[0].length
  ) {
    const obstacle = boxes
      .filter((b) => isLookingAt(mover.position, mover.direction(), b))
      .reduce(
        (closest, current) =>
          getManhattanDistance(mover.position, current) <
          getManhattanDistance(mover.position, closest)
            ? current
            : closest,
        moveToEdge(mover.position, mover.direction(), grid)
      );
    const next = obstacle.sub(mover.direction());
    for (const point of lerp(mover.position, next)) {
      seen.add(point.toString());
    }
    mover.position = next;
    mover.rotate();
  }
  return seen.size - 1;
}

run(async () => {
  const input = await Bun.file(new URL("06.input.txt", import.meta.url)).text();
  console.log("Day 1 part 1:", partOne(input));
});
