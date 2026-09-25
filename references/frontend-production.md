# Frontend production contract

Use this reference when the request affects perceived speed, test coverage, or search/social discovery in a Next.js application.

## Performance

- Keep pages and layouts as Server Components by default; add Client Components only at interactive leaves so browser JavaScript stays bounded.
- Render independent server data in parallel and use segment loading UI or Suspense to avoid blocking an entire route on one slow request.
- Use `next/image` for content images when it fits the source, provide intentional `alt` text and sizes, and prioritize only the identified LCP image.
- Load shared fonts through one `next/font` definition and use `next/script` for third-party scripts so their load strategy is explicit.
- Lazy-load large client-only components and third-party libraries only after measuring a real cost. Verify caching deliberately; do not assume every data source has Next.js fetch semantics.
- Measure both a synthetic run and field data when available. Core metrics include LCP, CLS, and INP; analyse bundles before introducing a large dependency.

## Tests

- Use unit tests for pure transformations and validation, component tests for interaction contracts, integration tests for connected modules, and E2E tests for critical user journeys.
- Prefer E2E coverage for asynchronous Server Components, because tool support for them is uneven.
- Every security-sensitive mutation needs a negative-path test: unauthenticated, unauthorized, malformed, oversized, or extra-field input as relevant to the boundary.
- Test behavior and accessibility contracts (label, keyboard, focus, error feedback), not implementation details or generated markup snapshots alone.

## Metadata and SEO

- Use Next.js Metadata API for page title, description, canonical metadata, and page-specific dynamic metadata. Treat user-derived metadata as untrusted content.
- Add Open Graph/Twitter data only where social sharing is an actual product requirement.
- Provide sitemap and robots behavior for indexable production sites; do not index private, preview, authenticated, or duplicate canonical surfaces.
- Keep heading hierarchy, meaningful links, image alternatives, and loading/error/not-found pages useful to people first; these also support crawlability.

## Sources

- [Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js testing](https://nextjs.org/docs/15/app/guides/testing)
- [Next.js analytics and Web Vitals](https://nextjs.org/docs/app/guides/analytics)
