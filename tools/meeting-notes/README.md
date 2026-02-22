# Meeting Notes → Action Items

Extracts action items, decisions, and key topics from raw meeting notes using Claude AI. Works as both a CLI tool and a Slack app.

## How It Works

1. Input raw meeting notes (file, stdin, or Slack modal)
2. Claude AI extracts structured data: action items, decisions, key topics, summary
3. Output: formatted text (CLI) or Slack message with optional Google Tasks creation

## CLI Usage

```bash
# From file
pnpm extract ./notes.txt

# From stdin
echo "We discussed caching. Alice will deploy Redis by Friday." | pnpm extract
```

## Slack App Usage

1. Type `/meeting-notes` in any channel
2. Paste raw notes into the modal
3. Bot posts extracted action items to the configured channel
4. Google Tasks are created for each action item (if configured)

## Required Slack Scopes

- `commands` — Register slash command
- `chat:write` — Post extracted notes

## Setup

1. Copy `.env.example` to `.env`
2. Set `ANTHROPIC_API_KEY` (required)
3. Optionally set Slack and Google Tasks vars

## Google Tasks (Optional)

1. Create OAuth 2.0 credentials in Google Cloud Console
2. Authorize and get a refresh token
3. Set the `GOOGLE_*` env vars

## Deploy to Railway

```bash
railway init
railway up
```
