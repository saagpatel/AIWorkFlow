# AI Workflow Accelerator

[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript)](#) [![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#)

> Automate the repetitive parts of client work — meeting notes to action items, tickets to routed queues, all via Slack and Claude.

A monorepo of AI-powered tools for client-facing automation workflows. A password-protected Next.js portal surfaces engagement status and audit reports. Three Claude-backed tools handle the grunt work: a meeting notes extractor, a triage-and-routing bot, and a daily standup collector. A shared `@aiworkflow/shared` package keeps the Anthropic client and Slack utilities in one place.

## Features

- **Meeting notes extractor** — paste raw notes, get structured action items with owners and due dates via Claude
- **Triage bot** — incoming Slack tickets automatically classified and routed to the right channel
- **Daily standup collector** — DMs team members on a cron schedule, collects yesterday/today/blockers, posts a formatted summary; optionally logs to Google Sheets
- **Client portal** — Next.js 15 dashboard with engagement status, audit reports, and Recharts visualizations
- **Google Tasks integration** — action items sync directly to Google Tasks
- **Shared workspace package** — single Anthropic client and Slack formatting layer across all tools

## Quick Start

### Prerequisites
- Node.js 22+, pnpm 11.9.0
- Anthropic API key
- Slack app credentials (Bot Token + App Token)

### Installation
```bash
pnpm install
```

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
| Portal | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| Slack bots | @slack/bolt, @slack/web-api |
| AI | Anthropic Claude (@anthropic-ai/sdk) |
| Integrations | Google Tasks API (googleapis) |
| Shared | TypeScript 6, Zod, pnpm workspaces |
| Testing | Vitest, Testing Library |

## Portal Deployment

The portal is linked to Vercel as `aiworkflow-portal`.

Tracked deploy contract:

- Build command: `pnpm --filter @aiworkflow/portal build`
- Install command: `pnpm install --frozen-lockfile`
- Output directory: Vercel auto-detects Next.js output; do not override to `.next`
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
