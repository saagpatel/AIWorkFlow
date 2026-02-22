# Slack Ticket Triage Bot

Automatically classifies incoming support messages using Claude AI and routes them to the appropriate channel.

## How It Works

1. User posts a message in `#support`
2. Bot classifies the message as: **bug**, **feature request**, **question**, or **urgent**
3. Message is forwarded to the appropriate channel with classification details
4. Original message gets a reaction emoji indicating its category

## Required Slack Scopes

- `channels:history` — Read messages in support channel
- `channels:read` — Access channel info
- `chat:write` — Post routed messages
- `reactions:write` — Add reaction to original message

## Setup

1. Create a Slack app at https://api.slack.com/apps
2. Add the required scopes under **OAuth & Permissions**
3. Install the app to your workspace
4. Copy `.env.example` to `.env` and fill in values
5. Create channels for each category and add the bot

## Deploy to Railway

```bash
railway init
railway up
```

Uses the `Procfile` for the start command.

## Environment Variables

See `.env.example` for all required variables.
