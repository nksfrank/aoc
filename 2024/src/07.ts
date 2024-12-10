import "../pkg";
import { assert } from "../pkg";
import { run } from "../utils";

function findTarget(
  target: number,
  values: readonly number[],
  operators: Operators[]
): boolean {
  if (values.length === 0) return false;
  for (const ops of operations(values.length - 1, operators)) {
    if (target === compute(values, ops)) {
      return true;
    }
  }
  return false;
}

const opsfn = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
  "||": (a: number, b: number) => Number(String(a) + String(b)),
} as const;

function compute(values: readonly number[], ops: Operators[]): number {
  if (values.length === 0) return 0;
  assert(ops.length === values.length - 1, "invalid ops length");

  let res = values[0];
  for (let i = 0; i < ops.length; i++) {
    assert(!!values[i + 1], "missing value");
    res = opsfn[ops[i]](res, values[i + 1]);
  }
  return Number(res);
}

type Operators = "+" | "*" | "||";
function* operations(
  n: number,
  operators: Operators[]
): Generator<Operators[]> {
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

export function partOne(input: string): number {
  const data = input
    .split("\n")
    .map((l) => l.split(":"))
    .map(
      ([test, values]) =>
        [Number(test), values.trim().split(" ").map(Number)] as const
    );

  let res = 0;
  for (const [target, values] of data) {
    const found = findTarget(target, values, ["+", "*"]);
    if (found) {
      res += target;
    }
  }

  return res;
}

export function partTwo(input: string): number {
  const data = input
    .split("\n")
    .map((l) => l.split(":"))
    .map(
      ([test, values]) =>
        [Number(test), values.trim().split(" ").map(Number)] as const
    );

  let res = 0;
  for (const [target, values] of data) {
    const found = findTarget(target, values, ["+", "*", "||"]);
    if (found) {
      res += target;
    }
  }

  return res;
}

run(async () => {
  const input = await Bun.file(new URL("07.input.txt", import.meta.url)).text();
  console.log("Day 7 part 1:", partOne(input));
  console.log("Day 7 part 2:", partTwo(input));
});
