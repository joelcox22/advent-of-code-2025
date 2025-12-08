#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");

const grid = input.split("\n").map((line) => line.split(""));

let beams = new Set<number>();

const startIndex = grid[0].indexOf("S");

beams.add(startIndex);

let splitCount = 0;

for (let i = 0; i < grid.length; i++) {
  const newBeams = new Set<number>(beams);
  for (const index of beams) {
    if (grid[i][index] === "^") {
      newBeams.delete(index);
      newBeams.add(index - 1);
      newBeams.add(index + 1);
      splitCount++;
    }
  }
  beams = newBeams;
}

console.log(beams);

console.log(splitCount);
