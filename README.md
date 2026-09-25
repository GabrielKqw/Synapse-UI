# Synapse UI

Synapse UI is a local-first frontend workflow plugin for Next.js, React, and TypeScript. It remembers project conventions in Markdown and provides focused skills for building consistent, accessible frontend work.

## What it provides

| Workflow | Use it for |
| --- | --- |
| `synapse-save` / `synapse-use` | Save, list, find, recall, and deliberately apply project conventions |
| `synapse-component` | Component APIs, state coverage, accessibility, and responsive behavior |
| `synapse-form` | Inputs, validation, submit feedback, and error UX |
| `synapse-next` | Next.js App Router routes, data boundaries, metadata, and loading states |
| `synapse-design-system` | Tokens, primitives, visual states, and variants |
| `synapse-review` | Review frontend changes against real project conventions |
| `synapse-security` | Secure Server Actions, data exposure, env vars, rendered content, and browser headers |
| `synapse-payload-review` | Trace and review browser payloads through validation, authorization, storage, and response DTOs |
| `synapse-performance` | Improve Next.js render paths, bundles, assets, scripts, and Web Vitals |
| `synapse-test` | Add or review behavioral, accessibility, security, and E2E test coverage |
| `synapse-seo` | Implement or review metadata, social previews, sitemap, robots, and indexability |

## Memories

Memories stay in the target project, under `.synapse-ui/memories/`. They are ordinary Markdown files, so they can be reviewed and committed with the project if the team wants shared conventions.

```text
node <plugin-root>/scripts/synapse-memory.mjs save --name input-contract --title "Input contract" --scope "React forms" --body "Inputs use a label, controlled value and onChange. Error text is connected only when present."
node <plugin-root>/scripts/synapse-memory.mjs list
node <plugin-root>/scripts/synapse-memory.mjs find --query input
node <plugin-root>/scripts/synapse-memory.mjs get --name input-contract
node <plugin-root>/scripts/synapse-memory.mjs delete --name input-contract --confirm
```

The script rejects unsafe names, refuses overwrites unless `--replace` is explicit, and requires `--confirm` for deletion. Never store credentials, tokens, private keys, or customer information in a memory.

## Quality checks

Run the dependency-free test suite with `npm test`. GitHub Actions runs it on every push and pull request. The plugin also carries an MIT [license](LICENSE).

## Codex

Install `synapse-ui` from your personal marketplace, then start a new Codex thread. Natural-language requests such as `synapse save our input convention` or `synapse apply input-contract to CheckoutForm` select the appropriate skill.

## Claude Code

Run a one-session development load from the plugin directory:

```text
claude --plugin-dir C:\\path\\to\\synapse-ui
```

Then invoke `/synapse-ui:synapse-save`, `/synapse-ui:synapse-component`, or another namespaced skill. Claude Code reads the same `skills/` directory and uses `.claude-plugin/plugin.json` for the plugin manifest.
