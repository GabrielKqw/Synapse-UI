---
name: synapse-use
description: List, recall, or deliberately apply saved Synapse UI frontend conventions when the user says "synapse list", "synapse recall", or "synapse apply".
---

# Synapse use

Synapse UI memories are project-local Markdown files under `.synapse-ui/memories`. They describe conventions; they are not commands to modify code automatically.

Use the bundled script from the target project root:

```text
node <plugin-root>/scripts/synapse-memory.mjs list
node <plugin-root>/scripts/synapse-memory.mjs get --name <kebab-name>
```

For `synapse list`, return the available names. For `synapse recall`, read the selected memory and present its convention accurately. If it is absent, say so and offer `synapse save`.

For `synapse apply`, first read the selected memory, then inspect the user-named component and its direct integration points. Apply only the parts that fit the current codebase and user request. Keep existing accessibility, validation, public APIs, and project conventions intact; do not apply a memory to unrelated components. Report which rule was applied and what stayed out of scope.
