# Advancio Bottleneck Experience

Interactive conference-booth experience for Advancio. A visitor chooses an insurance workflow bottleneck, answers three questions, explores the matching Spark accelerator, and receives a personalized summary that can be reopened from a QR code or shared link.

The live experience covers four paths:

- Distribution → Spark Rater, Spark Direct, and Spark Agents
- Underwriting → Spark Underwriting
- Claims → Spark Claim
- Customer Experience → Spark Navigator and Spark Portal

## Current implementation

- Next.js 16 + React 19 application built through Vinext/Vite
- Cloudflare Worker runtime
- Cloudflare D1 database bound as `DB`
- Browser-driven experience engine in `public/experience.js`
- Anonymous session persistence through `app/api/session/route.ts`
- Voice-to-text through the browser Web Speech API
- QR code generation through QRCode.js loaded from a CDN
- Web Share and clipboard fallbacks for taking the summary away

**Production (as of 2026-09-23)** runs at `https://mk.advancio.io/booth`: Azure App Service (shared plan) behind a Cloudflare Worker router, with sessions stored in the shared Advancio Marketing Supabase project (`booth` schema). Resend email and contact capture are not built yet. The original Cloudflare Sites/D1 build is kept for reference only. See [docs/MARKETING_PLATFORM.md](docs/MARKETING_PLATFORM.md) for hosting and how to add more marketing apps, and [docs/PROJECT_HANDOFF.md](docs/PROJECT_HANDOFF.md) section 14a for decisions.

## Start here when continuing development

1. Read [CLAUDE.md](CLAUDE.md).
2. Read [docs/PROJECT_HANDOFF.md](docs/PROJECT_HANDOFF.md).
3. Review `public/experience.js`, which contains the journey content, state machine, rendering, persistence calls, sharing, voice input, and idle reset.
4. Review `app/api/session/route.ts`, `lib/supabase-server.ts` and `supabase/migrations/` before changing persistence. (`db/schema.ts` and `drizzle/` belong to the retired D1 track.)
5. Read [docs/MARKETING_PLATFORM.md](docs/MARKETING_PLATFORM.md) before touching hosting, DNS, Cloudflare, Azure or Supabase. Do not write sessions to D1 and Supabase at the same time.

## Local setup

Requirements:

- Node.js 22.13 or newer
- pnpm 11.25.0

Install and run:

```bash
pnpm install
pnpm dev
```

If pnpm asks to approve native dependency build scripts, review the locked packages and use `pnpm approve-builds`; do not bypass that safety check with a global allow-all setting.

Build the production bundle:

```bash
pnpm build
```

The project scripts wrap the framework and Cloudflare tooling. Keep those scripts unless the deployment target is intentionally changed.

## Main files

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Persistent page shell: background, header, app mount point, footer, idle dialog, scripts |
| `public/experience.js` | Complete client journey, content, state, rendering, events, voice, sharing, and persistence |
| `app/globals.css` | Responsive visual system and all experience styling |
| `app/api/session/route.ts` | Anonymous session GET/POST API |
| `db/schema.ts` | Drizzle definition for `booth_sessions` |
| `drizzle/0000_yielding_komodo.sql` | Current D1 migration |
| `.openai/hosting.json` | Sites project identity and D1 binding |
| `PRODUCT_SCREENSHOTS.md` | Required filenames for approved product screenshots |
| `docs/PROJECT_HANDOFF.md` | Architecture, infrastructure, requirements, gaps, roadmap, and Claude prompt |

## Product screenshots

Place approved screenshots in `public/product-screenshots/` with these names:

- `distribution-1.png` through `distribution-3.png`
- `underwriting-1.png` through `underwriting-3.png`
- `claims-1.png` through `claims-3.png`
- `experience-1.png` through `experience-3.png`

When an image is absent, the experience intentionally shows a styled placeholder instead of a broken image.

## Important product constraints

- Keep the experience fast, visual, and easy to use at a busy booth.
- There is no admin interface in scope.
- Every selected or typed answer must be persisted.
- “Other” supports typing and speech-to-text; the application must never persist raw audio or send it to its own backend.
- Back, restart, summary, and idle-reset behavior must continue working.
- The summary must reflect the entire journey, not only the final answer.
- Preserve the Advancio brand and existing four-path structure unless the owner explicitly changes them.
