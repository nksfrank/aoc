import { run } from "../utils";

export function partOne(input: string): number {
  const [left, right] = input
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split(" "))
    .map((l) => [parseInt(l.at(0)!), parseInt(l.at(-1)!)])
    .reduce(
      ([l, r], [a, b]) => [
        [a, ...l],
        [b, ...r],
      ],
      [[], []] as [number[], number[]]
    );
  left.sort();
  right.sort();
  return left.reduce((sum, n, i) => sum + Math.abs(n - right[i]), 0);
}

export function partTwo(input: string): number {
  const [left, right] = input
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split(" "))
    .map((l) => [parseInt(l.at(0)!), parseInt(l.at(-1)!)])
    .reduce(
      ([l, r], [a, b]) => [
        [a, ...l],
        [b, ...r],
      ],
      [[], []] as [number[], number[]]
    );

  const parse = new Map<number, number>();
  return left
    .map((l) => {
      if (parse.has(l)) {
        return l * parse.get(l)!;
      }
      const c = right.filter((r) => r === l).length;
      parse.set(l, c);
      return l * c;
    })
    .reduce((a, b) => a + b, 0);
}

run(async () => {
  const input = await Bun.file(
    new URL("one.input.txt", import.meta.url)
  ).text();
  console.log("Day 1 part 1:", partOne(input));
  console.log("Day 1 part 2:", partTwo(input));
});
