import { assert, enumerate } from "../pkg";

export function partTwo(input: string): number {
  let id = 0;
  let pos = 0;
  const files: Record<number, [number, number]> = {};
  const blanks: [number, number][] = [];
  for (let i = 0; i < input.length; i++) {
    const n = parseInt(input[i], 10);
    if (i % 2 === 0) {
      assert(n !== 0, "unexpected 0 for file");
      files[id] = [pos, n];
      id++;
    } else if (n !== 0) {
      blanks.push([pos, n]);
    }
    pos += n;
  }

  while (id > 0) {
    id--;
    const [pos, size] = files[id];
    for (const [i, [start, length]] of enumerate(blanks)) {
      if (start >= pos) {
        blanks.splice(i, blanks.length - i);
        break;
      } else if (size <= length) {
        files[id] = [start, size];
        if (size === length) {
          blanks.splice(i, 1);
        } else {
          blanks[i] = [start + size, length - size];
        }
        break;
      }
    }
  }

  let sum = 0;
  for (const [id, [pos, size]] of Object.entries(files)) {
    for (let x = pos; x < pos + size; x++) {
      sum += parseInt(id, 10) * x;
    }
  }
  return sum;
}
