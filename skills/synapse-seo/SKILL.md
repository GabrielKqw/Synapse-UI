---
name: synapse-seo
description: Implement or review Next.js metadata, social previews, sitemap, robots behavior, and indexability when the user asks about SEO or page discoverability.
---

# Synapse SEO

Read [frontend production contract](../../references/frontend-production.md). Inspect the route's intended audience and canonical source before changing metadata. Use the Next.js Metadata API for route-owned title and description, and generate dynamic metadata only from validated, public data.

Add Open Graph data, sitemap entries, or robots rules only when the route is meant to be discoverable. Exclude authenticated, preview, administrative, duplicate, and user-private routes from indexing. Do not promise ranking outcomes; verify the implemented metadata, canonical target, and rendered HTML instead.
