import { assert } from "./assert";
import { vec, type Vec } from "./vec";

declare global {
  interface String {
    itoc: typeof itoc;
    ctoi: typeof ctoi;
    findIndexOf: typeof findIndexOf;
    findIndexOfAll: typeof findIndexOfAll;
  }
}

Object.assign(String.prototype, {
  itoc,
  ctoi,
  findIndexOf,
  findIndexOfAll,
});

function itoc(this: string, index: number): Vec {
  const len = this.indexOf("\n");
  const x = Math.floor(index % len);
  const y = Math.floor(index / len);
  return vec(x, y);
}

function ctoi(this: string, v: Vec): number {
  return v.y * this.split("\n").length + v.x;
}

function findIndexOf(this: string, char: string): number {
  return this.replaceAll("\n", "").indexOf(char);
}

function findIndexOfAll(
  this: string,
  searchString: string,
  caseSensitive = false
): number[] {
  assert(0 < searchString.length, "findIndexOfAll: searchString is empty");
  let input = this.replaceAll("\n", "");
  if (!caseSensitive) {
    input = input.toLowerCase();
    searchString = searchString.toLowerCase();
  }
  let index = 0;
  let position = 0;
  const matches = [];
  while ((index = input.indexOf(searchString, position)) > -1) {
    matches.push(index);
    position = index + searchString.length;
  }
  return matches;
}

function replaceAt(this: string, index: number, char: string) {
  return this.substring(index) + char + this.substring(index + char.length);
}
