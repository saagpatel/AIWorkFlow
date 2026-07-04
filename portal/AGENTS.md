# AGENTS.md - AIWorkFlow Portal

## Review guidelines

Treat portal changes as client-facing workflow changes. Review auth/unlock
behavior, protected routes, cookie state, mobile/responsive layout, keyboard
focus, accessible labels, and loading/empty/error states for every changed
page or component.

The portal is deployed from `portal/.next`; Vercel config, README claims,
build scripts, and smoke tests must stay aligned. A change that passes a local
component check but breaks `pnpm --filter @aiworkflow/portal build` or
`pnpm smoke:portal` is merge-relevant.

Do not let UI copy imply that Slack, Anthropic, Google, or client automation
mutated external state unless the reviewed code actually performed that action
and has a recovery/error path. For docs-only portal changes, verify deploy,
auth, and smoke-test claims against the current commands and config.
