#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? "sample.txt");

type Box = {
  id: number;
  x: number;
  y: number;
  z: number;
  circuit: Set<number>;
};

const circuits = new Set<Set<number>>();

const boxes = input.split("\n").reduce((acc, line, id) => {
  const [x, y, z] = line.split(",").map(Number);
  const circuit = new Set<number>();
  circuits.add(circuit);
  circuit.add(id);
  acc.set(id, { id, x, y, z, circuit });
  return acc;
}, new Map<number, Box>());

const distances = new Map<number, [number, number][]>();

for (let i = 0; i < boxes.size; i++) {
  for (let j = i + 1; j < boxes.size; j++) {
    const box1 = boxes.get(i)!;
    const box2 = boxes.get(j)!;
    const distance = Math.sqrt(
      Math.pow(box2.x - box1.x, 2) +
        Math.pow(box2.y - box1.y, 2) +
        Math.pow(box2.z - box1.z, 2),
    );
    if (!distances.has(distance)) distances.set(distance, []);
    distances.get(distance)?.push([i, j]);
  }
}

const distanceKeys = distances.keys().toArray().sort((a, b) => a - b);

for (let i = 0; circuits.size > 1; i++) {
  const distance = distanceKeys[i];
  const pairs = distances.get(distance)!;
  for (const pair of pairs) {
    const box1 = boxes.get(pair[0])!;
    const box2 = boxes.get(pair[1])!;
    if (box1.circuit !== box2.circuit) {
      circuits.delete(box2.circuit);
      for (const id2 of box2.circuit) {
        const box3 = boxes.get(id2)!;
        box3.circuit = box1.circuit;
        box1.circuit.add(box3.id);
      }
      if (circuits.size === 1) {
        console.log(box1.x * box2.x);
      }
    }
  }
}
