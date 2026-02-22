# AI Workflow Accelerator

## Project Overview
A productized AI consulting practice with a supporting client portal. The consulting offers three tiers: $1,500 AI Audit (2-hour deep-dive → 5-page report), $3,500-5,000 Implementation Sprint (2 weeks, audit + build 2-3 automations), and $3,000-8,000/mo Retainer (ongoing optimization). The portal is a simple Next.js static site where clients access audit reports, track automation performance metrics, and view engagement status. The portal is NOT the product — the consulting is. The portal professionalizes delivery and reduces repeat support questions.

## Tech Stack
- Client Portal: Next.js 14.2+ (App Router) on Vercel
- UI: Tailwind CSS + shadcn/ui
- Data: Markdown files + JSON (NO database)
- Charts: Recharts (for automation metrics)
- Slack Bots: Slack Bolt SDK
- AI: Claude API (for triage classification + meeting notes extraction)
- Key dependencies: next, tailwindcss, @shadcn/ui, recharts, @slack/bolt, @anthropic-ai/sdk

## Architecture
```
/content/clients/{client-slug}/
  audit.md              — Audit report in Markdown
  automations.json      — [{name, description, status, tool, metrics_url}]
  metrics.json          — [{automation_name, metric, value, period}]
  engagement.json       — {company, contact, plan, start_date, end_date, status}

/slack-bots/
  triage-bot/           — Slack Bolt app: classifies #support messages via Claude API
  standup/              — Slack Bolt app: collects daily standups, posts summary

/tools/
  meeting-notes/        — Claude API script: raw notes → action items + Slack post
```

Portal routes:
- `/{client-slug}` — Engagement overview (from engagement.json)
- `/{client-slug}/audit` — Rendered Markdown audit report
- `/{client-slug}/automations` — Automation list with status badges
- `/{client-slug}/metrics` — Recharts bar charts (hours saved, automations triggered)

## Development Conventions
- TypeScript for all portal code
- File naming: kebab-case for files, PascalCase for components
- Git commit format: `type(scope): description` (e.g., `feat(portal): add metrics chart page`)
- All client data goes in `/content/clients/` — never hardcode client info in components
- Static generation only — use `generateStaticParams` for client routes
- Password protection via Next.js middleware + env vars (one password per client)

## Current Phase
**Phase 0: Sales Infrastructure** (Week 0) — OPERATIONAL, no Claude Code needed
**Phase 1: Delivery Framework + Portfolio** (Weeks 1-2) — Claude Code Sessions 1-2
- [ ] Build Slack Ticket Triage Bot (triage-bot/)
- [ ] Build Daily Standup Collector (standup/)
- [ ] Build Meeting Notes → Action Items tool (meeting-notes/)
- [ ] Document all 3 templates with setup guides

**Phase 2: Client Portal MVP** (Weeks 3-4) — Claude Code Sessions 3-4
- [ ] Scaffold Next.js portal with App Router + Tailwind + shadcn/ui
- [ ] Create dynamic client routes (overview, audit, automations, metrics)
- [ ] Add per-client password protection via middleware
- [ ] Deploy to Vercel with custom domain

## Key Decisions Made
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | NONE — Markdown + JSON files | <20 clients, no dynamic data, static generation |
| Auth | Static password per client via env vars | No user accounts needed, simple middleware |
| CRM | Notion (not Salesforce/HubSpot) | Free, flexible, <20 clients |
| Invoicing | Stripe Invoicing | Already have Stripe from ComplianceKit |
| Slack framework | Slack Bolt (not raw HTTP) | Handles rate limiting, retries, event parsing |
| Portal rendering | Next.js static generation | No server components needed for Markdown |
| Charting | Recharts | Lightweight, React-native, good for simple bar/line charts |
| Portal deploy | Vercel | One-click deploy, custom domain, env vars for passwords |

## Do NOT
- Do NOT add a database. If you find yourself writing `CREATE TABLE` or installing Supabase/Prisma, STOP and reassess. Client data is Markdown + JSON files.
- Do NOT build a CRM, admin panel, or "consulting platform." Notion handles CRM. The portal is static files only.
- Do NOT use server components for the portal. Static generation via `generateStaticParams` is sufficient.
- Do NOT store client credentials or API keys. All automations deploy in the CLIENT's accounts.
- Do NOT scope creep the portal into a SaaS product. It exists to look professional, not to generate recurring revenue.
- Do NOT build all 20 Playbook templates — only build 3 (triage bot, standup collector, meeting notes) as portfolio pieces. The other 17 are documented approaches only.
- Do NOT use raw HTTP for Slack bots. Use Slack Bolt SDK exclusively.
