#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");

const grid = input.split("\n").map((line) => line.split(""));

const startIndex = grid[0].indexOf("S");

const cache = new Map<string, number>();

function beam(x: number, y: number): number {
  const id = `${x},${y}`;
  if (cache.has(id)) {
    return cache.get(id)!;
  }
  let result;
  if (y >= grid.length) {
    result = 1;
  } else if (grid[y][x] === "^") {
    result = beam(x - 1, y) + beam(x + 1, y);
  } else {
    result = beam(x, y + 1);
  }
  cache.set(id, result);
  return result;
}

console.log(beam(startIndex, 0));
