#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? 'sample.txt');

interface Node {
  id: string;
  children: Set<string>;
  parents: Set<string>;
  descendents: Set<string>;
}

const nodes = new Map<string, Node>();

function getNode(id: string): Node {
  if (!nodes.has(id)) nodes.set(id, {
    id,
    children: new Set(),
    parents: new Set(),
    descendents: new Set(),
  });
  return nodes.get(id)!;
}

for (const line of input.split('\n')) {
  const [id, children] = line.split(': ');
  const node = getNode(id);
  for (const childId of children.split(' ')) {
    const child = getNode(childId);
    node.children.add(child.id);
  }
}

nodes.forEach((node) => {
  for (const child of node.children) {
    nodes.get(child)!.parents.add(node.id);
  }
});

nodes.forEach((node) => {
  const ancestors = new Set<string>(node.parents);
  for (const id of ancestors) {
    const a = nodes.get(id)!;
    a.descendents.add(node.id);
    for (const p of a.parents) {
      ancestors.add(p);
    }
  }
});

function* calculatePaths(from: string, to: string, required: Set<string>, prefix: string[] = []): Generator<string[]> {
  if (from === to) yield [...prefix, from];
  const node = getNode(from);
  const r = new Set(required);
  r.delete(node.id);
  if (node.descendents.intersection(r).size < r.size) {
    // console.log('node', node.id, 'skipping', node.id, 'because', node.descendents, 'does not contain', required);
    return;
  }
  // console.log('checking', node);
  for (const child of node.children) {
    yield* calculatePaths(child, to, r, [...prefix, child]);
  }
}

// console.log(nodes);

const required = new Set<string>();
required.add('dac');
required.add('fft');

console.log(calculatePaths('svr', 'out', required).toArray().length);
