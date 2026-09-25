---
name: synapse-dependency-review
description: Review a frontend dependency or package update for supply-chain, bundle, licensing, compatibility, and security risks before it is added or upgraded.
---

# Synapse dependency review

Start with the user need and check whether the browser, Next.js, React, TypeScript, or an existing dependency already solves it. If a package is justified, inspect its declared purpose, maintained release source, repository, license, required permissions/scripts, runtime surface, transitive footprint, and impact on client bundles.

For an existing project, inspect the manifest and lockfile before advising an update. Use the package manager's audit or outdated report as evidence, but distinguish a reported advisory from an exploitable path in this application. Flag install scripts, abandoned packages, duplicate capabilities, browser exposure of server dependencies, and packages that would expand the Client Component bundle.

Do not install, update, disable security checks, or run package lifecycle scripts unless the user explicitly asks for that change. Record the decision and the accepted version range in a Synapse memory only if it is a durable project convention.
