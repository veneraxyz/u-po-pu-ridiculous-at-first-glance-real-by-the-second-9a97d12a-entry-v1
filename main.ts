import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "We rent calm, vest-wearing emotional-support chickens to stressed office workers for $30 an hour, because a warm hen on your lap lowers anxiety faster than any meditation app ever will.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const lines = ENTRY.split("\n");
if (lines.length !== 1) {
  throw new Error("entry must be exactly one line");
}
if (ENTRY.length === 0 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\r")) {
  throw new Error("entry must not contain carriage returns");
}

const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, ENTRY + "\n", "utf8");

// Verify what was actually written: exactly one line, within the limit,
// and byte-identical to the sentence plus a single trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY + "\n") {
  throw new Error("verification failed: entry.txt does not match the entry");
}
const writtenLines = written.replace(/\n$/, "").split("\n");
if (writtenLines.length !== 1 || writtenLines[0].length > 200) {
  throw new Error("verification failed: entry.txt is not a single line of at most 200 characters");
}
