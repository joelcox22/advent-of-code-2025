#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");

const banks = input.trim().split("\n").map((bank) =>
  bank.split("").map((v) => parseInt(v, 10))
);

function find(bank: number[], repeat = 0): number {
  console.log("checking bank", bank.join(""));
  let max = 0;
  for (let i = 9; i >= 0; i--) {
    const index = bank.indexOf(i);
    if (index >= 0) {
      console.log("found", i, "at index", index);
      const value = bank[index];
      if (repeat > 0 && index < bank.length - 1) {
        const newBank = bank.slice(index + 1);
        max = Math.max(
          max,
          parseInt(value.toString() + find(newBank, repeat - 1), 10),
        );
      } else {
        max = Math.max(max, value);
      }
    }
  }
  return max;
}

const joltages = banks.map((bank) => {
  return find(bank, 1);
});

console.log("joltages:", joltages);

const sum = joltages.reduce((acc, v) => {
  acc += v;
  return acc;
}, 0);

console.log("Total maximum joltage:", sum);
