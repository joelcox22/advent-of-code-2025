#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");
const lines = input.split("\n").map((line) => line + " ");

let total = 0;
let numbers: number[] = [];
let operator = "";

for (let i = 0; i <= lines[0].length; i++) {
  const values = lines.map((line) => line.charAt(i));
  operator = values[values.length - 1] !== " "
    ? values[values.length - 1]
    : operator;
  const num = values.slice(0, -1).join("");

  if (num.trim() === "") {
    const equation = numbers.join(operator);
    numbers = [];
    if (equation.trim()) total += eval(equation);
  } else {
    numbers.push(parseInt(num, 10));
  }
}

console.log(total);
