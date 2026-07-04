# AIWorkFlow Codex Instructions

AIWorkFlow is a pnpm monorepo for client-facing automation workflows: a
password-protected Next.js/Vercel portal, Slack bots, Anthropic-backed tools,
and shared TypeScript utilities.

## Review guidelines

Focus Codex review on merge-relevant bugs, regressions, missing tests,
security/auth/data-loss risk, misleading docs, and behavior that could break
the portal, Slack bots, or client-facing automation. Avoid style-only comments.

Prioritize these risks:

- Vercel build, install, and output-directory drift
- portal auth, protected-route, unlock, cookie, and client-password behavior
- CI gates that miss portal typecheck, tests, lint, build, or smoke coverage
- build steps that depend on live third-party availability such as hosted fonts
- Slack, Anthropic, and Google integration boundaries, credentials, and
  external-system mutation
- lockfile/runtime mismatch, especially Node and pnpm engine drift
- docs that claim deploy readiness, smoke coverage, or rollback safety without
  matching code or scripts

For portal UI PRs, review the changed workflow across auth/unlock state,
mobile layout, loading/empty/error states, keyboard focus, accessible labels,
and Vercel deployment assumptions. Treat UI that hides auth failure, implies a
workflow ran when it did not, clips client-facing content, or lacks a matching
portal build/smoke path as merge-relevant.

For docs-only PRs, comment only when a doc claim is false, unsupported,
missing linked evidence, or inconsistent with current commands, Vercel config,
portal behavior, or integration boundaries.

## Verification

Use targeted checks for small changes. Useful commands include:

```sh
pnpm test
pnpm typecheck
pnpm lint
pnpm --filter @aiworkflow/portal build
pnpm smoke:portal
```

Do not claim deployment readiness unless the relevant portal build and smoke
checks have run, or the unrun checks are named plainly.
