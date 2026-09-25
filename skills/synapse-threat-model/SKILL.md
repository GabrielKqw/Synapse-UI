---
name: synapse-threat-model
description: Threat-model a Next.js or React frontend feature when it introduces sensitive data, a mutation, an external integration, a file upload, a privileged action, or a new trust boundary.
---

# Synapse threat model

Read [frontend security and payload contract](../../references/frontend-security.md). Map the feature concretely: actor, asset, entry point, browser-controlled input, server boundary, data store, external service, and response surface. Treat every Server Action, Route Handler, URL parameter, cookie, and client-provided identifier as a possible trust boundary.

State the highest-impact realistic threats and the control that owns each one: server validation, resource authorization, DTO shaping, origin restriction, rate/size limits, output encoding, secret isolation, or deployment headers. Verify whether the control is implemented, inherited from the platform, or still a deployment decision.

Keep the model scoped to the feature. Do not provide offensive exploitation steps, scan third-party systems, or claim that a threat is mitigated without tracing the relevant code path.
