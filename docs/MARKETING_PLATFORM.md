# Advancio Marketing Platform: hosting playbook

How every Advancio marketing app is hosted, and the exact steps to add a new one. The booth app (`/booth`) was the first. This file holds no secrets; keys live only in Azure app settings and git-ignored `.env.local` files.

## Architecture

```
Visitor -> https://mk.advancio.io/<app>/...
        -> Cloudflare (proxied) -> Worker "mk-router"   (routes by first path segment)
        -> Azure Web App "advancio-<app>"               (Node 22, on the shared plan)
        -> Supabase (shared project, one schema per app)
```

| Layer | Value |
| --- | --- |
| Public URL pattern | `https://mk.advancio.io/<app>` (booth: `/booth`) |
| Cloudflare account | `itadmin@advancio.com`, zone `advancio.io` |
| Router Worker | `mk-router`, source `infra/cloudflare/mk-router.js`, config `infra/cloudflare/wrangler.jsonc`, Worker Custom Domain `mk.advancio.io` (Cloudflare manages DNS and the certificate) |
| Azure subscription | Microsoft Azure Sponsorship 2026 (the CLI default; the other one, MCPP Subscription, is not used) |
| Resource group / region | `rg-advancio-marketing`, West US |
| App Service plan | `asp-advancio-marketing`, Linux, B1, about $13 a month, shared by all apps |
| Web App (booth) | `advancio-booth`, origin `advancio-booth.azurewebsites.net` |
| Supabase project | ref `monypfguneoncckqlheb` (`https://monypfguneoncckqlheb.supabase.co`), shared by all marketing apps |
| Supabase schema (booth) | `booth`, table `booth.sessions` |
| Source repo | https://github.com/karimj-TGG/advancio-booth-demo (repo root is the `source` folder) |

## Rules

1. **One shared plan.** New apps are new Web Apps on `asp-advancio-marketing`. Never create another plan, which would add a new monthly charge. If capacity runs out, scale the shared plan up. B1 has 1 core and 1.75 GB RAM shared by all apps.
2. **One path per app.** Each app is built with `NEXT_PUBLIC_BASE_PATH=/<app>` and reached at `mk.advancio.io/<app>`.
3. **One Supabase schema per app.** Create `<app>` in the shared database. Only ever change your own schema. RLS on, no policies, service role only. User identity will be shared through Supabase Auth (`auth.users`) when sign-in is added.
4. **Shared browser origin.** Every app shares `mk.advancio.io`, so cookies and `localStorage` are shared. Use app-specific key names (booth uses `advancioBoothSession`).
5. **Secrets stay server-side.** The Supabase service-role key exists only in Azure app settings and local `.env.local`. Never commit or print it.
6. **Retention.** Booth sessions are kept indefinitely (owner decision). New apps must state their own retention.

## Tooling on Windows

- PowerShell blocks `npx.ps1` and `pnpm.ps1`. Call `npx.cmd` / `pnpm.cmd`, or run the commands from Git Bash.
- Azure CLI is `C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd` (`az.cmd login` once).
- `npx wrangler login` once (Cloudflare) and `npx supabase login` plus `npx supabase link --project-ref monypfguneoncckqlheb` once, run from the repo root (not a parent folder).
- Use Windows `tar.exe` for zipping (`scripts/package-azure.mjs` does this). Git's GNU tar misreads `C:\` paths.

## Add a new app: checklist

Replace `<app>` with the short name (for example `campaign123`).

### 1. Code (Next.js app)

- Copy the pattern from this repo: `next.config.ts` uses `output: "standalone"` and `basePath: process.env.NEXT_PUBLIC_BASE_PATH`. Every asset, script and `fetch` URL must be prefixed with the base path (see `data-base-path` in `app/page.tsx` and `public/experience.js`).
- Server data access goes through an API route using `lib/supabase-server.ts` with `db: { schema: "<app>" }`. Validate input with zod. Do not log full URLs.
- Copy `scripts/build-node.mjs` (change the default base path), `scripts/prepare-standalone.mjs`, `scripts/package-azure.mjs`.

### 2. Supabase schema (run from the repo root, needs `supabase link`)

