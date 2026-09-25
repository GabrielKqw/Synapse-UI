---
name: synapse-review
description: Review a React, Next.js, or TypeScript frontend change for component quality, accessibility, responsive behavior, and consistency with saved Synapse UI conventions.
---

# Synapse review

Review the diff and its direct callers. Recall relevant saved conventions, then read [frontend baseline](../../references/frontend-baseline.md). Report only concrete findings, ordered by impact, with file and line references when available.

Check the relevant surfaces rather than applying a generic checklist: server/client boundaries, payload contracts, authorization, and route states for Next.js; labels, focus, keyboard, errors, and submission states for forms; semantic APIs and state coverage for components; token reuse and state coverage for design-system work. Read [frontend security and payload contract](../../references/frontend-security.md) when reviewing a mutation or data flow. Separate verified observations from items that require manual visual, device, or deployment testing.
