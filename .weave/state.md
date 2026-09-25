# Weave state

## Task
Complete Synapse UI's production frontend workflows with performance, testing, SEO, licensing, and CI.

## Goal
Make the plugin usable through the full frontend delivery path: design and implementation through performance, quality verification, discoverability, and repository checks.

## Constraints
Use no runtime dependency; store only project conventions beneath `.synapse-ui/memories`; reject unsafe memory names and do not persist credentials, tokens, personal data, or generated source code unless the user explicitly supplies it as the convention. The plugin points to `https://github.com/GabrielKqw/Synapse-UI` and contains compatible Codex and Claude Code manifests. Do not configure a Codex Git identity; use only the user's existing Git identity for any authorized commit. Use official Next.js and React/W3C guidance; do not prescribe a new validation, auth, or styling dependency.

## Not requested
No remote synchronization, embeddings/vector database, editor extension, telemetry, authentication implementation, UI framework dependency, automatic repository commits, deployment, or weakening of existing security controls.

## Completion criteria
Performance, test, and SEO skills plus a production reference exist; CI runs the dependency-free test suite; the license matches manifest metadata; local tests and host validation pass.

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

Confirmed facts: the scaffold registered `synapse-ui` in the personal marketplace at `C:\Users\Admin\.agents\plugins\marketplace.json`; no prior marketplace entry existed. User explicitly selected the product name and repository URL. The local Git identity is the user's identity, not a Codex address.

Claude Code discovers plugin manifests at `.claude-plugin/plugin.json` and loads skills from the same root-level `skills/<name>/SKILL.md` layout that Synapse UI already uses. Its skills will be namespaced as `/synapse-ui:synapse-save` and `/synapse-ui:synapse-use`; Codex consumes the same skill files through its `.codex-plugin/plugin.json` manifest.

Decisions: implement a local Markdown store instead of remote or semantic-memory infrastructure; keep application as an agent-guided action after the target flow has been inspected. Build focused skills rather than one oversized frontend skill so only the needed workflow is loaded. Treat Server Actions and Route Handlers as public endpoints; validate and authorize at each mutation boundary, not in UI-only gates. Prefer Next.js native image, font, script, metadata, streaming, and testing paths before recommending dependencies.

Commands run: scaffold command completed successfully; manifest, marketplace and local Git identity were read; `node --check` passed for the memory script; Claude Code's `claude plugin validate` passed; a Node structural check confirmed both manifests use `synapse-ui` and both shared skills exist. The Codex validator could not run because its local Python environment lacks the `yaml` module. The expanded plugin's `npm run test` passed two tests that exercise save/list/find/get/delete plus unsafe-name and unconfirmed-delete rejection. After adding the security workflows, the same test suite passed again, Claude validation accepted all nine skills, and both manifests were parsed as valid JSON. The production expansion test suite passed again, Claude validation accepted all twelve skills, and a Node check confirmed CI contract plus both `0.4.0` manifests. Codex cachebuster was updated to `0.4.0+codex.20260925175108` and that exact version was installed from the personal marketplace. Initial implementation commit `5bc3e4a` was pushed to `origin/main`.

Next action: commit the completed production expansion locally; push only on explicit request.

## Plan
1. Encode native Next.js production and test guidance in one shared reference.
2. Add `synapse-performance`, `synapse-test`, and `synapse-seo` without inventing framework-specific templates.
3. Add MIT license and minimal Node CI, update metadata and README, then validate all skills and the package.

## Changes made
Plugin scaffold registered; manifest metadata aligned with the selected name, owner, and repository. A Claude Code manifest was added without duplicating the skills or persistence script. The plugin now includes component, form, Next.js, design-system, review, security, payload-review, performance, test, and SEO workflows, a shared frontend baseline, researched security and production contracts, an MIT license, CI, and a user-facing README. The persistence script supports content search and guarded deletion; Node's native test runner covers the storage lifecycle and safety guards.

## Review
The shared `skills/` layout remains valid for both hosts. The storage script keeps all persistence in one path, validates memory slugs, resolves the final path beneath the project-local store, refuses overwrite unless `--replace` is explicit, and requires a separate confirmation for deletion. The twelve specialised skills share frontend, security, and production references rather than duplicating advice. The security workflow enforces server-side validation and authorization without prescribing an auth or validation library. CI is deliberately dependency-free and read-only. No credentials, external services, or dependencies are introduced.

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

Command: `npm run test`
Exit: 0
Summary: 2 tests passed, covering the full local memory lifecycle and both destructive-path guards.
Failures: none

Command: `codex plugin add synapse-ui@personal`
Exit: 0
Summary: installed local cache version `0.4.0+codex.20260925175108`.
Failures: none

## Fidelity check
The expanded plugin now delivers the requested complete frontend surface: durable conventions plus component, form, Next.js, design-system, review, security, payload-review, performance, test, and SEO workflows. It adds only a local test runner, CI, license, references, and documentation, while preserving no-dependency, no-telemetry, and no-automatic-edit boundaries. Both host manifests point to the same skill implementation. The prior end-to-end disk-write gap is closed by the passing temporary-directory test.

## Open / blocked
The Codex-specific schema validator still needs PyYAML available locally. The production expansion is ready for a local commit; push remains user-controlled.
