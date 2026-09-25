# Frontend security and payload contract

Use this reference whenever browser-controlled data crosses into a Server Action, Server Function, Route Handler, external API, or sensitive UI.

## Treat each mutation as a public endpoint

Server Actions are reachable by direct POST request and Route Handlers are public API surfaces. A disabled button, hidden field, client-side role check, or client validation is never authorization. At every mutation boundary:

1. Identify the authenticated actor on the server.
2. Authorize that actor against the specific resource and requested operation.
3. Allowlist accepted fields; ignore extra keys rather than spreading the submitted object into a database call.
4. Validate type, requiredness, length, format, enum membership, numeric bounds, and cross-field rules on the server.
5. Return a deliberate public result, not raw database records, stack traces, provider errors, or internal authorization detail.

Client validation improves UX; server validation and authorization enforce the rule. When a project has a validation schema or Data Access Layer, reuse it rather than introducing another mechanism.

## Payload review

Trace the full contract: control or URL → browser payload → Server Action or Route Handler → validation → authorization → data access → response rendered in the UI.

- Define one expected shape before reading fields. For `FormData`, read only named fields the action accepts; do not persist `Object.fromEntries(formData)` or client-provided identifiers/roles wholesale.
- Parse URL parameters, `searchParams`, headers, cookies, JSON, and file metadata as untrusted input.
- Keep request limits proportional to the operation. Next.js Server Actions default to a 1 MB body limit; do not raise it casually. File uploads need explicit type, size, ownership, storage, and malware-scanning decisions before accepting them.
- Validate redirect destinations against an allowlist or same-origin rule; never redirect directly to a submitted URL.
- Re-check authorization at the data-access or mutation point to avoid time-of-check/time-of-use gaps.
- Use a DTO or explicit mapping for data crossing from server to Client Components. Send only fields the UI needs.

## Browser boundary

- Values prefixed `NEXT_PUBLIC_` are embedded in client JavaScript at build time. They are public, immutable after build, and may not hold secrets. Keep private environment reads in server-only modules.
- Do not serialize secrets, session objects, raw ORM records, authorization flags, or internal error objects into Client Component props.
- React text rendering escapes strings. Avoid `dangerouslySetInnerHTML`; if trusted HTML is a real product requirement, define an approved sanitization boundary and render only its output.
- Remote assets must have intentional hosts and paths. Do not let a user-controlled URL become an unrestricted image, fetch, redirect, or script destination.

## Headers and failure behavior

- Start from the project's existing headers. For sensitive or production surfaces, review CSP, `frame-ancestors`/clickjacking protection, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and HTTPS/HSTS with deployment constraints in mind.
- Keep errors actionable for the user but non-revealing: use stable public error codes/messages and log sensitive diagnostics only on the server.
- Preserve values after expected validation failures except sensitive inputs such as passwords or payment credentials.

## Sources

- [Next.js data security](https://nextjs.org/docs/15/app/guides/data-security)
- [Next.js authentication and authorization](https://nextjs.org/docs/app/guides/authentication)
- [Next.js Server Actions configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions)
- [Next.js environment variables](https://nextjs.org/docs/pages/guides/environment-variables)
- [Next.js response headers](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers)
