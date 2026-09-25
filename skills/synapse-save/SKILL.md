---
name: synapse-save
description: Save a durable Next.js, React, TypeScript, accessibility, or UI-component convention when the user says "synapse save" or asks to remember a frontend pattern.
---

# Synapse save

Capture a reusable project convention in `.synapse-ui/memories/<name>.md`. This is for rules that can guide future frontend work, such as component APIs, form validation, loading states, accessibility expectations, styling conventions, or TypeScript contracts.

Derive a short kebab-case name and a descriptive title from the user's request. Preserve the supplied rule faithfully; do not turn one local preference into a universal frontend requirement. If the request is too vague to become an actionable rule, ask one focused question before saving.

Use the bundled script from the project root:

```text
node <plugin-root>/scripts/synapse-memory.mjs save --name <kebab-name> --title <title> --scope <scope> --body <rule>
```

The script will not overwrite an existing memory. Read it first and ask the user before using `--replace`. Never store secrets, tokens, passwords, private keys, customer data, or personal data. Summarize the saved convention and report its project-relative path.

For a form-input example, a useful memory can state the actual contract: controlled `value` and `onChange`, an associated label, a stable `id`, `aria-describedby` when explanatory or error text exists, and an error message connected to the field. Only include parts the user chose or confirmed.
