// Entry program for make.fun bounty:
// "The Best Meal You Ever Had" (u-pangg7-the-best-meal-you-ever-had-a3ac0f85)
//
// Writes exactly one sentence (1-200 characters) about the best meal
// the entrant ever had to /output/entry.txt, deterministically.
//
// The sentence was chosen from 8 candidates by pairwise comparison
// against the published judge brief: concrete dish + place + texture,
// one person's specific memory, one clean sentence, ending that lands.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "My best meal was hospital food: plain chicken porridge my sister smuggled in after my surgery, lukewarm and unsalted, and the first thing that tasted like being alive again.";

// The gate (sealed scorer) requires UTF-8 text of 1-200 characters,
// not only white space. Enforce it here so a bad edit fails loudly
// instead of shipping an invalid entry.
const length = [...ENTRY].length;
if (length < 1 || length > 200 || !/\S/.test(ENTRY)) {
  throw new Error(`entry violates gate: ${length} characters`);
}

// The harness runs with /output as the artifact directory. OUTPUT_DIR
// exists only so the program can be smoke-tested locally without
// writing to the filesystem root; it defaults to /output.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
