import { run } from "../utils";
import { partOne } from "./09.01";
import { partTwo } from "./09.02";

run(async () => {
  const input = await Bun.file(new URL("09.input.txt", import.meta.url)).text();
  console.log("Day 9 part 1:", partOne(input));
  console.log("Day 9 part 2:", partTwo(input));
});
