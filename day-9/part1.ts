#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? 'sample.txt');

type Point = [x: number, y: number];

const tiles = input.trim().split('\n').map((line) => line.split(',').map(Number)) as Point[];

const rects: [Point, Point, area: number][] = [];

for (let i=0; i<tiles.length; i++) {
  const a = tiles[i];
  for (let j=i+1; j<tiles.length; j++) {
    const b = tiles[j];
    rects.push([ a, b, Math.abs(
      (Math.max(b[1], a[1]) - Math.min(b[1], a[1]) + 1) * 
      (Math.max(b[0], a[0]) - Math.min(a[0], b[0]) + 1)
    )]);
  }
}

console.log(rects);

const sortedRects = rects.sort((a, b) => b[2] - a[2]);

const largest = sortedRects[0];

console.log(largest[2]);