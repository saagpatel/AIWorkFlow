# AI Workflow Accelerator — Discovery Summary

## Problem Statement
Startups waste 20+ hours/week on manual workflows (ticket triage, standup collection, meeting notes, report generation, onboarding checklists). They know AI can help but lack the expertise to identify which workflows to automate and how to implement. Solo consultants who offer this service typically deliver via email and Google Docs, which looks unprofessional and creates repeat support questions. This project solves both: a repeatable consulting framework for auditing and automating startup workflows, plus a lightweight client portal that professionalizes delivery.

## Target User
**Primary:** Startup founders and ops leads (10-100 employees) using Slack, Google Workspace, and 2-3 other SaaS tools. They're spending $0 on automation today but losing $5K-15K/month in wasted labor hours. They engage 1-2 times (audit → sprint) with potential for monthly retainer.

**Secondary:** The consultant (Saagar) — the portal and Playbook templates reduce per-client delivery time from 40+ hours to 15-20 hours.

## Success Metrics
- 2 paid engagements/month ($7K-10K/mo revenue) by Day 60
- 1 retainer client ($3K+/mo) by Day 75
- Audit report delivered within 48 hours of discovery call
- Sprint deliverables completed within 10 business days
- Client NPS > 8 (post-engagement survey)
- New client portal onboarding takes <30 minutes
- 3 portfolio automations deployed and documented

## Scope Boundaries
**In scope:**
- Slack Ticket Triage Bot (Slack Bolt + Claude API)
- Daily Standup Collector (Slack Bolt + Google Sheets)
- Meeting Notes → Action Items tool (Claude API + Slack + Google Tasks)
- Client portal: 4 routes (overview, audit, automations, metrics)
- Per-client password protection
- Markdown audit report rendering with table of contents
- Automation metrics charts (Recharts)

**Out of scope:**
- CRM (handled by Notion — no code needed)
- Scheduling (Calendly — no code needed)
- Intake forms (Typeform — no code needed)
- Invoicing (Stripe — no code needed)
- Newsletter (Beehiiv — no code needed)
- The other 17 Playbook templates (documented only, not built)
- User authentication / accounts system
- Database of any kind
- Admin panel for managing clients
- Any SaaS product features

**Deferred to later phases:**
- YouTube content (Phase 4+)
- Portal upgrade to Supabase Auth (only if 10+ clients request it)
- Remaining 17 Playbook templates (built on-demand per client engagement)

## Technical Constraints
- No database — all client data is Markdown + JSON files in `/content/clients/`
- Portal must be statically generated (no SSR, no server components for data)
- Slack bots must use Slack Bolt SDK (not raw HTTP)
- All client automations deploy in client's own accounts — never store their credentials
- Portal passwords stored as Vercel environment variables (e.g., `CLIENT_ACME_PASSWORD=xyz`)
- Maximum 2-3 hours per Claude Code session — each session produces ONE deployable deliverable
- Total Claude Code time budget: ~8-10 hours across 4 sessions

## Key Integrations
| Service | API | Auth Method | Rate Limits | Purpose |
|---------|-----|-------------|-------------|---------|
| Slack | Slack Bolt SDK (Events API + Web API) | Bot OAuth Token | Tier 3: ~50 req/min | Triage bot, standup collector, notification posting |
| Claude API | Messages API (claude-sonnet-4-5-20250929) | API Key in .env | Standard tier | Ticket classification, meeting notes extraction |
| Google Sheets | Sheets API v4 | Service Account | 300 req/min | Standup data storage |
| Google Tasks | Tasks API v1 | OAuth 2.0 | 50K req/day | Action item creation from meeting notes |
| Vercel | Deployment (CLI/Git) | Vercel Token | N/A | Portal hosting + env vars for passwords |
