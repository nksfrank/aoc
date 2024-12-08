declare global {
  interface Math {
    lerp: (a: number, b: number, step: number) => number;
    clamp: (val: number, min: number, max: number) => number;
  }
}

Object.defineProperties(Math, {
  lerp: {
    value(a: number, b: number, step: number): number {
      return a + step * (b - a);
    },
  },
  clamp: {
    value(val: number, min: number, max: number): number {
      return Math.max(Math.min(val, max), min);
    },
  },
});
