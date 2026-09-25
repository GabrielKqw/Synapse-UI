---
name: synapse-payload-review
description: Review a frontend payload from React or Next.js input through Server Actions, Route Handlers, validation, authorization, storage, and the returned UI data.
---

# Synapse payload review

Read [frontend security and payload contract](../../references/frontend-security.md). Start at the named form, URL, client fetch, or component and follow the actual payload to its mutation or data-access call. Review both directions: browser to server and server to browser.

For each input, report the concrete contract: source, accepted type/limits, server validation, authorization rule, storage mapping, and public response fields. Flag client-trusted roles or identifiers, extra fields passed through wholesale, missing size limits, unsafely redirected URLs, unvalidated route/search parameters, and raw records or internal errors reaching Client Components.

Distinguish confirmed vulnerabilities from unverified integration questions. Do not change code in a review-only request; when asked to fix, alter the shared validation or authorization boundary rather than patching a single UI caller.
