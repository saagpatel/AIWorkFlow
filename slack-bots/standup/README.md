# Daily Standup Collector

Automated daily standup collection via Slack modals with optional Google Sheets logging.

## How It Works

1. Cron triggers DMs to team members at configured time (default: 9am weekdays)
2. Team members click "Submit Standup" button to open a modal
3. Modal collects: Yesterday, Today, Blockers
4. After 2-hour timeout, summary is posted to the standup channel
5. Entries are optionally logged to Google Sheets

## Required Slack Scopes

- `chat:write` — Post messages and summaries
- `im:write` — Open DMs with team members
- `im:history` — Read DM responses
- `users:read` — Fetch display names

## Setup

1. Create a Slack app at https://api.slack.com/apps
2. Enable **Interactivity & Shortcuts**, set Request URL to your deploy URL
3. Add the required scopes under **OAuth & Permissions**
4. Install the app to your workspace
5. Copy `.env.example` to `.env` and fill in values

## Google Sheets (Optional)

1. Create a Google Cloud service account
2. Share the spreadsheet with the service account email
3. Add the `GOOGLE_*` env vars

Without Google Sheets configured, the bot still works — it just skips logging.

## Deploy to Railway

```bash
railway init
railway up
```

## Manual Trigger

```bash
pnpm trigger
```
