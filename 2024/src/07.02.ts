import "../pkg";
import { assert } from "../pkg";

export function partTwo(input: string): number {
  const data = input
    .split("\n")
    .map((l) => l.split(":"))
    .map(([test, values]) => [Number(test), values.trim().split(" ")] as const);

  const rerun: [number, readonly string[]][] = [];
  let res = 0;
  for (const [test, values] of data) {
    let found = false;
    for (const ops of operations(values.length - 1, ["+", "*"])) {
      if (test === compute(values, ops)) {
        res += test;
        found = true;
        break;
      }
    }
    if (found) continue;
    rerun.push([test, values]);
  }
  for (const [test, values] of rerun) {
    for (const ops of operations(values.length - 1, ["+", "*", "||"])) {
      if (test === compute(values, ops)) {
        res += test;
        break;
      }
    }
  }

  return res;
}

function compute(values: readonly string[], ops: string[]): number {
  if (values.length === 0) return 0;
  assert(ops.length === values.length - 1, "invalid ops length");

  let res = values[0];
  for (let i = 0; i < ops.length; i++) {
    assert(!!values[i + 1], "missing value");

    if (ops[i] === "||") {
      res = String(res) + String(values[i + 1]);
    } else {
      res = eval(res + ops[i] + values[i + 1]);
    }
  }
  return Number(res);
}
function* operations(
  n: number,
  operators: ("+" | "*" | "||")[]
): Generator<string[]> {
  if (n === 0) {
    yield [];
    return;
  }
  for (const op of operators) {
    for (const ops of operations(n - 1, operators)) {
      yield [op, ...ops];
    }
  }
}