1. Add `supabase/migrations/<timestamp>_create_<app>_schema.sql` modelled on `20260923091811_create_booth_sessions.sql`: `create schema <app>`, tables, RLS enabled with no policies, revoke from `public, anon, authenticated`, grant to `service_role`.
2. `npx supabase db push --dry-run`, then `npx supabase db push --yes`.
3. **Manual dashboard step:** add `<app>` to **Exposed schemas** at https://supabase.com/dashboard/project/monypfguneoncckqlheb/integrations/data_api/settings (keep the existing entries). Without it the API returns `PGRST106 Invalid schema`.
4. Read-only look at existing schemas before creating anything:
   `npx supabase db query --linked "select nspname from pg_namespace where nspname not like 'pg_%'"`.

### 3. Azure Web App (on the existing plan)

```bash
az.cmd webapp create -g rg-advancio-marketing -p asp-advancio-marketing -n advancio-<app> --runtime "NODE:22-lts"
az.cmd webapp config set -g rg-advancio-marketing -n advancio-<app> --always-on true --startup-file "node server.js" --min-tls-version 1.2 --ftps-state Disabled
az.cmd webapp update -g rg-advancio-marketing -n advancio-<app> --https-only true
az.cmd webapp config appsettings set -g rg-advancio-marketing -n advancio-<app> --settings SUPABASE_URL=<url> SUPABASE_SERVICE_ROLE_KEY=<key> APP_BASE_URL=https://mk.advancio.io/<app> PORT=8080 WEBSITES_PORT=8080 HOSTNAME=0.0.0.0 SCM_DO_BUILD_DURING_DEPLOYMENT=true
```

Read the key from the local `.env.local` in a script; never paste it into chat or commit it. The Supabase service-role key can be written to `.env.local` without printing it:
`npx supabase projects api-keys --project-ref monypfguneoncckqlheb -o json | node -e "..."` (pick the `service_role` entry).

### 4. Deploy

Automatic: push to `main` (see CI/CD under Known limits). Manual fallback:

```bash
pnpm build:node        # next build with NEXT_PUBLIC_BASE_PATH, then copies static files
pnpm package:azure     # ~0.5 MB zip in the temp folder
az.cmd webapp deploy -g rg-advancio-marketing -n advancio-<app> --src-path <temp>/advancio-azure.zip --type zip --clean true
```

- Ship only the built app plus a minimal `package.json` (`next`, `react`, `react-dom`). Azure installs those. **Never zip the standalone `node_modules`**: Windows links expand it to 70+ MB and the deploy stalls.
- The deploy tool may print "Starting the site" for minutes even when the app is healthy. Check `https://advancio-<app>.azurewebsites.net/<app>` directly, and the container log at `https://advancio-<app>.scm.azurewebsites.net/api/logs/docker` (bearer token from `az.cmd account get-access-token --resource https://management.azure.com`; basic auth is disabled on the SCM site).
- **Stuck deploy (`DeploymentInProgress`, HTTP 409):** a failed upload leaves Kudu's lock. Delete the directory with an authenticated `DELETE https://advancio-<app>.scm.azurewebsites.net/api/vfs/site/locks/deployment/?recursive=true` (header `If-Match: *`), then redeploy.

### 5. Cloudflare router

1. Add `<app>: "advancio-<app>.azurewebsites.net",` to `ROUTES` in `infra/cloudflare/mk-router.js`.
2. From `infra/cloudflare`: `npx wrangler deploy --config wrangler.jsonc`. The `--config` flag is required, because the app build leaves a `.wrangler/deploy` redirect that confuses Wrangler.
3. No DNS work is needed. The Custom Domain `mk.advancio.io` already exists and stays proxied (orange cloud).

### 6. Verify

- `https://mk.advancio.io/<app>` returns 200, `/` returns 404.
- A full journey saves and reloads through the API; delete any test rows you create.
- Update this file's tables and `docs/PROJECT_HANDOFF.md`, then commit and push.

## Known limits and follow-ups

- `mk.advancio.io/` (the root) returns 404. Add a landing page route if wanted.
- **CI/CD:** `.github/workflows/deploy-azure.yml` deploys `main` to Azure on every push (install, `pnpm build:node`, `pnpm package:azure`, `azure/webapps-deploy`), authenticated with the GitHub secret `AZURE_WEBAPP_PUBLISH_PROFILE` (a publish profile for `advancio-booth`). For a new app, copy the workflow, change the app name, and add that app's own publish-profile secret. The manual commands above remain the fallback. Pushing to `main` therefore deploys to production.
- No rate limiting or abuse protection on `/api/session`. Cloudflare rate limiting rules on the domain are the natural place.
- The Sites/Cloudflare D1 build (`pnpm build`, `db/`, `drizzle/`, `.openai/hosting.json`) is retained for the old track only and is not written to by the app.
