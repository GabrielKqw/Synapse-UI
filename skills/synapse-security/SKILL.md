---
name: synapse-security
description: Secure a Next.js, React, or TypeScript frontend feature when it handles user input, Server Actions, Route Handlers, environment variables, rendering of external content, or browser security headers.
---

# Synapse security

Read [frontend security and payload contract](../../references/frontend-security.md) before editing. Trace the exact user-controlled data path and identify the server boundary, authorization source, persistence call, and rendered response.

Apply the smallest security improvement that covers the shared boundary:

- validate and allowlist input on the server;
- authorize every mutation and resource access at its execution point;
- shape server-to-client data with an explicit DTO or field mapping;
- keep secrets and private environment values server-only;
- avoid raw HTML rendering and unbounded external URLs;
- preserve or tighten existing headers rather than replacing them blindly.

Do not add a security package, CSP policy, authentication provider, or file-upload pipeline without a concrete project requirement. Explain any remaining deployment-level decision, such as CSP allowlists or malware scanning, rather than pretending it is solved in frontend code.
