export type Coord = {
  x: number;
  y: number;
};

export type Vec = ReturnType<typeof vec>;
export function vec(x: number, y: number) {
  return {
    x,
    y,
    add({ x: ox, y: oy }: Coord) {
      return vec(x + ox, y + oy);
    },
    sub({ x: ox, y: oy }: Coord) {
      return vec(x - ox, y - oy);
    },
    scale(factor: number) {
      return vec(x * factor, y * factor);
    },
    toString() {
      return [this.x, this.y].join();
    },
  };
}

/**
 *
 * @param self position
 * @param direction unit vector
 * @param obstacle position
 * @returns
 */
export function isLookingAt(self: Vec, direction: Vec, obstacle: Vec): boolean {
  const d = obstacle.sub(self);
  if (direction.x === 0) {
    return d.x === 0 && Math.sign(d.y) === Math.sign(direction.y);
  }
  if (direction.y === 0) {
    return d.y === 0 && Math.sign(d.x) === Math.sign(direction.x);
  }

  return false;
}

export const getManhattanDistance = (a: Vec, b: Vec): number =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
