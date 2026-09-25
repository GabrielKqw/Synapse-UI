# Weave state

## Task
Publish Synapse UI under the authenticated npm account scope.

## Goal
Align the npm package identity and installation instructions with the authenticated npm user `costadev`, so the first public publish can create the scoped package.

## Constraints
Keep the GitHub repository identity unchanged, publish with public access, add no token or credential to the repository, preserve the existing user Git identity, and change only the npm scope and documents that state it.

## Not requested
No automatic publish attempt, npm organization creation, token configuration, repository rename, CLI behavior change, dependency change, or modification to project-local memories.

## Completion criteria
`package.json` and README use `@costadev/synapse-ui`; tests and `npm pack --dry-run` pass; the correction is committed and pushed using the user's Git identity.

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

Next action: patch package metadata and README, run tests and package dry-run, then commit and push. The user can run `npm publish` afterward from the corrected package directory.

## Plan
1. Update the package scope at the single npm identity source and the corresponding README install examples.
2. Verify the existing CLI test and npm package contents without publishing.
3. Commit and push the metadata correction with the user's configured Git identity.

## Changes made
The package scope and README examples now use `@costadev/synapse-ui`, matching the authenticated npm account. The CLI, manifests, GitHub repository URLs, and release workflow remain unchanged.

## Review
The npm scope is a shared package identity controlled only by `package.json`; README examples are the only consumer-facing copies. Keeping GitHub coordinates unchanged avoids an unrelated repository migration. No secret, dependency, or runtime behavior is affected.

## Verification
Command: `npm run test`
Exit: 0
Summary: 2 tests passed, including accepted structured save, rejected malformed inputs, and guarded deletion.
Failures: none

Command: `npm pack --dry-run --json`
Exit: 0
Summary: the publish artifact is `@costadev/synapse-ui@0.5.0` with 23 intended files; `prepack` reran the same passing test suite.
Failures: none

Command: `git diff --check`
Exit: 0
Summary: no whitespace errors.
Failures: none

## Fidelity check
The change directly fixes the confirmed scope-ownership mismatch and changes no runtime behavior or unrelated repository identity. The package manager dry-run proves the corrected public artifact name; tests prove packaging still triggers and passes existing safeguards. No smaller change would make the installed package name and publication target agree.

## Open / blocked
After this correction, first publish must be initiated by the user from the package directory. Trusted Publishing remains optional for release automation and should be configured in npm for `@costadev/synapse-ui` before a GitHub Release is used.
