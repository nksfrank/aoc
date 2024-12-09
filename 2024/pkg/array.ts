declare global {
  interface Array<T> {
    splitByElement(this: Array<T>, elem: T): [T[], T[]];
  }
}
Array.prototype.splitByElement = function <T>(
  this: Array<T>,
  elem: T
): [T[], T[]] {
  const i = this.findIndex((e) => e === elem);
  return [this.slice(0, i), this.slice(i + 1)];
};

export function zip<T>(...arrays: T[][]): [...T[]][] {
  const minLen = Math.min(...arrays.map((arr) => arr.length));
  const [firstArr, ...restArrs] = arrays;
  return firstArr
    .slice(0, minLen)
    .map((val, i) => [val, ...restArrs.map((arr) => arr[i])]);
}

export function len(arr: { length: number }): number {
  return arr.length;
}

export function* enumerate<T>(arr: T[]): Generator<[number, T]> {
  for (let i = 0; i < arr.length; i++) {
    yield [i, arr[i]];
  }
}
