import { assert } from "./assert";
import type { Coord } from "./vec";

export class Grid<T> {
  grid: T[][];
  width: number;
  height: number;
  constructor(
    input: string,
    transform: (s: string) => T = (s: string) => s as T
  ) {
    this.grid = input.split("\n").map((l) => l.split("").map(transform));
    this.width = this.grid[0].length;
    this.height = this.grid.length;
  }
  isInbounds(check: Coord): boolean {
    return (
      0 <= check.x &&
      0 <= check.y &&
      check.y < this.grid.length &&
      check.x < this.grid[0].length
    );
  }
  valueAt(check: Coord): T {
    assert(this.isInbounds(check), "out of bounds");
    return this.grid[check.y][check.x];
  }
}
