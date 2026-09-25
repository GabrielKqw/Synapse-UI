---
name: synapse-form
description: Build or improve accessible React and Next.js forms when the user asks for inputs, validation, submission UX, or error handling.
---

# Synapse form

Trace the real form path: field input → client validation → submit action → server response → displayed outcome. Use the project's validation library if it already has one; otherwise keep validation close to the form and use native platform constraints where sufficient.

Read [frontend baseline](../../references/frontend-baseline.md) before changing controls. Each field needs a label, stable identifier, and an error relationship only when an error exists. Preserve entered values after failed submissions, make submit state unambiguous, and focus or announce the actionable error without stealing focus during ordinary typing.

Read [frontend security and payload contract](../../references/frontend-security.md) for any submit path. Client validation is feedback only: allowlist, validate, and authorize the submitted payload on the server before mutation. Recall a saved input or validation convention before implementation when one exists. Do not save form data or error payloads as a Synapse memory.
