#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");

const ranges = input.trim().split(",").map((range) =>
  range.split("-").map((v) => parseInt(v, 10))
);

let sum = 0;

for (const [a, b] of ranges) {
  for (let i = a; i <= b; i++) {
    const match = i.toString().match(/^(.+)\1$/);
    if (match) sum += i;
  }
}

console.log("answer", sum);
