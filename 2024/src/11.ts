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
  const cache = input
    .split(" ")
    .map((s) => Number(s))
    .reduce((cache, num) => {
      const count = cache.get(num) ?? 0;
      cache.set(num, count + 1);
      return cache;
    }, new Map<number, number>());

  const res = Array.from({ length: blinks }).reduce(
    (cache: Map<number, number>) =>
      Array.from(cache.entries()).reduce((new_cache, [num, count]) => {
        rules(num).forEach((num) => {
          const new_count = new_cache.get(num) ?? 0;
          new_cache.set(num, new_count + count);
        });
        return new_cache;
      }, new Map<number, number>()),
    cache
  );
  return Array.from(res.values()).reduce((sum, num) => sum + num, 0);
}

run(async () => {
  const input = await Bun.file(new URL("11.input.txt", import.meta.url)).text();
  console.log("Day 11 part 1:", partOne(input, 25));
  console.log("Day 11 part 2:", partTwo(input, 75));
});
