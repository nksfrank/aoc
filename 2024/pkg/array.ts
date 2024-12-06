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
