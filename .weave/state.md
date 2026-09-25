# Weave state

## Task
Improve Synapse UI's README into a clear installation, usage, safety, and release guide.

## Goal
Make a first-time user able to understand the product, activate it in Codex or Claude Code, save and query a convention, and publish it under the correct npm scope without guessing undocumented behavior.

## Constraints
Document only implemented behavior; preserve `@costadev/synapse-ui`, the GitHub repository identity, and the no-telemetry/local-first boundary. Do not expose credentials or imply that an unpublished package can already be installed from npm.

## Not requested
No runtime or CLI behavior change, package publication attempt, branding asset, dependency, repository rename, npm account configuration, or modification to project-local memories.

## Completion criteria
README presents the supported hosts, CLI contract, memory safeguards, workflow catalog, development checks, and truthful publication steps; formatting and tests pass; changes are committed and pushed with the user's Git identity.

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
- file: `references/frontend-baseline.md`
  reason: centralizes cross-cutting Next.js, React, TypeScript, accessibility, and responsive UI expectations.
  relation: specialised skills read it only when the relevant frontend work needs a baseline.
- file: `README.md`
  reason: gives users an install and invocation path for either supported host.
  relation: turns the repository into a usable distributable plugin rather than an implementation-only folder.
- file: `references/frontend-security.md`
  reason: contains the researched, reusable security contract for frontend-to-server data flows.
  relation: security, payload, form, Next.js, and review skills use it instead of duplicating or guessing security rules.
- file: `references/frontend-production.md`
  reason: centralizes Next.js performance, test strategy, and metadata/SEO practices.
  relation: performance, test, and SEO skills select native Next.js capabilities before adding dependencies.
- file: `.github/workflows/test.yml`
  reason: verifies the plugin's deterministic storage behavior on pull requests and pushes.
  relation: makes local validation repeatable for every contributor.
- file: `package.json`
  reason: defines npm package identity, CLI entrypoint, packed files, and publish guardrails.
  relation: turns the local persistence script into an installable command without adding a runtime dependency.
- file: `.github/workflows/publish-npm.yml`
  reason: publishes only from a GitHub release using npm trusted publishing.
  relation: avoids a long-lived npm token in the repository or CI configuration.
- file: `skills/synapse-save/SKILL.md`
  reason: translates a user request into one durable, scoped convention record.
  relation: it is the only workflow permitted to create a memory, so it must define the record quality bar.

Confirmed facts: npm authentication reports `costadev`; npm rejected `@gabrielkqw/synapse-ui` because the authenticated account did not own that scope. A GitHub username does not create an npm scope. The unscoped `synapse-ui` name remains unavailable. The local Git identity is the user's identity, not a Codex address.

Claude Code discovers plugin manifests at `.claude-plugin/plugin.json` and loads skills from the same root-level `skills/<name>/SKILL.md` layout that Synapse UI already uses. Its skills will be namespaced as `/synapse-ui:synapse-save` and `/synapse-ui:synapse-use`; Codex consumes the same skill files through its `.codex-plugin/plugin.json` manifest.

Decisions: use `@costadev/synapse-ui`, which matches the authenticated npm identity, rather than attempting to create or claim a mismatched `@gabrielkqw` scope. Keep GitHub URLs under `GabrielKqw/Synapse-UI`; npm ownership and GitHub ownership are independent. Preserve public access through existing `publishConfig`.

Commands run: scaffold command completed successfully; manifest, marketplace and local Git identity were read; `node --check` passed for the memory script; Claude Code's `claude plugin validate` passed; a Node structural check confirmed both manifests use `synapse-ui` and both shared skills exist. The Codex validator could not run because its local Python environment lacks the `yaml` module. The expanded plugin's `npm run test` passed two tests that exercise save/list/find/get/delete plus unsafe-name and unconfirmed-delete rejection. After adding the security workflows, the same test suite passed again, Claude validation accepted all nine skills, and both manifests were parsed as valid JSON. The production expansion test suite passed again, Claude validation accepted all twelve skills, and a Node check confirmed CI contract plus both `0.4.0` manifests. The npm/cyber/save expansion test suite passed with structured-save acceptance and rejection cases; `npm pack --dry-run --json` verified 23 intended distribution files and Claude validation passed again. Codex cachebuster was updated to `0.5.0+codex.20260925175730` and that exact version was installed from the personal marketplace. Initial implementation commit `5bc3e4a` was pushed to `origin/main`.

Next action: replace the terse README with a product-oriented guide tied to the actual CLI and manifests, then verify formatting and tests before commit/push.

## Plan
1. Cover value proposition and the separate Codex, Claude Code, and npm entry paths.
2. Document the exact memory CLI contract and its safety invariants from `scripts/synapse-memory.mjs`.
3. List all existing workflows and verification/release commands without adding functionality.
4. Validate Markdown-related diff and tests, then commit and push.

## Changes made
README now explains the local-first product boundary, Codex/Claude activation, npm's post-publication usage, structured memory commands, every included workflow, safety boundaries, development checks, and release ownership. No runtime behavior changed.

## Review
The README distinguishes local agent-plugin loading from npm installation because npm publication has not yet succeeded. CLI examples match the script's required structured fields and deletion/overwrite protections.

## Verification
Command: `git diff --check`
Exit: 0
Summary: README and working-memory edits have no whitespace errors.
Failures: none

Command: `npm test`
Exit: 0
Summary: 2 tests passed for the local memory lifecycle and safety guards.
Failures: none

Command: `claude plugin validate .`
Exit: 0
Summary: Claude Code accepted the existing plugin manifest after the documentation-only change.
Failures: none

Command: `npm pack --dry-run --json`
Exit: 0
Summary: `@costadev/synapse-ui@0.5.0` contains the expected 23 publish files and prepack reran tests successfully.
Failures: none

## Fidelity check
The README now covers the requested product journey without adding or claiming unimplemented features. It accurately separates current local plugin installation from npm use after first publication, documents the CLI's enforced save/delete rules, and retains the privacy boundary. Validation proves that the shipped artifact and both existing test and Claude manifest contracts remain valid.

## Open / blocked
The first npm publication remains a user-owned action from the package directory; the README states that condition explicitly.
