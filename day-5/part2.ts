#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? 'sample.txt');

let ranges: number[][] = input.split('\n\n')[0].split('\n').map((range: string) => range.split('-').map(Number));

ranges = ranges.sort((a, b) => a[0] - b[0]);

const merged = [];

for (let i=0; i<ranges.length; i++) {
  const min = ranges[i][0];
  let max = ranges[i][1];
  while (i < ranges.length - 1 && max >= ranges[i+1][0]) {
    max = Math.max(max, ranges[i+1][1]);
    i++;
  }
  merged.push([min, max]);
}

let sum = 0;
for (const [min, max] of merged) {
  sum += max - min + 1;
}

console.log(sum);
