import { run } from "../utils";

function check(levels: number[]): boolean {
  const increasing = levels.every((a, i, arr) =>
    i == 0 ? true : a > arr[i - 1]
  );
  const decreasing = levels.every((a, i, arr) =>
    i == 0 ? true : a < arr[i - 1]
  );
  const limits = levels.every((a, i, arr) =>
    i == 0
      ? true
      : 0 < Math.abs(arr[i - 1] - a) && Math.abs(arr[i - 1] - a) <= 3
  );
  return limits && (increasing || decreasing);
}

export const partOne = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((l) => l.split(" ").map((l) => parseInt(l, 10)))
    .reduce((sum, r) => (check(r) ? sum + 1 : sum), 0);

export const partTwo = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((l) => l.split(" ").map((l) => parseInt(l, 10)))
    .reduce(
      (sum, r) =>
        check(r) ||
        r.some((_, i) => check([...r.slice(0, i), ...r.slice(i + 1)]))
          ? sum + 1
          : sum,
      0
    );

run(async () => {
  const input = await Bun.file(
    new URL("two.input.txt", import.meta.url)
  ).text();
  console.log("Day 1 part 1:", partOne(input));
  console.log("Day 1 part 2:", partTwo(input));
});
