#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");
const data = input.split("\n").map((line) => line.trim().split(/\s+/g));

let total = 0;
for (let i = 0; i < data[0].length; i++) {
  const numbers = data.slice(0, -1).map((row) => Number(row[i]));
  const equation = numbers.join(" " + data[data.length - 1][i] + " ");
  total += eval(equation);
}

console.log(total);
