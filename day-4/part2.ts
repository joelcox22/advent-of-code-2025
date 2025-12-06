#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");

const grid = input.trim().split("\n").map((line) => line.trim().split(""));

const deltas = [
  [-1, -1], // up left
  [0, -1], // up
  [1, -1], // up right
  [-1, 0], // left
  [1, 0], // right
  [-1, 1], // down left
  [0, 1], // down
  [1, 1], // down right
];

const h = grid.length;
const w = grid[0].length;

let removed = 0;

do {
  let counter = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (grid[y][x] !== "@") continue;
      let nearby = 0;
      for (let [dx, dy] of deltas) {
        if (["@", "X"].includes((grid[y + dy] ?? [])[x + dx] ?? ".")) {
          nearby++;
        }
      }
      if (nearby < 4) {
        counter++;
        grid[y][x] = "X";
      }
    }
  }

  console.log(grid.map((line) => line.join("")).join("\n"));

  if (counter === 0) break; // no more to remove

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (grid[y][x] === "X") {
        grid[y][x] = "x";
        removed++;
      }
    }
  }
} while (true);

console.log("Answer", removed);
