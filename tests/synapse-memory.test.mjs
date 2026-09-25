import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import test from "node:test";

const script = fileURLToPath(new URL("../scripts/synapse-memory.mjs", import.meta.url));

function run(root, ...args) {
  return execFileSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

test("saves, finds, reads, and deletes a project convention", () => {
  const root = mkdtempSync(join(tmpdir(), "synapse-ui-"));
  try {
    const saved = run(root, "save", "--name", "input-contract", "--title", "Input contract", "--body", "Inputs have labels and stable ids.");
    assert.match(saved, /Saved input-contract/);
    assert.equal(run(root, "list").trim(), "input-contract");
    assert.equal(run(root, "find", "--query", "stable").trim(), "input-contract");
    assert.match(run(root, "get", "--name", "input-contract"), /Inputs have labels/);
    assert.match(run(root, "delete", "--name", "input-contract", "--confirm"), /Deleted input-contract/);
    assert.match(run(root, "list"), /No Synapse UI memories/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rejects unsafe names and unconfirmed deletion", () => {
  const root = mkdtempSync(join(tmpdir(), "synapse-ui-"));
  try {
    assert.throws(() => run(root, "save", "--name", "../unsafe", "--title", "Unsafe", "--body", "No."), /memory names/);
    run(root, "save", "--name", "safe", "--title", "Safe", "--body", "Safe rule.");
    assert.throws(() => run(root, "delete", "--name", "safe"), /--confirm/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
