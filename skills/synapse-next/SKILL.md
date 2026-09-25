---
name: synapse-next
description: Implement or review a Next.js App Router feature when the user asks about pages, layouts, server/client boundaries, data loading, metadata, or route states.
---

# Synapse Next.js

Trace the route segment and its data boundary before editing. Keep data fetching and authorization on the server by default; isolate client state and event handlers in the smallest client component. Handle loading, error, empty, and not-found states at the segment that owns them.

Read [frontend baseline](../../references/frontend-baseline.md) for App Router decisions and [frontend security and payload contract](../../references/frontend-security.md) when data crosses a boundary. Validate route-derived input before using it, authorize every Server Action and Route Handler, and return DTO-shaped data to Client Components. Do not expose server-only environment values, silently turn a whole page into a Client Component, or use a client fetch where the server component can supply the data.
