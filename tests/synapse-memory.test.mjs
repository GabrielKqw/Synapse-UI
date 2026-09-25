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
    const saved = run(root, "save", "--name", "input-contract", "--title", "Input contract", "--scope", "shared forms", "--tags", "forms,accessibility", "--rule", "Inputs have labels and stable ids.", "--when", "Building reusable form fields.", "--avoid", "Native search inputs with an established project pattern.", "--example", "<Field id=\"email\" />", "--evidence", "user-confirmed");
    assert.match(saved, /Saved input-contract/);
    assert.equal(run(root, "list").trim(), "input-contract");
    assert.equal(run(root, "find", "--query", "stable").trim(), "input-contract");
    const record = run(root, "get", "--name", "input-contract");
    assert.match(record, /schema: 1/);
    assert.match(record, /tags: \[forms, accessibility\]/);
    assert.match(record, /# Rule/);
    assert.match(record, /## Applies when/);
    assert.match(record, /## Do not apply when/);
    assert.match(record, /## Example/);
    assert.match(record, /## Evidence/);
    assert.match(run(root, "delete", "--name", "input-contract", "--confirm"), /Deleted input-contract/);
    assert.match(run(root, "list"), /No Synapse UI memories/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rejects unsafe names and unconfirmed deletion", () => {
  const root = mkdtempSync(join(tmpdir(), "synapse-ui-"));
  try {
    assert.throws(() => run(root, "save", "--name", "../unsafe", "--title", "Unsafe", "--scope", "forms", "--tags", "forms", "--rule", "No.", "--when", "Never."), /memory names/);
    assert.throws(() => run(root, "save", "--name", "incomplete", "--title", "Incomplete", "--scope", "forms", "--tags", "forms", "--rule", "No."), /--when/);
    assert.throws(() => run(root, "save", "--name", "bad-tags", "--title", "Bad tags", "--scope", "forms", "--tags", "bad tag", "--rule", "No.", "--when", "Never."), /--tags/);
    run(root, "save", "--name", "safe", "--title", "Safe", "--scope", "forms", "--tags", "forms", "--rule", "Safe rule.", "--when", "Reusable forms.");
    assert.throws(() => run(root, "delete", "--name", "safe"), /--confirm/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
