#!/usr/bin/env -S deno --allow-read

const input = await Deno.readTextFile((await Deno.args)[0] ?? 'sample.txt');

interface Node {
  id: string;
  children: Node[];
}

const nodes = new Map<string, Node>();

function getNode(id: string): Node {
  if (!nodes.has(id)) nodes.set(id, {
    id,
    children: [],
  });
  return nodes.get(id)!;
}

for (const line of input.split('\n')) {
  const [id, children] = line.split(': ');
  const node = getNode(id);
  for (const childId of children.split(' ')) {
    const child = getNode(childId);
    node.children.push(child);
  }
}

function* calculatePaths(from: string, to: string, prefix: string[] = []): Generator<string[]> {
  if (from === to) yield [...prefix, from];
  const node = getNode(from);
  for (const child of node.children) {
    yield* calculatePaths(child.id, to, [...prefix, child.id]);
  }
}

console.log(calculatePaths('you', 'out').toArray().length);
