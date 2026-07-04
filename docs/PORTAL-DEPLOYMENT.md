# Portal Deployment Runbook

The client portal deploys to Vercel as `aiworkflow-portal`.

## Production URL

- `https://aiworkflow-portal.vercel.app`

## Required Environment Variables

Client passwords use `CLIENT_PASSWORD_{SLUG_UPPERCASED_WITH_UNDERSCORES}`.

Current production variables:

- `CLIENT_PASSWORD_ACME_CORP`
- `CLIENT_PASSWORD_DEMO_CO`

## Release Checklist

1. Merge the intended PR to `main`.
2. Confirm CI is green: lint, typecheck, portal build, portal smoke, tests, CodeQL.
3. Build and deploy production:

```bash
vercel build --prod --yes
vercel deploy --prebuilt --prod --yes
```

4. Confirm Vercel deployment readback shows `READY`, `target: production`, and the expected `githubCommitSha`.
5. Run non-secret smoke:

```bash
pnpm smoke:portal
```

6. When live credential verification is approved, run an authenticated smoke with a valid signed auth cookie:

```bash
PORTAL_AUTH_COOKIE='<valid signed portal auth cookie>' pnpm smoke:portal
```

## Rollback Pointer

Use the Vercel dashboard or CLI rollback to restore the previous production deployment if the portal fails after deploy. Confirm the alias returns to `https://aiworkflow-portal.vercel.app`, then rerun `pnpm smoke:portal`.
