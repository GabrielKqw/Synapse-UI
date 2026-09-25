# Weave state

## Task
Replace the weak free-text Synapse save flow with validated, reusable frontend convention records.

## Goal
Ensure every saved convention has an actionable rule, application boundary, tags, exceptions, example, and evidence instead of an unstructured text blob.

## Constraints
Use no runtime dependency; store only project conventions beneath `.synapse-ui/memories`; reject unsafe memory names and do not persist credentials, tokens, personal data, or generated source code unless the user explicitly supplies it as the convention. The plugin points to `https://github.com/GabrielKqw/Synapse-UI` and contains compatible Codex and Claude Code manifests. Do not configure a Codex Git identity; use only the user's existing Git identity for any authorized commit. Use official Next.js and React/W3C guidance; do not prescribe a new validation, auth, or styling dependency.

## Not requested
No remote synchronization, embeddings/vector database, editor extension, telemetry, authentication implementation, UI framework dependency, automatic `npm publish`, weakening of existing security controls, or silent migration of user memories.

## Completion criteria
The save CLI rejects incomplete convention records; saved Markdown has the structured sections; save/use skills preserve the same schema; automated tests prove accepted and rejected inputs.

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

Confirmed facts: the scaffold registered `synapse-ui` in the personal marketplace at `C:\Users\Admin\.agents\plugins\marketplace.json`; no prior marketplace entry existed. User explicitly selected the product name and repository URL. The local Git identity is the user's identity, not a Codex address.

Claude Code discovers plugin manifests at `.claude-plugin/plugin.json` and loads skills from the same root-level `skills/<name>/SKILL.md` layout that Synapse UI already uses. Its skills will be namespaced as `/synapse-ui:synapse-save` and `/synapse-ui:synapse-use`; Codex consumes the same skill files through its `.codex-plugin/plugin.json` manifest.

Decisions: implement a local Markdown store instead of remote or semantic-memory infrastructure; keep application as an agent-guided action after the target flow has been inspected. Build focused skills rather than one oversized frontend skill so only the needed workflow is loaded. Treat Server Actions and Route Handlers as public endpoints; validate and authorize at each mutation boundary, not in UI-only gates. Prefer Next.js native image, font, script, metadata, streaming, and testing paths before recommending dependencies. The unscoped npm name is unavailable, so use the publication-ready scoped name `@gabrielkqw/synapse-ui`. Save records require explicit rule, applicable context, scope, and tags; optional sections document exceptions, a concrete example, and evidence without inventing them.

Commands run: scaffold command completed successfully; manifest, marketplace and local Git identity were read; `node --check` passed for the memory script; Claude Code's `claude plugin validate` passed; a Node structural check confirmed both manifests use `synapse-ui` and both shared skills exist. The Codex validator could not run because its local Python environment lacks the `yaml` module. The expanded plugin's `npm run test` passed two tests that exercise save/list/find/get/delete plus unsafe-name and unconfirmed-delete rejection. After adding the security workflows, the same test suite passed again, Claude validation accepted all nine skills, and both manifests were parsed as valid JSON. The production expansion test suite passed again, Claude validation accepted all twelve skills, and a Node check confirmed CI contract plus both `0.4.0` manifests. The npm/cyber/save expansion test suite passed with structured-save acceptance and rejection cases; `npm pack --dry-run --json` verified 23 intended distribution files and Claude validation passed again. Codex cachebuster was updated to `0.5.0+codex.20260925175730` and that exact version was installed from the personal marketplace. Initial implementation commit `5bc3e4a` was pushed to `origin/main`.

Next action: commit and push the full npm/cyber/save block; npm Trusted Publishing setup remains a user-owned account configuration before the first release.

## Plan
1. Replace `--body` with required `--rule`, `--when`, `--scope`, and `--tags`; format optional exception/example/evidence data predictably.
2. Make save derive and confirm the fields, then read back the saved record; make use respect scope and exceptions.
3. Test structured output and missing-field rejection before committing and pushing the complete block.

## Changes made
Plugin scaffold registered; manifest metadata aligned with the selected name, owner, and repository. A Claude Code manifest was added without duplicating the skills or persistence script. The plugin now includes component, form, Next.js, design-system, review, security, payload-review, performance, test, SEO, threat-model, and dependency-review workflows, a shared frontend baseline, researched security and production contracts, an MIT license, CI, a release-only trusted npm publishing workflow, and a user-facing README. The persistence script supports content search and guarded deletion; saves now require rule, applicable context, scope, and tags, with optional exception, example, and evidence sections. Node's native test runner covers the storage lifecycle and structured-save safety guards.

## Review
The shared `skills/` layout remains valid for both hosts. The storage script keeps all persistence in one path, validates memory slugs, resolves the final path beneath the project-local store, refuses overwrite unless `--replace` is explicit, and requires a separate confirmation for deletion. Fourteen specialised skills share frontend, security, and production references rather than duplicating advice. The save workflow now rejects vague/unstructured persistence at the shared script boundary. The security workflow enforces server-side validation and authorization without prescribing an auth or validation library. CI is deliberately dependency-free and read-only; npm publishing uses OIDC only after the user configures trusted publishing in npm. No credentials, external services, or dependencies are introduced.

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
Summary: installed local cache version `0.5.0+codex.20260925175730`.
Failures: none

## Fidelity check
The expanded plugin now delivers the requested complete frontend surface: durable conventions plus component, form, Next.js, design-system, review, security, payload-review, performance, test, SEO, threat-model, and dependency-review workflows. It adds a scoped npm package definition, local CLI, release-only trusted-publish workflow, test runner, CI, license, references, and documentation, while preserving no-dependency, no-telemetry, and no-automatic-edit boundaries. Both host manifests point to the same skill implementation. The prior end-to-end disk-write gap is closed by the passing temporary-directory test.

## Open / blocked
The Codex-specific schema validator still needs PyYAML available locally. Before the first npm release, configure npm Trusted Publishing for `@gabrielkqw/synapse-ui` and this GitHub repository; do not add an npm token to the repository.
