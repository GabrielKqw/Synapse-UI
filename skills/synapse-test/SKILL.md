---
name: synapse-test
description: Plan, add, or review frontend tests for React and Next.js behavior, accessibility, security boundaries, and critical user journeys.
---

# Synapse test

Read [frontend production contract](../../references/frontend-production.md). Trace the user-visible behavior and select the smallest test level that proves it: unit for pure logic, component for interactive contracts, integration for connected modules, and E2E for browser journeys or async Server Components.

Test failures that matter: invalid and extra payload fields, unauthenticated or unauthorized mutations, error and loading states, keyboard behavior, focus, and preserved form values after expected validation errors. Reuse the project's existing test runner and helpers. Do not add a new test framework just to satisfy coverage, and do not write snapshots that only repeat component markup.
