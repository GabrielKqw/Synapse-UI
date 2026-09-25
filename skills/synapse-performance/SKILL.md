---
name: synapse-performance
description: Improve a Next.js or React frontend's loading, rendering, bundle, image, font, script, or Core Web Vitals behavior when the user asks about frontend performance.
---

# Synapse performance

Read [frontend production contract](../../references/frontend-production.md), then inspect the actual render path, client boundaries, data dependencies, and current measurement before editing. Start with the smallest root cause: a serial data dependency, a broad Client Component boundary, an oversized asset, an unnecessary third-party script, or a missing loading state.

Prefer native Next.js mechanisms before adding a package: Server Components, parallel fetching, Suspense/loading UI, `next/image`, `next/font`, `next/script`, dynamic import, and bundle analysis. Do not claim a performance gain without an observable before/after metric or a clear reduction in client work. Preserve accessibility, image alternatives, and correct loading/error states while optimizing.
