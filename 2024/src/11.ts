import { run } from "../utils";
const memoCache = new Map<number, number[]>();

const rules = (stone: number): number[] => {
  // Check if result is in cache
  if (memoCache.has(stone)) {
    return memoCache.get(stone)!;
  }

  let result: number[];
  if (stone === 0) {
    result = [1];
  } else {
    const n = String(stone);
    if (n.length % 2 === 0) {
      result = [
        Number(n.substring(0, n.length / 2)),
        Number(n.substring(n.length / 2)),
      ];
    } else {
      result = [stone * 2024];
    }
  }

  // Store result in cache
  memoCache.set(stone, result);
  return result;
};
export function partOne(input: string): number {
  let stones = input.split(" ").map((s) => Number(s));
  let blinks = 25;
  while (blinks--) {
    stones = stones.flatMap(rules);
  }
  console.log(stones);
  return stones.length;
}

run(async () => {
  const input = await Bun.file(new URL("11.input.txt", import.meta.url)).text();
  console.log("Day 11 part 1:", partOne(input));
});
