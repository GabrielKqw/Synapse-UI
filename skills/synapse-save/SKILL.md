---
name: synapse-save
description: Save a durable Next.js, React, TypeScript, accessibility, or UI-component convention when the user says "synapse save" or asks to remember a frontend pattern.
---

# Synapse save

Capture one reusable project convention in `.synapse-ui/memories/<name>.md`. This is for rules that can guide future frontend work, such as component APIs, form validation, loading states, accessibility expectations, styling conventions, or TypeScript contracts. It is not a scratchpad or a dump of the current implementation.

Before saving, derive or confirm this contract:

- **Rule:** a positive, testable instruction.
- **Applies when:** the component, route, state, or boundary where the rule belongs.
- **Scope:** the relevant area of the project, such as `app/forms` or `shared components`.
- **Tags:** 2–4 lowercase kebab-case labels for discovery.
- **Do not apply when:** an exception, only if one is known.
- **Example:** a short representative API or UI shape, only if it clarifies the rule.
- **Evidence:** `user-confirmed`, a named project source, or a verified constraint.

If rule, application context, scope, or tags cannot be inferred safely, ask one focused question. Preserve user intent; do not turn a local preference into a universal frontend requirement or invent an exception/evidence claim.

Use the bundled script from the project root:

```text
node <plugin-root>/scripts/synapse-memory.mjs save --name <kebab-name> --title <title> --scope <scope> --tags <tag,tag> --rule <rule> --when <application-context> [--avoid <exception>] [--example <example>] [--evidence <source>]
```

The script rejects incomplete records and will not overwrite an existing memory. Read an existing record first and ask the user before using `--replace`. Immediately run `get --name <kebab-name>` after saving to verify that rule, context, scope, tags, and evidence survived. Never store secrets, tokens, passwords, private keys, customer data, or personal data. Summarize the saved convention and report its project-relative path.

For a form-input example, a useful memory can state the actual contract: controlled `value` and `onChange`, an associated label, a stable `id`, `aria-describedby` when explanatory or error text exists, and an error message connected to the field. Its application context can be `shared form fields`, and its tags can be `forms, accessibility, typescript`. Only include parts the user chose or confirmed.
