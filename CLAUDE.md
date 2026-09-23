# Claude Code instructions

You are continuing the Advancio Bottleneck Experience. Treat this repository as a production conference application, not a generic landing page.

## Read before editing

1. `README.md`
2. `docs/PROJECT_HANDOFF.md`
3. The specific source files named in the handoff for the task you are implementing

The handoff distinguishes **current implementation** from **approved future direction**. Preserve that distinction in code and documentation.

## Product intent

The application helps an insurance executive identify a workflow bottleneck and connect it to an Advancio Spark accelerator. The booth interaction should be understandable without staff guidance and should finish in a few minutes.

Primary flow:

`Home → choose path → three questions → future state → three solution frames → personalized summary`

The four paths are Distribution, Underwriting, Claims, and Customer Experience.

## Non-negotiable behavior

- Store every completed answer, including typed or dictated “Other” answers.
- Store only the final speech transcript; the application must never persist raw audio or send it to its own backend.
- Keep Back and Restart available throughout the journey.
- Keep the idle reset: warn after inactivity, then reset for the next booth visitor.
- Generate a summary of the full experience: selected area, every question and answer, recommended solution, future state, and story frames viewed.
- Keep personalized QR/share links working.
- Preserve a useful fallback when voice input, native sharing, clipboard access, QR generation, or persistence is unavailable.
- Do not add an admin interface unless explicitly requested.
- Do not collect personal information silently. Any contact capture must be optional, clearly explained, and consent-based.

## Architecture decision rule

The deployed Sites version currently uses Cloudflare D1. The owner intends to use Supabase for the database and Resend for email when the project is moved to an external/full application deployment.

Before changing persistence or email:

1. State which deployment track the task targets.
2. For the current Sites track, keep D1 and the existing `/api/session` contract.
3. For the external track, migrate deliberately to Supabase and Resend using the target design in `docs/PROJECT_HANDOFF.md`.
4. Do not write the same session to both databases indefinitely. A short, documented migration or dual-write window is acceptable only when requested.
5. Never expose Supabase service-role keys or the Resend API key to browser code.

## Coding guidance

- Keep content configuration separate from behavior when refactoring `public/experience.js`.
- Prefer typed React components and schema validation for new substantial features.
- Preserve the current URL/session behavior during refactors.
- Escape visitor-controlled content before inserting it into HTML.
- Treat a personalized session URL as a bearer link: use high-entropy IDs, avoid logging full URLs, and define retention/expiration before collecting contact data.
- Keep touch targets, keyboard access, reduced-motion support, and mobile layouts working.
- Do not replace the established design with default component-library styling.
- Do not remove or rename Sites build/deployment files unless the deployment target is intentionally changed.

## Required validation before declaring work complete

- Production build succeeds.
- All four paths can complete end to end.
- Multiple-choice and Other answers save and reload.
- Back navigation does not corrupt answers.
- Restart produces a new anonymous session and returns Home.
- Shared session links reopen the correct summary.
- Missing product screenshots fall back cleanly.
- The UI works at desktop booth resolution and a narrow mobile viewport.
- No secret is committed, printed to the browser, or included in a share URL.

## Best next actions

Unless the owner gives a different priority, work in this order:

1. Add the approved product screenshots.
2. Confirm the final booking URLs and booth CTA behavior.
3. Decide the deployment track and implement either D1 hardening or the Supabase migration.
4. Add optional contact capture and Resend delivery only after the data/consent requirements are approved.
5. Add focused end-to-end tests for the journey and session restoration.
6. Refactor the client engine only after behavior is protected by tests.
