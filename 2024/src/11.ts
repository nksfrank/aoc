import "../pkg";
import { run } from "../utils";

const rules = (stone: number): number[] => {
  if (stone === 0) {
    return [1];
  }
  const n = (Math.log(stone) * Math.LOG10E + 1) | 0;
  if (n % 2 === 0) {
    return [
      Math.floor(stone / Math.pow(10, n / 2)),
      Math.floor(stone % Math.pow(10, n / 2)),
    ];
  }
  return [stone * 2024];
};

export function partOne(input: string, blinks: number): number {
  let stones = input.split(" ").map((s) => Number(s));
  while (blinks--) {
    stones = stones.flatMap(rules);
  }
  return stones.length;
}

export function partTwo(input: string, blinks: number): number {
  return Array.range(0, blinks)
    .reduce(
      (cache) =>
        cache
          .fromEntries()
          .reduce(
            (new_cache, [num, count]) =>
              rules(num).reduce(
                (new_cache, num) =>
                  new_cache.upsert(num, (num) => (num ?? 0) + count),
                new_cache
              ),
            new Map<number, number>()
          ),
      input
        .split(" ")
        .map((s) => Number(s))
        .reduce(
          (cache, num) => cache.upsert(num, (num) => (num ?? 0) + 1),
          new Map<number, number>()
        )
    )
    .fromValues()
    .reduce((sum, num) => sum + num, 0);
}

run(async () => {
  const input = await Bun.file(new URL("11.input.txt", import.meta.url)).text();
  console.log("Day 11 part 1:", partOne(input, 25));
  console.log("Day 11 part 2:", partTwo(input, 75));
});
