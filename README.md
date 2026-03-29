# AI Workflow Accelerator

[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript)](#) [![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#)

> Automate the repetitive parts of client work — meeting notes to action items, tickets to routed queues, all via Slack and Claude.

A monorepo of AI-powered tools for client-facing automation workflows. A password-protected Next.js portal surfaces engagement status and audit reports. Two Claude-backed Slack bots handle the grunt work: one extracts structured action items from raw meeting notes, another triages and routes incoming support tickets. A shared `@aiworkflow/shared` package keeps the Anthropic client and Slack utilities in one place.

## Features

- **Meeting notes extractor** — paste raw notes, get structured action items with owners and due dates via Claude
- **Triage bot** — incoming Slack tickets automatically classified and routed to the right channel
- **Client portal** — Next.js 14 dashboard with engagement status, audit reports, and Recharts visualizations
- **Google Tasks integration** — action items sync directly to Google Tasks
- **Shared workspace package** — single Anthropic client and Slack formatting layer across all tools

## Quick Start

### Prerequisites
- Node.js 18+, pnpm 9+
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
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Portal | Next.js 14, React 18, Tailwind CSS, Radix UI |
| Slack bots | @slack/bolt, @slack/web-api |
| AI | Anthropic Claude (@anthropic-ai/sdk) |
| Integrations | Google Tasks API (googleapis) |
| Shared | TypeScript 5.7, Zod, pnpm workspaces |
| Testing | Vitest, Testing Library |

## License

MIT
