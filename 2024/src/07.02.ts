import "../pkg";
import { run } from "../utils";
import data from "./07.input.txt" with { type: "file" };

export function partTwo(input: string): number {
  const data = input
    .split("\n")
    .map((l) => l.split(":"))
    .map(([test, values]) => [Number(test), values.trim().split(" ")] as const);

  const rerun: [number, string[]][] = [];
  let res = 0;
  let idx = data.length;
  for (const [test, values] of data) {
    let found = false;
    for (const ops of operations(values.length - 1, ["+", "*"])) {
      if (test === compute(values, ops)) {
        res += test;
        console.log("leftover", --idx);
        found = true;
        break;
      }
    }
    if (found) continue;
    rerun.push([test, values]);
  }
  console.log("concatenating", rerun.length, "tests");
  let rerunRes = 0;
  idx = rerun.length;
  for (const [test, values] of rerun) {
    for (const ops of operations(values.length - 1, ["+", "*", "||"])) {
      if (test === compute(values, ops)) {
        rerunRes += test;
        console.log("leftover", --idx);
        break;
      }
    }
  }

  console.log(res, rerunRes, res + rerunRes);
  return res + rerunRes;
}

function compute(values: string[], ops: string[]): number {
  let res = values[0];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "||") {
      res = eval(`${res}${values[i + 1]}`);
      continue;
    }
    res = eval(res + ops[i] + values[i + 1]);
  }
  return Number(res);
}
function* operations(
  n: number,
  operators: ("+" | "*" | "||")[]
): Generator<string[]> {
  if (n === 0) {
    yield [];
  } else {
    for (const op of operators) {
      for (const ops of operations(n - 1, operators)) {
        yield [op, ...ops];
      }
    }
  }
}

run(async () => {
  const input = await Bun.file(data).text();
  console.log("Day 7 part 2:", partTwo(input));
});
