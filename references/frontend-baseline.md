# Frontend baseline

Use this only as a decision checklist, not as a substitute for the project's established conventions.

## React and TypeScript

- Give components narrow, exported prop types only when callers need them; prefer inference for local helpers.
- Model absent, loading, error, and success states explicitly when asynchronous data is visible.
- Keep one source of truth for controlled inputs. Do not mirror props into state without a real editing or transition requirement.
- Make component APIs semantic: actions describe intent (`onDismiss`, `onValueChange`) and booleans describe state (`isOpen`, `disabled`).

## Next.js App Router

- Start with Server Components. Add `"use client"` only at the smallest interactive boundary.
- Validate route and search parameters at their boundary before using them for data access or rendering.
- Place loading, empty, error, and not-found behavior close to the route segment that owns it.
- Generate metadata from trusted data; do not interpolate unvalidated user input into document metadata.

## Accessibility and responsive UI

- Every form control has a programmatic label. Connect help and validation messages with `aria-describedby` only when present.
- Preserve native elements and keyboard behavior before introducing custom roles. Visible focus must remain visible.
- Never rely on color alone for errors, selection, or status. Respect reduced-motion preferences when motion conveys feedback.
- Verify keyboard navigation and narrow viewport behavior for any changed interactive surface.

## Design system

- Start from existing tokens and components. Add a token only when a value is truly reusable across more than one surface.
- Define component states (default, hover, focus, disabled, loading, error) before expanding variants.
- Keep spacing, typography, color, radii, and shadows intentional; do not introduce isolated magic values when an existing token applies.
