#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? 'sample.txt');

const actions = input.trim().split('\n').map((line: string) => {
  const v = parseInt(line.substring(1), 10);
  return line.charAt(0) === 'L' ? -v : v;
});

let value = 50;
const max = 100;

// console.log(`The dial starts by pointing at ${value}.`);

let counter = 0;

for (const delta of actions) {
  // value = (value + delta) % max;
  // while (value < 0) value += max;
  // console.log(`The dial is rotated ${delta} to point at ${value}.`);
  // if (value === 0) counter++;
  for (let i=0; i<Math.abs(delta); i++) {
    value = (value + (delta < 0 ? -1 : 1)) % max;
    if (value < 0) value += max;
    if (value === 0) counter++;
  }
  // console.log(`The dial is rotated ${delta} to point at ${value}.`);
}

console.log(`\nThe password is ${counter}`);
