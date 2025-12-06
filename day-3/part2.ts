#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");

const banks = input.trim().split("\n").map((bank) =>
  bank.split("").map((v) => parseInt(v, 10))
);

const digits = 12;

const joltages = banks.map((bank) => {
  const indexes = new Array(digits).fill(0).map((_, i) => bank.length - i - 1)
    .reverse();
  next: for (let i = 0; i < indexes.length; i++) {
    for (let j = 9; j >= bank[indexes[i]]; j--) {
      for (let k = i === 0 ? 0 : indexes[i - 1] + 1; k < indexes[i]; k++) {
        if (bank[k] === j) {
          indexes[i] = k;
          continue next;
        }
      }
    }
  }
  return parseInt(indexes.map((index) => bank[index]).join(""), 10);
});

const sum = joltages.reduce((acc, v) => {
  acc += v;
  return acc;
}, 0);

console.log("Total maximum joltage:", sum);
