![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white) ![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-green)

# AI Workflow Accelerator

A monorepo of AI-powered tools built for client-facing automation workflows. It combines a password-protected client portal for surfacing engagement status and audit reports with a pair of Claude-backed Slack bots — one that extracts structured action items from raw meeting notes and one that automatically triages and routes incoming support tickets.

The shared `@aiworkflow/shared` package provides a common Anthropic client and Slack formatting utilities used across all tools, keeping AI integration logic in one place.

## Tech Stack

| Layer | Technology |
|---|---|
| Portal | Next.js 14, React 18, Tailwind CSS, Radix UI, Recharts |
| Slack Bots | `@slack/bolt`, `@slack/web-api` |
| AI | Anthropic Claude (`@anthropic-ai/sdk`) |
| Integrations | Google Tasks API (`googleapis`) |
| Shared | TypeScript 5.7, Zod, pnpm workspaces |
| Testing | Vitest, Testing Library |

## Prerequisites

- Node.js 18+
- pnpm 9+
- Anthropic API key
- Slack app credentials (for bots)
- Google Cloud OAuth credentials (optional, for Google Tasks)

## Getting Started

```bash
# Install all workspace dependencies
pnpm install

# Run the client portal (dev mode)
cd portal && pnpm dev

# Run the meeting notes extractor (CLI)
cd tools/meeting-notes && pnpm extract ./notes.txt

# Run the meeting notes Slack bot
cd tools/meeting-notes && pnpm start

# Run the triage Slack bot
cd slack-bots/triage-bot && pnpm start

# Run all tests
pnpm test

# Type-check all packages
pnpm typecheck
```

Copy `.env.example` to `.env` in each package and fill in the required values before running.

## Project Structure

```
AIWorkFlow/
├── portal/                   # Next.js client portal
│   └── src/
│       ├── app/              # App Router pages ([client] dynamic route)
│       ├── components/       # UI components (engagement cards, etc.)
│       └── lib/              # Content loading, fonts, utilities
├── tools/
│   └── meeting-notes/        # CLI + Slack bot: extracts action items from notes
├── slack-bots/
│   └── triage-bot/           # Slack bot: classifies and routes support messages
├── packages/
│   └── shared/               # Shared Anthropic client, Slack formatting, types
├── content/                  # Client engagement data (markdown/JSON)
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

<!-- TODO: Add screenshot -->

## Packages

### `portal`
Password-protected Next.js portal with per-client routes (`/[client]`). Each client authenticates via an environment-variable-backed password and views their engagement overview, audit reports, and automation metrics.

### `tools/meeting-notes`
Accepts raw meeting notes via file, stdin, or a Slack modal (`/meeting-notes`). Uses Claude to extract structured action items, decisions, key topics, and a summary. Optionally creates Google Tasks for each action item.

### `slack-bots/triage-bot`
Watches a `#support` channel, classifies every incoming message (bug / feature request / question / urgent) using Claude, forwards it to the appropriate channel, and reacts to the original message with a category emoji.

### `packages/shared`
Internal library exporting a configured Anthropic client, Zod schemas for AI responses, and Slack message formatting helpers.

## License

MIT — see [LICENSE](./LICENSE).
