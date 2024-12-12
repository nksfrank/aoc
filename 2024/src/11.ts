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
