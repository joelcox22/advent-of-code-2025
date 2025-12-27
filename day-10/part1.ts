#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? 'sample.txt');

interface Machine {
  desiredLights: number;
  buttons: number[];
  joltages: number[];
}

const machines: Machine[] = input.split('\n').map((line) => {
  const buttons = line.split(' ');
  const desiredLights = buttons.splice(0, 1);
  const joltages = buttons.splice(-1, 1);
  return {
    desiredLights: desiredLights[0].substring(1, desiredLights[0].length - 1).split('').reduce((acc, c, i) => {
      return acc | ((c === '#' ? 1 : 0) << (desiredLights[0].length - 3 - i));
    }, 0),
    buttons: buttons.map((button) => button.substring(1, button.length - 1).split(',').map(Number).reduce((acc, v) => {
      return acc | (1 << (desiredLights[0].length - 3 - v));
    }, 0)).sort((a, b) => a - b),
    joltages: joltages.map((joltage) => joltage.substring(1, joltage.length - 1).split(',').map(Number))[0],
  };
});

function fewestPresses(machine: Machine): number[] {
  const checks: number[][] = [[]];
  do {
    const check = checks.splice(0, 1)[0];
    let value = 0;
    for (const v of check) value ^= v;
    for (const b of machine.buttons) {
      if (machine.desiredLights === (value ^ b)) {
        return [...check, b];
      }
      checks.push([...check, b]);
    }
    // console.log('checks', checks);
  } while (true);
}

const presses = machines.map((machine, i) => {
  console.log('starting machine', i+1, {
    desiredLights: machine.desiredLights.toString(2),
    buttons: machine.buttons.map((button) => button.toString(2).padStart(12, '0')),
  });
  const result = fewestPresses(machine);
  console.log(result);
  return result;
});

console.log(presses.reduce((acc, presses) => {
  return acc + presses.length;
}, 0));
