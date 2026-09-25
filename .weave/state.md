# Weave state

## Task
Create the marketplace-backed Synapse UI plugin for reusable Next.js and TypeScript frontend conventions.

## Goal
Make `synapse save`, `synapse recall`, `synapse list`, and `synapse apply` usable through focused Codex skills, with durable project-local memory files.

## Constraints
Use no runtime dependency; store only project conventions beneath `.synapse-ui/memories`; reject unsafe memory names and do not persist credentials, tokens, personal data, or generated source code unless the user explicitly supplies it as the convention. The plugin points to `https://github.com/GabrielKqw/Synapse-UI` and contains compatible Codex and Claude Code manifests. Do not create commits or configure a Codex Git identity; use only the user's existing Git identity for any authorized commit.

## Not requested
No remote synchronization, embeddings/vector database, editor extension, telemetry, authentication, or automatic repository commits.

## Completion criteria
The plugin manifest and personal marketplace entry validate; save/list/get behavior is exercised against a temporary directory; the two skills describe the command flows and safety boundaries.

## Blocking questions
none

## Working memory
- file: `.codex-plugin/plugin.json`
  reason: declares the installable Synapse UI plugin and its GitHub repository identity.
  relation: Codex uses it to discover the bundled skills.
- file: `scripts/synapse-memory.mjs`
  reason: provides dependency-free persistence, validation, and discovery for memory documents.
  relation: it is the shared implementation used by both saving and recalling skills.
- file: `skills/synapse-save/SKILL.md`
  reason: handles capture of a frontend convention from user language.
  relation: it calls the memory script without weakening privacy or overwrite protections.
- file: `skills/synapse-use/SKILL.md`
  reason: handles list, recall, and deliberate application of saved conventions.
  relation: it prevents a recalled preference from silently changing unrelated code.

Confirmed facts: the scaffold registered `synapse-ui` in the personal marketplace at `C:\Users\Admin\.agents\plugins\marketplace.json`; no prior marketplace entry existed. User explicitly selected the product name and repository URL. The local Git identity is the user's identity, not a Codex address.

Claude Code discovers plugin manifests at `.claude-plugin/plugin.json` and loads skills from the same root-level `skills/<name>/SKILL.md` layout that Synapse UI already uses. Its skills will be namespaced as `/synapse-ui:synapse-save` and `/synapse-ui:synapse-use`; Codex consumes the same skill files through its `.codex-plugin/plugin.json` manifest.

Decisions: implement a local Markdown store instead of remote or semantic-memory infrastructure; keep application as an agent-guided action after the target flow has been inspected.

Commands run: scaffold command completed successfully; manifest, marketplace and local Git identity were read; `node --check` passed for the memory script; Claude Code's `claude plugin validate` passed; a Node structural check confirmed both manifests use `synapse-ui` and both shared skills exist. The Codex validator could not run because its local Python environment lacks the `yaml` module. The runtime write test was blocked before execution by the terminal sandbox (`EPERM` creating `C:\tmp\.synapse-ui\memories`), so it does not establish a script defect.

Next action: install or load the plugin in Codex and exercise `synapse save` in a normal project workspace; the current terminal sandbox cannot create the isolated test store.

## Plan
1. Add Codex and Claude Code manifest metadata and two narrowly scoped skills.
2. Add one standard-library Node script for validated project-local memory operations.
3. Exercise save/list/get in a temporary directory and validate the plugin package.

## Changes made
Plugin scaffold registered; manifest metadata aligned with the selected name, owner, and repository. A Claude Code manifest was added without duplicating the skills or persistence script.

## Review
The shared `skills/` layout is valid for both hosts. The storage script has a single write path, validates memory slugs, resolves the final path beneath the project-local store, and refuses overwrite unless `--replace` is explicit. No credentials or external services are introduced.

## Verification
Command: `claude plugin validate C:\Users\Admin\plugins\synapse-ui`
Exit: 0
Summary: Claude Code accepted the `.claude-plugin/plugin.json` manifest and both skills.
Failures: none

Command: Node manifest and skill presence check
Exit: 0
Summary: Codex and Claude manifests both name `synapse-ui`; `synapse-save` and `synapse-use` skill files are present.
Failures: none

Command: `python ...validate_plugin.py C:\Users\Admin\plugins\synapse-ui`
Exit: 1
Summary: Not a plugin validation result; the validator process stopped because `yaml` is not installed locally.
Failures: `ModuleNotFoundError: No module named 'yaml'`

## Fidelity check
The requested Synapse UI plugin is implemented with save/list/recall/apply workflows for frontend conventions. It adds no remote memory service, no automatic edits, and no commits. Codex installation metadata and Claude Code plugin metadata point to the same skill implementation. The only incomplete verification is an end-to-end disk-write test, blocked by this session's terminal sandbox rather than bypassed.

## Open / blocked
End-to-end memory persistence should be exercised after loading the plugin in a normal project workspace. The Codex-specific schema validator needs PyYAML available before it can run.
