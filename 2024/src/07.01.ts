import "../pkg";
export function partOne(input: string): number {
  const data = input
    .split("\n")
    .map((l) => l.split(":"))
    .map(([test, values]) => [Number(test), values.trim().split(" ")] as const);

  let res = 0;
  for (const [test, values] of data) {
    for (const ops of operations(values.length - 1)) {
      if (test === compute(values, ops)) {
        res += test;
        break;
      }
    }
  }
  return res;
}

function compute(values: string[], ops: string[]): number {
  let res = values[0];
  for (let i = 0; i < ops.length; i++) {
    res = eval(res + ops[i] + values[i + 1]);
  }
  return Number(res);
}
const operators = ["+", "*"];
function* operations(n: number): Generator<string[]> {
  if (n === 0) {
    yield [];
  } else {
    for (const op of operators) {
      for (const ops of operations(n - 1)) {
        yield [op, ...ops];
      }
    }
  }
}
