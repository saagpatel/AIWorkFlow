import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@slack/bolt', () => ({
  App: vi.fn().mockImplementation(() => ({
    message: vi.fn(),
    start: vi.fn(),
  })),
}))

vi.mock('@aiworkflow/shared', () => ({
  classificationBlock: vi.fn().mockReturnValue([{ type: 'section', text: { type: 'mrkdwn', text: 'test' } }]),
}))

vi.mock('./classifier.js', () => ({
  classifyTicket: vi.fn().mockResolvedValue({
    category: 'bug',
    confidence: 0.95,
    reasoning: 'test',
  }),
}))

import { App } from '@slack/bolt'
import { createApp } from './app.js'
import { classifyTicket } from './classifier.js'
import type { Config } from './config.js'

const mockConfig: Config = {
  SLACK_BOT_TOKEN: 'xoxb-test',
  SLACK_SIGNING_SECRET: 'secret',
  ANTHROPIC_API_KEY: 'key',
  SUPPORT_CHANNEL_ID: 'C_SUPPORT',
  BUG_CHANNEL_ID: 'C_BUG',
  FEATURE_CHANNEL_ID: 'C_FEATURE',
  QUESTION_CHANNEL_ID: 'C_QUESTION',
  URGENT_CHANNEL_ID: 'C_URGENT',
  PORT: 3000,
}

describe('createApp', () => {
  it('should create a Bolt app with correct config', () => {
    const app = createApp(mockConfig)
    expect(App).toHaveBeenCalledWith({
      token: 'xoxb-test',
      signingSecret: 'secret',
    })
  })

  it('should register a message listener', () => {
    const app = createApp(mockConfig)
    expect(app.message).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should classify and route messages from support channel', async () => {
    const app = createApp(mockConfig)

    // Get the registered message handler
    const messageHandler = vi.mocked(app.message).mock.calls[0][0] as any

    const mockClient = {
      chat: { postMessage: vi.fn().mockResolvedValue({}) },
      reactions: { add: vi.fn().mockResolvedValue({}) },
    }

    await messageHandler({
      message: {
        channel: 'C_SUPPORT',
        text: 'App crashes on login',
        ts: '12345.6789',
      },
      client: mockClient,
    })

    expect(classifyTicket).toHaveBeenCalledWith('App crashes on login')
    expect(mockClient.chat.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ channel: 'C_BUG' }),
    )
    expect(mockClient.reactions.add).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: 'C_SUPPORT',
        timestamp: '12345.6789',
        name: 'bug',
      }),
    )
  })

  it('should skip messages from other channels', async () => {
    const app = createApp(mockConfig)
    const messageHandler = vi.mocked(app.message).mock.calls[0][0] as any

    const mockClient = {
      chat: { postMessage: vi.fn() },
      reactions: { add: vi.fn() },
    }

    await messageHandler({
      message: { channel: 'C_OTHER', text: 'hello', ts: '12345.6789' },
      client: mockClient,
    })

    expect(mockClient.chat.postMessage).not.toHaveBeenCalled()
  })

  it('should skip bot messages', async () => {
    const app = createApp(mockConfig)
    const messageHandler = vi.mocked(app.message).mock.calls[0][0] as any

    const mockClient = {
      chat: { postMessage: vi.fn() },
      reactions: { add: vi.fn() },
    }

    await messageHandler({
      message: {
        channel: 'C_SUPPORT',
        text: 'bot message',
        ts: '12345.6789',
        bot_id: 'B123',
      },
      client: mockClient,
    })

    expect(mockClient.chat.postMessage).not.toHaveBeenCalled()
  })
})
