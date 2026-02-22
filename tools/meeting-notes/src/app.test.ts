import { describe, it, expect, vi } from 'vitest'

vi.mock('@slack/bolt', () => ({
  App: vi.fn().mockImplementation(() => ({
    command: vi.fn(),
    view: vi.fn(),
    start: vi.fn(),
  })),
}))

vi.mock('./extractor.js', () => ({
  extractMeetingNotes: vi.fn().mockResolvedValue({
    actionItems: [{ task: 'Test', owner: 'Alice', priority: 'high' }],
    decisions: ['Use Vitest'],
    keyTopics: ['Testing'],
    summary: 'Discussed testing',
  }),
}))

vi.mock('./slack-poster.js', () => ({
  postToSlack: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('./google-tasks.js', () => ({
  createGoogleTasks: vi.fn().mockResolvedValue(undefined),
}))

import { createApp } from './app.js'
import type { Config } from './config.js'

describe('createApp', () => {
  it('should return null when Slack is not configured', () => {
    const config: Config = { ANTHROPIC_API_KEY: 'key', PORT: 3002 }
    const app = createApp(config)
    expect(app).toBeNull()
  })

  it('should create app when Slack is configured', () => {
    const config: Config = {
      ANTHROPIC_API_KEY: 'key',
      SLACK_BOT_TOKEN: 'xoxb-test',
      SLACK_SIGNING_SECRET: 'secret',
      PORT: 3002,
    }
    const app = createApp(config)
    expect(app).not.toBeNull()
  })

  it('should register slash command and view handlers', () => {
    const config: Config = {
      ANTHROPIC_API_KEY: 'key',
      SLACK_BOT_TOKEN: 'xoxb-test',
      SLACK_SIGNING_SECRET: 'secret',
      PORT: 3002,
    }
    const app = createApp(config)!
    expect(app.command).toHaveBeenCalledWith('/meeting-notes', expect.any(Function))
    expect(app.view).toHaveBeenCalledWith('meeting_notes_submission', expect.any(Function))
  })
})
