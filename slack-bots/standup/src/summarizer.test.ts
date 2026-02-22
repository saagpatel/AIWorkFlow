import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Config } from './config.js'

vi.mock('@aiworkflow/shared', () => ({
  standupSummaryBlocks: vi.fn().mockReturnValue([{ type: 'section', text: { type: 'mrkdwn', text: 'summary' } }]),
}))

vi.mock('./sheets.js', () => ({
  logToSheets: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('./store.js', () => ({
  getCompleteEntries: vi.fn().mockReturnValue([
    {
      userId: 'U1',
      displayName: 'Alice',
      yesterday: 'Stuff',
      today: 'More stuff',
      blockers: '',
      timestamp: new Date(),
    },
  ]),
  clear: vi.fn(),
}))

import { postSummary } from './summarizer.js'
import * as store from './store.js'
import { logToSheets } from './sheets.js'

const mockConfig: Config = {
  SLACK_BOT_TOKEN: 'xoxb-test',
  SLACK_SIGNING_SECRET: 'secret',
  TEAM_MEMBER_IDS: ['U1'],
  STANDUP_CHANNEL_ID: 'C_STANDUP',
  STANDUP_CRON: '0 9 * * 1-5',
  PORT: 3001,
}

describe('postSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should post summary to standup channel', async () => {
    const mockClient = {
      chat: { postMessage: vi.fn().mockResolvedValue({}) },
    } as any

    await postSummary(mockClient, mockConfig)

    expect(mockClient.chat.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ channel: 'C_STANDUP' }),
    )
  })

  it('should log to sheets and clear store', async () => {
    const mockClient = {
      chat: { postMessage: vi.fn().mockResolvedValue({}) },
    } as any

    await postSummary(mockClient, mockConfig)

    expect(logToSheets).toHaveBeenCalled()
    expect(store.clear).toHaveBeenCalled()
  })
})
