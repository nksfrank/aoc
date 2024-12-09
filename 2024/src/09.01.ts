export function parse(input: string): string[] {
  let id = 0;
  return input.split("").flatMap((c, i) => {
    const block = (i % 2 === 0 ? id++ : id).toString();
    return Array.from({ length: Number(c) }, () => (i % 2 === 0 ? block : "."));
  });
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
export function partOne(input: string): number {
  return sum(move(parse(input)));
}
