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
    lerp(b: Coord) {
      return lerp(this, b);
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

export function lerp(a: Coord, b: Coord): Vec[] {
  const res = [];
  if (a.y === b.y) {
    const start = Math.min(a.x, b.x);
    const end = Math.max(a.x, b.x);
    for (let x = start; x <= end; x++) {
      res.push(vec(x, a.y));
    }
  } else if (a.x === b.x) {
    const start = Math.min(a.y, b.y);
    const end = Math.max(a.y, b.y);
    for (let y = start; y <= end; y++) {
      res.push(vec(a.x, y));
    }
  }
  return res;
}
