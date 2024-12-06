import { run } from "../utils";
import "../pkg";

export function partOne(input: string): number {
  const [indexes, updates] = input.split("\n").splitByElement("");
  const rules = indexes.reduce((set, curr) => {
    const [before, page] = curr.split("|").map(Number);
    if (!set.has(before)) {
      set.set(before, new Set());
    }
    set.get(before)!.add(page);

    return set;
  }, new Map<number, Set<number>>());
  const manuals = updates.map((update) => update.split(",").map(Number));
  return manuals.reduce(
    (sum, pages) =>
      pages.every(
        (p, i, array) =>
          rules.get(p)?.isDisjointFrom(new Set(array.slice(0, i))) ?? true
      )
        ? sum + (pages?.at(pages.length / 2) ?? 0)
        : sum,
    0
  );
}
export function partTwo(input: string): number {
  const [indexes, updates] = input.split("\n").splitByElement("");
  const rules = indexes.reduce((set, curr) => {
    const [before, page] = curr.split("|").map(Number);
    if (!set.has(before)) {
      set.set(before, new Set());
    }
    set.get(before)!.add(page);

    return set;
  }, new Map<number, Set<number>>());
  const manuals = updates.map((update) => update.split(",").map(Number));
  return manuals
    .filter(
      (pages) =>
        !pages.every(
          (p, i, array) =>
            rules.get(p)?.isDisjointFrom(new Set(array.slice(0, i))) ?? true
        )
    )
    .reduce(
      (sum, pages) =>
        sum +
        pages
          .sort((a, b) => {
            const aa = rules.get(a);
            if (!aa) return 0;
            if (!aa) return 1;
            return aa?.isDisjointFrom(new Set([b])) ? 1 : -1;
          })
          .at(pages.length / 2)!,
      0
    );
}

run(async () => {
  const input = await Bun.file(new URL("05.input.txt", import.meta.url)).text();
  console.log("Day 1 part 1:", partOne(input));
  console.log("Day 1 part 2:", partTwo(input));
});
