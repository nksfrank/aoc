import { assert } from "./assert";
import { vec, type Vec } from "./vec";

declare global {
  interface String {
    itoc(this: string, index: number): Vec;
    ctoi(this: string, v: { x: number; y: number }): number;
    findIndexOf(this: string, char: string): number;
    findIndexOfAll(
      this: string,
      searchString: string,
      caseSensitive?: boolean
    ): number[];
    replaceAt(this: string, index: number, char: string): string;
    atIndex(this: string, index: number): string;
  }
}

Object.defineProperties(String.prototype, {
  itoc: {
    value(this: string, index: number): Vec {
      const len = this.indexOf("\n");
      const x = Math.floor(index % len);
      const y = Math.floor(index / len);
      return vec(x, y);
    },
  },
  ctoi: {
    value(this: string, v: { x: number; y: number }): number {
      return v.y * this.split("\n").length + v.x;
    },
  },
  findIndexOf: {
    value(this: string, char: string): number {
      return this.replaceAll("\n", "").indexOf(char);
    },
  },
  findIndexOfAll: {
    value(this: string, searchString: string, caseSensitive = false): number[] {
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
    },
  },
  replaceAt: {
    value(this: string, index: number, replacement: string) {
      return (
        this.substring(0, index) +
        replacement +
        this.substring(index + replacement.length)
      );
    },
  },
  atIndex: {
    value(this: string, index: number) {
      const lines = this.replaceAll("\n", "");
      assert(index < lines.length);
      return lines.at(index)!;
    },
  },
});
