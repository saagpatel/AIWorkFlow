# AI Workflow Accelerator

[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript)](#) [![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#)

> Automate the repetitive parts of client work — meeting notes to action items, tickets to routed queues, all via Slack and Claude.

A monorepo of AI-powered tools for client-facing automation workflows. A password-protected Next.js portal surfaces engagement status and audit reports. Two Claude-backed tools handle meeting notes extraction and ticket triage and routing; a daily standup collector formats responses without Claude. A shared `@aiworkflow/shared` package keeps the Anthropic client and Slack utilities in one place.

## Features

- **Meeting notes extractor** — paste raw notes, get structured action items with owners and due dates via Claude
- **Triage bot** — incoming Slack tickets automatically classified and routed to the right channel
- **Daily standup collector** — DMs team members on a cron schedule, collects yesterday/today/blockers, posts a formatted summary; optionally logs to Google Sheets
- **Client portal** — Next.js 16 dashboard with engagement status, audit reports, and Recharts visualizations
- **Google Tasks integration** — action items sync directly to Google Tasks
- **Shared workspace package** — single Anthropic client and Slack formatting layer across all tools

## Quick Start

### Prerequisites
- Node.js 22.13+ within the 22.x line (CI selects Node 22), pnpm 11.9.0
- Anthropic API key
- Slack app credentials (Bot Token + Signing Secret)

### Installation
Run from the repository root. The test, lint, typecheck, and local portal lanes
do not require Slack, Anthropic, or Google credentials; those are for live integrations.

```bash
pnpm install --frozen-lockfile
```

## Local verification

From the repository root, use Node.js 22.13+ within the 22.x line (CI selects Node 22)
and the pinned pnpm 11.9.0:

```bash
pnpm test                         # root tests, then portal tests
pnpm typecheck
pnpm lint
pnpm --filter @aiworkflow/portal build
```

For a focused portal change, pass a test file relative to `portal/`, for example
`pnpm --filter @aiworkflow/portal test src/lib/auth-token.test.ts`.
For portal smoke, start the built app in a separate terminal:

```bash
pnpm --filter @aiworkflow/portal start --hostname 127.0.0.1 --port 3100
```

Then run `pnpm smoke:portal http://127.0.0.1:3100` from the root, with
`PORTAL_AUTH_COOKIE` unset for the non-secret unlock/redirect checks. Stop the
local server with Ctrl-C when finished. Bare `pnpm smoke:portal` defaults to
production; reserve it and the Vercel commands below for an authorized release.
For changed portal behavior, also check the affected flow locally in a browser:
auth/unlock, mobile layout, keyboard focus, and loading/empty/error states as
relevant. Documentation-only changes do not require a browser walkthrough.

### Usage
```bash
# Client portal (dev)
cd portal && pnpm dev

# Meeting notes extractor (CLI)
cd tools/meeting-notes && pnpm extract ./notes.txt

# Slack bots
cd tools/meeting-notes && pnpm start
cd slack-bots/triage-bot && pnpm start
cd slack-bots/standup && pnpm start
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Portal | Next.js 16, React 19, Tailwind CSS, shadcn/ui |
| Slack bots | @slack/bolt, @slack/web-api |
| AI | Anthropic Claude (@anthropic-ai/sdk) |
| Integrations | Google Tasks API (googleapis) |
| Shared | TypeScript 7, Zod, pnpm workspaces |
| Testing | Vitest, Testing Library |

## Portal Deployment

The portal is linked to Vercel as `aiworkflow-portal`.

Tracked deploy contract:

- Build command: `pnpm --filter @aiworkflow/portal build`
- Install command: `pnpm install --frozen-lockfile`
- Output directory: `portal/.next` because the root Vercel project builds the
  `@aiworkflow/portal` workspace
- Required client password env vars follow `CLIENT_PASSWORD_{SLUG_UPPERCASED_WITH_UNDERSCORES}` format, for example `CLIENT_PASSWORD_ACME_CORP`

Readiness checks:

```bash
pnpm --filter @aiworkflow/portal build
vercel build --prod --yes
pnpm smoke:portal
```

`pnpm smoke:portal` checks the production unlock page and protected-route
redirect without using live credentials. To check another environment, pass a
base URL: `pnpm smoke:portal http://127.0.0.1:3100`. To include authenticated
audit and metrics pages, set `PORTAL_AUTH_COOKIE` to a valid portal auth cookie.

See `docs/PORTAL-DEPLOYMENT.md` for the production release checklist and rollback pointer.

## License

MIT
