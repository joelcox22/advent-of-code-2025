#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");

let [ranges, available]: any = input.split("\n\n");

ranges = ranges.split("\n").map((range: string) =>
  range.split("-").map(Number)
);
available = available.split("\n").map(Number);

let fresh = 0;

for (const id of available) {
  const isFresh = ranges.filter(([min, max]: number[]) =>
    id >= min && id <= max
  ).length > 0;
  if (isFresh) fresh++;
}

console.log(fresh);
