# Implementation Roadmap

## Session Strategy
Each Claude Code session tackles ONE deliverable. Sessions target 2-3 hours. Do not attempt multiple deliverables in a single session. Phase 0 and Phase 3 are operational work (Notion, LinkedIn, Calendly, etc.) — no Claude Code needed.

**Total Claude Code sessions: 4 | Total estimated time: 8-10 hours**

---

## Phase 0: Sales Infrastructure (Week 0) — NO CLAUDE CODE
This phase is entirely operational. Set up Calendly, Typeform, Notion CRM, SOW template, Stripe invoicing, LinkedIn profile, Beehiiv, and Zapier automations. See implementation plan Section 4, Phase 0 for the full checklist.

**Verification:** Walk through the entire sales flow as a test client: book Calendly → submit Typeform → verify Notion entry → send test invoice → verify Zapier automations fire.

---

## Phase 1: Delivery Framework + Portfolio (Weeks 1-2) — Sessions 1-2

### Session 1: Slack Ticket Triage Bot (2 hours)
**Scope:** Build a Slack Bolt app that listens to messages in a configurable support channel, sends message text to Claude API for classification (bug / feature request / question / urgent), and auto-routes to the appropriate channel or pings the appropriate person.

**Tasks:**
1. Scaffold `slack-bots/triage-bot/` with Slack Bolt, TypeScript, and Anthropic SDK
2. Implement event listener for `message` events in configurable channel
3. Build Claude API prompt for classification (few-shot with 5 examples per category)
4. Implement routing logic: post classified message to target channel with classification label
5. Add `.env.example` with required vars: `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, `ANTHROPIC_API_KEY`, `SUPPORT_CHANNEL_ID`, routing channel IDs
6. Write setup guide: how to create Slack app, set scopes, install to workspace

**Deliverables:**
- Working triage bot deployable to any Slack workspace
- `README.md` with setup guide, customization points, maintenance notes
- `.env.example` with all required variables

**Verification:** Deploy to personal Slack workspace. Send 5 test messages (1 bug, 1 feature, 1 question, 1 urgent, 1 ambiguous). All 5 classify correctly and route to the right channel.

### Session 2: Standup Collector + Meeting Notes Tool (2 hours)
**Scope:** Build two smaller tools:
1. **Daily Standup Collector** — Slack Bolt app that DMs team members at a configurable time, collects responses (yesterday/today/blockers), posts a formatted summary to a standup channel.
2. **Meeting Notes → Action Items** — Script that takes raw meeting notes (text input), sends to Claude API for extraction, outputs structured action items with owners and deadlines, posts to Slack and optionally creates Google Tasks.

**Tasks (Standup Collector):**
1. Scaffold `slack-bots/standup/` with Slack Bolt + TypeScript
2. Implement scheduled DM using Slack's `chat.postMessage` (triggered via cron or Slack workflow)
3. Collect responses via message events or modal submission
4. Format and post summary to configurable standup channel
5. Write `README.md` with setup and customization guide

**Tasks (Meeting Notes Tool):**
1. Scaffold `tools/meeting-notes/` with TypeScript + Anthropic SDK
2. Build Claude API prompt: extract action items as JSON `[{task, owner, deadline, priority}]`
3. Implement Slack posting of formatted action items
4. Optional: Google Tasks API integration (can defer if time is tight)
5. Write `README.md` with usage instructions

**Deliverables:**
- Working standup collector bot
- Working meeting notes extraction tool
- README for each with setup guides

**Verification:**
- Standup: bot DMs 3 test users, collects responses, posts formatted summary
- Meeting notes: process 1 sample transcript, verify action items extracted correctly

---

## Phase 2: Client Portal MVP (Weeks 3-4) — Sessions 3-4

### Session 3: Portal Scaffolding (2-3 hours)
**Scope:** Initialize the Next.js portal with all 4 client routes rendering from file-based data.

**Tasks:**
1. Initialize Next.js 14.2+ project in `portal/` with App Router, TypeScript, Tailwind CSS, shadcn/ui
2. Create sample client data in `portal/content/clients/acme-corp/`:
   - `engagement.json` — sample engagement data
   - `audit.md` — sample audit report (use the template from the implementation plan)
   - `automations.json` — 3 sample automations with status badges
   - `metrics.json` — sample metrics data (hours saved, automations triggered)
3. Create `app/[client]/page.tsx` — engagement overview from `engagement.json`
4. Create `app/[client]/audit/page.tsx` — render Markdown with table of contents (use `react-markdown` or `next-mdx-remote`)
5. Create `app/[client]/automations/page.tsx` — list automations with status badges (active/paused/building)
6. Create `app/[client]/metrics/page.tsx` — Recharts bar charts for hours saved and automations triggered
7. Implement `generateStaticParams` to generate routes from client folders
8. Create shared layout with navigation between the 4 views

**Deliverables:**
- Working Next.js portal with 4 routes per client
- Sample `acme-corp` data populating all views
- `npm run dev` serves the portal locally

**Verification:** Visit `/acme-corp`, `/acme-corp/audit`, `/acme-corp/automations`, `/acme-corp/metrics`. All 4 pages render with sample data. Audit report renders Markdown correctly with headings and tables.

**Key files to include in context:**
- `portal/` directory (entire)
- `portal/content/clients/acme-corp/` (sample data)

### Session 4: Portal Polish + Deploy (1-2 hours)
**Scope:** Add password protection, deploy to Vercel, add branding.

**Tasks:**
1. Create `portal/middleware.ts` — check request path for client slug, validate against env var `CLIENT_{SLUG}_PASSWORD` via basic auth or cookie
2. Add login page or basic auth prompt for password entry
3. Add footer to shared layout: "Powered by [Your Name] — AI Workflow Accelerator" with Calendly booking link
4. Create `scripts/new-client.sh` or document a Notion checklist for adding new clients: create folder → copy templates → fill data → add env var → deploy
5. Deploy to Vercel: connect repo, set env vars for client passwords, configure custom domain `portal.yourdomain.com`
6. Test production: visit live URL, verify password protection, verify all 4 pages render

**Deliverables:**
- Password-protected portal deployed on Vercel
- New client onboarding script/checklist
- Production URL: `portal.yourdomain.com`

**Verification:** Visit `portal.yourdomain.com/acme-corp` — prompted for password. Wrong password shows 401. Correct password shows all 4 pages. Test on mobile.

**Key files to include in context:**
- `portal/middleware.ts`
- `portal/app/[client]/` (all route files)
- `portal/content/clients/acme-corp/` (sample data)

---

## Phase 3: Content Engine + Scale (Weeks 5-8) — NO CLAUDE CODE
This phase is content creation and marketing ops: newsletter, LinkedIn posts, case studies, referral program, meetup networking. All done in Beehiiv, LinkedIn, and Notion. See implementation plan Section 4, Phase 3 for the full checklist.

**Verification:** Monthly metrics review: newsletter open rate, LinkedIn impressions, pipeline leads/week, revenue.

---

## Context Management
- For Slack bot sessions (1-2): include the bot's folder + CLAUDE.md + Slack Bolt docs reference
- For portal sessions (3-4): include the entire `portal/` directory + sample client data + CLAUDE.md
- Keep sessions tightly scoped — each session produces ONE deployable deliverable
- Maximum context files per session: 5-7
- Always include CLAUDE.md in every session
