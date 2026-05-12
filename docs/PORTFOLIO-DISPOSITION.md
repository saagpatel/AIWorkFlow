# AI Workflow Accelerator — Portfolio Disposition

**Status:** Active (operator-tool monorepo with external client
surface) — pnpm monorepo containing **Next.js 14 client portal**
+ **two Claude-backed Slack bots** (meeting-notes extractor +
ticket triage) + **CLI tool** + shared `@aiworkflow/shared`
Anthropic / Slack utilities package, on `origin/main`. Multi-
surface architecture: portal targets Vercel (static-host),
Slack bots target long-running service host, CLI invoked locally
by operator. Per memory: this is operator infrastructure for an
AI consulting practice. **Introduces "multi-surface operator-tool"
sub-shape** — operator-tool with an external-facing client surface
(distinguishes from GithubRepoAuditor's pure-internal shape).

> Disposition uses strict `origin/main` verification.
> **New sub-shape: operator-tool with external client portal.**

---

## Verification posture

Only `origin` (`saagpatel/AIWorkFlow`). Clean migration state.

`origin/main`:

- Tip: `c8ff365` chore: migrate to current Anthropic model ID (#13)
- Substantive commits visible:
  - `c8ff365` Anthropic model ID migration (recent maintenance)
  - Full OSS scaffolding wave (CHANGELOG, PR/issue templates, CoC,
    Makefile, Dependabot, contributing, security policy, MIT)
- No v1.0 release closeout cadence visible (no version bump, no
  deployment config beyond the implicit Next.js portal Vercel
  deploy)
- Monorepo structure (pnpm-workspace.yaml at root)
- Default branch: `main`

---

## Current state in one paragraph

AI Workflow Accelerator is a **pnpm monorepo** of AI-powered
client-work automation tools built for the operator's consulting
practice. Four surfaces:

1. **`portal/`** — Next.js 14 password-protected client dashboard.
   Engagement status, audit reports, Recharts visualizations.
   Targets Vercel (static-host cluster member by surface).
2. **`tools/meeting-notes/`** — Claude-backed extractor: paste raw
   notes, get structured action items with owners and due dates.
   CLI invocation (`pnpm extract ./notes.txt`) + Slack bot mode
   for in-conversation extraction. Google Tasks sync.
3. **`slack-bots/triage-bot/`** — incoming Slack tickets
   auto-classified and routed via Claude.
4. **`packages/shared/`** — single Anthropic client + Slack
   formatting layer used across all tools.

The four surfaces share infrastructure (Anthropic client, Slack
formatting) but distribute differently:
- **Portal** → Vercel (static-host)
- **Slack bots** → long-running service (Heroku / Railway / Fly /
  self-hosted)
- **CLI** → operator-invoked

Per memory: client portal for AI consulting practice. Active state
because no v1.0 release closeout cadence visible and the multi-
surface deployment posture is operator-judgment-driven.

---

## Why "Active (operator-tool, multi-surface)" — new sub-shape

GithubRepoAuditor founded the operator-tool / dogfood cluster
shape (R11). GhostRepoAuditor's audience is the operator-self —
pure internal use.

AIWorkFlow extends this shape with **external client surface**:

| Aspect | GithubRepoAuditor (pure operator-tool) | **AIWorkFlow (multi-surface operator-tool)** |
|---|---|---|
| Primary user | Operator (audits own portfolio) | Operator (runs consulting practice) |
| External user surface | None — outputs are operator-only | **Client portal (Vercel)** — clients see engagement status |
| Internal automation | Audit pipeline + CLI + serve UI | **Slack bots + CLI extractor + shared Anthropic client** |
| Distribution surfaces | PyPI + local CLI | **Vercel (portal) + service host (bots) + local CLI** |

This is a new sub-shape: **multi-surface operator-tool with
external client portal**. Future repos following this pattern
(operator's business automation with a client-facing surface)
batch here.

---

## Cluster taxonomy update

| Cluster | Count | Sub-shapes |
|---|---|---|
| **Operator-tool / dogfood** | **2** | pure internal (GithubRepoAuditor) / **multi-surface with client portal (AIWorkFlow)** |
| (others unchanged) | | |

Operator-tool cluster reaches 2 members with sub-shape structure.

---

## Unblock trigger (operator)

This is operator-internal infrastructure, so "ship public" doesn't
quite apply. Operational concerns:

1. **Portal hosting** — Vercel deploy for `portal/`. Password
   protection mechanism (Basic Auth via middleware, or NextAuth
   with single shared account, or Vercel Password Protection at
   the project level — operator decision).
2. **Slack bot hosting** — long-running. Options:
   - **Fly.io / Railway**: cheap, simple, scale to zero.
   - **Self-hosted on operator infrastructure**: more control,
     more maintenance.
   - **Vercel Cron + Slack Webhook**: serverless but limited to
     incoming-webhook-driven flows.
3. **Anthropic API key + budget** — shared across all tools via
   `@aiworkflow/shared`. Operator should track spend across the
   surfaces (action item extraction + triage classifications can
   scale with client load).
4. **Slack app credentials** — Bot Token + App Token per workspace.
   Multi-workspace support is non-trivial; verify if planned.
5. **Google Tasks integration** — OAuth flow + token refresh +
   scope management.
6. **Client portal access management** — password rotation, who
   has access, audit log if HIPAA / SOC2-adjacent.
7. **Anthropic model ID rotation** — `c8ff365` migrated once;
   recurring maintenance.
8. **Engagement data privacy** — portal surfaces engagement status;
   ensure no PII / NDA-protected client content leaks.

Estimated operator time to fully deploy: **~6-10 hours** (Slack
bot hosting + portal deploy + access management + Anthropic budget
setup).

---

## Portfolio operating system instructions

| Aspect | Posture |
|---|---|
| Portfolio status | `Active (operator-tool monorepo with external client surface)` |
| Distribution model | **Multi-surface**: Vercel (portal) + service host (Slack bots) + operator-local (CLI) |
| Review cadence | Active — operator-judgment-driven |
| Resurface conditions | (a) Portal hosting decision, (b) Slack bot hosting decision, (c) new client surface added, (d) Anthropic model ID rotation, (e) Slack app credential rotation, (f) Google Tasks scope changes |
| Co-batch with | Operator-tool cluster — **now 2 repos** (GithubRepoAuditor pure / **AIWorkFlow multi-surface**) |
| Sub-shape | **Multi-surface operator-tool with external client portal** (new) |
| Special concern | **Multi-surface deployment.** Three distinct hosting decisions (Vercel + service host + local CLI). |
| Special concern | **Slack app credentials per workspace.** Multi-workspace support is non-trivial. |
| Special concern | **Client engagement data privacy.** Portal surfaces engagement status; verify no PII leaks. |
| Special concern | **Anthropic spend tracking across surfaces.** Shared client makes budget attribution tricky. |
| Special concern | **Google Tasks OAuth + token refresh.** Token expiry breaks meeting-notes integration silently. |

---

## Reactivation procedure

1. Verify branch tracking.
2. Review stash `r17-aiwf-stash` (CLAUDE.md + pnpm-workspace.yaml
   mods + .codex/ + AGENTS.md). **pnpm-workspace.yaml** may have
   the `allowBuilds` stub bug seen in other codex-bootstrapped
   repos — inspect.
3. Test each surface independently:
   - `cd portal && pnpm dev` (Next.js)
   - `cd tools/meeting-notes && pnpm extract ./sample.txt` (CLI)
   - `cd slack-bots/triage-bot && pnpm start` (with valid Slack
     credentials)
4. **Decide deployment plan** for portal + bots before further
   feature work.
5. **Audit Anthropic spend** by surface; consider per-surface
   API keys if budget attribution matters.

---

## Last known reference

| Field | Value |
|---|---|
| `origin/main` tip | `c8ff365` chore: migrate to current Anthropic model ID (#13) |
| Default branch | `main` |
| Build system | pnpm monorepo + Next.js 14 + TypeScript + Anthropic SDK + Slack Bolt SDK + Recharts |
| Architecture | **Multi-surface monorepo**: `portal/` (Next.js, Vercel) + `tools/meeting-notes/` (CLI + Slack bot) + `slack-bots/triage-bot/` (Slack bot) + `packages/shared/` (Anthropic + Slack utilities) |
| Distribution | **Multi-surface**: Vercel (portal) + service host (Slack bots) + operator-local (CLI) |
| Audience | **Operator** (consulting practice) + **clients** (via portal) — hybrid internal/external |
| Phases shipped | OSS scaffolding wave + Anthropic model ID current; substantive feature commits not visible at recent tip (may be older or never explicitly tagged) |
| Migration state | No `legacy-origin` remote |
| Distinguishing feature | **Second operator-tool / dogfood cluster member.** Introduces "multi-surface operator-tool with external client portal" sub-shape — operator's business automation with a client-facing surface, distinct from pure-internal operator tools (GithubRepoAuditor). |
