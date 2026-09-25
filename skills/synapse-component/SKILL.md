---
name: synapse-component
description: Design or implement a production-ready React and TypeScript component when the user asks for a new UI component, its API, states, or responsive behavior.
---

# Synapse component

First inspect the target project's component conventions, tokens, and direct callers. Reuse existing primitives before inventing a parallel component system. Then define the smallest semantic prop API, visual states, and responsive behavior that meet the request.

Read [frontend baseline](../../references/frontend-baseline.md) when deciding component boundaries, state modeling, or accessibility. If a relevant Synapse UI memory exists, recall it before editing; it is a project convention, not a reason to bypass the existing codebase.

For interactive components, verify keyboard behavior, focus treatment, loading/disabled states, and an empty state where applicable. Keep `"use client"` at the leaf boundary that actually needs browser APIs or event handlers.
