import { run } from "../utils";
import { partOne } from "./07.01";
import { partTwo } from "./07.02";

run(async () => {
  const input = await Bun.file(new URL("07.input.txt", import.meta.url)).text();
  console.log("Day 7 part 1:", partOne(input));
  console.log("Day 7 part 2:", partTwo(input));
});
