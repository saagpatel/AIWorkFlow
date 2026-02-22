# Resumption Prompt

[Paste this into Claude Code to resume the project]

---

You are resuming work on **AI Workflow Accelerator** — a productized AI consulting practice with a supporting client portal. The consulting audits startup workflows and builds automations (Slack bots, Zapier/Make flows, Claude-powered tools). The portal is a simple Next.js static site where clients access audit reports, automation status, and performance metrics.

## Project Context
This project has 4 phases but only 4 Claude Code sessions total (~8-10 hours). Phases 0 and 3 are operational (Notion, LinkedIn, Calendly, etc.) and don't need Claude Code. The software deliverables are:
- 3 automation templates (Slack triage bot, standup collector, meeting notes tool)
- 1 client portal (Next.js on Vercel, static generation, no database)

## Current State
- **Last completed phase:** Phase 0 (Sales Infrastructure — operational, no code)
- **Current phase:** Phase 1 (Delivery Framework — Sessions 1-2)
- **Last completed task:** None — this is the first Claude Code session
- **Next task:** Build Slack Ticket Triage Bot in `slack-bots/triage-bot/`

## What's Already Built
- Nothing in code yet. Phase 0 was operational setup (Calendly, Typeform, Notion CRM, Stripe, LinkedIn, Beehiiv, Zapier automations).

## What's NOT Built Yet
- `slack-bots/triage-bot/` — Slack Bolt app, Claude API classification, auto-routing (Session 1)
- `slack-bots/standup/` — Daily standup collector, DM + summary posting (Session 2)
- `tools/meeting-notes/` — Claude API meeting notes → action items extraction (Session 2)
- `portal/` — Next.js client portal with 4 routes per client (Sessions 3-4)
- `portal/middleware.ts` — Per-client password protection (Session 4)

## Immediate Next Steps
1. Create `slack-bots/triage-bot/` directory with Slack Bolt + TypeScript + Anthropic SDK
2. Implement message event listener for configurable support channel
3. Build Claude API classification prompt (few-shot: bug/feature/question/urgent)
4. Implement routing logic: post to target channel with classification label
5. Create `.env.example` and `README.md` with setup guide

## Key Files to Read First
- `CLAUDE.md` — Project config, tech stack, architecture, decisions, antipatterns
- `slack-bots/triage-bot/` — This session's build target (will be empty on first session)

## Decisions Already Made (Do Not Revisit)
- Slack Bolt SDK for all Slack bots (not raw HTTP)
- Claude API (claude-sonnet-4-5-20250929) for classification and extraction
- TypeScript for all code
- No database anywhere in the project — client data is Markdown + JSON files
- Portal uses Next.js static generation (`generateStaticParams`), not server components
- Password protection via middleware + env vars, not a user accounts system
- Portal is NOT a SaaS product — it's a delivery professionalization tool
- CRM stays in Notion — do not build CRM features

## Session Boundaries
- This session should produce exactly ONE deployable deliverable
- Target: 2-3 hours maximum
- If something is taking too long, ship what works and document what's left
- Do not start the next session's deliverable in this session

---

## Phase-Specific Resumption Notes

### If resuming in Session 2 (Standup + Meeting Notes):
- **Last completed:** Session 1 — Triage bot in `slack-bots/triage-bot/`
- **Next:** Build `slack-bots/standup/` (standup collector) and `tools/meeting-notes/` (meeting notes → action items)
- **Read first:** `slack-bots/triage-bot/` for patterns to reuse (Slack Bolt setup, Claude API calls)

### If resuming in Session 3 (Portal Scaffolding):
- **Last completed:** Session 2 — Standup collector + meeting notes tool
- **Next:** Initialize `portal/` with Next.js 14.2+, App Router, Tailwind, shadcn/ui. Create 4 dynamic routes per client. Create sample `acme-corp` data.
- **Read first:** `CLAUDE.md` for portal architecture and data model

### If resuming in Session 4 (Portal Polish + Deploy):
- **Last completed:** Session 3 — Portal scaffolding with 4 routes
- **Next:** Add per-client password protection via `middleware.ts`, add branding footer, create new-client onboarding script, deploy to Vercel
- **Read first:** `portal/app/[client]/` for existing route structure, `portal/content/clients/acme-corp/` for data format
