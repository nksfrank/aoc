export function parse(input: string): [number | ".", number][] {
  let id = 0;
  return input
    .split("")
    .map((c, i) => {
      const block = i % 2 === 0 ? id++ : id;
      if (Number(c) === 0) {
        return null;
      }
      return [i % 2 === 0 ? block : ".", Number(c)];
    })
    .filter((c) => c !== null) as [number | ".", number][];
}

export function move(input: string[]): string[] {
  const res = structuredClone(input);
  for (let i = res.length - 1; i >= 0; i--) {
    if (Number.isInteger(Number(res[i]))) {
      for (let j = 0; j < i; j++) {
        if (res[j] === ".") {
          res[j] = res[i];
          res[i] = ".";
          break;
        }
      }
    }
  }
  return res;
}

export function sum(input: string[]): number {
  return input.reduce(
    (acc, c, i) => (input[i] === "." ? acc : acc + i * Number(input[i])),
    0
  );
}
export function partTwo(input: string): number {
  return 0;
}
